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
    return __webpack_require__(__webpack_require__.s = 22);
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
    22: function(module, exports, __webpack_require__) {
        'use strict';
        var _browser = __webpack_require__(1);
        var _browser2 = _interopRequireDefault(_browser);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        _browser2.default.getCurrentWindow(function(win) {
            var views = _browser2.default.getViews({
                windowId: win.id,
                type: 'tab'
            }), sbURL = _browser2.default.getURL('main.html');
            var closeWindow = false;
            for (var i = 0; i < views.length; i++) {
                if (views[i].location.href.substring(0, sbURL.length) === sbURL) {
                    views[i].showOptionsDialogAndSelectThisTab();
                    closeWindow = true;
                    break;
                }
            }
            if (closeWindow) {
                window.close();
            } else {
                history.replaceState(null, '', sbURL + '#o');
                window.location.reload();
            }
        });
    }
});