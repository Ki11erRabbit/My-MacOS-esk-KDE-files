/* Copyright (c) 2020 Session Buddy - All Rights Reserved */
/* The contents of this file may not be modified, copied, and/or distributed, in whole or in part, without the express permission of the author, reachable at support@sessionbuddy.com */

(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.i = function(value) {
        return value;
    };
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module['default'];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = '';
    return __webpack_require__(__webpack_require__.s = 23);
})({
    0: function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
        var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
        var u = {
            findByPredicate: function findByPredicate(arr, predicate, receiver) {
                var i = u.findIndex(arr, predicate, receiver);
                if (i >= 0) return arr[i];
            },
            findIndex: function findIndex(arr, predicate, receiver) {
                if (arr) {
                    var l = arr.length;
                    for (var i = 0; i < l; i++) {
                        if (predicate.call(receiver, arr[i], i)) {
                            return i;
                        }
                    }
                }
                return -1;
            },
            deepClone: function deepClone(v) {
                var r, i;
                if (u.isArray(v)) {
                    r = new Array(v.length);
                    for (i = 0; i < v.length; i++) {
                        r[i] = u.deepClone(v[i]);
                    }
                } else if (u.isPlainObject(v)) {
                    r = {};
                    for (i in v) {
                        r[i] = u.deepClone(v[i]);
                    }
                } else {
                    return v;
                }
                return r;
            },
            type: function type(o) {
                var r = Object.prototype.toString.call(o);
                return r.slice(r.indexOf(' ') + 1, -1).toLowerCase();
            },
            isObject: function isObject(o) {
                return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && !!o;
            },
            isPlainObject: function isPlainObject(v) {
                return u.isObject(v) && !v.nodeType && v !== v.window && (!v.constructor || v.constructor.prototype.hasOwnProperty('isPrototypeOf'));
            },
            isArray: function isArray(o) {
                return Object.prototype.toString.call(o) === '[object Array]';
            },
            isFunction: function isFunction(o) {
                return Object.prototype.toString.call(o) === '[object Function]';
            },
            isString: function isString(o) {
                return Object.prototype.toString.call(o) === '[object String]';
            },
            isUndefined: function isUndefined(o) {
                return o === void 0;
            },
            isNumber: function isNumber(o) {
                return Object.prototype.toString.call(o) === '[object Number]';
            },
            isNumeric: function isNumeric(o) {
                return !isNaN(parseFloat(o)) && isFinite(o);
            },
            pick: function pick(o, props, boolProps) {
                var i, p, r = {};
                if (props) {
                    for (i = props.length; i--; ) {
                        p = props[i];
                        if (o[p] != null) {
                            r[p] = o[p];
                        }
                    }
                }
                if (boolProps) {
                    for (i = boolProps.length; i--; ) {
                        p = boolProps[i];
                        r[p] = !!o[p];
                    }
                }
                return r;
            },
            find: function find(arr, prop, val) {
                for (var i = arr.length; i--; ) {
                    if (arr[i][prop] === val) {
                        return arr[i];
                    }
                }
            },
            contains: function contains(arr, val) {
                return arr.indexOf(val) > -1;
            },
            move: function move(arr, o, p) {
                if (u.isUndefined(p)) {
                    p = -1;
                }
                arr = arr || [];
                if (u.isUndefined(o)) {
                    return arr;
                }
                var i = arr.indexOf(o);
                if (i > -1) {
                    if (i === p) {
                        return arr;
                    }
                    o = arr.splice(i, 1)[0];
                    if (p < 0) {
                        p = Math.max(arr.length + 1 + p, 0);
                    }
                    arr.splice(p, 0, o);
                }
                return arr;
            },
            compare: function compare(arr1, arr2) {
                if (arr1.length !== arr2.length) return false;
                for (var i = 0; i < arr1.length; i++) {
                    if (arr1[i] !== arr2[i]) return false;
                }
                return true;
            },
            regExEscape: function regExEscape(txt) {
                return txt.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            },
            htmlEncode: function htmlEncode(txt) {
                var el = document.createElement('div');
                el.innerText = txt;
                return el.innerHTML.replace(/ /g, '&nbsp;');
            },
            jsonSafeParse: function jsonSafeParse(txt) {
                if (txt != null && txt !== '') return JSON.parse(txt);
            },
            toCSVField: function toCSVField(txt) {
                return '"' + txt.replace(/\"/g, '""') + '"';
            },
            pluralize: function pluralize(count, singular, plural) {
                if (count === 1) return count + ' ' + singular;
                return count + ' ' + plural;
            },
            stringInterpolate: function stringInterpolate(txt, o) {
                return txt.replace(/{([^{}]+)}/g, function(a, b) {
                    var r = o[b];
                    return u.isString(r) || u.isNumber(r) ? r : a;
                });
            },
            findMatches: function findMatches(txt, re) {
                var matches = void 0;
                txt.replace(re, function(string) {
                    var _ref;
                    if (!matches) matches = [];
                    matches.push({
                        string: string,
                        offset: (_ref = (arguments.length <= 1 ? 0 : arguments.length - 1) - 2 + 1, arguments.length <= _ref ? undefined : arguments[_ref])
                    });
                });
                return matches;
            },
            wrapMatches: function wrapMatches(txt, matches, className) {
                var r = '', cursor = 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var match = _step.value;
                        r += u.htmlEncode(txt.substring(cursor, match.offset)) + '<span class="' + className + '">' + u.htmlEncode(match.string) + '</span>';
                        cursor = match.offset + match.string.length;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                r += u.htmlEncode(txt.substring(cursor));
                return r;
            }
        };
        exports.default = u;
    },
    1: function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
        var _util = __webpack_require__(0);
        var _util2 = _interopRequireDefault(_util);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var BrowserAPI = {
            WINDOW_NONE: chrome.windows.WINDOW_ID_NONE,
            WINDOW_CURRENT: chrome.windows.WINDOW_ID_CURRENT,
            WINDOW_NEW: -100,
            setWindowFocus: function setWindowFocus(wins, focusedWid) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = wins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var win = _step.value;
                        win.focused = win.id === focusedWid;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return wins;
            },
            isAdminTab: function isAdminTab(tab) {
                return tab.url && (tab.url.startsWith('chrome:') || tab.url.startsWith('chrome-devtools:') || BrowserAPI.isBookmarkManagerTab(tab));
            },
            isNewTab: function isNewTab(tab) {
                return /^chrome\:\/\/newtab\/?$/.test(tab.url);
            },
            isBookmarkManagerTab: function isBookmarkManagerTab(tab) {
                return tab.url && (tab.url.startsWith('chrome-extension://eemcgdkfndhakfknompkggombfjjjeno') || tab.url.startsWith('chrome://bookmarks/'));
            },
            compareTabs: function compareTabs(tab1, tab2) {
                return tab1.url === tab2.url && (tab1.selected === tab2.selected || tab1.active === tab2.active) && tab1.pinned === tab2.pinned && tab1.incognito === tab2.incognito;
            },
            getWindow: function getWindow(wid, cb) {
                chrome.windows.get(wid, cb);
            },
            extensionId: function extensionId() {
                return chrome.i18n.getMessage('@@extension_id');
            },
            getWindowAndTabs: function getWindowAndTabs(w, cb) {
                chrome.windows.get(w, {
                    populate: true
                }, cb);
            },
            getAllWindows: function getAllWindows(opts, cb) {
                if (_util2.default.isFunction(opts)) {
                    cb = opts;
                    opts = null;
                }
                chrome.windows.getAll(undefined, opts && opts.rotate ? function(wins) {
                    rotateWins(wins, cb);
                } : cb);
            },
            getAllWindowsAndTabs: function getAllWindowsAndTabs(opts, cb) {
                if (_util2.default.isFunction(opts)) {
                    cb = opts;
                    opts = null;
                }
                chrome.windows.getAll({
                    populate: true
                }, opts && opts.rotate ? function(wins) {
                    rotateWins(wins, cb);
                } : cb);
            },
            getCurrentWindow: function getCurrentWindow(cb) {
                chrome.windows.getCurrent(cb);
            },
            getCurrentWindowAndTabs: function getCurrentWindowAndTabs(cb) {
                if (cb) {
                    chrome.windows.getCurrent({
                        populate: true
                    }, cb);
                }
            },
            focusWindow: function focusWindow(wid, cb) {
                chrome.windows.update(wid, {
                    focused: true
                }, cb);
            },
            activateTab: function activateTab(t, cb) {
                chrome.tabs.update(_util2.default.isObject(t) ? t.id : t, {
                    active: true
                }, cb);
            },
            activateFocusTab: function activateFocusTab(t, cb) {
                BrowserAPI.focusWindow(t.windowId, function() {
                    BrowserAPI.activateTab(t.id, cb);
                });
            },
            findTab: function findTab(q, cb) {
                if (cb) {
                    if (q.id != null) {
                        return chrome.tabs.get(q.id, function(t) {
                            cb(BrowserAPI.matchTab(t, q) ? t : null);
                        });
                    }
                    BrowserAPI.getCurrentWindowAndTabs(function(cwin) {
                        var j, tabs = cwin.tabs;
                        for (j = 0; j < tabs.length; j++) {
                            if (BrowserAPI.matchTab(tabs[j], q)) {
                                return cb(tabs[j]);
                            }
                        }
                        BrowserAPI.getAllWindowsAndTabs(function(wins) {
                            var i;
                            for (i = 0; i < wins.length; i++) {
                                if (wins[i].id !== cwin.id) {
                                    tabs = wins[i].tabs;
                                    for (j = 0; j < tabs.length; j++) {
                                        if (BrowserAPI.matchTab(tabs[j], q)) {
                                            return cb(tabs[j]);
                                        }
                                    }
                                }
                            }
                            cb(null);
                        });
                    });
                }
            },
            matchTab: function matchTab(t, q) {
                if (!t || !q || q.pinned != null && !!q.pinned !== !!t.pinned || q.active != null && !!q.active !== !!t.active || q.incognito != null && !!q.incognito !== !!t.incognito || q.id != null && q.id !== t.id || q.url != null && (t.url == null || q.url.replace(/\/$/, '') !== t.url.replace(/\/$/, ''))) {
                    return false;
                }
                return true;
            },
            navigateTab: function navigateTab(opts, incognitoRejectCb) {
                if (BrowserAPI.isAdminTab(opts) && !BrowserAPI.isNewTab(opts)) {
                    opts.incognito = false;
                }
                chrome.extension.isAllowedIncognitoAccess(function(allow) {
                    if (!allow && !!opts.incognito) {
                        return incognitoRejectCb && incognitoRejectCb();
                    }
                    BrowserAPI.findTab(_util2.default.pick(opts, [ 'id', 'url' ], [ 'pinned', 'incognito' ]), function(t) {
                        if (t) {
                            return BrowserAPI.activateFocusTab(t);
                        }
                        BrowserAPI.getCurrentWindow(function(w) {
                            var newTabOpts = _util2.default.pick(opts, [ 'url' ], [ 'pinned', 'active' ]);
                            if (!!w.incognito === !!opts.incognito) {
                                w.focused = !!opts.focused;
                                return BrowserAPI.openTab(newTabOpts, w);
                            }
                            BrowserAPI.getAllWindows(function(wins) {
                                for (var i = 0; i < wins.length; i++) {
                                    if (!!wins[i].incognito === !!opts.incognito) {
                                        wins[i].focused = !!opts.focused;
                                        return BrowserAPI.openTab(newTabOpts, wins[i]);
                                    }
                                }
                                BrowserAPI.openTab(newTabOpts, {
                                    id: BrowserAPI.WINDOW_NEW,
                                    incognito: !!opts.incognito,
                                    focused: !!opts.focused
                                });
                            });
                        });
                    });
                });
            },
            openTab: function openTab(t, w, cb) {
                var requiresSpecialHandling;
                if (arguments.length < 2 || _util2.default.isFunction(w)) {
                    cb = w;
                    w = t.windowId == null ? BrowserAPI.WINDOW_CURRENT : t.windowId;
                }
                if (_util2.default.isNumber(w)) {
                    if (w === BrowserAPI.WINDOW_NEW) {
                        return BrowserAPI.openTab(t, {
                            id: BrowserAPI.WINDOW_NEW,
                            incognito: !!t.incognito
                        }, cb);
                    }
                    if (w === BrowserAPI.WINDOW_CURRENT) {
                        return BrowserAPI.getCurrentWindow(function(w) {
                            if (chrome.extension.lastError) {
                                console.error('[SB.BrowserAPI.openTab] Unable to get current window');
                                console.error(chrome.extension.lastError.message);
                                return cb && cb();
                            }
                            BrowserAPI.openTab(t, w, cb);
                        });
                    }
                    return BrowserAPI.getWindow(w, function(w) {
                        if (chrome.extension.lastError) {
                            console.error('[SB.BrowserAPI.openTab] Unable to get window');
                            console.error(chrome.extension.lastError.message);
                            return cb && cb();
                        }
                        BrowserAPI.openTab(t, w, cb);
                    });
                }
                if (!w) {
                    console.error('[SB.BrowserAPI.openTab] window not specified');
                    return cb && cb();
                }
                if (w.id === BrowserAPI.WINDOW_NEW) {
                    var wopts = _util2.default.pick(w, [ 'state', 'type' ], [ 'incognito' ]);
                    if (wopts.state === 'minimized') {
                        if (w.focused) {
                            wopts.state = 'normal';
                            wopts.focused = true;
                        }
                    } else {
                        wopts.focused = !!w.focused;
                    }
                    if (wopts.state !== 'minimized' && wopts.state !== 'maximized' && wopts.state !== 'fullscreen') {
                        wopts.left = w.left;
                        wopts.top = w.top;
                        wopts.width = w.width;
                        wopts.height = w.height;
                    }
                    requiresSpecialHandling = wopts.incognito && t.url.startsWith('chrome-extension://');
                    if (!requiresSpecialHandling && t.url != null) {
                        wopts.url = t.url;
                    }
                    return BrowserAPI.openWindow(wopts, function(w) {
                        if (chrome.extension.lastError) {
                            console.error('[SB.BrowserAPI.openTab] Unable to open window');
                            console.error(chrome.extension.lastError.message);
                            return cb && cb();
                        }
                        if (!!t.pinned || requiresSpecialHandling) {
                            var o = {};
                            if (!!t.pinned) {
                                o.pinned = true;
                            }
                            if (requiresSpecialHandling) {
                                o.url = t.url;
                            }
                            return chrome.tabs.update(w.tabs[0].id, o, cb);
                        }
                        cb && cb(w.tabs[0]);
                    });
                }
                var newTabOpts = _util2.default.pick(t, [ 'index' ], [ 'active', 'pinned' ]);
                newTabOpts.windowId = w.id;
                requiresSpecialHandling = w.incognito && t.url.startsWith('chrome-extension://');
                if (!requiresSpecialHandling && t.url != null) {
                    newTabOpts.url = t.url;
                }
                chrome.tabs.create(newTabOpts, function(t2) {
                    if (chrome.extension.lastError) {
                        console.error('[SB.BrowserAPI.openTab] Unable to create tab');
                        console.error(chrome.extension.lastError.message);
                        return cb && cb();
                    }
                    if (!!w.focused) {
                        BrowserAPI.focusWindow(t2.windowId);
                    }
                    if (requiresSpecialHandling) {
                        return chrome.tabs.update(t2.id, {
                            url: t.url
                        }, cb);
                    }
                    cb && cb(t2);
                });
            },
            openWindow: function openWindow(o, cb) {
                chrome.windows.create(o, cb);
            },
            closeTab: function closeTab(id, cb) {
                chrome.tabs.remove(id, cb);
            },
            closeWindow: function closeWindow(id, cb) {
                chrome.windows.remove(id, cb);
            },
            getBackgroundPage: function getBackgroundPage() {
                return chrome.extension.getBackgroundPage();
            },
            getBackgroundAPI: function getBackgroundAPI() {
                var bg = BrowserAPI.getBackgroundPage();
                if (bg) return bg.getAPI && bg.getAPI();
            },
            getURL: function getURL(path) {
                return chrome.extension.getURL(path);
            },
            getViews: function getViews(opts) {
                return chrome.extension.getViews(opts);
            },
            getI18nMessage: function getI18nMessage(m, subs) {
                return chrome.i18n.getMessage(m, subs);
            },
            setBrowserIcon: function setBrowserIcon(inIconFilename19x19, inIconFilename38x38) {
                var p;
                if (inIconFilename38x38) {
                    p = {
                        '19': '/images/logo/' + inIconFilename19x19,
                        '38': '/images/logo/' + inIconFilename38x38
                    };
                } else {
                    p = '/images/logo/' + inIconFilename19x19;
                }
                chrome.browserAction.setIcon({
                    path: p
                });
            }
        };
        function rotateWins(wins, cb) {
            BrowserAPI.getCurrentWindow(function(cWin) {
                var cWinIdx = -1, cWinId = cWin.id;
                if (!wins.length || wins[0].id === cWinId) {
                    return cb(wins);
                }
                var i, arr = [];
                for (i = 0; i < wins.length; i++) {
                    if (cWinIdx === -1 && wins[i].id === cWinId) {
                        cWinIdx = i;
                    }
                    if (cWinIdx > -1) {
                        arr.push(wins[i]);
                    }
                }
                for (i = 0; i < cWinIdx; i++) {
                    arr.push(wins[i]);
                }
                cb(arr);
            });
        }
        exports.default = BrowserAPI;
    },
    2: function(module, exports, __webpack_require__) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
        var _util = __webpack_require__(0);
        var _util2 = _interopRequireDefault(_util);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var du = {
            toggleClass: function toggleClass(el, className, add) {
                el.classList[add ? 'add' : 'remove'](className);
            },
            isEnabled: function isEnabled(el) {
                return el.getAttribute('disabled') === null;
            },
            disable: function disable(el) {
                if (!el) return;
                if (_util2.default.isArray(el)) {
                    return el.forEach(function(el) {
                        return du.disable(el);
                    });
                }
                el.setAttribute('disabled', 'disabled');
            },
            enable: function enable(el) {
                if (!el) return;
                if (_util2.default.isArray(el)) {
                    return el.forEach(function(el) {
                        return du.enable(el);
                    });
                }
                el.removeAttribute('disabled');
            },
            toggleEnable: function toggleEnable(el, enable) {
                if (enable) {
                    du.enable(el);
                } else {
                    du.disable(el);
                }
            },
            selectElementContents: function selectElementContents(el) {
                el.focus();
                var range = document.createRange();
                range.selectNodeContents(el);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            },
            getDevicePixelRatio: function getDevicePixelRatio() {
                return window.devicePixelRatio || 1;
            },
            os: function() {
                var appver = navigator.appVersion;
                return appver.includes('Win') && 'Windows' || appver.includes('Mac') && 'MacOS' || appver.includes('X11') && 'UNIX' || appver.includes('Linux') && 'Linux' || '(unknown)';
            }(),
            makeQueryFunction: function makeQueryFunction(w) {
                w = w || window;
                return function findEl(id, startEl) {
                    if (!id) return;
                    if (!startEl) return w.document.getElementById(id);
                    if (startEl.hasChildNodes()) {
                        var foundEl = void 0;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;
                        try {
                            for (var _iterator = startEl.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var child = _step.value;
                                if (child.id === id) return child;
                                if (foundEl = findEl(id, child)) return foundEl;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                };
            },
            createElement: function createElement(tag, id, styleOrClassName, html) {
                var el = document.createElement(tag);
                if (id) el.id = id;
                if (_util2.default.isString(styleOrClassName)) {
                    if (styleOrClassName.includes(':')) {
                        el.setAttribute('style', styleOrClassName);
                    } else if (styleOrClassName.trim()) {
                        el.className = styleOrClassName;
                    }
                }
                if (_util2.default.isString(html) || _util2.default.isNumber(html)) {
                    el.innerHTML = html;
                }
                return el;
            },
            isChildOf: function isChildOf(el, parent) {
                while (el) {
                    if (el === parent) return true;
                    el = el.parentNode;
                }
                return false;
            },
            isElementInDocument: function isElementInDocument(el, doc) {
                return du.isChildOf(el, doc || document);
            },
            isControlEl: function isControlEl(el) {
                switch (_util2.default.type(el)) {
                  case 'htmlinputelement':
                  case 'htmltextareaelement':
                  case 'htmlselectelement':
                    return true;
                }
                return false;
            },
            initializeControl: function initializeControl(el, val) {
                if (el.type === 'checkbox') {
                    el.checked = val;
                } else if (el.type === 'radio') {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = document.getElementsByName(el.name)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var radio = _step2.value;
                            if (radio.value == val) {
                                radio.checked = true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                } else {
                    el.value = val;
                }
                el.dataset.init = val;
            },
            getControlValue: function getControlValue(el) {
                if (du.isControlEl(el)) {
                    if (el.type === 'checkbox') {
                        return el.checked;
                    } else if (el.type === 'radio') {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;
                        try {
                            for (var _iterator3 = el.ownerDocument.getElementsByName(el.name)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var radio = _step3.value;
                                if (radio.checked) return radio.value;
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    } else {
                        return el.value;
                    }
                }
            },
            getElementMetrics: function getElementMetrics(el, intendedParent) {
                if (el) {
                    if (!intendedParent) {
                        intendedParent = du.isElementInDocument(el) ? el.parentNode : document.body;
                    }
                    intendedParent.appendChild(el = el.cloneNode(true));
                    var savePaddingTop = el.style.paddingTop, savePaddingBottom = el.style.paddingBottom, saveBorderTopWidth = el.style.borderTopWidth, saveBorderBottomWidth = el.style.borderBottomWidth;
                    var totalHeight = el.getBoundingClientRect().height;
                    el.style.paddingTop = '0';
                    var paddingTop = totalHeight - el.getBoundingClientRect().height;
                    el.style.borderTopWidth = '0';
                    var borderTopWidth = totalHeight - el.getBoundingClientRect().height - paddingTop;
                    el.style.paddingBottom = '0';
                    var paddingBottom = totalHeight - el.getBoundingClientRect().height - paddingTop - borderTopWidth;
                    el.style.borderBottomWidth = '0';
                    var borderBottomWidth = totalHeight - el.getBoundingClientRect().height - paddingTop - borderTopWidth - paddingBottom;
                    el.style.paddingTop = savePaddingTop;
                    el.style.paddingBottom = savePaddingBottom;
                    el.style.borderTopWidth = saveBorderTopWidth;
                    el.style.borderBottomWidth = saveBorderBottomWidth;
                    intendedParent.removeChild(el);
                    return {
                        totalHeight: totalHeight,
                        height: totalHeight - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth,
                        paddingTop: paddingTop,
                        paddingBottom: paddingBottom,
                        borderTopWidth: borderTopWidth,
                        borderBottomWidth: borderBottomWidth
                    };
                }
            },
            animLoop: function animLoop(renderFunction, cb) {
                if (renderFunction) {
                    var _loop = function _loop(now) {
                        if (now - lastFrame <= 0 || renderFunction(now - lastFrame)) {
                            window.requestAnimationFrame(_loop);
                            lastFrame = now;
                        } else {
                            cb && cb();
                        }
                    };
                    var lastFrame = +new Date();
                    _loop(lastFrame);
                } else {
                    cb && cb();
                }
            },
            getElementRemovalAnimationFunction: function getElementRemovalAnimationFunction(elArrays, speed, opacityAnim, isLinear, finalCSSClasses, cb) {
                if (elArrays && elArrays.length) {
                    speed = speed || 250;
                    opacityAnim = opacityAnim || 'pop';
                    if (document.webkitHidden) {
                        isLinear = false;
                        opacityAnim = 'none';
                    }
                    var el = void 0, metrics = void 0, elementInfos = [], finalCSSClassesIdx = 0;
                    for (var i = 0; i < elArrays.length; i++) {
                        for (var j = 0; j < elArrays[i].length; j++) {
                            if ((el = elArrays[i][j]) && du.isElementInDocument(el)) {
                                metrics = du.getElementMetrics(el);
                                if (metrics.totalHeight > 0) {
                                    elementInfos.push({
                                        element: el,
                                        height: el.style.height,
                                        paddingTop: el.style.paddingTop,
                                        paddingBottom: el.style.paddingBottom,
                                        borderTopWidth: el.style.borderTopWidth,
                                        borderBottomWidth: el.style.borderBottomWidth,
                                        overflowY: el.style.getPropertyValue('overflow-y'),
                                        opacity: el.style.opacity,
                                        metrics: metrics,
                                        speed: speed / metrics.totalHeight,
                                        totalElementHeight: metrics.totalHeight,
                                        stopAnimation: false
                                    });
                                    if (finalCSSClasses && finalCSSClasses.length) {
                                        elementInfos[elementInfos.length - 1]['finalCssClass'] = finalCSSClasses[finalCSSClassesIdx];
                                        if (finalCSSClassesIdx + 1 < finalCSSClasses.length) {
                                            finalCSSClassesIdx++;
                                        }
                                    }
                                    el.style.setProperty('overflow-y', 'hidden');
                                    el.style.borderTopWidth = metrics.borderTopWidth + 'px';
                                    el.style.borderBottomWidth = metrics.borderBottomWidth + 'px';
                                    el.style.paddingTop = metrics.paddingTop + 'px';
                                    el.style.paddingBottom = metrics.paddingBottom + 'px';
                                    el.style.height = metrics.height + 'px';
                                    if (opacityAnim == 'pop') {
                                        el.classList.add('transitionedInvisibility');
                                    }
                                } else {
                                    el.parentNode.removeChild(el);
                                }
                            }
                        }
                    }
                    if (elementInfos.length) {
                        var stopAnimation_all = true, overallSpeed = 0;
                        if (isLinear) {
                            for (var i = 0; i < elementInfos.length; i++) {
                                overallSpeed += elementInfos[i].metrics.totalHeight;
                            }
                            overallSpeed = speed / overallSpeed;
                        }
                        return function(deltaT) {
                            var adjustment = void 0;
                            if (isLinear) {
                                adjustment = deltaT / overallSpeed;
                            } else {
                                stopAnimation_all = true;
                            }
                            var elementInfo = void 0, style = void 0, adjustmentSurplus = 0;
                            for (var i = 0; i < elementInfos.length; i++) {
                                elementInfo = elementInfos[i];
                                if (!elementInfo.stopAnimation) {
                                    if (!isLinear) {
                                        adjustment = deltaT / elementInfo.speed;
                                    }
                                    adjustment = parseFloat(adjustment.toFixed(10)) + adjustmentSurplus;
                                    elementInfo.totalElementHeight -= adjustment;
                                    style = elementInfo.element.style;
                                    if ((elementInfo.stopAnimation = elementInfo.totalElementHeight <= 0) || document.webkitHidden) {
                                        if (elementInfo.finalCssClass) {
                                            style.height = elementInfo.height;
                                            style.paddingTop = elementInfo.paddingTop;
                                            style.paddingBottom = elementInfo.paddingBottom;
                                            style.borderTopWidth = elementInfo.borderTopWidth;
                                            style.borderBottomWidth = elementInfo.borderBottomWidth;
                                            style.setProperty('overflow-y', elementInfo.overflowY);
                                            style.opacity = elementInfo.opacity;
                                            elementInfo.element.classList.add(elementInfo.finalCssClass);
                                        } else {
                                            elementInfo.element.parentNode.removeChild(elementInfo.element);
                                        }
                                    } else {
                                        if (opacityAnim == 'fade') {
                                            style.opacity = (elementInfo.opacity === '' ? 1 : elementInfo.opacity) * elementInfo.totalElementHeight / elementInfo.metrics.totalHeight;
                                        }
                                        if (adjustment > 0 && parseFloat(style.borderBottomWidth) > 0) {
                                            if (adjustment >= parseFloat(style.borderBottomWidth)) {
                                                adjustment -= parseFloat(style.borderBottomWidth);
                                                style.borderBottomWidth = '0';
                                            } else {
                                                style.borderBottomWidth = parseFloat(style.borderBottomWidth) - adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.paddingBottom) > 0) {
                                            if (adjustment >= parseFloat(style.paddingBottom)) {
                                                adjustment -= parseFloat(style.paddingBottom);
                                                style.paddingBottom = '0';
                                            } else {
                                                style.paddingBottom = parseFloat(style.paddingBottom) - adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.height) > 0) {
                                            if (adjustment >= parseFloat(style.height)) {
                                                adjustment -= parseFloat(style.height);
                                                style.height = '0';
                                            } else {
                                                style.height = parseFloat(style.height) - adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.paddingTop) > 0) {
                                            if (adjustment >= parseFloat(style.paddingTop)) {
                                                adjustment -= parseFloat(style.paddingTop);
                                                style.paddingTop = '0';
                                            } else {
                                                style.paddingTop = parseFloat(style.paddingTop) - adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.borderTopWidth) > 0) {
                                            if (adjustment >= parseFloat(style.borderTopWidth)) {
                                                adjustment -= parseFloat(style.borderTopWidth);
                                                style.borderTopWidth = '0';
                                            } else {
                                                style.borderTopWidth = parseFloat(style.borderTopWidth) - adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        adjustmentSurplus = adjustment;
                                    }
                                    if (isLinear) break;
                                }
                                if (!isLinear) {
                                    stopAnimation_all = stopAnimation_all && elementInfo.stopAnimation;
                                }
                            }
                            if (document.webkitHidden || isLinear && i === elementInfos.length || !isLinear && stopAnimation_all) {
                                cb && cb();
                                return false;
                            }
                        };
                    } else {
                        cb && cb();
                    }
                } else {
                    cb && cb();
                }
            },
            getElementInsertionAnimationFunction: function getElementInsertionAnimationFunction(elArrays, parent, speed, insertBeforeNodes, opacityAnim, isLinear, cb) {
                if (elArrays && elArrays.length && parent) {
                    speed = speed || 150;
                    opacityAnim = opacityAnim || 'pop';
                    if (document.webkitHidden) {
                        isLinear = false;
                        opacityAnim = 'none';
                    }
                    var el = void 0, metrics = void 0, isDOMElement = void 0, elementInfos = [], insertBeforeIndex = 0;
                    for (var i = 0; i < elArrays.length; i++) {
                        for (var j = 0; j < elArrays[i].length; j++) {
                            if (el = elArrays[i][j]) {
                                metrics = du.getElementMetrics(el, parent);
                                isDOMElement = du.isElementInDocument(el);
                                if (metrics.totalHeight > 0) {
                                    elementInfos.push({
                                        element: el,
                                        height: el.style.height,
                                        paddingTop: el.style.paddingTop,
                                        paddingBottom: el.style.paddingBottom,
                                        borderTopWidth: el.style.borderTopWidth,
                                        borderBottomWidth: el.style.borderBottomWidth,
                                        overflowY: el.style.getPropertyValue('overflow-y'),
                                        opacity: el.style.opacity,
                                        metrics: metrics,
                                        speed: speed / metrics.totalHeight,
                                        isDOMElement: isDOMElement,
                                        totalElementHeight: 0,
                                        stopAnimation: false
                                    });
                                    el.style.setProperty('overflow-y', 'hidden');
                                    el.style.height = '0';
                                    el.style.paddingTop = '0';
                                    el.style.paddingBottom = '0';
                                    el.style.borderTopWidth = '0';
                                    el.style.borderBottomWidth = '0';
                                    if (opacityAnim == 'fade' || opacityAnim == 'pop') {
                                        el.style.opacity = '0';
                                    }
                                }
                                if (!isDOMElement) {
                                    if (insertBeforeNodes && insertBeforeNodes.length) {
                                        parent.insertBefore(el, insertBeforeNodes[insertBeforeIndex]);
                                        if (insertBeforeIndex + 1 < insertBeforeNodes.length) {
                                            insertBeforeIndex++;
                                        }
                                    } else {
                                        parent.appendChild(el);
                                    }
                                }
                            }
                        }
                    }
                    if (elementInfos.length) {
                        var stopAnimation_all = true, overallSpeed = 0;
                        if (isLinear) {
                            for (var i = 0; i < elementInfos.length; i++) {
                                overallSpeed += elementInfos[i].metrics.totalHeight;
                            }
                            overallSpeed = speed / overallSpeed;
                        }
                        return function(deltaT) {
                            var adjustment = void 0;
                            if (isLinear) {
                                adjustment = deltaT / overallSpeed;
                            } else {
                                stopAnimation_all = true;
                            }
                            var elementInfo = void 0, style = void 0, adjustmentSurplus = 0;
                            for (var i = 0; i < elementInfos.length; i++) {
                                elementInfo = elementInfos[i];
                                if (!elementInfo.stopAnimation) {
                                    if (!isLinear) {
                                        adjustment = deltaT / elementInfo.speed;
                                    }
                                    adjustment = parseFloat(adjustment.toFixed(10)) + adjustmentSurplus;
                                    elementInfo.totalElementHeight += adjustment;
                                    style = elementInfo.element.style;
                                    if ((elementInfo.stopAnimation = elementInfo.totalElementHeight > elementInfo.metrics.totalHeight) || document.webkitHidden) {
                                        style.height = elementInfo.height;
                                        style.paddingTop = elementInfo.paddingTop;
                                        style.paddingBottom = elementInfo.paddingBottom;
                                        style.borderTopWidth = elementInfo.borderTopWidth;
                                        style.borderBottomWidth = elementInfo.borderBottomWidth;
                                        style.setProperty('overflow-y', elementInfo.overflowY);
                                        style.opacity = elementInfo.opacity;
                                    } else {
                                        if (opacityAnim == 'fade') {
                                            style.opacity = (elementInfo.opacity === '' ? 1 : elementInfo.opacity) * elementInfo.totalElementHeight / elementInfo.metrics.totalHeight;
                                        }
                                        if (adjustment > 0 && parseFloat(style.borderTopWidth) < elementInfo.metrics.borderTopWidth) {
                                            if (adjustment >= elementInfo.metrics.borderTopWidth - parseFloat(style.borderTopWidth)) {
                                                adjustment -= elementInfo.metrics.borderTopWidth - parseFloat(style.borderTopWidth);
                                                style.borderTopWidth = elementInfo.metrics.borderTopWidth + 'px';
                                            } else {
                                                style.borderTopWidth = parseFloat(style.borderTopWidth) + adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.paddingTop) < elementInfo.metrics.paddingTop) {
                                            if (adjustment >= elementInfo.metrics.paddingTop - parseFloat(style.paddingTop)) {
                                                adjustment -= elementInfo.metrics.paddingTop - parseFloat(style.paddingTop);
                                                style.paddingTop = elementInfo.metrics.paddingTop + 'px';
                                            } else {
                                                style.paddingTop = parseFloat(style.paddingTop) + adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.height) < elementInfo.metrics.height) {
                                            if (adjustment >= elementInfo.metrics.height - parseFloat(style.height)) {
                                                adjustment -= elementInfo.metrics.height - parseFloat(style.height);
                                                style.height = elementInfo.metrics.height + 'px';
                                            } else {
                                                style.height = parseFloat(style.height) + adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.paddingBottom) < elementInfo.metrics.paddingBottom) {
                                            if (adjustment >= elementInfo.metrics.paddingBottom - parseFloat(style.paddingBottom)) {
                                                adjustment -= elementInfo.metrics.paddingBottom - parseFloat(style.paddingBottom);
                                                style.paddingBottom = elementInfo.metrics.paddingBottom + 'px';
                                            } else {
                                                style.paddingBottom = parseFloat(style.paddingBottom) + adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        if (adjustment > 0 && parseFloat(style.borderBottomWidth) < elementInfo.metrics.borderBottomWidth) {
                                            if (adjustment >= elementInfo.metrics.borderBottomWidth - parseFloat(style.borderBottomWidth)) {
                                                adjustment -= elementInfo.metrics.borderBottomWidth - parseFloat(style.borderBottomWidth);
                                                style.borderBottomWidth = elementInfo.metrics.borderBottomWidth + 'px';
                                            } else {
                                                style.borderBottomWidth = parseFloat(style.borderBottomWidth) + adjustment + 'px';
                                                adjustment = 0;
                                            }
                                        }
                                        adjustmentSurplus = adjustment;
                                    }
                                    if (isLinear) break;
                                }
                                if (!isLinear) {
                                    stopAnimation_all = stopAnimation_all && elementInfo.stopAnimation;
                                }
                            }
                            if (document.webkitHidden || isLinear && i === elementInfos.length || !isLinear && stopAnimation_all) {
                                cb && cb();
                                return false;
                            }
                        };
                    } else {
                        cb && cb();
                    }
                } else {
                    cb && cb();
                }
            }
        };
        exports.default = du;
    },
    23: function(module, exports, __webpack_require__) {
        'use strict';
        var _domUtil = __webpack_require__(2);
        var _domUtil2 = _interopRequireDefault(_domUtil);
        var _browser = __webpack_require__(1);
        var _browser2 = _interopRequireDefault(_browser);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var bg = _browser2.default.getBackgroundAPI(), q = _domUtil2.default.makeQueryFunction();
        if (bg) {
            var app = bg.getApp();
            var exceptionText = void 0, copyTimer = void 0, faviconFilename = void 0;
            if (_domUtil2.default.getDevicePixelRatio() > 1) {
                faviconFilename = app.applicationException ? 'logo_32x32_err.png' : 'logo_32x32.png';
            } else {
                faviconFilename = app.applicationException ? 'logo_16x16_err.png' : 'logo_16x16.png';
            }
            document.write('<link id="favIcon" rel="icon" href="images/logo/' + faviconFilename + '" />');
            q('refresh').style.display = 'none';
            if (app.applicationException) {
                exceptionText = getApplicationExceptionText(app.applicationException);
                q('body').classList.add('error');
                q('header').classList.add('header_Error');
                q('sbIcon').src = 'images/logo/logo_38x38_err.png';
                q('titleText').textContent = 'Session Buddy seems to have encountered an error' + (bg.isAppReady() ? '' : ' preventing it from starting') + '.';
                q('detailText').textContent = 'To get help with this error, try the following:';
                q('thisBackupDetail').style.display = 'none';
                q('rDetail').style.display = 'none';
                q('thisBackupNoDetail').style.display = 'inline';
                q('copyErrorDetails').style.display = 'block';
                q('composeLink1').href = q('composeLink2').href = 'mailto:support@sessionbuddy.com?subject=Session Buddy Error&body=' + escape('Please include a description of the problem to help us troubleshoot it.\n\n\n------------ Diagnostic Details Follow ------------\n') + escape(exceptionText);
            } else {
                q('titleText').textContent = 'Good news. Session Buddy seems to be running fine.';
                q('detailText').textContent = 'If you ever experience a technical problem with Session Buddy, try the following:';
                q('thisBackupDetail').style.display = 'inline';
                q('rDetail').style.display = 'inline';
                q('thisBackupNoDetail').style.display = 'none';
            }
            if (bg.isAppReady()) {
                app.applicationException = null;
                bg.applyDefaultTheme();
            }
        } else {
            q('tryRefresh').addEventListener('click', function() {
                return window.location.reload();
            });
        }
        function getApplicationExceptionText(appException) {
            var r = '';
            r += getLineItemText('Date', appException ? appException.dateTime : new Date(), r);
            r += getLineItemText('Platform', navigator.platform, r);
            r += getLineItemText('OS', _domUtil2.default.os, r);
            r += getLineItemText('User Agent', navigator.userAgent, r);
            r += getLineItemText('Pixel Ratio', _domUtil2.default.getDevicePixelRatio(), r);
            r += getLineItemText('Language', navigator.language, r);
            r += getLineItemText('SB ID', chrome.app.getDetails().id, r);
            r += getLineItemText('SB Version', chrome.app.getDetails().version, r);
            if (appException) {
                r += getLineItemText('Source', appException.source, r);
                if (appException.exception) {
                    var codeLabel;
                    if (appException.exception.DATABASE_ERR) {
                        r += getLineItemText('Type', 'SQLError', r);
                        if (appException.exception.code) {
                            codeLabel = ' [' + getSQLErrorLabelByCode(appException.exception.code) + ']';
                        }
                    } else if (appException.exception.type) {
                        r += getLineItemText('Type', appException.exception.type, r);
                    }
                    r += getLineItemText('Code', (appException.exception.code || '') + (codeLabel || ''), r);
                    r += getLineItemText('Message', appException.exception.message, r);
                    r += getLineItemText('Name', appException.exception.name, r);
                    r += getLineItemText('Stack', appException.exception.stack, r);
                }
                if (!(appException.exception && appException.exception.stack)) {
                    r += getLineItemText('Stack', appException.trace, r);
                }
                console.log('Application Exception', appException);
            }
            return r;
        }
        function getLineItemText(label, component, includeNewline) {
            if (component) {
                return (includeNewline ? '; \n' : '') + label + ': ' + component;
            }
            return '';
        }
        function getSQLErrorLabelByCode(code) {
            switch (code) {
              case 0:
                return 'UNKNOWN_ERR';

              case 1:
                return 'DATABASE_ERR';

              case 2:
                return 'VERSION_ERR';

              case 3:
                return 'TOO_LARGE_ERR';

              case 4:
                return 'QUOTA_ERR';

              case 5:
                return 'SYNTAX_ERR';

              case 6:
                return 'CONSTRAINT_ERR';

              case 7:
                return 'TIMEOUT_ERR';
            }
            return '(unknown)';
        }
    }
});