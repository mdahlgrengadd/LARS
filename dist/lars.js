(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("lars", [], factory);
	else if(typeof exports === 'object')
		exports["lars"] = factory();
	else
		root["lars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _wavesurfer = __webpack_require__(1);
	
	var _wavesurfer2 = _interopRequireDefault(_wavesurfer);
	
	var _backend = __webpack_require__(3);
	
	var _backend2 = _interopRequireDefault(_backend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Create an instance
	/* eslint-env browser */
	// 'use strict';
	
	var wavesurfer = {};
	
	// Init & load audio file
	document.addEventListener('DOMContentLoaded', function () {
	    var button = document.querySelector('[data-action="play"]');
	
	    wavesurfer = _wavesurfer2.default.create({
	        container: document.querySelector('#waveform'),
	        plugins: [_backend2.default.create()]
	    });
	
	    // Load audio from URL
	    wavesurfer.load('../media/demo.wav');
	
	    button.addEventListener('click', wavesurfer.playPause.bind(wavesurfer));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	 * wavesurfer.js 2.0.0-beta01 (Tue May 02 2017 19:46:40 GMT+0200 (CEST))
	 * https://github.com/katspaugh/wavesurfer.js
	 * @license CC-BY-3.0
	 */
	!function (e, t) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.WaveSurfer = t() : e.WaveSurfer = t();
	}(undefined, function () {
	  return function (e) {
	    function t(r) {
	      if (n[r]) return n[r].exports;var i = n[r] = { i: r, l: !1, exports: {} };return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
	    }var n = {};return t.m = e, t.c = n, t.i = function (e) {
	      return e;
	    }, t.d = function (e, n, r) {
	      t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
	    }, t.n = function (e) {
	      var n = e && e.__esModule ? function () {
	        return e.default;
	      } : function () {
	        return e;
	      };return t.d(n, "a", n), n;
	    }, t.o = function (e, t) {
	      return Object.prototype.hasOwnProperty.call(e, t);
	    }, t.p = "localhost:8080/dist/", t(t.s = 13);
	  }([function (e, t, n) {
	    "use strict";
	    function r(e) {
	      return e && e.__esModule ? e : { default: e };
	    }Object.defineProperty(t, "__esModule", { value: !0 });var i = n(7);Object.defineProperty(t, "ajax", { enumerable: !0, get: function get() {
	        return r(i).default;
	      } });var a = n(9);Object.defineProperty(t, "getId", { enumerable: !0, get: function get() {
	        return r(a).default;
	      } });var s = n(10);Object.defineProperty(t, "max", { enumerable: !0, get: function get() {
	        return r(s).default;
	      } });var o = n(11);Object.defineProperty(t, "min", { enumerable: !0, get: function get() {
	        return r(o).default;
	      } });var u = n(2);Object.defineProperty(t, "Observer", { enumerable: !0, get: function get() {
	        return r(u).default;
	      } });var l = n(8);Object.defineProperty(t, "extend", { enumerable: !0, get: function get() {
	        return r(l).default;
	      } });var c = n(12);Object.defineProperty(t, "style", { enumerable: !0, get: function get() {
	        return r(c).default;
	      } });var h = n(14);Object.defineProperty(t, "debounce", { enumerable: !0, get: function get() {
	        return r(h).default;
	      } });
	  }, function (e, t, n) {
	    "use strict";
	    function r(e, t, n) {
	      return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
	    }function i(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }function a(e, t) {
	      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
	    }function s(e, t) {
	      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	    }Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {
	      function e(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	        }
	      }return function (t, n, r) {
	        return n && e(t.prototype, n), r && e(t, r), t;
	      };
	    }(),
	        u = n(0),
	        l = function (e) {
	      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
	        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	      }return t.default = e, t;
	    }(u),
	        c = "playing",
	        h = "paused",
	        f = "finished",
	        d = function (e) {
	      function t(e) {
	        var n, s;i(this, t);var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return o.audioContext = null, o.offlineAudioContext = null, o.stateBehaviors = (n = {}, r(n, c, { init: function init() {
	            this.addOnAudioProcess();
	          }, getPlayedPercents: function getPlayedPercents() {
	            var e = this.getDuration();return this.getCurrentTime() / e || 0;
	          }, getCurrentTime: function getCurrentTime() {
	            return this.startPosition + this.getPlayedTime();
	          } }), r(n, h, { init: function init() {
	            this.removeOnAudioProcess();
	          }, getPlayedPercents: function getPlayedPercents() {
	            var e = this.getDuration();return this.getCurrentTime() / e || 0;
	          }, getCurrentTime: function getCurrentTime() {
	            return this.startPosition;
	          } }), r(n, f, { init: function init() {
	            this.removeOnAudioProcess(), this.fireEvent("finish");
	          }, getPlayedPercents: function getPlayedPercents() {
	            return 1;
	          }, getCurrentTime: function getCurrentTime() {
	            return this.getDuration();
	          } }), n), o.params = e, o.ac = e.audioContext || o.getAudioContext(), o.lastPlay = o.ac.currentTime, o.startPosition = 0, o.scheduledPause = null, o.states = (s = {}, r(s, c, Object.create(o.stateBehaviors[c])), r(s, h, Object.create(o.stateBehaviors[h])), r(s, f, Object.create(o.stateBehaviors[f])), s), o.analyser = null, o.buffer = null, o.filters = [], o.gainNode = null, o.mergedPeaks = null, o.offlineAc = null, o.peaks = null, o.playbackRate = 1, o.analyser = null, o.scriptNode = null, o.source = null, o.splitPeaks = [], o.state = null, o;
	      }return s(t, e), o(t, [{ key: "supportsWebAudio", value: function value() {
	          return !(!window.AudioContext && !window.webkitAudioContext);
	        } }, { key: "getAudioContext", value: function value() {
	          return window.WaveSurferAudioContext || (window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)()), window.WaveSurferAudioContext;
	        } }, { key: "getOfflineAudioContext", value: function value(e) {
	          return window.WaveSurferOfflineAudioContext || (window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, e)), window.WaveSurferOfflineAudioContext;
	        } }]), o(t, [{ key: "init", value: function value() {
	          this.createVolumeNode(), this.createScriptNode(), this.createAnalyserNode(), this.setState(h), this.setPlaybackRate(this.params.audioRate), this.setLength(0);
	        } }, { key: "disconnectFilters", value: function value() {
	          this.filters && (this.filters.forEach(function (e) {
	            e && e.disconnect();
	          }), this.filters = null, this.analyser.connect(this.gainNode));
	        } }, { key: "setState", value: function value(e) {
	          this.state !== this.states[e] && (this.state = this.states[e], this.state.init.call(this));
	        } }, { key: "setFilter", value: function value() {
	          for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {
	            t[n] = arguments[n];
	          }this.setFilters(t);
	        } }, { key: "setFilters", value: function value(e) {
	          this.disconnectFilters(), e && e.length && (this.filters = e, this.analyser.disconnect(), e.reduce(function (e, t) {
	            return e.connect(t), t;
	          }, this.analyser).connect(this.gainNode));
	        } }, { key: "createScriptNode", value: function value() {
	          this.ac.createScriptProcessor ? this.scriptNode = this.ac.createScriptProcessor(this.scriptBufferSize) : this.scriptNode = this.ac.createJavaScriptNode(this.scriptBufferSize), this.scriptNode.connect(this.ac.destination);
	        } }, { key: "addOnAudioProcess", value: function value() {
	          var e = this;this.scriptNode.onaudioprocess = function () {
	            var t = e.getCurrentTime();t >= e.getDuration() ? (e.setState(f), e.fireEvent("pause")) : t >= e.scheduledPause ? e.pause() : e.state === e.states[c] && e.fireEvent("audioprocess", t);
	          };
	        } }, { key: "removeOnAudioProcess", value: function value() {
	          this.scriptNode.onaudioprocess = null;
	        } }, { key: "createAnalyserNode", value: function value() {
	          this.analyser = this.ac.createAnalyser(), this.analyser.connect(this.gainNode);
	        } }, { key: "createVolumeNode", value: function value() {
	          this.ac.createGain ? this.gainNode = this.ac.createGain() : this.gainNode = this.ac.createGainNode(), this.gainNode.connect(this.ac.destination);
	        } }, { key: "setVolume", value: function value(e) {
	          this.gainNode.gain.value = e;
	        } }, { key: "getVolume", value: function value() {
	          return this.gainNode.gain.value;
	        } }, { key: "decodeArrayBuffer", value: function value(e, t, n) {
	          this.offlineAc || (this.offlineAc = this.getOfflineAudioContext(this.ac ? this.ac.sampleRate : 44100)), this.offlineAc.decodeAudioData(e, function (e) {
	            return t(e);
	          }, n);
	        } }, { key: "setPeaks", value: function value(e) {
	          this.peaks = e;
	        } }, { key: "setLength", value: function value(e) {
	          if (!this.mergedPeaks || e != 2 * this.mergedPeaks.length - 1 + 2) {
	            this.splitPeaks = [], this.mergedPeaks = [];var t = this.buffer ? this.buffer.numberOfChannels : 1,
	                n = void 0;for (n = 0; n < t; n++) {
	              this.splitPeaks[n] = [], this.splitPeaks[n][2 * (e - 1)] = 0, this.splitPeaks[n][2 * (e - 1) + 1] = 0;
	            }this.mergedPeaks[2 * (e - 1)] = 0, this.mergedPeaks[2 * (e - 1) + 1] = 0;
	          }
	        } }, { key: "getPeaks", value: function value(e, t, n) {
	          if (this.peaks) return this.peaks;this.setLength(e);var r = this.buffer.length / e,
	              i = ~~(r / 10) || 1,
	              a = this.buffer.numberOfChannels,
	              s = void 0;for (s = 0; s < a; s++) {
	            var o = this.splitPeaks[s],
	                u = this.buffer.getChannelData(s),
	                l = void 0;for (l = t; l <= n; l++) {
	              var c = ~~(l * r),
	                  h = ~~(c + r),
	                  f = 0,
	                  d = 0,
	                  p = void 0;for (p = c; p < h; p += i) {
	                var v = u[p];v > d && (d = v), v < f && (f = v);
	              }o[2 * l] = d, o[2 * l + 1] = f, (0 == s || d > this.mergedPeaks[2 * l]) && (this.mergedPeaks[2 * l] = d), (0 == s || f < this.mergedPeaks[2 * l + 1]) && (this.mergedPeaks[2 * l + 1] = f);
	            }
	          }return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
	        } }, { key: "getPlayedPercents", value: function value() {
	          return this.state.getPlayedPercents.call(this);
	        } }, { key: "disconnectSource", value: function value() {
	          this.source && this.source.disconnect();
	        } }, { key: "destroy", value: function value() {
	          this.isPaused() || this.pause(), this.unAll(), this.buffer = null, this.disconnectFilters(), this.disconnectSource(), this.gainNode.disconnect(), this.scriptNode.disconnect(), this.analyser.disconnect(), this.params.closeAudioContext && ("function" == typeof this.ac.close && this.ac.close(), this.ac = null, this.params.audioContext ? this.params.audioContext = null : window.WaveSurferAudioContext = null, window.WaveSurferOfflineAudioContext = null);
	        } }, { key: "load", value: function value(e) {
	          this.startPosition = 0, this.lastPlay = this.ac.currentTime, this.buffer = e, this.createSource();
	        } }, { key: "createSource", value: function value() {
	          this.disconnectSource(), this.source = this.ac.createBufferSource(), this.source.start = this.source.start || this.source.noteGrainOn, this.source.stop = this.source.stop || this.source.noteOff, this.source.playbackRate.value = this.playbackRate, this.source.buffer = this.buffer, this.source.connect(this.analyser);
	        } }, { key: "isPaused", value: function value() {
	          return this.state !== this.states[c];
	        } }, { key: "getDuration", value: function value() {
	          return this.buffer ? this.buffer.duration : 0;
	        } }, { key: "seekTo", value: function value(e, t) {
	          if (this.buffer) return this.scheduledPause = null, null == e && (e = this.getCurrentTime()) >= this.getDuration() && (e = 0), null == t && (t = this.getDuration()), this.startPosition = e, this.lastPlay = this.ac.currentTime, this.state === this.states[f] && this.setState(h), { start: e, end: t };
	        } }, { key: "getPlayedTime", value: function value() {
	          return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
	        } }, { key: "play", value: function value(e, t) {
	          if (this.buffer) {
	            this.createSource();var n = this.seekTo(e, t);e = n.start, t = n.end, this.scheduledPause = t, this.source.start(0, e, t - e), "suspended" == this.ac.state && this.ac.resume && this.ac.resume(), this.setState(c), this.fireEvent("play");
	          }
	        } }, { key: "pause", value: function value() {
	          this.scheduledPause = null, this.startPosition += this.getPlayedTime(), this.source && this.source.stop(0), this.setState(h), this.fireEvent("pause");
	        } }, { key: "getCurrentTime", value: function value() {
	          return this.state.getCurrentTime.call(this);
	        } }, { key: "getPlaybackRate", value: function value() {
	          return this.playbackRate;
	        } }, { key: "setPlaybackRate", value: function value(e) {
	          e = e || 1, this.isPaused() ? this.playbackRate = e : (this.pause(), this.playbackRate = e, this.play());
	        } }]), t;
	    }(l.Observer);d.scriptBufferSize = 256, t.default = d, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
	      function e(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	        }
	      }return function (t, n, r) {
	        return n && e(t.prototype, n), r && e(t, r), t;
	      };
	    }(),
	        a = function () {
	      function e() {
	        r(this, e), this.handlers = null;
	      }return i(e, [{ key: "on", value: function value(e, t) {
	          var n = this;this.handlers || (this.handlers = {});var r = this.handlers[e];return r || (r = this.handlers[e] = []), r.push(t), { name: e, callback: t, un: function un(e, t) {
	              return n.un(e, t);
	            } };
	        } }, { key: "un", value: function value(e, t) {
	          if (this.handlers) {
	            var n = this.handlers[e],
	                r = void 0;if (n) if (t) for (r = n.length - 1; r >= 0; r--) {
	              n[r] == t && n.splice(r, 1);
	            } else n.length = 0;
	          }
	        } }, { key: "unAll", value: function value() {
	          this.handlers = null;
	        } }, { key: "once", value: function value(e, t) {
	          var n = this,
	              r = function r() {
	            for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) {
	              a[s] = arguments[s];
	            }t.apply(n, a), setTimeout(function () {
	              n.un(e, r);
	            }, 0);
	          };return this.on(e, r);
	        } }, { key: "fireEvent", value: function value(e) {
	          for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
	            n[r - 1] = arguments[r];
	          }if (this.handlers) {
	            var i = this.handlers[e];i && i.forEach(function (e) {
	              e.apply(void 0, n);
	            });
	          }
	        } }]), e;
	    }();t.default = a, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }function i(e, t) {
	      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
	    }function a(e, t) {
	      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	    }Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {
	      function e(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	        }
	      }return function (t, n, r) {
	        return n && e(t.prototype, n), r && e(t, r), t;
	      };
	    }(),
	        o = n(6),
	        u = function (e) {
	      return e && e.__esModule ? e : { default: e };
	    }(o),
	        l = n(0),
	        c = function (e) {
	      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
	        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	      }return t.default = e, t;
	    }(l),
	        h = function (e) {
	      function t(e, n) {
	        r(this, t);var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));return a.maxCanvasWidth = n.maxCanvasWidth, a.maxCanvasElementWidth = Math.round(n.maxCanvasWidth / n.pixelRatio), a.hasProgressCanvas = n.waveColor != n.progressColor, a.halfPixel = .5 / n.pixelRatio, a.canvases = [], a.progressWave = null, a;
	      }return a(t, e), s(t, [{ key: "init", value: function value() {
	          this.createWrapper(), this.createElements();
	        } }, { key: "createElements", value: function value() {
	          this.progressWave = this.wrapper.appendChild(this.style(document.createElement("wave"), { position: "absolute", zIndex: 2, left: 0, top: 0, bottom: 0, overflow: "hidden", width: "0", display: "none", boxSizing: "border-box", borderRightStyle: "solid", borderRightWidth: this.params.cursorWidth + "px", borderRightColor: this.params.cursorColor })), this.addCanvas();
	        } }, { key: "updateSize", value: function value() {
	          for (var e = this, t = Math.round(this.width / this.params.pixelRatio), n = Math.ceil(t / this.maxCanvasElementWidth); this.canvases.length < n;) {
	            this.addCanvas();
	          }for (; this.canvases.length > n;) {
	            this.removeCanvas();
	          }this.canvases.forEach(function (t, n) {
	            var r = e.maxCanvasWidth + 2 * Math.ceil(e.params.pixelRatio / 2);n == e.canvases.length - 1 && (r = e.width - e.maxCanvasWidth * (e.canvases.length - 1)), e.updateDimensions(t, r, e.height), e.clearWaveForEntry(t);
	          });
	        } }, { key: "addCanvas", value: function value() {
	          var e = {},
	              t = this.maxCanvasElementWidth * this.canvases.length;e.wave = this.wrapper.appendChild(this.style(document.createElement("canvas"), { position: "absolute", zIndex: 1, left: t + "px", top: 0, bottom: 0 })), e.waveCtx = e.wave.getContext("2d"), this.hasProgressCanvas && (e.progress = this.progressWave.appendChild(this.style(document.createElement("canvas"), { position: "absolute", left: t + "px", top: 0, bottom: 0 })), e.progressCtx = e.progress.getContext("2d")), this.canvases.push(e);
	        } }, { key: "removeCanvas", value: function value() {
	          var e = this.canvases.pop();e.wave.parentElement.removeChild(e.wave), this.hasProgressCanvas && e.progress.parentElement.removeChild(e.progress);
	        } }, { key: "updateDimensions", value: function value(e, t, n) {
	          var r = Math.round(t / this.params.pixelRatio),
	              i = Math.round(this.width / this.params.pixelRatio);e.start = e.waveCtx.canvas.offsetLeft / i || 0, e.end = e.start + r / i, e.waveCtx.canvas.width = t, e.waveCtx.canvas.height = n, this.style(e.waveCtx.canvas, { width: r + "px" }), this.style(this.progressWave, { display: "block" }), this.hasProgressCanvas && (e.progressCtx.canvas.width = t, e.progressCtx.canvas.height = n, this.style(e.progressCtx.canvas, { width: r + "px" }));
	        } }, { key: "clearWave", value: function value() {
	          var e = this;this.canvases.forEach(function (t) {
	            return e.clearWaveForEntry(t);
	          });
	        } }, { key: "clearWaveForEntry", value: function value(e) {
	          e.waveCtx.clearRect(0, 0, e.waveCtx.canvas.width, e.waveCtx.canvas.height), this.hasProgressCanvas && e.progressCtx.clearRect(0, 0, e.progressCtx.canvas.width, e.progressCtx.canvas.height);
	        } }, { key: "drawBars", value: function value(e, t, n, r) {
	          var i = this;if (e[0] instanceof Array) {
	            var a = e;if (this.params.splitChannels) return this.setHeight(a.length * this.params.height * this.params.pixelRatio), void a.forEach(function (e, t) {
	              return i.drawBars(e, t, n, r);
	            });e = a[0];
	          }var s = [].some.call(e, function (e) {
	            return e < 0;
	          }),
	              o = s ? 2 : 1,
	              u = this.width,
	              l = this.params.height * this.params.pixelRatio,
	              h = l * t || 0,
	              f = l / 2,
	              d = e.length / o,
	              p = this.params.barWidth * this.params.pixelRatio,
	              v = Math.max(this.params.pixelRatio, ~~(p / 2)),
	              y = p + v,
	              m = 1;if (this.params.normalize) {
	            var k = c.max(e),
	                g = c.min(e);m = -g > k ? -g : k;
	          }var b = d / u,
	              w = void 0;for (w = n / b; w < r / b; w += y) {
	            var P = e[Math.floor(w * b * o)] || 0,
	                C = Math.round(P / m * f);this.fillRect(w + this.halfPixel, f - C + h, p + this.halfPixel, 2 * C);
	          }
	        } }, { key: "drawWave", value: function value(e, t, n, r) {
	          var i = this;if (e[0] instanceof Array) {
	            var a = e;if (this.params.splitChannels) return this.setHeight(a.length * this.params.height * this.params.pixelRatio), void a.forEach(function (e, t) {
	              return i.drawWave(e, t, n, r);
	            });e = a[0];
	          }if (![].some.call(e, function (e) {
	            return e < 0;
	          })) {
	            var s = [],
	                o = e.length,
	                u = void 0;for (u = 0; u < o; u++) {
	              s[2 * u] = e[u], s[2 * u + 1] = -e[u];
	            }e = s;
	          }var l = this.params.height * this.params.pixelRatio,
	              h = l * t || 0,
	              f = l / 2,
	              d = 1;if (this.params.normalize) {
	            var p = c.max(e),
	                v = c.min(e);d = -v > p ? -v : p;
	          }this.drawLine(e, d, f, h, n, r), this.fillRect(0, f + h - this.halfPixel, this.width, this.halfPixel);
	        } }, { key: "drawLine", value: function value(e, t, n, r, i, a) {
	          var s = this;this.canvases.forEach(function (o) {
	            s.setFillStyles(o), s.drawLineToContext(o, o.waveCtx, e, t, n, r, i, a), s.drawLineToContext(o, o.progressCtx, e, t, n, r, i, a);
	          });
	        } }, { key: "drawLineToContext", value: function value(e, t, n, r, i, a, s, o) {
	          if (t) {
	            var u = n.length / 2,
	                l = 1;this.params.fillParent && this.width != u && (l = this.width / u);var c = Math.round(u * e.start),
	                h = Math.round(u * e.end);if (!(c > o || h < s)) {
	              var f = Math.max(c, s),
	                  d = Math.min(h, o),
	                  p = void 0,
	                  v = void 0;for (t.beginPath(), t.moveTo((f - c) * l + this.halfPixel, i + a), p = f; p < d; p++) {
	                var y = n[2 * p] || 0,
	                    m = Math.round(y / r * i);t.lineTo((p - c) * l + this.halfPixel, i - m + a);
	              }for (v = d - 1; v >= f; v--) {
	                var k = n[2 * v + 1] || 0,
	                    g = Math.round(k / r * i);t.lineTo((v - c) * l + this.halfPixel, i - g + a);
	              }t.closePath(), t.fill();
	            }
	          }
	        } }, { key: "fillRect", value: function value(e, t, n, r) {
	          var i = Math.floor(e / this.maxCanvasWidth),
	              a = Math.min(Math.ceil((e + n) / this.maxCanvasWidth) + 1, this.canvases.length),
	              s = void 0;for (s = i; s < a; s++) {
	            var o = this.canvases[s],
	                u = s * this.maxCanvasWidth,
	                l = { x1: Math.max(e, s * this.maxCanvasWidth), y1: t, x2: Math.min(e + n, s * this.maxCanvasWidth + o.waveCtx.canvas.width), y2: t + r };l.x1 < l.x2 && (this.setFillStyles(o), this.fillRectToContext(o.waveCtx, l.x1 - u, l.y1, l.x2 - l.x1, l.y2 - l.y1), this.fillRectToContext(o.progressCtx, l.x1 - u, l.y1, l.x2 - l.x1, l.y2 - l.y1));
	          }
	        } }, { key: "fillRectToContext", value: function value(e, t, n, r, i) {
	          e && e.fillRect(t, n, r, i);
	        } }, { key: "setFillStyles", value: function value(e) {
	          e.waveCtx.fillStyle = this.params.waveColor, this.hasProgressCanvas && (e.progressCtx.fillStyle = this.params.progressColor);
	        } }, { key: "getImage", value: function value(e, t) {
	          var n = this.canvases.map(function (n) {
	            return n.wave.toDataURL(e, t);
	          });return n.length > 1 ? n : n[0];
	        } }, { key: "updateProgress", value: function value(e) {
	          this.style(this.progressWave, { width: e + "px" });
	        } }]), t;
	    }(u.default);t.default = h, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }function i(e, t) {
	      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
	    }function a(e, t) {
	      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	    }Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {
	      function e(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	        }
	      }return function (t, n, r) {
	        return n && e(t.prototype, n), r && e(t, r), t;
	      };
	    }(),
	        o = function e(t, n, r) {
	      null === t && (t = Function.prototype);var i = Object.getOwnPropertyDescriptor(t, n);if (void 0 === i) {
	        var a = Object.getPrototypeOf(t);return null === a ? void 0 : e(a, n, r);
	      }if ("value" in i) return i.value;var s = i.get;if (void 0 !== s) return s.call(r);
	    },
	        u = n(1),
	        l = function (e) {
	      return e && e.__esModule ? e : { default: e };
	    }(u),
	        c = n(0),
	        h = (function (e) {
	      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
	        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	      }t.default = e;
	    }(c), function (e) {
	      function t(e) {
	        r(this, t);var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));return n.params = e, n.media = { currentTime: 0, duration: 0, paused: !0, playbackRate: 1, play: function play() {}, pause: function pause() {} }, n.mediaType = e.mediaType.toLowerCase(), n.elementPosition = e.elementPosition, n.peaks = null, n.playbackRate = 1, n.buffer = null, n.onPlayEnd = null, n;
	      }return a(t, e), s(t, [{ key: "init", value: function value() {
	          this.setPlaybackRate(this.params.audioRate), this.createTimer();
	        } }, { key: "createTimer", value: function value() {
	          var e = this,
	              t = function t() {
	            if (!e.isPaused()) {
	              e.fireEvent("audioprocess", e.getCurrentTime());(window.requestAnimationFrame || window.webkitRequestAnimationFrame)(t);
	            }
	          };this.on("play", t);
	        } }, { key: "load", value: function value(e, t, n, r) {
	          var i = document.createElement(this.mediaType);i.controls = this.params.mediaControls, i.autoplay = this.params.autoplay || !1, i.preload = null == r ? "auto" : r, i.src = e, i.style.width = "100%";var a = t.querySelector(this.mediaType);a && t.removeChild(a), t.appendChild(i), this._load(i, n);
	        } }, { key: "loadElt", value: function value(e, t) {
	          e.controls = this.params.mediaControls, e.autoplay = this.params.autoplay || !1, this._load(e, t);
	        } }, { key: "_load", value: function value(e, t) {
	          var n = this;"function" == typeof e.load && e.load(), e.addEventListener("error", function () {
	            n.fireEvent("error", "Error loading media element");
	          }), e.addEventListener("canplay", function () {
	            n.fireEvent("canplay");
	          }), e.addEventListener("ended", function () {
	            n.fireEvent("finish");
	          }), this.media = e, this.peaks = t, this.onPlayEnd = null, this.buffer = null, this.setPlaybackRate(this.playbackRate);
	        } }, { key: "isPaused", value: function value() {
	          return !this.media || this.media.paused;
	        } }, { key: "getDuration", value: function value() {
	          var e = (this.buffer || this.media).duration;return e >= 1 / 0 && (e = this.media.seekable.end(0)), e;
	        } }, { key: "getCurrentTime", value: function value() {
	          return this.media && this.media.currentTime;
	        } }, { key: "getPlayedPercents", value: function value() {
	          return this.getCurrentTime() / this.getDuration() || 0;
	        } }, { key: "setPlaybackRate", value: function value(e) {
	          this.playbackRate = e || 1, this.media.playbackRate = this.playbackRate;
	        } }, { key: "seekTo", value: function value(e) {
	          null != e && (this.media.currentTime = e), this.clearPlayEnd();
	        } }, { key: "play", value: function value(e, t) {
	          this.seekTo(e), this.media.play(), t && this.setPlayEnd(t), this.fireEvent("play");
	        } }, { key: "pause", value: function value() {
	          this.media && this.media.pause(), this.clearPlayEnd(), this.fireEvent("pause");
	        } }, { key: "setPlayEnd", value: function value(e) {
	          var t = this;this._onPlayEnd = function (n) {
	            n >= e && (t.pause(), t.seekTo(e));
	          }, this.on("audioprocess", this._onPlayEnd);
	        } }, { key: "clearPlayEnd", value: function value() {
	          this._onPlayEnd && (this.un("audioprocess", this._onPlayEnd), this._onPlayEnd = null);
	        } }, { key: "getPeaks", value: function value(e, n, r) {
	          return this.buffer ? o(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "getPeaks", this).call(this, e, n, r) : this.peaks || [];
	        } }, { key: "getVolume", value: function value() {
	          return this.media.volume;
	        } }, { key: "setVolume", value: function value(e) {
	          this.media.volume = e;
	        } }, { key: "destroy", value: function value() {
	          this.pause(), this.unAll(), this.media && this.media.parentNode && this.media.parentNode.removeChild(this.media), this.media = null;
	        } }]), t;
	    }(l.default));t.default = h, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
	      function e(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	        }
	      }return function (t, n, r) {
	        return n && e(t.prototype, n), r && e(t, r), t;
	      };
	    }(),
	        a = function () {
	      function e() {
	        r(this, e), this.clearPeakCache();
	      }return i(e, [{ key: "clearPeakCache", value: function value() {
	          this.peakCacheRanges = [], this.peakCacheLength = -1;
	        } }, { key: "addRangeToPeakCache", value: function value(e, t, n) {
	          e != this.peakCacheLength && (this.clearPeakCache(), this.peakCacheLength = e);for (var r = [], i = 0; i < this.peakCacheRanges.length && this.peakCacheRanges[i] < t;) {
	            i++;
	          }for (i % 2 == 0 && r.push(t); i < this.peakCacheRanges.length && this.peakCacheRanges[i] <= n;) {
	            r.push(this.peakCacheRanges[i]), i++;
	          }i % 2 == 0 && r.push(n), r = r.filter(function (e, t, n) {
	            return 0 == t ? e != n[t + 1] : t == n.length - 1 ? e != n[t - 1] : e != n[t - 1] && e != n[t + 1];
	          }), this.peakCacheRanges = this.peakCacheRanges.concat(r), this.peakCacheRanges = this.peakCacheRanges.sort(function (e, t) {
	            return e - t;
	          }).filter(function (e, t, n) {
	            return 0 == t ? e != n[t + 1] : t == n.length - 1 ? e != n[t - 1] : e != n[t - 1] && e != n[t + 1];
	          });var a = [];for (i = 0; i < r.length; i += 2) {
	            a.push([r[i], r[i + 1]]);
	          }return a;
	        } }, { key: "getCacheRanges", value: function value() {
	          var e = [],
	              t = void 0;for (t = 0; t < this.peakCacheRanges.length; t += 2) {
	            e.push([this.peakCacheRanges[t], this.peakCacheRanges[t + 1]]);
	          }return e;
	        } }]), e;
	    }();t.default = a, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }function i(e, t) {
	      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
	    }function a(e, t) {
	      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	    }Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {
	      function e(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	        }
	      }return function (t, n, r) {
	        return n && e(t.prototype, n), r && e(t, r), t;
	      };
	    }(),
	        o = n(0),
	        u = function (e) {
	      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
	        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	      }return t.default = e, t;
	    }(o),
	        l = function (e) {
	      function t(e, n) {
	        r(this, t);var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return a.container = e, a.params = n, a.width = 0, a.height = n.height * a.params.pixelRatio, a.lastPos = 0, a.wrapper = null, a;
	      }return a(t, e), s(t, [{ key: "style", value: function value(e, t) {
	          return u.style(e, t);
	        } }, { key: "createWrapper", value: function value() {
	          this.wrapper = this.container.appendChild(document.createElement("wave")), this.style(this.wrapper, { display: "block", position: "relative", userSelect: "none", webkitUserSelect: "none", height: this.params.height + "px" }), (this.params.fillParent || this.params.scrollParent) && this.style(this.wrapper, { width: "100%", overflowX: this.params.hideScrollbar ? "hidden" : "auto", overflowY: "hidden" }), this.setupWrapperEvents();
	        } }, { key: "handleEvent", value: function value(e, t) {
	          !t && e.preventDefault();var n = e.targetTouches ? e.targetTouches[0].clientX : e.clientX,
	              r = this.wrapper.getBoundingClientRect(),
	              i = this.width,
	              a = this.getWidth(),
	              s = void 0;return !this.params.fillParent && i < a ? (s = (n - r.left) * this.params.pixelRatio / i || 0) > 1 && (s = 1) : s = (n - r.left + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0, s;
	        } }, { key: "setupWrapperEvents", value: function value() {
	          var e = this;this.wrapper.addEventListener("click", function (t) {
	            var n = e.wrapper.offsetHeight - e.wrapper.clientHeight;if (0 != n) {
	              var r = e.wrapper.getBoundingClientRect();if (t.clientY >= r.bottom - n) return;
	            }e.params.interact && e.fireEvent("click", t, e.handleEvent(t));
	          }), this.wrapper.addEventListener("scroll", function (t) {
	            return e.fireEvent("scroll", t);
	          });
	        } }, { key: "drawPeaks", value: function value(e, t, n, r) {
	          this.setWidth(t), this.params.barWidth ? this.drawBars(e, 0, n, r) : this.drawWave(e, 0, n, r);
	        } }, { key: "resetScroll", value: function value() {
	          null !== this.wrapper && (this.wrapper.scrollLeft = 0);
	        } }, { key: "recenter", value: function value(e) {
	          var t = this.wrapper.scrollWidth * e;this.recenterOnPosition(t, !0);
	        } }, { key: "recenterOnPosition", value: function value(e, t) {
	          var n = this.wrapper.scrollLeft,
	              r = ~~(this.wrapper.clientWidth / 2),
	              i = this.wrapper.scrollWidth - this.wrapper.clientWidth,
	              a = e - r,
	              s = a - n;if (0 != i) {
	            if (!t && -r <= s && s < r) {
	              s = Math.max(-5, Math.min(5, s)), a = n + s;
	            }a = Math.max(0, Math.min(i, a)), a != n && (this.wrapper.scrollLeft = a);
	          }
	        } }, { key: "getScrollX", value: function value() {
	          return Math.round(this.wrapper.scrollLeft * this.params.pixelRatio);
	        } }, { key: "getWidth", value: function value() {
	          return Math.round(this.container.clientWidth * this.params.pixelRatio);
	        } }, { key: "setWidth", value: function value(e) {
	          this.width != e && (this.width = e, this.params.fillParent || this.params.scrollParent ? this.style(this.wrapper, { width: "" }) : this.style(this.wrapper, { width: ~~(this.width / this.params.pixelRatio) + "px" }), this.updateSize());
	        } }, { key: "setHeight", value: function value(e) {
	          e != this.height && (this.height = e, this.style(this.wrapper, { height: ~~(this.height / this.params.pixelRatio) + "px" }), this.updateSize());
	        } }, { key: "progress", value: function value(e) {
	          var t = 1 / this.params.pixelRatio,
	              n = Math.round(e * this.width) * t;if (n < this.lastPos || n - this.lastPos >= t) {
	            if (this.lastPos = n, this.params.scrollParent && this.params.autoCenter) {
	              var r = ~~(this.wrapper.scrollWidth * e);this.recenterOnPosition(r);
	            }this.updateProgress(n);
	          }
	        } }, { key: "destroy", value: function value() {
	          this.unAll(), this.wrapper && (this.container.removeChild(this.wrapper), this.wrapper = null);
	        } }, { key: "updateSize", value: function value() {} }, { key: "drawBars", value: function value(e, t, n, r) {} }, { key: "drawWave", value: function value(e, t, n, r) {} }, { key: "clearWave", value: function value() {} }, { key: "updateProgress", value: function value(e) {} }]), t;
	    }(u.Observer);t.default = l, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e) {
	      var t = new a.default(),
	          n = new XMLHttpRequest(),
	          r = !1;return n.open(e.method || "GET", e.url, !0), n.responseType = e.responseType || "json", n.addEventListener("progress", function (e) {
	        t.fireEvent("progress", e), e.lengthComputable && e.loaded == e.total && (r = !0);
	      }), n.addEventListener("load", function (e) {
	        r || t.fireEvent("progress", e), t.fireEvent("load", e), 200 == n.status || 206 == n.status ? t.fireEvent("success", n.response, e) : t.fireEvent("error", e);
	      }), n.addEventListener("error", function (e) {
	        return t.fireEvent("error", e);
	      }), n.send(), t.xhr = n, t;
	    }Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r;var i = n(2),
	        a = function (e) {
	      return e && e.__esModule ? e : { default: e };
	    }(i);e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e) {
	      for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
	        n[r - 1] = arguments[r];
	      }return n.forEach(function (t) {
	        Object.keys(t).forEach(function (n) {
	          e[n] = t[n];
	        });
	      }), e;
	    }Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r() {
	      return "wavesurfer_" + Math.random().toString(32).substring(2);
	    }Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e) {
	      var t = -1 / 0;return Object.keys(e).forEach(function (n) {
	        e[n] > t && (t = e[n]);
	      }), t;
	    }Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e) {
	      var t = Number(1 / 0);return Object.keys(e).forEach(function (n) {
	        e[n] < t && (t = e[n]);
	      }), t;
	    }Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e, t) {
	      return Object.keys(t).forEach(function (n) {
	        e.style[n] !== t[n] && (e.style[n] = t[n]);
	      }), e;
	    }Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r, e.exports = t.default;
	  }, function (e, t, n) {
	    "use strict";
	    function r(e) {
	      return e && e.__esModule ? e : { default: e };
	    }function i(e, t) {
	      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
	    }function a(e, t) {
	      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	    }function s(e, t) {
	      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	    }Object.defineProperty(t, "__esModule", { value: !0 });var o = function () {
	      function e(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
	        }
	      }return function (t, n, r) {
	        return n && e(t.prototype, n), r && e(t, r), t;
	      };
	    }(),
	        u = n(0),
	        l = function (e) {
	      if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
	        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	      }return t.default = e, t;
	    }(u),
	        c = n(3),
	        h = r(c),
	        f = n(1),
	        d = r(f),
	        p = n(4),
	        v = r(p),
	        y = n(5),
	        m = r(y),
	        k = (function () {
	      function e(t, n) {
	        s(this, e);
	      }o(e, [{ key: "create", value: function value(e) {} }]), o(e, [{ key: "init", value: function value() {} }, { key: "destroy", value: function value() {} }]);
	    }(), function (e) {
	      function t(e) {
	        var n;s(this, t);var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));if (r.defaultParams = { audioContext: null, audioRate: 1, autoCenter: !0, backend: "WebAudio", container: null, cursorColor: "#333", cursorWidth: 1, dragSelection: !0, fillParent: !0, forceDecode: !0, height: 128, hideScrollbar: !1, interact: !0, loopSelection: !0, maxCanvasWidth: 4e3, mediaContainer: null, mediaControls: !1, mediaType: "audio", minPxPerSec: 20, normalize: !1, partialRender: !1, pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI, plugins: [], progressColor: "#555", renderer: h.default, responsive: !1, scrollParent: !1, skipLength: 2, splitChannels: !1, waveColor: "#999" }, r.backends = { MediaElement: v.default, WebAudio: d.default }, r.util = l, r.params = l.extend({}, r.defaultParams, e), r.container = "string" == typeof e.container ? document.querySelector(r.params.container) : r.params.container, !r.container) throw new Error("Container element not found");if (null == r.params.mediaContainer ? r.mediaContainer = r.container : "string" == typeof r.params.mediaContainer ? r.mediaContainer = document.querySelector(r.params.mediaContainer) : r.mediaContainer = r.params.mediaContainer, !r.mediaContainer) throw new Error("Media Container element not found");if (r.params.maxCanvasWidth <= 1) throw new Error("maxCanvasWidth must be greater than 1");if (r.params.maxCanvasWidth % 2 == 1) throw new Error("maxCanvasWidth must be an even number");if (r.savedVolume = 0, r.isMuted = !1, r.tmpEvents = [], r.currentAjax = null, r.arraybuffer = null, r.drawer = null, r.backend = null, r.peakCache = null, "function" != typeof r.params.renderer) throw new Error("Renderer parameter is invalid");r.Drawer = r.params.renderer, r.Backend = r.backends[r.params.backend], r.initialisedPluginList = {}, r.isDestroyed = !1, r.isReady = !1;var a = 0;return r._onResize = l.debounce(function () {
	          a != r.drawer.wrapper.clientWidth && (a = r.drawer.wrapper.clientWidth, r.empty(), r.drawBuffer());
	        }, "number" == typeof r.params.responsive ? r.params.responsive : 100), n = r, i(r, n);
	      }return a(t, e), o(t, null, [{ key: "create", value: function value(e) {
	          return new t(e).init();
	        } }]), o(t, [{ key: "init", value: function value() {
	          return this.registerPlugins(this.params.plugins), this.createDrawer(), this.createBackend(), this.createPeakCache(), this;
	        } }, { key: "registerPlugins", value: function value(e) {
	          var t = this;return e.forEach(function (e) {
	            return t.addPlugin(e);
	          }), e.forEach(function (e) {
	            e.deferInit || t.initPlugin(e.name);
	          }), this.fireEvent("plugins-registered", e), this;
	        } }, { key: "addPlugin", value: function value(e) {
	          var t = this;if (!e.name) throw new Error("Plugin does not have a name!");if (!e.instance) throw new Error("Plugin " + e.name + " does not have an instance property!");e.staticProps && Object.keys(e.staticProps).forEach(function (n) {
	            t[n] = e.staticProps[n];
	          });var n = e.instance;return Object.getOwnPropertyNames(l.Observer.prototype).forEach(function (e) {
	            n.prototype[e] = l.Observer.prototype[e];
	          }), this[e.name] = new n(e.params || {}, this), this.fireEvent("plugin-added", e.name), this;
	        } }, { key: "initPlugin", value: function value(e) {
	          if (!this[e]) throw new Error("Plugin " + e + " has not been added yet!");return this.initialisedPluginList[e] && this.destroyPlugin(e), this[e].init(), this.initialisedPluginList[e] = !0, this.fireEvent("plugin-initialised", e), this;
	        } }, { key: "destroyPlugin", value: function value(e) {
	          if (!this[e]) throw new Error("Plugin " + e + " has not been added yet and cannot be destroyed!");if (!this.initialisedPluginList[e]) throw new Error("Plugin " + e + " is not active and cannot be destroyed!");if ("function" != typeof this[e].destroy) throw new Error("Plugin " + e + " does not have a destroy function!");return this[e].destroy(), delete this.initialisedPluginList[e], this.fireEvent("plugin-destroyed", e), this;
	        } }, { key: "destroyAllPlugins", value: function value() {
	          var e = this;Object.keys(this.initialisedPluginList).forEach(function (t) {
	            return e.destroyPlugin(t);
	          });
	        } }, { key: "createDrawer", value: function value() {
	          var e = this;this.drawer = new this.Drawer(this.container, this.params), this.drawer.init(), this.fireEvent("drawer-created", this.drawer), this.params.responsive && window.addEventListener("resize", this._onResize, !0), this.drawer.on("redraw", function () {
	            e.drawBuffer(), e.drawer.progress(e.backend.getPlayedPercents());
	          }), this.drawer.on("click", function (t, n) {
	            setTimeout(function () {
	              return e.seekTo(n);
	            }, 0);
	          }), this.drawer.on("scroll", function (t) {
	            e.params.partialRender && e.drawBuffer(), e.fireEvent("scroll", t);
	          });
	        } }, { key: "createBackend", value: function value() {
	          var e = this;this.backend && this.backend.destroy(), "AudioElement" == this.params.backend && (this.params.backend = "MediaElement"), "WebAudio" != this.params.backend || this.Backend.prototype.supportsWebAudio.call(null) || (this.params.backend = "MediaElement"), this.backend = new this.Backend(this.params), this.backend.init(), this.fireEvent("backend-created", this.backend), this.backend.on("finish", function () {
	            return e.fireEvent("finish");
	          }), this.backend.on("play", function () {
	            return e.fireEvent("play");
	          }), this.backend.on("pause", function () {
	            return e.fireEvent("pause");
	          }), this.backend.on("audioprocess", function (t) {
	            e.drawer.progress(e.backend.getPlayedPercents()), e.fireEvent("audioprocess", t);
	          });
	        } }, { key: "createPeakCache", value: function value() {
	          this.params.partialRender && (this.peakCache = new m.default());
	        } }, { key: "getDuration", value: function value() {
	          return this.backend.getDuration();
	        } }, { key: "getCurrentTime", value: function value() {
	          return this.backend.getCurrentTime();
	        } }, { key: "play", value: function value(e, t) {
	          var n = this;this.fireEvent("interaction", function () {
	            return n.play(e, t);
	          }), this.backend.play(e, t);
	        } }, { key: "pause", value: function value() {
	          this.backend.isPaused() || this.backend.pause();
	        } }, { key: "playPause", value: function value() {
	          this.backend.isPaused() ? this.play() : this.pause();
	        } }, { key: "isPlaying", value: function value() {
	          return !this.backend.isPaused();
	        } }, { key: "skipBackward", value: function value(e) {
	          this.skip(-e || -this.params.skipLength);
	        } }, { key: "skipForward", value: function value(e) {
	          this.skip(e || this.params.skipLength);
	        } }, { key: "skip", value: function value(e) {
	          var t = this.getDuration() || 1,
	              n = this.getCurrentTime() || 0;n = Math.max(0, Math.min(t, n + (e || 0))), this.seekAndCenter(n / t);
	        } }, { key: "seekAndCenter", value: function value(e) {
	          this.seekTo(e), this.drawer.recenter(e);
	        } }, { key: "seekTo", value: function value(e) {
	          var t = this;this.fireEvent("interaction", function () {
	            return t.seekTo(e);
	          });var n = this.backend.isPaused();n || this.backend.pause();var r = this.params.scrollParent;this.params.scrollParent = !1, this.backend.seekTo(e * this.getDuration()), this.drawer.progress(this.backend.getPlayedPercents()), n || this.backend.play(), this.params.scrollParent = r, this.fireEvent("seek", e);
	        } }, { key: "stop", value: function value() {
	          this.pause(), this.seekTo(0), this.drawer.progress(0);
	        } }, { key: "setVolume", value: function value(e) {
	          this.backend.setVolume(e);
	        } }, { key: "getVolume", value: function value() {
	          return this.backend.getVolume();
	        } }, { key: "setPlaybackRate", value: function value(e) {
	          this.backend.setPlaybackRate(e);
	        } }, { key: "getPlaybackRate", value: function value() {
	          return this.backend.getPlaybackRate();
	        } }, { key: "toggleMute", value: function value() {
	          this.setMute(!this.isMuted);
	        } }, { key: "setMute", value: function value(e) {
	          e !== this.isMuted && (e ? (this.savedVolume = this.backend.getVolume(), this.backend.setVolume(0), this.isMuted = !0) : (this.backend.setVolume(this.savedVolume), this.isMuted = !1));
	        } }, { key: "getMute", value: function value() {
	          return this.isMuted;
	        } }, { key: "toggleScroll", value: function value() {
	          this.params.scrollParent = !this.params.scrollParent, this.drawBuffer();
	        } }, { key: "toggleInteraction", value: function value() {
	          this.params.interact = !this.params.interact;
	        } }, { key: "drawBuffer", value: function value() {
	          var e = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio),
	              t = this.drawer.getWidth(),
	              n = e,
	              r = this.drawer.getScrollX(),
	              i = Math.min(r + t, n);this.params.fillParent && (!this.params.scrollParent || e < t) && (n = t, r = 0, i = n);var a = void 0;if (this.params.partialRender) {
	            var s = this.peakCache.addRangeToPeakCache(n, r, i),
	                o = void 0;for (o = 0; o < s.length; o++) {
	              a = this.backend.getPeaks(n, s[o][0], s[o][1]), this.drawer.drawPeaks(a, n, s[o][0], s[o][1]);
	            }
	          } else r = 0, i = n, a = this.backend.getPeaks(n, r, i), this.drawer.drawPeaks(a, n, r, i);this.fireEvent("redraw", a, n);
	        } }, { key: "zoom", value: function value(e) {
	          this.params.minPxPerSec = e, this.params.scrollParent = !0, this.drawBuffer(), this.drawer.progress(this.backend.getPlayedPercents()), this.drawer.recenter(this.getCurrentTime() / this.getDuration()), this.fireEvent("zoom", e);
	        } }, { key: "loadArrayBuffer", value: function value(e) {
	          var t = this;this.decodeArrayBuffer(e, function (e) {
	            t.isDestroyed || t.loadDecodedBuffer(e);
	          });
	        } }, { key: "loadDecodedBuffer", value: function value(e) {
	          this.backend.load(e), this.drawBuffer(), this.fireEvent("ready"), this.isReady = !0;
	        } }, { key: "loadBlob", value: function value(e) {
	          var t = this,
	              n = new FileReader();n.addEventListener("progress", function (e) {
	            return t.onProgress(e);
	          }), n.addEventListener("load", function (e) {
	            return t.loadArrayBuffer(e.target.result);
	          }), n.addEventListener("error", function () {
	            return t.fireEvent("error", "Error reading file");
	          }), n.readAsArrayBuffer(e), this.empty();
	        } }, { key: "load", value: function value(e, t, n) {
	          switch (this.empty(), this.params.backend) {case "WebAudio":
	              return this.loadBuffer(e, t);case "MediaElement":
	              return this.loadMediaElement(e, t, n);}
	        } }, { key: "loadBuffer", value: function value(e, t) {
	          var n = this,
	              r = function r(t) {
	            return t && n.tmpEvents.push(n.once("ready", t)), n.getArrayBuffer(e, function (e) {
	              return n.loadArrayBuffer(e);
	            });
	          };if (!t) return r();this.backend.setPeaks(t), this.drawBuffer(), this.tmpEvents.push(this.once("interaction", r));
	        } }, { key: "loadMediaElement", value: function value(e, t, n) {
	          var r = this,
	              i = e;if ("string" == typeof e) this.backend.load(i, this.mediaContainer, t, n);else {
	            var a = e;this.backend.loadElt(a, t), i = a.src;
	          }this.tmpEvents.push(this.backend.once("canplay", function () {
	            r.drawBuffer(), r.fireEvent("ready");
	          }), this.backend.once("error", function (e) {
	            return r.fireEvent("error", e);
	          })), t && this.backend.setPeaks(t), t && !this.params.forceDecode || !this.backend.supportsWebAudio() || this.getArrayBuffer(i, function (e) {
	            r.decodeArrayBuffer(e, function (e) {
	              r.backend.buffer = e, r.backend.setPeaks(null), r.drawBuffer(), r.fireEvent("waveform-ready");
	            });
	          });
	        } }, { key: "decodeArrayBuffer", value: function value(e, t) {
	          var n = this;this.arraybuffer = e, this.backend.decodeArrayBuffer(e, function (r) {
	            n.isDestroyed || n.arraybuffer != e || (t(r), n.arraybuffer = null);
	          }, function () {
	            return n.fireEvent("error", "Error decoding audiobuffer");
	          });
	        } }, { key: "getArrayBuffer", value: function value(e, t) {
	          var n = this,
	              r = l.ajax({ url: e, responseType: "arraybuffer" });return this.currentAjax = r, this.tmpEvents.push(r.on("progress", function (e) {
	            n.onProgress(e);
	          }), r.on("success", function (e, r) {
	            t(e), n.currentAjax = null;
	          }), r.on("error", function (e) {
	            n.fireEvent("error", "XHR error: " + e.target.statusText), n.currentAjax = null;
	          })), r;
	        } }, { key: "onProgress", value: function value(e) {
	          var t = void 0;t = e.lengthComputable ? e.loaded / e.total : e.loaded / (e.loaded + 1e6), this.fireEvent("loading", Math.round(100 * t), e.target);
	        } }, { key: "exportPCM", value: function value(e, t, n) {
	          e = e || 1024, t = t || 1e4, n = n || !1;var r = this.backend.getPeaks(e, t),
	              i = [].map.call(r, function (e) {
	            return Math.round(e * t) / t;
	          }),
	              a = JSON.stringify(i);return n || window.open("data:application/json;charset=utf-8," + encodeURIComponent(a)), a;
	        } }, { key: "exportImage", value: function value(e, t) {
	          return e || (e = "image/png"), t || (t = 1), this.drawer.getImage(e, t);
	        } }, { key: "cancelAjax", value: function value() {
	          this.currentAjax && (this.currentAjax.xhr.abort(), this.currentAjax = null);
	        } }, { key: "clearTmpEvents", value: function value() {
	          this.tmpEvents.forEach(function (e) {
	            return e.un();
	          });
	        } }, { key: "empty", value: function value() {
	          this.backend.isPaused() || (this.stop(), this.backend.disconnectSource()), this.cancelAjax(), this.clearTmpEvents(), this.drawer.progress(0), this.drawer.setWidth(0), this.drawer.drawPeaks({ length: this.drawer.getWidth() }, 0);
	        } }, { key: "destroy", value: function value() {
	          this.destroyAllPlugins(), this.fireEvent("destroy"), this.cancelAjax(), this.clearTmpEvents(), this.unAll(), this.params.responsive && window.removeEventListener("resize", this._onResize, !0), this.backend.destroy(), this.drawer.destroy(), this.isDestroyed = !0, this.arraybuffer = null;
	        } }]), t;
	    }(l.Observer));k.util = l, t.default = k, e.exports = t.default;
	  }, function (e, t) {
	    e.exports = function (e, t, n) {
	      function r() {
	        var l = Date.now() - o;l < t && l >= 0 ? i = setTimeout(r, t - l) : (i = null, n || (u = e.apply(s, a), s = a = null));
	      }var i, a, s, o, u;null == t && (t = 100);var l = function l() {
	        s = this, a = arguments, o = Date.now();var l = n && !i;return i || (i = setTimeout(r, t)), l && (u = e.apply(s, a), s = a = null), u;
	      };return l.clear = function () {
	        i && (clearTimeout(i), i = null);
	      }, l;
	    };
	  }]);
	});
	//# sourceMappingURL=wavesurfer.min.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _webaudio_subclassed = __webpack_require__(4);
	
	var _webaudio_subclassed2 = _interopRequireDefault(_webaudio_subclassed);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BackendPlugin = function () {
	    _createClass(BackendPlugin, null, [{
	        key: 'create',
	        value: function create(params) {
	            return {
	                name: 'backend',
	                deferInit: params && params.deferInit ? params.deferInit : false,
	                params: params,
	                instance: BackendPlugin
	            };
	        }
	    }]);
	
	    function BackendPlugin(params, ws) {
	        _classCallCheck(this, BackendPlugin);
	
	        this.wavesurfer = ws;
	        this.wavesurfer.Backend = _webaudio_subclassed2.default;
	        this.wavesurfer.createBackend();
	    }
	
	    _createClass(BackendPlugin, [{
	        key: 'init',
	        value: function init() {
	            console.log('init backend');
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            console.log('destroy backend');
	        }
	    }]);
	
	    return BackendPlugin;
	}();
	
	exports.default = BackendPlugin;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _webaudio = __webpack_require__(5);
	
	var _webaudio2 = _interopRequireDefault(_webaudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MyWebAudio = function (_WebAudio) {
	    _inherits(MyWebAudio, _WebAudio);
	
	    function MyWebAudio(params) {
	        _classCallCheck(this, MyWebAudio);
	
	        var _this = _possibleConstructorReturn(this, (MyWebAudio.__proto__ || Object.getPrototypeOf(MyWebAudio)).call(this, params));
	
	        console.log('Init subclassed backend');
	        return _this;
	    }
	
	    _createClass(MyWebAudio, [{
	        key: 'getPlayedPercents',
	        value: function getPlayedPercents() {
	            //Do my own stuff here
	            return _get(MyWebAudio.prototype.__proto__ || Object.getPrototypeOf(MyWebAudio.prototype), 'getPlayedPercents', this).call(this);
	        }
	    }]);
	
	    return MyWebAudio;
	}(_webaudio2.default);
	
	exports.default = MyWebAudio;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(6);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// using consts to prevent someone writing the string wrong
	var PLAYING = 'playing';
	var PAUSED = 'paused';
	var FINISHED = 'finished';
	
	/**
	 * WebAudio backend
	 *
	 * @extends {Observer}
	 */
	
	var WebAudio = function (_util$Observer) {
	    _inherits(WebAudio, _util$Observer);
	
	    _createClass(WebAudio, [{
	        key: 'supportsWebAudio',
	
	
	        /**
	         * Does the browser support this backend
	         *
	         * @return {boolean}
	         */
	
	        /** @private */
	
	        /** @private */
	        value: function supportsWebAudio() {
	            return !!(window.AudioContext || window.webkitAudioContext);
	        }
	
	        /**
	         * Get the audio context used by this backend or create one
	         *
	         * @return {AudioContext}
	         */
	
	        /** @private */
	
	        /** @private */
	
	    }, {
	        key: 'getAudioContext',
	        value: function getAudioContext() {
	            if (!window.WaveSurferAudioContext) {
	                window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)();
	            }
	            return window.WaveSurferAudioContext;
	        }
	
	        /**
	         * Get the offline audio context used by this backend or create one
	         *
	         * @param {number} sampleRate
	         * @return {OfflineAudioContext}
	         */
	
	    }, {
	        key: 'getOfflineAudioContext',
	        value: function getOfflineAudioContext(sampleRate) {
	            if (!window.WaveSurferOfflineAudioContext) {
	                window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, sampleRate);
	            }
	            return window.WaveSurferOfflineAudioContext;
	        }
	
	        /**
	         * Construct the backend
	         *
	         * @param {WavesurferParams} params
	         */
	
	    }]);
	
	    function WebAudio(params) {
	        var _this$stateBehaviors, _this$states;
	
	        _classCallCheck(this, WebAudio);
	
	        /** @private */
	        var _this = _possibleConstructorReturn(this, (WebAudio.__proto__ || Object.getPrototypeOf(WebAudio)).call(this));
	
	        _this.audioContext = null;
	        _this.offlineAudioContext = null;
	        _this.stateBehaviors = (_this$stateBehaviors = {}, _defineProperty(_this$stateBehaviors, PLAYING, {
	            init: function init() {
	                this.addOnAudioProcess();
	            },
	            getPlayedPercents: function getPlayedPercents() {
	                var duration = this.getDuration();
	                return this.getCurrentTime() / duration || 0;
	            },
	            getCurrentTime: function getCurrentTime() {
	                return this.startPosition + this.getPlayedTime();
	            }
	        }), _defineProperty(_this$stateBehaviors, PAUSED, {
	            init: function init() {
	                this.removeOnAudioProcess();
	            },
	            getPlayedPercents: function getPlayedPercents() {
	                var duration = this.getDuration();
	                return this.getCurrentTime() / duration || 0;
	            },
	            getCurrentTime: function getCurrentTime() {
	                return this.startPosition;
	            }
	        }), _defineProperty(_this$stateBehaviors, FINISHED, {
	            init: function init() {
	                this.removeOnAudioProcess();
	                this.fireEvent('finish');
	            },
	            getPlayedPercents: function getPlayedPercents() {
	                return 1;
	            },
	            getCurrentTime: function getCurrentTime() {
	                return this.getDuration();
	            }
	        }), _this$stateBehaviors);
	        _this.params = params;
	        /** @private */
	        _this.ac = params.audioContext || _this.getAudioContext();
	        /**@private */
	        _this.lastPlay = _this.ac.currentTime;
	        /** @private */
	        _this.startPosition = 0;
	        /** @private  */
	        _this.scheduledPause = null;
	        /** @private */
	        _this.states = (_this$states = {}, _defineProperty(_this$states, PLAYING, Object.create(_this.stateBehaviors[PLAYING])), _defineProperty(_this$states, PAUSED, Object.create(_this.stateBehaviors[PAUSED])), _defineProperty(_this$states, FINISHED, Object.create(_this.stateBehaviors[FINISHED])), _this$states);
	        /** @private */
	        _this.analyser = null;
	        /** @private */
	        _this.buffer = null;
	        /** @private */
	        _this.filters = [];
	        /** @private */
	        _this.gainNode = null;
	        /** @private */
	        _this.mergedPeaks = null;
	        /** @private */
	        _this.offlineAc = null;
	        /** @private */
	        _this.peaks = null;
	        /** @private */
	        _this.playbackRate = 1;
	        /** @private */
	        _this.analyser = null;
	        /** @private */
	        _this.scriptNode = null;
	        /** @private */
	        _this.source = null;
	        /** @private */
	        _this.splitPeaks = [];
	        /** @private */
	        _this.state = null;
	        return _this;
	    }
	
	    /**
	     * Initialise the backend, called in `wavesurfer.createBackend()`
	     */
	
	
	    _createClass(WebAudio, [{
	        key: 'init',
	        value: function init() {
	            this.createVolumeNode();
	            this.createScriptNode();
	            this.createAnalyserNode();
	
	            this.setState(PAUSED);
	            this.setPlaybackRate(this.params.audioRate);
	            this.setLength(0);
	        }
	
	        /** @private */
	
	    }, {
	        key: 'disconnectFilters',
	        value: function disconnectFilters() {
	            if (this.filters) {
	                this.filters.forEach(function (filter) {
	                    filter && filter.disconnect();
	                });
	                this.filters = null;
	                // Reconnect direct path
	                this.analyser.connect(this.gainNode);
	            }
	        }
	
	        /** @private */
	
	    }, {
	        key: 'setState',
	        value: function setState(state) {
	            if (this.state !== this.states[state]) {
	                this.state = this.states[state];
	                this.state.init.call(this);
	            }
	        }
	
	        /**
	         * Unpacked `setFilters()`
	         *
	         * @param {...AudioNode} filters
	         */
	
	    }, {
	        key: 'setFilter',
	        value: function setFilter() {
	            for (var _len = arguments.length, filters = Array(_len), _key = 0; _key < _len; _key++) {
	                filters[_key] = arguments[_key];
	            }
	
	            this.setFilters(filters);
	        }
	
	        /**
	         * Insert custom Web Audio nodes into the graph
	         *
	         * @param {AudioNode[]} filters Packed filters array
	         * @example
	         * const lowpass = wavesurfer.backend.ac.createBiquadFilter();
	         * wavesurfer.backend.setFilter(lowpass);
	         */
	
	    }, {
	        key: 'setFilters',
	        value: function setFilters(filters) {
	            // Remove existing filters
	            this.disconnectFilters();
	
	            // Insert filters if filter array not empty
	            if (filters && filters.length) {
	                this.filters = filters;
	
	                // Disconnect direct path before inserting filters
	                this.analyser.disconnect();
	
	                // Connect each filter in turn
	                filters.reduce(function (prev, curr) {
	                    prev.connect(curr);
	                    return curr;
	                }, this.analyser).connect(this.gainNode);
	            }
	        }
	
	        /** @private */
	
	    }, {
	        key: 'createScriptNode',
	        value: function createScriptNode() {
	            if (this.ac.createScriptProcessor) {
	                this.scriptNode = this.ac.createScriptProcessor(this.scriptBufferSize);
	            } else {
	                this.scriptNode = this.ac.createJavaScriptNode(this.scriptBufferSize);
	            }
	
	            this.scriptNode.connect(this.ac.destination);
	        }
	
	        /** @private */
	
	    }, {
	        key: 'addOnAudioProcess',
	        value: function addOnAudioProcess() {
	            var _this2 = this;
	
	            this.scriptNode.onaudioprocess = function () {
	                var time = _this2.getCurrentTime();
	
	                if (time >= _this2.getDuration()) {
	                    _this2.setState(FINISHED);
	                    _this2.fireEvent('pause');
	                } else if (time >= _this2.scheduledPause) {
	                    _this2.pause();
	                } else if (_this2.state === _this2.states[PLAYING]) {
	                    _this2.fireEvent('audioprocess', time);
	                }
	            };
	        }
	
	        /** @private */
	
	    }, {
	        key: 'removeOnAudioProcess',
	        value: function removeOnAudioProcess() {
	            this.scriptNode.onaudioprocess = null;
	        }
	
	        /** @private */
	
	    }, {
	        key: 'createAnalyserNode',
	        value: function createAnalyserNode() {
	            this.analyser = this.ac.createAnalyser();
	            this.analyser.connect(this.gainNode);
	        }
	
	        /**
	         * Create the gain node needed to control the playback volume.
	         *
	         * @private
	         */
	
	    }, {
	        key: 'createVolumeNode',
	        value: function createVolumeNode() {
	            // Create gain node using the AudioContext
	            if (this.ac.createGain) {
	                this.gainNode = this.ac.createGain();
	            } else {
	                this.gainNode = this.ac.createGainNode();
	            }
	            // Add the gain node to the graph
	            this.gainNode.connect(this.ac.destination);
	        }
	
	        /**
	         * Set the audio volume
	         *
	         * @param {number} value A floating point value between 0 and 1.
	         */
	
	    }, {
	        key: 'setVolume',
	        value: function setVolume(value) {
	            this.gainNode.gain.value = value;
	        }
	
	        /**
	         * Get the current volume
	         *
	         * @return {number} value A floating point value between 0 and 1.
	         */
	
	    }, {
	        key: 'getVolume',
	        value: function getVolume() {
	            return this.gainNode.gain.value;
	        }
	
	        /** @private */
	
	    }, {
	        key: 'decodeArrayBuffer',
	        value: function decodeArrayBuffer(arraybuffer, callback, errback) {
	            if (!this.offlineAc) {
	                this.offlineAc = this.getOfflineAudioContext(this.ac ? this.ac.sampleRate : 44100);
	            }
	            this.offlineAc.decodeAudioData(arraybuffer, function (data) {
	                return callback(data);
	            }, errback);
	        }
	
	        /**
	         * Set pre-decoded peaks
	         *
	         * @param {Array} peaks
	         */
	
	    }, {
	        key: 'setPeaks',
	        value: function setPeaks(peaks) {
	            this.peaks = peaks;
	        }
	
	        /**
	         * Set the rendered length (different from the length of the audio).
	         *
	         * @param {number} length
	         */
	
	    }, {
	        key: 'setLength',
	        value: function setLength(length) {
	            // No resize, we can preserve the cached peaks.
	            if (this.mergedPeaks && length == 2 * this.mergedPeaks.length - 1 + 2) {
	                return;
	            }
	
	            this.splitPeaks = [];
	            this.mergedPeaks = [];
	            // Set the last element of the sparse array so the peak arrays are
	            // appropriately sized for other calculations.
	            var channels = this.buffer ? this.buffer.numberOfChannels : 1;
	            var c = void 0;
	            for (c = 0; c < channels; c++) {
	                this.splitPeaks[c] = [];
	                this.splitPeaks[c][2 * (length - 1)] = 0;
	                this.splitPeaks[c][2 * (length - 1) + 1] = 0;
	            }
	            this.mergedPeaks[2 * (length - 1)] = 0;
	            this.mergedPeaks[2 * (length - 1) + 1] = 0;
	        }
	
	        /**
	         * Compute the max and min value of the waveform when broken into <length> subranges.
	         *
	         * @param {number} length How many subranges to break the waveform into.
	         * @param {number} first First sample in the required range.
	         * @param {number} last Last sample in the required range.
	         * @return {number[]|number[][]} Array of 2*<length> peaks or array of arrays of
	         * peaks consisting of (max, min) values for each subrange.
	         */
	
	    }, {
	        key: 'getPeaks',
	        value: function getPeaks(length, first, last) {
	            if (this.peaks) {
	                return this.peaks;
	            }
	
	            this.setLength(length);
	
	            var sampleSize = this.buffer.length / length;
	            var sampleStep = ~~(sampleSize / 10) || 1;
	            var channels = this.buffer.numberOfChannels;
	            var c = void 0;
	
	            for (c = 0; c < channels; c++) {
	                var peaks = this.splitPeaks[c];
	                var chan = this.buffer.getChannelData(c);
	                var i = void 0;
	
	                for (i = first; i <= last; i++) {
	                    var start = ~~(i * sampleSize);
	                    var end = ~~(start + sampleSize);
	                    var min = 0;
	                    var max = 0;
	                    var j = void 0;
	
	                    for (j = start; j < end; j += sampleStep) {
	                        var value = chan[j];
	
	                        if (value > max) {
	                            max = value;
	                        }
	
	                        if (value < min) {
	                            min = value;
	                        }
	                    }
	
	                    peaks[2 * i] = max;
	                    peaks[2 * i + 1] = min;
	
	                    if (c == 0 || max > this.mergedPeaks[2 * i]) {
	                        this.mergedPeaks[2 * i] = max;
	                    }
	
	                    if (c == 0 || min < this.mergedPeaks[2 * i + 1]) {
	                        this.mergedPeaks[2 * i + 1] = min;
	                    }
	                }
	            }
	
	            return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
	        }
	
	        /**
	         * Get the position from 0 to 1
	         *
	         * @return {number}
	         */
	
	    }, {
	        key: 'getPlayedPercents',
	        value: function getPlayedPercents() {
	            return this.state.getPlayedPercents.call(this);
	        }
	
	        /** @private */
	
	    }, {
	        key: 'disconnectSource',
	        value: function disconnectSource() {
	            if (this.source) {
	                this.source.disconnect();
	            }
	        }
	
	        /**
	         * This is called when wavesurfer is destroyed
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            if (!this.isPaused()) {
	                this.pause();
	            }
	            this.unAll();
	            this.buffer = null;
	            this.disconnectFilters();
	            this.disconnectSource();
	            this.gainNode.disconnect();
	            this.scriptNode.disconnect();
	            this.analyser.disconnect();
	
	            // close the audioContext if closeAudioContext option is set to true
	            if (this.params.closeAudioContext) {
	                // check if browser supports AudioContext.close()
	                if (typeof this.ac.close === 'function') {
	                    this.ac.close();
	                }
	                // clear the reference to the audiocontext
	                this.ac = null;
	                // clear the actual audiocontext, either passed as param or the
	                // global singleton
	                if (!this.params.audioContext) {
	                    window.WaveSurferAudioContext = null;
	                } else {
	                    this.params.audioContext = null;
	                }
	                // clear the offlineAudioContext
	                window.WaveSurferOfflineAudioContext = null;
	            }
	        }
	
	        /**
	         * Loaded a decoded audio buffer
	         *
	         * @param {Object} buffer
	         */
	
	    }, {
	        key: 'load',
	        value: function load(buffer) {
	            this.startPosition = 0;
	            this.lastPlay = this.ac.currentTime;
	            this.buffer = buffer;
	            this.createSource();
	        }
	
	        /** @private */
	
	    }, {
	        key: 'createSource',
	        value: function createSource() {
	            this.disconnectSource();
	            this.source = this.ac.createBufferSource();
	
	            //adjust for old browsers.
	            this.source.start = this.source.start || this.source.noteGrainOn;
	            this.source.stop = this.source.stop || this.source.noteOff;
	
	            this.source.playbackRate.value = this.playbackRate;
	            this.source.buffer = this.buffer;
	            this.source.connect(this.analyser);
	        }
	
	        /**
	         * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`
	         *
	         * @return {boolean}
	         */
	
	    }, {
	        key: 'isPaused',
	        value: function isPaused() {
	            return this.state !== this.states[PLAYING];
	        }
	
	        /**
	         * Used by `wavesurfer.getDuration()`
	         *
	         * @return {number}
	         */
	
	    }, {
	        key: 'getDuration',
	        value: function getDuration() {
	            if (!this.buffer) {
	                return 0;
	            }
	            return this.buffer.duration;
	        }
	
	        /**
	         * Used by `wavesurfer.seekTo()`
	         *
	         * @param {number} start Position to start at in seconds
	         * @param {number} end Position to end at in seconds
	         * @return {{start: number, end: number}}
	         */
	
	    }, {
	        key: 'seekTo',
	        value: function seekTo(start, end) {
	            if (!this.buffer) {
	                return;
	            }
	
	            this.scheduledPause = null;
	
	            if (start == null) {
	                start = this.getCurrentTime();
	                if (start >= this.getDuration()) {
	                    start = 0;
	                }
	            }
	            if (end == null) {
	                end = this.getDuration();
	            }
	
	            this.startPosition = start;
	            this.lastPlay = this.ac.currentTime;
	
	            if (this.state === this.states[FINISHED]) {
	                this.setState(PAUSED);
	            }
	
	            return {
	                start: start,
	                end: end
	            };
	        }
	
	        /**
	         * Get the playback position in seconds
	         *
	         * @return {number}
	         */
	
	    }, {
	        key: 'getPlayedTime',
	        value: function getPlayedTime() {
	            return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
	        }
	
	        /**
	         * Plays the loaded audio region.
	         *
	         * @param {number} start Start offset in seconds, relative to the beginning
	         * of a clip.
	         * @param {number} end When to stop relative to the beginning of a clip.
	         */
	
	    }, {
	        key: 'play',
	        value: function play(start, end) {
	            if (!this.buffer) {
	                return;
	            }
	
	            // need to re-create source on each playback
	            this.createSource();
	
	            var adjustedTime = this.seekTo(start, end);
	
	            start = adjustedTime.start;
	            end = adjustedTime.end;
	
	            this.scheduledPause = end;
	
	            this.source.start(0, start, end - start);
	
	            if (this.ac.state == 'suspended') {
	                this.ac.resume && this.ac.resume();
	            }
	
	            this.setState(PLAYING);
	
	            this.fireEvent('play');
	        }
	
	        /**
	         * Pauses the loaded audio.
	         */
	
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.scheduledPause = null;
	
	            this.startPosition += this.getPlayedTime();
	            this.source && this.source.stop(0);
	
	            this.setState(PAUSED);
	
	            this.fireEvent('pause');
	        }
	
	        /**
	        * Returns the current time in seconds relative to the audioclip's
	        * duration.
	        *
	        * @return {number}
	        */
	
	    }, {
	        key: 'getCurrentTime',
	        value: function getCurrentTime() {
	            return this.state.getCurrentTime.call(this);
	        }
	
	        /**
	        * Returns the current playback rate. (0=no playback, 1=normal playback)
	        *
	        * @return {number}
	        */
	
	    }, {
	        key: 'getPlaybackRate',
	        value: function getPlaybackRate() {
	            return this.playbackRate;
	        }
	
	        /**
	         * Set the audio source playback rate.
	         *
	         * @param {number} value
	         */
	
	    }, {
	        key: 'setPlaybackRate',
	        value: function setPlaybackRate(value) {
	            value = value || 1;
	            if (this.isPaused()) {
	                this.playbackRate = value;
	            } else {
	                this.pause();
	                this.playbackRate = value;
	                this.play();
	            }
	        }
	    }]);
	
	    return WebAudio;
	}(util.Observer);
	
	WebAudio.scriptBufferSize = 256;
	exports.default = WebAudio;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ajax = __webpack_require__(7);
	
	Object.defineProperty(exports, 'ajax', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ajax).default;
	  }
	});
	
	var _getId = __webpack_require__(9);
	
	Object.defineProperty(exports, 'getId', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_getId).default;
	  }
	});
	
	var _max = __webpack_require__(10);
	
	Object.defineProperty(exports, 'max', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_max).default;
	  }
	});
	
	var _min = __webpack_require__(11);
	
	Object.defineProperty(exports, 'min', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_min).default;
	  }
	});
	
	var _observer = __webpack_require__(8);
	
	Object.defineProperty(exports, 'Observer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_observer).default;
	  }
	});
	
	var _extend = __webpack_require__(12);
	
	Object.defineProperty(exports, 'extend', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_extend).default;
	  }
	});
	
	var _style = __webpack_require__(13);
	
	Object.defineProperty(exports, 'style', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_style).default;
	  }
	});
	
	var _debounce = __webpack_require__(14);
	
	Object.defineProperty(exports, 'debounce', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_debounce).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = ajax;
	
	var _observer = __webpack_require__(8);
	
	var _observer2 = _interopRequireDefault(_observer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Perform an ajax request
	 *
	 * @param {Options} options Description
	 *
	 * @returns {Object} Observer instance
	 */
	function ajax(options) {
	    var instance = new _observer2.default();
	    var xhr = new XMLHttpRequest();
	    var fired100 = false;
	    xhr.open(options.method || 'GET', options.url, true);
	    xhr.responseType = options.responseType || 'json';
	    xhr.addEventListener('progress', function (e) {
	        instance.fireEvent('progress', e);
	        if (e.lengthComputable && e.loaded == e.total) {
	            fired100 = true;
	        }
	    });
	    xhr.addEventListener('load', function (e) {
	        if (!fired100) {
	            instance.fireEvent('progress', e);
	        }
	        instance.fireEvent('load', e);
	        if (200 == xhr.status || 206 == xhr.status) {
	            instance.fireEvent('success', xhr.response, e);
	        } else {
	            instance.fireEvent('error', e);
	        }
	    });
	    xhr.addEventListener('error', function (e) {
	        return instance.fireEvent('error', e);
	    });
	    xhr.send();
	    instance.xhr = xhr;
	    return instance;
	}
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @typedef {Object} ListenerDescriptor
	 * @property {string} name The name of the event
	 * @property {function} callback The callback
	 * @property {function} un The function to call to remove the listener
	 */
	
	/**
	 * Observer class
	 */
	var Observer = function () {
	    /**
	     * Instantiate Observer
	     */
	    function Observer() {
	        _classCallCheck(this, Observer);
	
	        /**
	         * @private
	         * @todo Initialise the handlers here already and remove the conditional
	         * assignment in `on()`
	         */
	        this.handlers = null;
	    }
	    /**
	     * Attach a handler function for an event.
	     *
	     * @param {string} event Name of the event to listen to
	     * @param {function} fn The callback to trigger when the event is fired
	     * @return {ListenerDescriptor}
	     */
	
	
	    _createClass(Observer, [{
	        key: "on",
	        value: function on(event, fn) {
	            var _this = this;
	
	            if (!this.handlers) {
	                this.handlers = {};
	            }
	
	            var handlers = this.handlers[event];
	            if (!handlers) {
	                handlers = this.handlers[event] = [];
	            }
	            handlers.push(fn);
	
	            // Return an event descriptor
	            return {
	                name: event,
	                callback: fn,
	                un: function un(e, fn) {
	                    return _this.un(e, fn);
	                }
	            };
	        }
	
	        /**
	         * Remove an event handler.
	         *
	         * @param {string} event Name of the event the listener that should be
	         * removed listens to
	         * @param {function} fn The callback that should be removed
	         */
	
	    }, {
	        key: "un",
	        value: function un(event, fn) {
	            if (!this.handlers) {
	                return;
	            }
	
	            var handlers = this.handlers[event];
	            var i = void 0;
	            if (handlers) {
	                if (fn) {
	                    for (i = handlers.length - 1; i >= 0; i--) {
	                        if (handlers[i] == fn) {
	                            handlers.splice(i, 1);
	                        }
	                    }
	                } else {
	                    handlers.length = 0;
	                }
	            }
	        }
	
	        /**
	         * Remove all event handlers.
	         */
	
	    }, {
	        key: "unAll",
	        value: function unAll() {
	            this.handlers = null;
	        }
	
	        /**
	         * Attach a handler to an event. The handler is executed at most once per
	         * event type.
	         *
	         * @param {string} event The event to listen to
	         * @param {function} handler The callback that is only to be called once
	         * @return {ListenerDescriptor}
	         */
	
	    }, {
	        key: "once",
	        value: function once(event, handler) {
	            var _this2 = this;
	
	            var fn = function fn() {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }
	
	                /*  eslint-disable no-invalid-this */
	                handler.apply(_this2, args);
	                /*  eslint-enable no-invalid-this */
	                setTimeout(function () {
	                    _this2.un(event, fn);
	                }, 0);
	            };
	            return this.on(event, fn);
	        }
	
	        /**
	         * Manually fire an event
	         *
	         * @param {string} event The event to fire manually
	         * @param {...any} args The arguments with which to call the listeners
	         */
	
	    }, {
	        key: "fireEvent",
	        value: function fireEvent(event) {
	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }
	
	            if (!this.handlers) {
	                return;
	            }
	            var handlers = this.handlers[event];
	            handlers && handlers.forEach(function (fn) {
	                fn.apply(undefined, args);
	            });
	        }
	    }]);
	
	    return Observer;
	}();
	
	exports.default = Observer;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getId;
	/**
	 * Get a random prefixed ID
	 *
	 * @returns {String} Random ID
	 */
	function getId() {
	  return 'wavesurfer_' + Math.random().toString(32).substring(2);
	}
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = max;
	/**
	 * Get the largest value
	 *
	 * @param   {Array} values Array of numbers
	 * @returns {Number} Largest number found
	 */
	function max(values) {
	    var largest = -Infinity;
	    Object.keys(values).forEach(function (i) {
	        if (values[i] > largest) {
	            largest = values[i];
	        }
	    });
	    return largest;
	}
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = min;
	/**
	 * Get the smallest value
	 *
	 * @param   {Array} values Array of numbers
	 * @returns {Number}       Smallest number found
	 */
	function min(values) {
	    var smallest = Number(Infinity);
	    Object.keys(values).forEach(function (i) {
	        if (values[i] < smallest) {
	            smallest = values[i];
	        }
	    });
	    return smallest;
	}
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = extend;
	/**
	 * Extend an object shallowly with others
	 *
	 * @param {Object} dest The target object
	 * @param {Object[]} sources The objects to use for extending
	 *
	 * @return {Object} Merged object
	 */
	function extend(dest) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	    }
	
	    sources.forEach(function (source) {
	        Object.keys(source).forEach(function (key) {
	            dest[key] = source[key];
	        });
	    });
	    return dest;
	}
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = style;
	/**
	 * Apply a map of styles to an element
	 *
	 * @param {HTMLElement} el The element that the styles will be applied to
	 * @param {Object} styles The map of propName: attribute, both are used as-is
	 *
	 * @return {HTMLElement} el
	 */
	function style(el, styles) {
	    Object.keys(styles).forEach(function (prop) {
	        if (el.style[prop] !== styles[prop]) {
	            el.style[prop] = styles[prop];
	        }
	    });
	    return el;
	}
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing. The function also has a property 'clear' 
	 * that is a function which will clear the timer to prevent previously scheduled executions. 
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */
	
	module.exports = function debounce(func, wait, immediate) {
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;
	
	  function later() {
	    var last = Date.now() - timestamp;
	
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	    }
	  };
	
	  var debounced = function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }
	
	    return result;
	  };
	
	  debounced.clear = function () {
	    if (timeout) {
	      clearTimeout(timeout);
	      timeout = null;
	    }
	  };
	
	  return debounced;
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lars.js.map