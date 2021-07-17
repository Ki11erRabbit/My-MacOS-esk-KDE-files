/******/ "use strict";
/******/ var __webpack_modules__ = ({

/***/ 444:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configPromise = void 0;
const defaultConfig = {
    copySeparator: 'tab',
    disablekeys: false,
    highlight: true,
    kanjicomponents: true,
    lineEnding: 'n',
    maxClipCopyEntries: 7,
    maxDictEntries: 7,
    minihelp: true,
    onlyreading: false,
    popupcolor: 'blue',
    popupDelay: 150,
    popupLocation: 0,
    showOnKey: '',
    textboxhl: false,
    ttsEnabled: false,
    kanjiInfo: [
        { code: 'H', name: 'Halpern', shouldDisplay: true },
        { code: 'L', name: 'Heisig 5th Edition', shouldDisplay: true },
        { code: 'DN', name: 'Heisig 6th Edition', shouldDisplay: true },
        { code: 'E', name: 'Henshall', shouldDisplay: true },
        { code: 'DK', name: 'Kanji Learners Dictionary', shouldDisplay: true },
        { code: 'N', name: 'Nelson', shouldDisplay: true },
        { code: 'V', name: 'New Nelson', shouldDisplay: true },
        { code: 'Y', name: 'PinYin', shouldDisplay: true },
        { code: 'P', name: 'Skip Pattern', shouldDisplay: true },
        { code: 'IN', name: 'Tuttle Kanji &amp; Kana', shouldDisplay: true },
        { code: 'I', name: 'Tuttle Kanji Dictionary', shouldDisplay: true },
        { code: 'U', name: 'Unicode', shouldDisplay: true },
    ],
};
// Simply wrapper which makes `sync.get` `Promise` based.
async function getStorage() {
    const config = await new Promise((resolve) => {
        chrome.storage.sync.get(defaultConfig, (cloudStorage) => {
            resolve(cloudStorage);
        });
    });
    return config;
}
function isLegacyKanjiInfo(kanjiInfo) {
    return !(kanjiInfo instanceof Array);
}
async function applyMigrations(storageConfig) {
    if (isLegacyKanjiInfo(storageConfig.kanjiInfo)) {
        const newKanjiInfo = [];
        for (const info of defaultConfig.kanjiInfo) {
            newKanjiInfo.push({
                ...info,
                shouldDisplay: storageConfig.kanjiInfo[info.code],
            });
        }
        storageConfig.kanjiInfo = newKanjiInfo;
        await new Promise((resolve) => {
            chrome.storage.sync.set(storageConfig, resolve);
        });
    }
}
async function createNormalizedConfiguration() {
    const storageConfig = await getStorage();
    await applyMigrations(storageConfig);
    return storageConfig;
}
const configPromise = createNormalizedConfiguration();
chrome.storage.onChanged.addListener(async (changes, area) => {
    if (area !== 'sync') {
        return;
    }
    const config = await configPromise;
    Object.entries(changes).map((change) => {
        config[change[0]] = change[1].newValue;
    });
});
const immutableConfigPromise = configPromise;
exports.configPromise = immutableConfigPromise;


/***/ }),

/***/ 34:
/***/ ((__unused_webpack_module, exports) => {


/*

  Rikaikun
  Copyright (C) 2010 Erek Speed
  http://code.google.com/p/rikaikun/

  ---

  Originally based on Rikaichan 1.07
  by Jonathan Zarate
  http://www.polarcloud.com/

  ---

  Originally based on RikaiXUL 0.4 by Todd Rudick
  http://www.rikai.com/
  http://rikaixul.mozdev.org/

  ---

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

  ---

  Please do not change or remove any of the copyrights or links to web pages
  when modifying any of the files. - Jon

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RcxDict = void 0;
// Be careful of using directly due to object keys.
const defaultDictEntryData = {
    kanji: '',
    onkun: '',
    nanori: '',
    bushumei: '',
    misc: {},
    eigo: '',
    hasNames: false,
    data: [],
    hasMore: false,
    title: '',
    index: 0,
    matchLen: 0,
};
class RcxDict {
    constructor(config) {
        this.wordDict = '';
        this.wordIndex = '';
        this.kanjiData = '';
        this.radData = [];
        this.difReasons = [];
        this.difRules = [];
        // katakana -> hiragana conversion tables
        this.ch = [
            0x3092, 0x3041, 0x3043, 0x3045, 0x3047, 0x3049, 0x3083, 0x3085, 0x3087,
            0x3063, 0x30fc, 0x3042, 0x3044, 0x3046, 0x3048, 0x304a, 0x304b, 0x304d,
            0x304f, 0x3051, 0x3053, 0x3055, 0x3057, 0x3059, 0x305b, 0x305d, 0x305f,
            0x3061, 0x3064, 0x3066, 0x3068, 0x306a, 0x306b, 0x306c, 0x306d, 0x306e,
            0x306f, 0x3072, 0x3075, 0x3078, 0x307b, 0x307e, 0x307f, 0x3080, 0x3081,
            0x3082, 0x3084, 0x3086, 0x3088, 0x3089, 0x308a, 0x308b, 0x308c, 0x308d,
            0x308f, 0x3093,
        ];
        this.cv = [
            0x30f4, 0xff74, 0xff75, 0x304c, 0x304e, 0x3050, 0x3052, 0x3054, 0x3056,
            0x3058, 0x305a, 0x305c, 0x305e, 0x3060, 0x3062, 0x3065, 0x3067, 0x3069,
            0xff85, 0xff86, 0xff87, 0xff88, 0xff89, 0x3070, 0x3073, 0x3076, 0x3079,
            0x307c,
        ];
        this.cs = [0x3071, 0x3074, 0x3077, 0x307a, 0x307d];
        this.kanjiInfoLabelList = [
            /*
                'C',   'Classical Radical',
                'DR',  'Father Joseph De Roo Index',
                'DO',  'P.G. O\'Neill Index',
                'O',   'P.G. O\'Neill Japanese Names Index',
                'Q',   'Four Corner Code',
                'MN',  'Morohashi Daikanwajiten Index',
                'MP',  'Morohashi Daikanwajiten Volume/Page',
                'K',  'Gakken Kanji Dictionary Index',
                'W',  'Korean Reading',
            */
            'H',
            'Halpern',
            'L',
            'Heisig 5th Edition',
            'DN',
            'Heisig 6th Edition',
            'E',
            'Henshall',
            'DK',
            'Kanji Learners Dictionary',
            'N',
            'Nelson',
            'V',
            'New Nelson',
            'Y',
            'PinYin',
            'P',
            'Skip Pattern',
            'IN',
            'Tuttle Kanji &amp; Kana',
            'I',
            'Tuttle Kanji Dictionary',
            'U',
            'Unicode',
        ];
        this.config = config;
    }
    static async create(config) {
        if (!RcxDict.instance) {
            RcxDict.instance = new RcxDict(config);
            await RcxDict.instance.init();
        }
        return RcxDict.instance;
    }
    static createDefaultDictEntry() {
        // Use JSON parse round trip for deep copy of default data.
        return JSON.parse(JSON.stringify(defaultDictEntryData));
    }
    async init() {
        const started = +new Date();
        // TODO(melink14): This waits on name data eagerly which slows down init, consider
        // making it lazy since people often don't use the name dictionary.
        [, , this.nameDict, this.nameIndex] = await Promise.all([
            this.loadDictionaries(),
            this.loadDeinflectionData(),
            this.fileReadAsync(chrome.extension.getURL('data/names.dat')),
            this.fileReadAsync(chrome.extension.getURL('data/names.idx')),
        ]);
        const ended = +new Date();
        console.log('rcxDict main then in ' + (ended - started));
    }
    fileReadAsync(url) {
        return new Promise((resolve) => {
            const req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    resolve(req.responseText);
                }
            };
            req.open('GET', url, true);
            req.send(null);
        });
    }
    async fileReadAsyncAsArray(url) {
        const file = await this.fileReadAsync(url);
        return file.split('\n').filter((o) => {
            return o && o.length > 0;
        });
    }
    fileRead(url) {
        const req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send(null);
        return req.responseText;
    }
    fileReadArray(name) {
        const a = this.fileRead(name).split('\n');
        // Is this just in case there is blank shit in the file.  It was written
        // by Jon though.
        // I suppose this is more robust
        while (a.length > 0 && a[a.length - 1].length === 0) {
            a.pop();
        }
        return a;
    }
    loadNames() {
        if (this.nameDict && this.nameIndex) {
            return;
        }
        this.nameDict = this.fileRead(chrome.extension.getURL('data/names.dat'));
        this.nameIndex = this.fileRead(chrome.extension.getURL('data/names.idx'));
    }
    //  Note: These are mostly flat text files; loaded as one continuous string to
    //  reduce memory use
    async loadDictionaries() {
        [this.wordDict, this.wordIndex, this.kanjiData, this.radData] =
            await Promise.all([
                this.fileReadAsync(chrome.extension.getURL('data/dict.dat')),
                this.fileReadAsync(chrome.extension.getURL('data/dict.idx')),
                this.fileReadAsync(chrome.extension.getURL('data/kanji.dat')),
                this.fileReadAsyncAsArray(chrome.extension.getURL('data/radicals.dat')),
            ]);
    }
    async loadDeinflectionData() {
        const buffer = await this.fileReadAsyncAsArray(chrome.extension.getURL('data/deinflect.dat'));
        let currentLength = -1;
        let group = {
            fromLength: currentLength,
            rules: [],
        };
        // i = 1: skip header
        for (let i = 1; i < buffer.length; ++i) {
            const ruleOrReason = buffer[i].split('\t');
            if (ruleOrReason.length === 1) {
                this.difReasons.push(ruleOrReason[0]);
            }
            else if (ruleOrReason.length === 4) {
                const o = {
                    from: ruleOrReason[0],
                    to: ruleOrReason[1],
                    typeMask: parseInt(ruleOrReason[2]),
                    reasonIndex: parseInt(ruleOrReason[3]),
                };
                if (currentLength !== o.from.length) {
                    currentLength = o.from.length;
                    group = { fromLength: currentLength, rules: [] };
                    this.difRules.push(group);
                }
                group.rules.push(o);
            }
        }
    }
    find(data, text) {
        const tlen = text.length;
        let beg = 0;
        let end = data.length - 1;
        let i;
        let mi;
        let mis;
        while (beg < end) {
            mi = (beg + end) >> 1;
            i = data.lastIndexOf('\n', mi) + 1;
            mis = data.substr(i, tlen);
            if (text < mis) {
                end = i - 1;
            }
            else if (text > mis) {
                beg = data.indexOf('\n', mi + 1) + 1;
            }
            else {
                return data.substring(i, data.indexOf('\n', mi + 1));
            }
        }
        return null;
    }
    deinflect(word) {
        const r = [];
        const have = {};
        let o;
        o = { word: word, type: 0xff, reason: '' };
        r.push(o);
        have[word] = 0;
        let i;
        let j;
        let k;
        i = 0;
        do {
            word = r[i].word;
            const wordLen = word.length;
            const type = r[i].type;
            for (j = 0; j < this.difRules.length; ++j) {
                const g = this.difRules[j];
                if (g.fromLength <= wordLen) {
                    const end = word.substr(-g.fromLength);
                    for (k = 0; k < g.rules.length; ++k) {
                        const rule = g.rules[k];
                        if (type & rule.typeMask && end === rule.from) {
                            const newWord = word.substr(0, word.length - rule.from.length) + rule.to;
                            if (newWord.length <= 1) {
                                continue;
                            }
                            o = { word: word, type: 0xff, reason: '' };
                            if (have[newWord] !== undefined) {
                                o = r[have[newWord]];
                                o.type |= rule.typeMask >> 8;
                                continue;
                            }
                            have[newWord] = r.length;
                            if (r[i].reason.length) {
                                o.reason =
                                    this.difReasons[rule.reasonIndex] + ' &lt; ' + r[i].reason;
                            }
                            else {
                                o.reason = this.difReasons[rule.reasonIndex];
                            }
                            o.type = rule.typeMask >> 8;
                            o.word = newWord;
                            r.push(o);
                        }
                    }
                }
            }
        } while (++i < r.length);
        return r;
    }
    wordSearch(word, doNames, max) {
        let i;
        let u;
        let v;
        let reason;
        let p;
        const trueLen = [0];
        const entry = RcxDict.createDefaultDictEntry();
        // half & full-width katakana to hiragana conversion
        // note: katakana vu is never converted to hiragana
        p = 0;
        reason = '';
        for (i = 0; i < word.length; ++i) {
            u = v = word.charCodeAt(i);
            // Skip Zero-width non-joiner used in Google Docs between every
            // character.
            if (u === 8204) {
                p = 0;
                continue;
            }
            if (u <= 0x3000) {
                break;
            }
            // full-width katakana to hiragana
            if (u >= 0x30a1 && u <= 0x30f3) {
                u -= 0x60;
            }
            else if (u >= 0xff66 && u <= 0xff9d) {
                // half-width katakana to hiragana
                u = this.ch[u - 0xff66];
            }
            else if (u === 0xff9e) {
                // voiced (used in half-width katakana) to hiragana
                if (p >= 0xff73 && p <= 0xff8e) {
                    reason = reason.substr(0, reason.length - 1);
                    u = this.cv[p - 0xff73];
                }
            }
            else if (u === 0xff9f) {
                // semi-voiced (used in half-width katakana) to hiragana
                if (p >= 0xff8a && p <= 0xff8e) {
                    reason = reason.substr(0, reason.length - 1);
                    u = this.cs[p - 0xff8a];
                }
            }
            else if (u === 0xff5e) {
                // ignore J~
                p = 0;
                continue;
            }
            reason += String.fromCharCode(u);
            // need to keep real length because of the half-width semi/voiced
            // conversion
            trueLen[reason.length] = i + 1;
            p = v;
        }
        word = reason;
        let dict;
        let index;
        let maxTrim;
        const cache = {};
        const have = [];
        let count = 0;
        let maxLen = 0;
        if (doNames) {
            // check: split this
            this.loadNames();
            // After loadNames these are guaranteed to not be null so
            // cast them as strings manually.
            dict = this.nameDict;
            index = this.nameIndex;
            maxTrim = 20; // this.config.namax;
            entry.hasNames = true;
            console.log('doNames');
        }
        else {
            dict = this.wordDict;
            index = this.wordIndex;
            maxTrim = this.config.maxDictEntries;
        }
        if (max) {
            maxTrim = max;
        }
        entry.data = [];
        while (word.length > 0) {
            const showInf = count !== 0;
            let trys;
            if (doNames) {
                trys = [{ word: word, type: 0xff, reason: null }];
            }
            else {
                trys = this.deinflect(word);
            }
            for (i = 0; i < trys.length; i++) {
                u = trys[i];
                let ix = cache[u.word];
                if (!ix) {
                    const result = this.find(index, u.word + ',');
                    if (!result) {
                        cache[u.word] = [];
                        continue;
                    }
                    // The first value in result is the word itself so skip it
                    // and parse the remaining values at integers.
                    ix = result
                        .split(',')
                        .slice(1)
                        .map((offset) => parseInt(offset));
                    cache[u.word] = ix;
                }
                for (let j = 0; j < ix.length; ++j) {
                    const ofs = ix[j];
                    if (have[ofs]) {
                        continue;
                    }
                    const dentry = dict.substring(ofs, dict.indexOf('\n', ofs));
                    let ok = true;
                    if (i > 0) {
                        // > 0 a de-inflected word
                        // ex:
                        // /(io) (v5r) to finish/to close/
                        // /(v5r) to finish/to close/(P)/
                        // /(aux-v,v1) to begin to/(P)/
                        // /(adj-na,exp,int) thank you/many thanks/
                        // /(adj-i) shrill/
                        let w;
                        const x = dentry.split(/[,()]/);
                        const y = u.type;
                        let z = x.length - 1;
                        if (z > 10) {
                            z = 10;
                        }
                        for (; z >= 0; --z) {
                            w = x[z];
                            if (y & 1 && w === 'v1') {
                                break;
                            }
                            if (y & 4 && w === 'adj-i') {
                                break;
                            }
                            if (y & 2 && w.substr(0, 2) === 'v5') {
                                break;
                            }
                            if (y & 16 && w.substr(0, 3) === 'vs-') {
                                break;
                            }
                            if (y & 8 && w === 'vk') {
                                break;
                            }
                        }
                        ok = z !== -1;
                    }
                    if (ok) {
                        if (count >= maxTrim) {
                            entry.hasMore = true;
                        }
                        have[ofs] = 1;
                        ++count;
                        if (maxLen === 0) {
                            maxLen = trueLen[word.length];
                        }
                        let reason;
                        if (trys[i].reason) {
                            if (showInf) {
                                reason = '&lt; ' + trys[i].reason + ' &lt; ' + word;
                            }
                            else {
                                reason = '&lt; ' + trys[i].reason;
                            }
                        }
                        entry.data.push({ entry: dentry, reason });
                    }
                } // for j < ix.length
                if (count >= maxTrim) {
                    break;
                }
            } // for i < trys.length
            if (count >= maxTrim) {
                break;
            }
            word = word.substr(0, word.length - 1);
        } // while word.length > 0
        if (entry.data.length === 0) {
            return null;
        }
        entry.matchLen = maxLen;
        return entry;
    }
    translate(text) {
        let e;
        const o = { textLen: text.length, ...RcxDict.createDefaultDictEntry() };
        let skip;
        while (text.length > 0) {
            e = this.wordSearch(text, false, 1);
            if (e !== null) {
                if (o.data.length >= this.config.maxDictEntries) {
                    o.hasMore = true;
                    break;
                }
                o.data.push(e.data[0]);
                skip = e.matchLen;
            }
            else {
                skip = 1;
            }
            text = text.substr(skip, text.length - skip);
        }
        if (o.data.length === 0) {
            return null;
        }
        o.textLen -= text.length;
        return o;
    }
    kanjiSearch(kanji) {
        const hex = '0123456789ABCDEF';
        let i;
        i = kanji.charCodeAt(0);
        if (i < 0x3000) {
            return null;
        }
        const kde = this.find(this.kanjiData, kanji);
        if (!kde) {
            return null;
        }
        const a = kde.split('|');
        if (a.length !== 6) {
            return null;
        }
        const entry = RcxDict.createDefaultDictEntry();
        entry.kanji = a[0];
        entry.misc = {};
        entry.misc.U =
            hex[(i >>> 12) & 15] +
                hex[(i >>> 8) & 15] +
                hex[(i >>> 4) & 15] +
                hex[i & 15];
        const b = a[1].split(' ');
        for (i = 0; i < b.length; ++i) {
            if (b[i].match(/^([A-Z]+)(.*)/)) {
                if (!entry.misc[RegExp.$1]) {
                    entry.misc[RegExp.$1] = RegExp.$2;
                }
                else {
                    entry.misc[RegExp.$1] += ' ' + RegExp.$2;
                }
                // Replace ':' delimiter with proper spaces for Heisig keywords.
                if (RegExp.$1.startsWith('L') || RegExp.$1.startsWith('DN')) {
                    entry.misc[RegExp.$1] = entry.misc[RegExp.$1].replace(/[:]/g, ' ');
                }
            }
        }
        entry.onkun = a[2].replace(/\s+/g, '\u3001 ');
        entry.nanori = a[3].replace(/\s+/g, '\u3001 ');
        entry.bushumei = a[4].replace(/\s+/g, '\u3001 ');
        entry.eigo = a[5];
        return entry;
    }
    // TODO: Entry should be extracted as separate type.
    makeHtml(entry) {
        let e;
        let c;
        let s;
        let t;
        let i;
        let j;
        let n;
        if (entry === null) {
            return '';
        }
        const b = [];
        if (entry.kanji) {
            let yomi;
            let box;
            let k;
            let nums;
            yomi = entry.onkun.replace(/\.([^\u3001]+)/g, '<span class="k-yomi-hi">$1</span>');
            if (entry.nanori.length) {
                yomi +=
                    '<br/><span class="k-yomi-ti">\u540D\u4E57\u308A</span> ' +
                        entry.nanori;
            }
            if (entry.bushumei.length) {
                yomi +=
                    '<br/><span class="k-yomi-ti">\u90E8\u9996\u540D</span> ' +
                        entry.bushumei;
            }
            const bn = parseInt(entry.misc.B) - 1;
            k = parseInt(entry.misc.G);
            switch (k) {
                case 8:
                    k = 'general<br/>use';
                    break;
                case 9:
                    k = 'name<br/>use';
                    break;
                default:
                    k = isNaN(k) ? '-' : 'grade<br/>' + k;
                    break;
            }
            box =
                '<table class="k-abox-tb"><tr>' +
                    '<td class="k-abox-r">radical<br/>' +
                    this.radData[bn].charAt(0) +
                    ' ' +
                    (bn + 1) +
                    '</td>' +
                    '<td class="k-abox-g">' +
                    k +
                    '</td>' +
                    '</tr><tr>' +
                    '<td class="k-abox-f">freq<br/>' +
                    (entry.misc.F ? entry.misc.F : '-') +
                    '</td>' +
                    '<td class="k-abox-s">strokes<br/>' +
                    entry.misc.S +
                    '</td>' +
                    '</tr></table>';
            if (this.config.kanjicomponents) {
                k = this.radData[bn].split('\t');
                box +=
                    '<table class="k-bbox-tb">' +
                        '<tr><td class="k-bbox-1a">' +
                        k[0] +
                        '</td>' +
                        '<td class="k-bbox-1b">' +
                        k[2] +
                        '</td>' +
                        '<td class="k-bbox-1b">' +
                        k[3] +
                        '</td></tr>';
                j = 1;
                for (i = 0; i < this.radData.length; ++i) {
                    s = this.radData[i];
                    if (bn !== i && s.indexOf(entry.kanji) !== -1) {
                        k = s.split('\t');
                        c = ' class="k-bbox-' + (j ^= 1);
                        box +=
                            '<tr><td' +
                                c +
                                'a">' +
                                k[0] +
                                '</td>' +
                                '<td' +
                                c +
                                'b">' +
                                k[2] +
                                '</td>' +
                                '<td' +
                                c +
                                'b">' +
                                k[3] +
                                '</td></tr>';
                    }
                }
                box += '</table>';
            }
            nums = '';
            j = 0;
            const kanjiInfo = this.config.kanjiInfo;
            for (const info of kanjiInfo) {
                if (!info.shouldDisplay) {
                    continue;
                }
                c = info.code;
                s = entry.misc[c];
                c = ' class="k-mix-td' + (j ^= 1) + '"';
                nums +=
                    '<tr><td' +
                        c +
                        '>' +
                        info.name +
                        '</td><td' +
                        c +
                        '>' +
                        (s || '-') +
                        '</td></tr>';
            }
            if (nums.length) {
                nums = '<table class="k-mix-tb">' + nums + '</table>';
            }
            b.push('<table class="k-main-tb"><tr><td valign="top">');
            b.push(box);
            b.push('<span class="k-kanji">' + entry.kanji + '</span><br/>');
            b.push('<div class="k-eigo">' + entry.eigo + '</div>');
            b.push('<div class="k-yomi">' + yomi + '</div>');
            b.push('</td></tr><tr><td>' + nums + '</td></tr></table>');
            return b.join('');
        }
        s = t = '';
        if (entry.hasNames) {
            c = [];
            b.push('<div class="w-title">Names Dictionary</div><table class="w-na-tb"><tr><td>');
            for (i = 0; i < entry.data.length; ++i) {
                e = entry.data[i].entry.match(/^(.+?)\s+(?:\[(.*?)\])?\s*\/(.+)\//);
                if (!e) {
                    continue;
                }
                // the next two lines re-process the entries that contain separate
                // search key and spelling due to mixed hiragana/katakana spelling
                const e3 = e[3].match(/^(.+?)\s+(?:\[(.*?)\])?\s*\/(.+)\//);
                if (e3) {
                    e = e3;
                }
                if (s !== e[3]) {
                    c.push(t);
                    t = '';
                }
                if (e[2]) {
                    c.push('<span class="w-kanji">' +
                        e[1] +
                        '</span> &#32; <span class="w-kana">' +
                        e[2] +
                        '</span><br/> ');
                }
                else {
                    c.push('<span class="w-kana">' + e[1] + '</span><br/> ');
                }
                s = e[3];
                console.log('e[1]: ' + e[1]);
                console.log('e[2]: ' + e[2]);
                console.log('e[3]: ' + e[3]);
                t = '<span class="w-def">' + s.replace(/\//g, '; ') + '</span><br/>';
            }
            c.push(t);
            if (c.length > 4) {
                n = (c.length >> 1) + 1;
                b.push(c.slice(0, n + 1).join(''));
                t = c[n];
                c = c.slice(n, c.length);
                for (i = 0; i < c.length; ++i) {
                    if (c[i].indexOf('w-def') !== -1) {
                        if (t !== c[i]) {
                            b.push(c[i]);
                        }
                        if (i === 0) {
                            c.shift();
                        }
                        break;
                    }
                }
                b.push('</td><td>');
                b.push(c.join(''));
            }
            else {
                b.push(c.join(''));
            }
            if (entry.hasMore) {
                b.push('...<br/>');
            }
            b.push('</td></tr></table>');
        }
        else {
            if (entry.title) {
                b.push('<div class="w-title">' + entry.title + '</div>');
            }
            let pK = '';
            let k = undefined;
            if (!entry.index) {
                entry.index = 0;
            }
            if (entry.index !== 0) {
                b.push('<span class="small-info">... (\'j\' for more)</span><br/>');
            }
            for (i = entry.index; i <
                Math.min(this.config.maxDictEntries + entry.index, entry.data.length); ++i) {
                e = entry.data[i].entry.match(/^(.+?)\s+(?:\[(.*?)\])?\s*\/(.+)\//);
                if (!e) {
                    continue;
                }
                /*
                  e[1] = kanji/kana
                  e[2] = kana
                  e[3] = definition
                */
                if (s !== e[3]) {
                    b.push(t);
                    pK = k = '';
                }
                else {
                    k = t.length ? '<br/>' : '';
                }
                if (e[2]) {
                    if (pK === e[1]) {
                        k = '\u3001 <span class="w-kana">' + e[2] + '</span>';
                    }
                    else {
                        k +=
                            '<span class="w-kanji">' +
                                e[1] +
                                '</span> &#32; <span class="w-kana">' +
                                e[2] +
                                '</span>';
                    }
                    pK = e[1];
                }
                else {
                    k += '<span class="w-kana">' + e[1] + '</span>';
                    pK = '';
                }
                b.push(k);
                if (entry.data[i].reason) {
                    b.push(' <span class="w-conj">(' + entry.data[i].reason + ')</span>');
                }
                s = e[3];
                t = s.replace(/\//g, '; ');
                if (!this.config.onlyreading) {
                    t = '<br/><span class="w-def">' + t + '</span><br/>';
                }
                else {
                    t = '<br/>';
                }
            }
            b.push(t);
            if (entry.hasMore &&
                entry.index < entry.data.length - this.config.maxDictEntries) {
                b.push('<span class="small-info">... (\'k\' for more)</span><br/>');
            }
        }
        return b.join('');
    }
    makeHtmlForRuby(entry) {
        let e;
        let s;
        let t;
        let i;
        if (entry === null) {
            return '';
        }
        const b = [];
        s = t = '';
        if (entry.title) {
            b.push('<div class="w-title">' + entry.title + '</div>');
        }
        for (i = 0; i < entry.data.length; ++i) {
            e = entry.data[i].entry.match(/^(.+?)\s+(?:\[(.*?)\])?\s*\/(.+)\//);
            if (!e) {
                continue;
            }
            s = e[3];
            t = s.replace(/\//g, '; ');
            t = '<span class="w-def">' + t + '</span><br/>\n';
        }
        b.push(t);
        return b.join('');
    }
    makeText(entry, max) {
        let e;
        let i;
        let j;
        let t;
        if (entry === null) {
            return '';
        }
        const b = [];
        if (entry.kanji) {
            b.push(entry.kanji + '\n');
            b.push((entry.eigo.length ? entry.eigo : '-') + '\n');
            b.push(entry.onkun.replace(/\.([^\u3001]+)/g, '\uFF08$1\uFF09') + '\n');
            if (entry.nanori.length) {
                b.push('\u540D\u4E57\u308A\t' + entry.nanori + '\n');
            }
            if (entry.bushumei.length) {
                b.push('\u90E8\u9996\u540D\t' + entry.bushumei + '\n');
            }
            for (i = 0; i < this.kanjiInfoLabelList.length; i += 2) {
                e = this.kanjiInfoLabelList[i];
                j = entry.misc[e];
                b.push(this.kanjiInfoLabelList[i + 1].replace('&amp;', '&') +
                    '\t' +
                    (j || '-') +
                    '\n');
            }
        }
        else {
            if (max > entry.data.length) {
                max = entry.data.length;
            }
            for (i = 0; i < max; ++i) {
                e = entry.data[i].entry.match(/^(.+?)\s+(?:\[(.*?)\])?\s*\/(.+)\//);
                if (!e) {
                    continue;
                }
                if (e[2]) {
                    b.push(e[1] + '\t' + e[2]);
                }
                else {
                    b.push(e[1]);
                }
                t = e[3].replace(/\//g, '; ');
                b.push('\t' + t + '\n');
            }
        }
        return b.join('');
    }
}
exports.RcxDict = RcxDict;


/***/ }),

/***/ 159:
/***/ ((__unused_webpack_module, exports) => {


/*

  Rikaikun
  Copyright (C) 2010 Erek Speed
  http://code.google.com/p/rikaikun/

  ---

  Originally based on Rikaichan 1.07
  by Jonathan Zarate
  http://www.polarcloud.com/

  ---

  Originally based on RikaiXUL 0.4 by Todd Rudick
  http://www.rikai.com/
  http://rikaixul.mozdev.org/

  ---

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

  ---

  Please do not change or remove any of the copyrights or links to web pages
  when modifying any of the files. - Jon

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RcxMain = void 0;
class RcxMain {
    constructor(dict, config) {
        this.haveNames = true;
        this.dictCount = 3;
        this.altView = 0;
        this.enabled = 0;
        this.miniHelp = '<span style="font-weight:bold">Rikaikun enabled!</span><br><br>' +
            '<table cellspacing=5>' +
            '<tr><td>A</td><td>Alternate popup location</td></tr>' +
            '<tr><td>Y</td><td>Move popup location down</td></tr>' +
            '<tr><td>C</td><td>Copy to clipboard</td></tr>' +
            '<tr><td>D</td><td>Hide/show definitions</td></tr>' +
            '<tr><td>Shift/Enter&nbsp;&nbsp;</td><td>Switch dictionaries</td></tr>' +
            '<tr><td>B</td><td>Previous character</td></tr>' +
            '<tr><td>M</td><td>Next character</td></tr>' +
            '<tr><td>N</td><td>Next word</td></tr>' +
            '<tr><td>J</td><td>Scroll back definitions</td></tr>' +
            '<tr><td>K</td><td>Scroll forward definitions</td></tr>' +
            '</table>';
        this.kanjiN = 1;
        this.namesN = 2;
        this.showMode = 0;
        this.sameDict = '0';
        this.forceKanji = '1';
        this.defaultDict = '2';
        this.nextDict = '3';
        this.dict = dict;
        this.config = config;
    }
    static create(dict, config) {
        if (!RcxMain.instance) {
            RcxMain.instance = new RcxMain(dict, config);
        }
        return RcxMain.instance;
    }
    // The callback for `onActivated`
    // Just sends a message to the tab to enable itself if it hasn't
    // already
    onTabSelect(tabId) {
        if (tabId === undefined) {
            return;
        }
        this._onTabSelect(tabId);
    }
    _onTabSelect(tabId) {
        if (this.enabled === 1) {
            chrome.tabs.sendMessage(tabId, {
                type: 'enable',
                config: this.config,
            });
        }
    }
    // TODO(melink14): This is only called by `copyToClip`; investigate.
    savePrep(forClipping, entries) {
        let maxEntries = this.config.maxDictEntries;
        let text;
        let i;
        let e;
        const f = entries;
        if (!f || f.length === 0) {
            return null;
        }
        if (forClipping) {
            // save to clipboard
            maxEntries = this.config.maxClipCopyEntries;
        }
        text = '';
        for (i = 0; i < f.length; ++i) {
            e = f[i];
            if (e.kanji) {
                text += this.dict.makeText(e, 1);
            }
            else {
                if (maxEntries <= 0) {
                    continue;
                }
                text += this.dict.makeText(e, maxEntries);
                maxEntries -= e.data.length;
            }
        }
        if (this.config.lineEnding === 'rn') {
            text = text.replace(/\n/g, '\r\n');
        }
        else if (this.config.lineEnding === 'r') {
            text = text.replace(/\n/g, '\r');
        }
        if (this.config.copySeparator !== 'tab') {
            if (this.config.copySeparator === 'comma') {
                return text.replace(/\t/g, ',');
            }
            if (this.config.copySeparator === 'space') {
                return text.replace(/\t/g, ' ');
            }
        }
        return text;
    }
    copyToClip(tab, entries) {
        if ((tab === null || tab === void 0 ? void 0 : tab.id) === undefined) {
            return;
        }
        const text = this.savePrep(true, entries);
        if (text === null) {
            return;
        }
        const copyFunction = function (event) {
            // TODO(https://github.com/w3c/clipboard-apis/issues/64): Remove `!` when spec is fixed
            // and typescript types are updated.
            event.clipboardData.setData('Text', text);
            event.preventDefault();
        };
        document.addEventListener('copy', copyFunction);
        document.execCommand('Copy');
        document.removeEventListener('copy', copyFunction);
        chrome.tabs.sendMessage(tab.id, {
            type: 'showPopup',
            text: 'Copied to clipboard.',
        });
    }
    // Function which enables the inline mode of rikaikun
    // Unlike rikaichan there is no lookup bar so this is the only enable.
    inlineEnable(tabId, mode) {
        // Send message to current tab to add listeners and create stuff
        chrome.tabs.sendMessage(tabId, {
            type: 'enable',
            config: this.config,
        });
        this.enabled = 1;
        if (mode === 1) {
            if (this.config.minihelp) {
                chrome.tabs.sendMessage(tabId, {
                    type: 'showPopup',
                    text: this.miniHelp,
                });
            }
            else {
                chrome.tabs.sendMessage(tabId, {
                    type: 'showPopup',
                    text: 'Rikaikun enabled!',
                });
            }
        }
        chrome.browserAction.setBadgeBackgroundColor({
            color: [255, 0, 0, 255],
        });
        chrome.browserAction.setBadgeText({ text: 'On' });
    }
    // This function disables rikaikun in all tabs.
    inlineDisable() {
        this.enabled = 0;
        chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
        chrome.browserAction.setBadgeText({ text: '' });
        // Send a disable message to all browsers
        chrome.windows.getAll({ populate: true }, (windows) => {
            for (let i = 0; i < windows.length; ++i) {
                const tabs = windows[i].tabs;
                if (tabs === undefined) {
                    continue;
                }
                for (let j = 0; j < tabs.length; ++j) {
                    if (tabs[j].id === undefined) {
                        continue;
                    }
                    chrome.tabs.sendMessage(tabs[j].id, { type: 'disable' });
                }
            }
        });
    }
    inlineToggle(tab) {
        if ((tab === null || tab === void 0 ? void 0 : tab.id) === undefined) {
            return;
        }
        if (this.enabled) {
            this.inlineDisable();
        }
        else {
            this.inlineEnable(tab.id, 1);
        }
    }
    resetDict() {
        this.showMode = 0;
    }
    search(text, dictOption) {
        switch (dictOption) {
            case this.forceKanji:
                return this.dict.kanjiSearch(text.charAt(0));
            case this.defaultDict:
                this.showMode = 0;
                break;
            case this.nextDict:
                this.showMode = (this.showMode + 1) % this.dictCount;
                break;
        }
        const m = this.showMode;
        let e = null;
        do {
            switch (this.showMode) {
                case 0:
                    e = this.dict.wordSearch(text, false);
                    break;
                case this.kanjiN:
                    e = this.dict.kanjiSearch(text.charAt(0));
                    break;
                case this.namesN:
                    e = this.dict.wordSearch(text, true);
                    break;
            }
            if (e) {
                break;
            }
            this.showMode = (this.showMode + 1) % this.dictCount;
        } while (this.showMode !== m);
        return e;
    }
}
exports.RcxMain = RcxMain;
/*
  Useful Japanese unicode ranges but melink14 doesn't know
  what p and x mean.
  2E80 - 2EFF  CJK Radicals Supplement
  2F00 - 2FDF  Kangxi Radicals
  2FF0 - 2FFF  Ideographic Description
p  3000 - 303F CJK Symbols and Punctuation
x  3040 - 309F Hiragana
x  30A0 - 30FF Katakana
  3190 - 319F  Kanbun
  31F0 - 31FF Katakana Phonetic Extensions
  3200 - 32FF Enclosed CJK Letters and Months
  3300 - 33FF CJK Compatibility
x  3400 - 4DBF  CJK Unified Ideographs Extension A
x  4E00 - 9FFF  CJK Unified Ideographs
x  F900 - FAFF  CJK Compatibility Ideographs
p  FF00 - FFEF Halfwidth and Fullwidth Forms
x  FF66 - FF9D  Katakana half-width

*/


/***/ }),

/***/ 935:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tts = void 0;
/** Helper class for Japanese Text To Speech. */
class TTS {
    constructor() {
        this.lastTime = new Date().valueOf();
        this.previousText = null;
    }
    static create() {
        if (!TTS.instance) {
            TTS.instance = new TTS();
        }
        return TTS.instance;
    }
    /** Plays text-to-speech audio for given Japanese text. */
    play(text) {
        const now = new Date().valueOf();
        const limit = this.lastTime + 1000;
        if (text !== this.previousText || now > limit) {
            console.log('tts.speak(' + text + ')');
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance();
            u.text = text;
            u.lang = 'ja-JP';
            window.speechSynthesis.speak(u);
            this.previousText = text;
            this.lastTime = now;
        }
        else {
            console.log('Ignoring ' + text);
        }
    }
}
const tts = TTS.create();
exports.tts = tts;


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const data_1 = __webpack_require__(34);
const rikaichan_1 = __webpack_require__(159);
const configuration_1 = __webpack_require__(444);
const texttospeech_1 = __webpack_require__(935);
/**
 * Returns a promise for fully initialized RcxMain. Async due to config and
 * RcxDict initialization.
 */
async function createRcxMainPromise() {
    const config = await configuration_1.configPromise;
    const dict = await data_1.RcxDict.create(config);
    return rikaichan_1.RcxMain.create(dict, config);
}
const rcxMainPromise = createRcxMainPromise();
chrome.browserAction.onClicked.addListener(async (tab) => {
    const rcxMain = await rcxMainPromise;
    rcxMain.inlineToggle(tab);
});
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const rcxMain = await rcxMainPromise;
    rcxMain.onTabSelect(activeInfo.tabId);
});
chrome.runtime.onMessage.addListener(async (request, sender, response) => {
    const rcxMain = await rcxMainPromise;
    switch (request.type) {
        case 'enable?':
            console.log('enable?');
            if (sender.tab === undefined) {
                throw TypeError('sender.tab is always defined here.');
            }
            rcxMain.onTabSelect(sender.tab.id);
            break;
        case 'xsearch':
            console.log('xsearch');
            response(rcxMain.search(request.text, request.dictOption));
            break;
        case 'resetDict':
            console.log('resetDict');
            rcxMain.resetDict();
            break;
        case 'translate':
            console.log('translate');
            response(rcxMain.dict.translate(request.title));
            break;
        case 'makehtml':
            console.log('makehtml');
            response(rcxMain.dict.makeHtml(request.entry));
            break;
        case 'switchOnlyReading':
            console.log('switchOnlyReading');
            chrome.storage.sync.set({
                onlyreading: !rcxMain.config.onlyreading,
            });
            break;
        case 'copyToClip':
            console.log('copyToClip');
            rcxMain.copyToClip(sender.tab, request.entry);
            break;
        case 'playTTS':
            console.log('playTTS');
            texttospeech_1.tts.play(request.text);
            break;
        default:
            console.log(request);
    }
});
// Clear browser action badge text on first load
// Chrome preserves last state which is usually 'On'
chrome.browserAction.setBadgeText({ text: '' });

})();

