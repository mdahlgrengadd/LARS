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
	
	var _wavesLoaders = __webpack_require__(1);
	
	var wavesLoaders = _interopRequireWildcard(_wavesLoaders);
	
	var _wavesurfer = __webpack_require__(111);
	
	var _wavesurfer2 = _interopRequireDefault(_wavesurfer);
	
	var _backend_granular_player = __webpack_require__(113);
	
	var _backend_granular_player2 = _interopRequireDefault(_backend_granular_player);
	
	var _backend_segment_player = __webpack_require__(163);
	
	var _backend_segment_player2 = _interopRequireDefault(_backend_segment_player);
	
	var _index = __webpack_require__(165);
	
	var wavesAudio = _interopRequireWildcard(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var globalTransporter = new wavesAudio.Transport();
	
	//let wavesAudio = require('../waves-audio.umd.js');
	/* eslint-env browser */
	// 'use strict';
	//import * as wavesAudio from 'waves-audio';
	
	var globalPlayControl = new wavesAudio.PlayControl(globalTransporter);
	var Modulo = function Modulo(num, mod) {
	    return (num % mod + mod) % mod;
	};
	
	var globalTransportedEngines = [];
	
	// Init & load audio file
	document.addEventListener('DOMContentLoaded', function () {
	    var button1 = document.querySelector('[data-action="play1"]');
	    var button2 = document.querySelector('[data-action="stop1"]');
	
	    var loader = new wavesLoaders.SuperLoader(); // instantiate loader
	
	    var assets = ['./assets/piano_v2.json', './assets/footstomps_v2.json',
	    //'./assets/3_4_guitar-loop_v2.json',
	    './assets/strings_v2.json'];
	
	    /* Resampling Slider */
	    var r = document.createElement("INPUT");
	    r.setAttribute("type", "range");
	    r.min = -40;
	    r.max = 40;
	    r.step = 10;
	    r.value = 0;
	    document.getElementById('waveform').appendChild(r);
	
	    // load audio and marker files
	    loader.load(assets).then(function (jsonfiles) {
	        console.log(jsonfiles);
	
	        var sequenceData = {
	            "time": [0, 6, 12, 18, 24, 30, 36, 42, 48, 54],
	            "identifier": ["Am", "G", "C", "F", "Dm", "Am", "G", "C", "F", "Dm"],
	            "duration": [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
	            "offset": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	        };
	
	        /* Setup Sequencer */
	        var sequencer = new wavesAudio.SequencerEngine({
	            // buffer not used, but requires more changes in source to be able to remove.
	            // perhaps I will use it as a recording sink...
	            buffer: wavesAudio.audioContext.createBuffer(2, 22050, 44100),
	            positionArray: sequenceData.time,
	            durationArray: sequenceData.duration,
	            offsetArray: sequenceData.offset,
	            cyclic: false,
	            callback: function callback(seqIndex) {
	                // Ok, so right now just outputting random chords,
	                // but this will be controlled by the sequencer in the future...
	                console.log("Sequencer says: " + sequenceData.identifier[seqIndex]); // print sequencer chords, (not what's playing, though)
	                console.log(globalTransportedEngines);
	                var pos = globalTransporter.currentPosition;
	                var rand = Math.floor(Math.random() * 6);
	                var transportedObject1 = globalTransportedEngines[2];
	                transportedObject1.setBoundaries(pos, 6, rand * -12, 1);
	
	                var transportedObject2 = globalTransportedEngines[1];
	                transportedObject2.setBoundaries(pos, 6, 0, 1);
	
	                var transportedObject3 = globalTransportedEngines[0];
	                transportedObject3.setBoundaries(pos, 6, rand * -12, 1);
	            }
	
	        });
	
	        globalTransporter.add(sequencer);
	
	        /* Add wavesurfer object for each json-file */
	        //let index = 0;
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            var _loop = function _loop() {
	                var jsonitem = _step.value;
	
	                var waveform = document.createElement('div');
	                var demo = document.getElementById('waveform');
	                demo.appendChild(waveform);
	
	                var wavesurfer = _wavesurfer2.default.create({
	                    container: waveform,
	                    plugins: [
	
	                    //GranularBackend.create({
	                    _backend_segment_player2.default.create({
	                        transport: globalTransporter,
	                        playctrl: globalPlayControl,
	                        json: jsonitem
	                    })]
	                });
	                console.log(jsonitem);
	                var fname = jsonitem.file_metadata.identifiers.url;
	                console.log('FileName: ' + fname);
	                // 
	                wavesurfer.on('ready', function () {
	                    console.log('ready');
	
	                    //let engine = wavesurfer.backend.getEngine();
	                    //let transportedObject = globalTransporter.add(engine, 99999);
	
	
	                    var engine = wavesurfer.backend.getTransported();
	                    var transportedObject = globalTransporter.add(engine, 99999);
	                    console.log("adding engine at transport pos 99999");
	
	                    transportedObject.advancePosition = function (time, position, speed) {
	                        position = this.__offsetPosition + this.__engine.advancePosition(time, position - this.__offsetPosition, speed);
	
	                        if (speed > 0 && position < this.__endPosition || speed < 0 && position >= this.__startPosition) return position;
	
	                        // Returning Infinite causes a halt, again trying a big number instead.
	                        return 99999; //Infinity * speed;
	                    }.bind(transportedObject);
	
	                    globalTransportedEngines.push(transportedObject);
	                });
	
	                wavesurfer.load(fname);
	
	                /* Gain Slider */
	                var x = document.createElement("INPUT");
	                x.setAttribute("type", "range");
	                x.min = 0;
	                x.max = 1;
	                x.step = 0.01;
	                x.value = 1;
	                demo.insertBefore(x, waveform);
	                x.oninput = function () {
	                    wavesurfer.setVolume(x.value);
	                    //wavesurfer.backend.transportedSegmentEngine.polyCutoff = x.value;
	                };
	
	                r.addEventListener("mouseup", function () {
	                    wavesurfer.backend.transportedEngine.resampling = r.value;
	                    console.log(r.value);
	                }, false);
	            };
	
	            for (var _iterator = jsonfiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                _loop();
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
	
	        var slider = document.querySelector('#slider');
	
	        slider.oninput = function () {
	            var playBackRate = Number(slider.value) / 100.0;
	            globalPlayControl.speed = playBackRate * 2;
	            //globalPlayControl.seek(slider.value/10);
	        };
	
	        globalPlayControl.speed = 1.5 * 2;
	        slider.value = globalPlayControl.speed * 100 / 2;
	
	        button1.addEventListener('click', function () {
	
	            globalPlayControl.seek(0);
	            globalPlayControl.loop = true;
	            globalPlayControl.setLoopBoundaries(0, 60);
	            globalPlayControl.start();
	        });
	
	        button2.addEventListener('click', function () {
	            globalPlayControl.stop();
	        });
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _loader = __webpack_require__(2);
	
	Object.defineProperty(exports, 'Loader', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_loader).default;
	  }
	});
	
	var _audioBufferLoader = __webpack_require__(73);
	
	Object.defineProperty(exports, 'AudioBufferLoader', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_audioBufferLoader).default;
	  }
	});
	
	var _superLoader = __webpack_require__(110);
	
	Object.defineProperty(exports, 'SuperLoader', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_superLoader).default;
	  }
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(3);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/**
	 * Gets called if a parameter is missing and the expression
	 * specifying the default value is evaluated.
	 * @function
	 */
	function throwIfMissing() {
	  throw new Error('Missing parameter');
	}
	
	/**
	 * Promise based implementation of XMLHttpRequest Level 2 for GET method.
	 */
	
	var Loader = function () {
	  /**
	   * @constructs
	   * @param {string} [responseType=""] - responseType's value, "text" (equal to ""), "arraybuffer", "blob", "document" or "json"
	   */
	
	  function Loader() {
	    var responseType = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
	    (0, _classCallCheck3.default)(this, Loader);
	
	    /**
	     * @type {string}
	     */
	    this.responseType = responseType;
	    // rename to `onProgress` ?
	    /**
	     * @type {function}
	     */
	    this.progressCb = undefined;
	  }
	
	  /**
	   * Method for a promise based file loading.
	   * Internally switch between loadOne and loadAll.
	   * @public
	   * @param {(string|string[])} fileURLs - The URL(s) of the files to load. Accepts a URL pointing to the file location or an array of URLs.
	   * @returns {Promise}
	   */
	
	  (0, _createClass3.default)(Loader, [{
	    key: 'load',
	    value: function load() {
	      var fileURLs = arguments.length <= 0 || arguments[0] === undefined ? throwIfMissing() : arguments[0];
	
	      if (fileURLs === undefined) throw new Error('load needs at least a url to load');
	      if (Array.isArray(fileURLs)) {
	        return this.loadAll(fileURLs);
	      } else {
	        return this.loadOne(fileURLs);
	      }
	    }
	
	    /**
	     * Load a single file
	     * @private
	     * @param {string} fileURL - The URL of the file to load.
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'loadOne',
	    value: function loadOne(fileURL) {
	      return this.fileLoadingRequest(fileURL);
	    }
	
	    /**
	     * Load all files at once in a single array and return a Promise
	     * @private
	     * @param {string[]} fileURLs - The URLs array of the files to load.
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'loadAll',
	    value: function loadAll(fileURLs) {
	      var urlsCount = fileURLs.length,
	          promises = [];
	
	      for (var i = 0; i < urlsCount; ++i) {
	        promises.push(this.fileLoadingRequest(fileURLs[i], i));
	      }
	
	      return _promise2.default.all(promises);
	    }
	
	    /**
	     * Load a file asynchronously, return a Promise.
	     * @private
	     * @param {string} url - The URL of the file to load
	     * @param {string} [index] - The index of the file in the array of files to load
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'fileLoadingRequest',
	    value: function fileLoadingRequest(url, index) {
	      var _this = this;
	
	      var promise = new _promise2.default(function (resolve, reject) {
	        var request = new XMLHttpRequest();
	        request.open('GET', url, true);
	        request.index = index;
	        if (_this.responseType) {
	          request.responseType = _this.responseType;
	        } else {
	          var suffix = '.json';
	          if (url.indexOf(suffix, _this.length - suffix.length) !== -1) {
	            request.responseType = 'json';
	          } else {
	            request.responseType = 'arraybuffer';
	          }
	        }
	        request.addEventListener('load', function () {
	          // Test request.status value, as 404 will also get there
	          // Test request.status === 0 for cordova internal ajax calls
	          if (request.status === 200 || request.status === 304 || request.status === 0) {
	            // Hack for iOS 7, to remove as soon as possible
	            if (this.responseType === 'json' && typeof request.response === 'string') {
	              request.response = JSON.parse(request.response);
	            }
	            resolve(request.response);
	          } else {
	            reject(new Error(request.statusText));
	          }
	        });
	        request.addEventListener('progress', function (evt) {
	          if (_this.progressCallback) {
	            if (index !== undefined) {
	              _this.progressCallback({
	                index: index,
	                value: evt.loaded / evt.total,
	                loaded: evt.loaded,
	                total: evt.total
	              });
	            } else {
	              _this.progressCallback({
	                value: evt.loaded / evt.total,
	                loaded: evt.loaded,
	                total: evt.total
	              });
	            }
	          }
	        });
	        // Manage network errors
	        request.addEventListener('error', function () {
	          reject(new Error('Network Error'));
	        });
	
	        request.send();
	      });
	      return promise;
	    }
	
	    /**
	     * Get the callback function to get the progress of file loading process.
	     * This is only for the file loading progress as decodeAudioData doesn't
	     * expose a decode progress value.
	     * @type {function}
	     */
	
	  }, {
	    key: 'progressCallback',
	    get: function get() {
	      return this.progressCb;
	    }
	
	    /**
	     * Set the callback function to get the progress of file loading process.
	     * This is only for the file loading progress as decodeAudioData doesn't
	     * expose a decode progress value.
	     * @type {function} callback - The callback that handles the response.
	     */
	
	    , set: function set(callback) {
	      this.progressCb = callback;
	    }
	  }]);
	  return Loader;
	}();

	exports.default = Loader;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(50);
	__webpack_require__(54);
	module.exports = __webpack_require__(14).Promise;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $at = __webpack_require__(7)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(10)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(8),
	    defined = __webpack_require__(9);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LIBRARY = __webpack_require__(11),
	    $export = __webpack_require__(12),
	    redefine = __webpack_require__(27),
	    hide = __webpack_require__(17),
	    has = __webpack_require__(28),
	    Iterators = __webpack_require__(29),
	    $iterCreate = __webpack_require__(30),
	    setToStringTag = __webpack_require__(46),
	    getPrototypeOf = __webpack_require__(48),
	    ITERATOR = __webpack_require__(47)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	,
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';
	
	var returnThis = function returnThis() {
	  return this;
	};
	
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = true;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(13),
	    core = __webpack_require__(14),
	    ctx = __webpack_require__(15),
	    hide = __webpack_require__(17),
	    PROTOTYPE = 'prototype';
	
	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE],
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function F(a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0:
	              return new C();
	            case 1:
	              return new C(a);
	            case 2:
	              return new C(a, b);
	          }return new C(a, b, c);
	        }return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(18),
	    createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(22) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(19),
	    IE8_DOM_DEFINE = __webpack_require__(21),
	    toPrimitive = __webpack_require__(25),
	    dP = Object.defineProperty;
	
	exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(20);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = !__webpack_require__(22) && !__webpack_require__(23)(function () {
	  return Object.defineProperty(__webpack_require__(24)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(20),
	    document = __webpack_require__(13).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(17);

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var create = __webpack_require__(31),
	    descriptor = __webpack_require__(26),
	    setToStringTag = __webpack_require__(46),
	    IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(47)('iterator'), function () {
	  return this;
	});
	
	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(19),
	    dPs = __webpack_require__(32),
	    enumBugKeys = __webpack_require__(44),
	    IE_PROTO = __webpack_require__(41)('IE_PROTO'),
	    Empty = function Empty() {/* empty */},
	    PROTOTYPE = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(24)('iframe'),
	      i = enumBugKeys.length,
	      lt = '<',
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(45).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};
	
	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(18),
	    anObject = __webpack_require__(19),
	    getKeys = __webpack_require__(33);
	
	module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(34),
	    enumBugKeys = __webpack_require__(44);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = __webpack_require__(28),
	    toIObject = __webpack_require__(35),
	    arrayIndexOf = __webpack_require__(38)(false),
	    IE_PROTO = __webpack_require__(41)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(36),
	    defined = __webpack_require__(9);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(35),
	    toLength = __webpack_require__(39),
	    toIndex = __webpack_require__(40);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.15 ToLength
	var toInteger = __webpack_require__(8),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(8),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shared = __webpack_require__(42)('keys'),
	    uid = __webpack_require__(43);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(13),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(13).document && document.documentElement;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var def = __webpack_require__(18).f,
	    has = __webpack_require__(28),
	    TAG = __webpack_require__(47)('toStringTag');
	
	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var store = __webpack_require__(42)('wks'),
	    uid = __webpack_require__(43),
	    _Symbol = __webpack_require__(13).Symbol,
	    USE_SYMBOL = typeof _Symbol == 'function';
	
	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(28),
	    toObject = __webpack_require__(49),
	    IE_PROTO = __webpack_require__(41)('IE_PROTO'),
	    ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(9);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(51);
	var global = __webpack_require__(13),
	    hide = __webpack_require__(17),
	    Iterators = __webpack_require__(29),
	    TO_STRING_TAG = __webpack_require__(47)('toStringTag');
	
	for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	  var NAME = collections[i],
	      Collection = global[NAME],
	      proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addToUnscopables = __webpack_require__(52),
	    step = __webpack_require__(53),
	    Iterators = __webpack_require__(29),
	    toIObject = __webpack_require__(35);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(10)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function () {/* empty */};

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LIBRARY = __webpack_require__(11),
	    global = __webpack_require__(13),
	    ctx = __webpack_require__(15),
	    classof = __webpack_require__(55),
	    $export = __webpack_require__(12),
	    isObject = __webpack_require__(20),
	    aFunction = __webpack_require__(16),
	    anInstance = __webpack_require__(56),
	    forOf = __webpack_require__(57),
	    speciesConstructor = __webpack_require__(61),
	    task = __webpack_require__(62).set,
	    microtask = __webpack_require__(64)(),
	    PROMISE = 'Promise',
	    TypeError = global.TypeError,
	    process = global.process,
	    $Promise = global[PROMISE],
	    process = global.process,
	    isNode = classof(process) == 'process',
	    empty = function empty() {/* empty */},
	    Internal,
	    GenericPromiseCapability,
	    Wrapper;
	
	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1),
	        FakePromise = (promise.constructor = {})[__webpack_require__(47)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) {/* empty */}
	}();
	
	// helpers
	var sameConstructor = function sameConstructor(a, b) {
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function newPromiseCapability(C) {
	  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	};
	var perform = function perform(exec) {
	  try {
	    exec();
	  } catch (e) {
	    return { error: e };
	  }
	};
	var notify = function notify(promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v,
	        ok = promise._s == 1,
	        i = 0;
	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail,
	          resolve = reaction.resolve,
	          reject = reaction.reject,
	          domain = reaction.domain,
	          result,
	          then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) {
	      run(chain[i++]);
	    } // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function onUnhandled(promise) {
	  task.call(global, function () {
	    var value = promise._v,
	        abrupt,
	        handler,
	        console;
	    if (isUnhandled(promise)) {
	      abrupt = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    }promise._a = undefined;
	    if (abrupt) throw abrupt.error;
	  });
	};
	var isUnhandled = function isUnhandled(promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c,
	      i = 0,
	      reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  }return true;
	};
	var onHandleUnhandled = function onHandleUnhandled(promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function $reject(value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function $resolve(value) {
	  var promise = this,
	      then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};
	
	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor) {
	    this._c = []; // <- awaiting reactions
	    this._a = undefined; // <- checked in isUnhandled reactions
	    this._s = 0; // <- state
	    this._d = false; // <- done
	    this._v = undefined; // <- value
	    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false; // <- notify
	  };
	  Internal.prototype = __webpack_require__(65)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function PromiseCapability() {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(46)($Promise, PROMISE);
	__webpack_require__(66)(PROMISE);
	Wrapper = __webpack_require__(14)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this),
	        $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	    var capability = newPromiseCapability(this),
	        $$resolve = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(67)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        resolve = capability.resolve,
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      var values = [],
	          index = 0,
	          remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++,
	            alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(37),
	    TAG = __webpack_require__(47)('toStringTag')
	// ES3 wrong here
	,
	    ARG = cof(function () {
	  return arguments;
	}()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};
	
	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }return it;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ctx = __webpack_require__(15),
	    call = __webpack_require__(58),
	    isArrayIter = __webpack_require__(59),
	    anObject = __webpack_require__(19),
	    toLength = __webpack_require__(39),
	    getIterFn = __webpack_require__(60),
	    BREAK = {},
	    RETURN = {};
	var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator,
	      result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	_exports.BREAK = BREAK;
	_exports.RETURN = RETURN;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(19);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// check on default Array iterator
	var Iterators = __webpack_require__(29),
	    ITERATOR = __webpack_require__(47)('iterator'),
	    ArrayProto = Array.prototype;
	
	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classof = __webpack_require__(55),
	    ITERATOR = __webpack_require__(47)('iterator'),
	    Iterators = __webpack_require__(29);
	module.exports = __webpack_require__(14).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(19),
	    aFunction = __webpack_require__(16),
	    SPECIES = __webpack_require__(47)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor,
	      S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ctx = __webpack_require__(15),
	    invoke = __webpack_require__(63),
	    html = __webpack_require__(45),
	    cel = __webpack_require__(24),
	    global = __webpack_require__(13),
	    process = global.process,
	    setTask = global.setImmediate,
	    clearTask = global.clearImmediate,
	    MessageChannel = global.MessageChannel,
	    counter = 0,
	    queue = {},
	    ONREADYSTATECHANGE = 'onreadystatechange',
	    defer,
	    channel,
	    port;
	var run = function run() {
	  var id = +this;
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function listener(event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [],
	        i = 1;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }queue[++counter] = function () {
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(37)(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	    // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function defer(id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	    // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function defer(id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	    // Rest old browsers
	  } else {
	    defer = function defer(id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	
	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	                  var un = that === undefined;
	                  switch (args.length) {
	                                    case 0:
	                                                      return un ? fn() : fn.call(that);
	                                    case 1:
	                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
	                                    case 2:
	                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                    case 3:
	                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                    case 4:
	                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                  }return fn.apply(that, args);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(13),
	    macrotask = __webpack_require__(62).set,
	    Observer = global.MutationObserver || global.WebKitMutationObserver,
	    process = global.process,
	    Promise = global.Promise,
	    isNode = __webpack_require__(37)(process) == 'process';
	
	module.exports = function () {
	  var head, last, notify;
	
	  var flush = function flush() {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();else last = undefined;
	        throw e;
	      }
	    }last = undefined;
	    if (parent) parent.enter();
	  };
	
	  // Node.js
	  if (isNode) {
	    notify = function notify() {
	      process.nextTick(flush);
	    };
	    // browsers with MutationObserver
	  } else if (Observer) {
	    var toggle = true,
	        node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function notify() {
	      node.data = toggle = !toggle;
	    };
	    // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function notify() {
	      promise.then(flush);
	    };
	    // for other environments - macrotask based on:
	    // - setImmediate
	    // - MessageChannel
	    // - window.postMessag
	    // - onreadystatechange
	    // - setTimeout
	  } else {
	    notify = function notify() {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    }last = task;
	  };
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hide = __webpack_require__(17);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];else hide(target, key, src[key]);
	  }return target;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(13),
	    core = __webpack_require__(14),
	    dP = __webpack_require__(18),
	    DESCRIPTORS = __webpack_require__(22),
	    SPECIES = __webpack_require__(47)('species');
	
	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ITERATOR = __webpack_require__(47)('iterator'),
	    SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  Array.from(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}
	
	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR]();
	    iter.next = function () {
	      return { done: safe = true };
	    };
	    arr[ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(70);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(72);
	var $Object = __webpack_require__(14).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(12);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(22), 'Object', { defineProperty: __webpack_require__(18).f });

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(3);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _get2 = __webpack_require__(98);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _loader = __webpack_require__(2);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/**
	 * Gets called if a parameter is missing and the expression
	 * specifying the default value is evaluated.
	 * @function
	 */
	function throwIfMissing() {
	  throw new Error('Missing parameter');
	}
	
	var audioContext = void 0;
	
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
	try {
	  audioContext = new window.AudioContext();
	} catch (e) {}
	
	/**
	 * AudioBufferLoader
	 * Promise based implementation of XMLHttpRequest Level 2 for GET method and decode audio data for arraybuffer.
	 */
	
	var AudioBufferLoader = function (_Loader) {
	  (0, _inherits3.default)(AudioBufferLoader, _Loader);
	
	  /**
	   * Set the responseType to 'arraybuffer' and initialize options.
	   * @param {string} [responseType="arraybuffer"]
	   */
	
	  function AudioBufferLoader() {
	    var responseType = arguments.length <= 0 || arguments[0] === undefined ? 'arraybuffer' : arguments[0];
	    (0, _classCallCheck3.default)(this, AudioBufferLoader);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AudioBufferLoader).call(this, responseType));
	
	    _this.options = {
	      "wrapAroundExtension": 0
	    };
	    _this.responseType = responseType;
	    _this.audioContext = audioContext;
	    return _this;
	  }
	
	  /**
	   * Allow to set the audio context that should be used in order to decode
	   * the file and create the AudioBuffer.
	   * @param {AudioContext} audioContext
	   */
	
	  (0, _createClass3.default)(AudioBufferLoader, [{
	    key: 'setAudioContext',
	    value: function setAudioContext(audioContext) {
	      this.audioContext = audioContext;
	    }
	
	    /**
	     * Method for promise audio file loading and decoding.
	     * @param {(string|string[])} fileURLs - The URL(s) of the audio files to load. Accepts a URL pointing to the file location or an array of URLs.
	     * @param {{wrapAroundExtension: number}} [options] - Object with a wrapAroundExtension key which set the length, in seconds to be copied from the begining at the end of the returned AudioBuffer
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'load',
	    value: function load() {
	      var fileURLs = arguments.length <= 0 || arguments[0] === undefined ? throwIfMissing() : arguments[0];
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      this.options = options;
	      this.options.wrapAroundExtension = this.options.wrapAroundExtension || 0;
	      return (0, _get3.default)((0, _getPrototypeOf2.default)(AudioBufferLoader.prototype), 'load', this).call(this, fileURLs);
	    }
	
	    /**
	     * Load a single audio file, decode it in an AudioBuffer, return a Promise
	     * @private
	     * @param {string} fileURL - The URL of the audio file location to load.
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'loadOne',
	    value: function loadOne(fileURL) {
	      return (0, _get3.default)((0, _getPrototypeOf2.default)(AudioBufferLoader.prototype), 'loadOne', this).call(this, fileURL).then(this.decodeAudioData.bind(this), function (error) {
	        throw error;
	      });
	    }
	
	    /**
	     * Load all audio files at once in a single array, decode them in an array of AudioBuffers, and return a Promise.
	     * @private
	     * @param {string[]} fileURLs - The URLs array of the audio files to load.
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'loadAll',
	    value: function loadAll(fileURLs) {
	      var _this2 = this;
	
	      return (0, _get3.default)((0, _getPrototypeOf2.default)(AudioBufferLoader.prototype), 'loadAll', this).call(this, fileURLs).then(function (arraybuffers) {
	        return _promise2.default.all(arraybuffers.map(function (arraybuffer) {
	          return _this2.decodeAudioData.bind(_this2)(arraybuffer);
	        }));
	      }, function (error) {
	        throw error; // TODO: better error handler
	      });
	    }
	
	    /**
	     * Decode Audio Data, return a Promise
	     * @private
	     * @param {arraybuffer} - The arraybuffer of the loaded audio file to be decoded.
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'decodeAudioData',
	    value: function decodeAudioData(arraybuffer) {
	      var _this3 = this;
	
	      if (arraybuffer instanceof ArrayBuffer) {
	        return new _promise2.default(function (resolve, reject) {
	          _this3.audioContext.decodeAudioData(arraybuffer, // returned audio data array
	          function (buffer) {
	            if (_this3.options.wrapAroundExtension === 0) resolve(buffer);else resolve(_this3.__wrapAround(buffer));
	          }, function (error) {
	            reject(new Error("DecodeAudioData error"));
	          });
	        });
	      } else {
	        return new _promise2.default(function (resolve, reject) {
	          resolve(arraybuffer);
	        });
	      }
	    }
	
	    /**
	     * WrapAround, copy the begining input buffer to the end of an output buffer
	     * @private
	     * @param {arraybuffer} inBuffer {arraybuffer} - The input buffer
	     * @returns {arraybuffer} - The processed buffer (with frame copied from the begining to the end)
	     */
	
	  }, {
	    key: '__wrapAround',
	    value: function __wrapAround(inBuffer) {
	      var length = inBuffer.length + this.options.wrapAroundExtension * inBuffer.sampleRate;
	
	      var outBuffer = this.audioContext.createBuffer(inBuffer.numberOfChannels, length, inBuffer.sampleRate);
	      var arrayChData, arrayOutChData;
	
	      for (var channel = 0; channel < inBuffer.numberOfChannels; channel++) {
	        arrayChData = inBuffer.getChannelData(channel);
	        arrayOutChData = outBuffer.getChannelData(channel);
	
	        arrayOutChData.forEach(function (sample, index) {
	          if (index < inBuffer.length) arrayOutChData[index] = arrayChData[index];else arrayOutChData[index] = arrayChData[index - inBuffer.length];
	        });
	      }
	
	      return outBuffer;
	    }
	  }]);
	  return AudioBufferLoader;
	}(_loader2.default);

	exports.default = AudioBufferLoader;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(76);
	module.exports = __webpack_require__(14).Object.getPrototypeOf;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(49),
	    $getPrototypeOf = __webpack_require__(48);
	
	__webpack_require__(77)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(12),
	    core = __webpack_require__(14),
	    fails = __webpack_require__(23);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(79);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(80);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(83);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && _typeof2(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(6);
	__webpack_require__(50);
	module.exports = __webpack_require__(82).f('iterator');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.f = __webpack_require__(47);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(85);
	__webpack_require__(5);
	__webpack_require__(96);
	__webpack_require__(97);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var global = __webpack_require__(13),
	    has = __webpack_require__(28),
	    DESCRIPTORS = __webpack_require__(22),
	    $export = __webpack_require__(12),
	    redefine = __webpack_require__(27),
	    META = __webpack_require__(86).KEY,
	    $fails = __webpack_require__(23),
	    shared = __webpack_require__(42),
	    setToStringTag = __webpack_require__(46),
	    uid = __webpack_require__(43),
	    wks = __webpack_require__(47),
	    wksExt = __webpack_require__(82),
	    wksDefine = __webpack_require__(87),
	    keyOf = __webpack_require__(88),
	    enumKeys = __webpack_require__(89),
	    isArray = __webpack_require__(92),
	    anObject = __webpack_require__(19),
	    toIObject = __webpack_require__(35),
	    toPrimitive = __webpack_require__(25),
	    createDesc = __webpack_require__(26),
	    _create = __webpack_require__(31),
	    gOPNExt = __webpack_require__(93),
	    $GOPD = __webpack_require__(95),
	    $DP = __webpack_require__(18),
	    $keys = __webpack_require__(33),
	    gOPD = $GOPD.f,
	    dP = $DP.f,
	    gOPN = gOPNExt.f,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    PROTOTYPE = 'prototype',
	    HIDDEN = wks('_hidden'),
	    TO_PRIMITIVE = wks('toPrimitive'),
	    isEnum = {}.propertyIsEnumerable,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    OPSymbols = shared('op-symbols'),
	    ObjectProto = Object[PROTOTYPE],
	    USE_NATIVE = typeof $Symbol == 'function',
	    QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function get() {
	      return dP(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto,
	      names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function _Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(94).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(91).f = $propertyIsEnumerable;
	  __webpack_require__(90).f = $getOwnPropertySymbols;
	
	  if (DESCRIPTORS && !__webpack_require__(11)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });
	
	for (var symbols =
	// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	  wks(symbols[i++]);
	}for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	  wksDefine(symbols[i++]);
	}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it],
	        i = 1,
	        replacer,
	        $replacer;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var META = __webpack_require__(43)('meta'),
	    isObject = __webpack_require__(20),
	    has = __webpack_require__(28),
	    setDesc = __webpack_require__(18).f,
	    id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(23)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function setMeta(it) {
	  setDesc(it, META, { value: {
	      i: 'O' + ++id, // object ID
	      w: {} // weak collections IDs
	    } });
	};
	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }return it[META].i;
	};
	var getWeak = function getWeak(it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(13),
	    core = __webpack_require__(14),
	    LIBRARY = __webpack_require__(11),
	    wksExt = __webpack_require__(82),
	    defineProperty = __webpack_require__(18).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getKeys = __webpack_require__(33),
	    toIObject = __webpack_require__(35);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) {
	    if (O[key = keys[index++]] === el) return key;
	  }
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(33),
	    gOPS = __webpack_require__(90),
	    pIE = __webpack_require__(91);
	module.exports = function (it) {
	  var result = getKeys(it),
	      getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = pIE.f,
	        i = 0,
	        key;
	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(37);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(35),
	    gOPN = __webpack_require__(94).f,
	    toString = {}.toString;
	
	var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(34),
	    hiddenKeys = __webpack_require__(44).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pIE = __webpack_require__(91),
	    createDesc = __webpack_require__(26),
	    toIObject = __webpack_require__(35),
	    toPrimitive = __webpack_require__(25),
	    has = __webpack_require__(28),
	    IE8_DOM_DEFINE = __webpack_require__(21),
	    gOPD = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(87)('asyncIterator');

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(87)('observable');

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _getOwnPropertyDescriptor = __webpack_require__(99);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);
	
	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);
	
	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;
	
	    if (getter === undefined) {
	      return undefined;
	    }
	
	    return getter.call(receiver);
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(101);
	var $Object = __webpack_require__(14).Object;
	module.exports = function getOwnPropertyDescriptor(it, key) {
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(35),
	    $getOwnPropertyDescriptor = __webpack_require__(95).f;
	
	__webpack_require__(77)('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(103);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(107);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(79);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(105);
	module.exports = __webpack_require__(14).Object.setPrototypeOf;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(12);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(106).set });

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(20),
	    anObject = __webpack_require__(19);
	var check = function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  function (test, buggy, set) {
	    try {
	      set = __webpack_require__(15)(Function.call, __webpack_require__(95).f(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(109);
	var $Object = __webpack_require__(14).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $export = __webpack_require__(12);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(31) });

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _audioBufferLoader = __webpack_require__(73);
	
	var _audioBufferLoader2 = _interopRequireDefault(_audioBufferLoader);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/**
	 * SuperLoader
	 * Helper to load multiple type of files, and get them in their useful type, json for json files, AudioBuffer for audio files.
	 */
	
	var SuperLoader = function (_AudioBufferLoader) {
	  (0, _inherits3.default)(SuperLoader, _AudioBufferLoader);
	
	  /**
	   * Use composition to setup appropriate file loaders
	   */
	
	  function SuperLoader() {
	    (0, _classCallCheck3.default)(this, SuperLoader);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SuperLoader).call(this, null));
	    // bypass AudioBufferLoader constructor. This is bad but it works.
	  }
	
	  return SuperLoader;
	}(_audioBufferLoader2.default);

	exports.default = SuperLoader;

/***/ },
/* 111 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)(module)))

/***/ },
/* 112 */
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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _webaudio_subclassed = __webpack_require__(114);
	
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
	
	        console.log('Custom backend constructor');
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _wavesAudio = __webpack_require__(115);
	
	var wavesAudio = _interopRequireWildcard(_wavesAudio);
	
	var _webaudio = __webpack_require__(153);
	
	var _webaudio2 = _interopRequireDefault(_webaudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PLAYING = 'playing';
	var PAUSED = 'paused';
	var FINISHED = 'finished';
	
	var MyWebAudio = function (_WebAudio) {
	    _inherits(MyWebAudio, _WebAudio);
	
	    function MyWebAudio(params) {
	        _classCallCheck(this, MyWebAudio);
	
	        return _possibleConstructorReturn(this, (MyWebAudio.__proto__ || Object.getPrototypeOf(MyWebAudio)).call(this, params));
	    }
	
	    _createClass(MyWebAudio, [{
	        key: 'getAudioContext',
	        value: function getAudioContext() {
	            if (!window.WaveSurferAudioContext) {
	
	                window.WaveSurferAudioContext = wavesAudio.audioContext;
	            }
	
	            return window.WaveSurferAudioContext;
	        }
	    }, {
	        key: 'addOnAudioProcess',
	        value: function addOnAudioProcess() {
	            var my = this;
	
	            this.scriptNode.onaudioprocess = function (e) {
	                var time = my.getCurrentTime();
	
	                if (time >= my.getDuration() || time < 0) {
	                    my.setState(FINISHED);
	                    my.fireEvent('pause');
	                } else if (time >= my.scheduledPause && my.playControl && !my.playControl.loop) {
	                    my.setState(PAUSED);
	                    my.fireEvent('pause');
	                } else if (my.state === my.states[PLAYING]) {
	                    my.fireEvent('audioprocess', time);
	                }
	            };
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            console.log('FIXME: Do cleanup of wavesjs etc...');
	            _get(MyWebAudio.prototype.__proto__ || Object.getPrototypeOf(MyWebAudio.prototype), 'destroy', this).call(this);
	        }
	    }, {
	        key: 'getTransported',
	        value: function getTransported() {
	            return this.transportedEngine;
	        }
	    }, {
	        key: 'createSource',
	        value: function createSource() {
	            var self = this;
	            /*
	                    function setupSegmentPlayer() {
	                         let audioContext = wavesAudio.audioContext;
	                        let loader = new self.wavesLoaders.SuperLoader(); // instantiate loader
	                         let assets = [
	                            "./assets/3_4_Guitar30bpm96khz32bit.wav",
	                            "./assets/3_4_guitar-loop.json"
	                        ];
	                         // load audio and marker files
	                        loader.load(assets).then(function(loaded) {
	                            let audioBuffer = loaded[0];
	                            let markerBuffer = loaded[1];
	                             self.scheduledSegmentEngine.connect(WaveSurfer.WebAudio.audioContext.destination);
	                             // create transport with play control and transported segment engine
	                            let _chord = markerBuffer.VI;
	                            let loopstart = _chord[0];
	                            let loopend = _chord[_chord.length - 1];
	                             self.transportedSegmentEngine = new wavesAudio.SegmentEngine({
	                                buffer: audioBuffer,
	                                positionArray: _chord,
	                                durationArray: markerBuffer.duration,
	                                offsetArray: markerBuffer.offset,
	                                durationRel: 0.95,
	                                releaseAbs: 0.005,
	                                releaseRel: 0.005,
	                                cyclic: true,
	                             });
	                             self.transportedSegmentEngine.connect(WaveSurfer.WebAudio.audioContext.destination);
	                            //self.transport.add(self.transportedSegmentEngine);
	                              let playControl = new wavesAudio.PlayControl(self.transportedSegmentEngine);
	                             console.log(loopend);
	                            playControl.setLoopBoundaries(loopstart, loopend);
	                            playControl.loop = true;
	                              playControl.speed = 1.0 * 2.0;
	                            playControl.seek(loopstart);
	                            playControl.start();
	                        });
	                      }
	            */
	            /*
	                    function setupMetronome() {
	                        self.metronome = new wavesAudio.Metronome();
	                        self.metronome.period = 60 / 86.49997514133682;
	                        self.metronome.clickFreq = 666;
	                        self.metronome.phase = 0;
	                        self.metronome.gain = 0;
	                        self.metronome.connect(WaveSurfer.WebAudio.audioContext.destination);
	                    }
	            */
	            /**
	             * Setup granular
	             */
	            function setupGranular() {
	
	                // get scheduler and create scheduled granular engine
	                self.scheduler = wavesAudio.getScheduler();
	                self.scheduledGranularEngine = new wavesAudio.GranularEngine({
	                    buffer: self.source.buffer
	                });
	                //self.scheduledGranularEngine.connect(self.analyser);
	
	                // create transport with play control and transported granular engine
	                //console.log(self.transportedEngine);
	                self.transportedEngine = new wavesAudio.GranularEngine({
	                    buffer: self.source.buffer,
	                    speed: 0.5,
	                    periodAbs: 0.0003,
	                    periodRel: 10,
	                    periodVar: 0.0,
	                    position: 0.0,
	                    positionVar: 0.001,
	                    durationAbs: 0.005,
	                    durationRel: 20, /*!!!!!!!!!!!*/
	                    attackAbs: 0.01,
	                    attackRel: 0.0,
	                    releaseAbs: 0.0,
	                    releaseRel: 1.00,
	                    releaseShape: 'lin',
	                    expRampOffset: 0.0000,
	                    resampling: 0,
	                    resamplingVar: 0,
	                    gain: 1,
	                    centered: true,
	                    cyclic: true
	
	                });
	
	                self.transportedEngine.connect(self.analyser);
	                //self.transport.add(self.transportedEngine);
	
	                //self.scheduler.add(self.scheduledGranularEngine);
	
	            }
	
	            this.disconnectSource();
	            this.source = this.ac.createBufferSource();
	
	            //adjust for old browsers.
	            this.source.start = this.source.start || this.source.noteGrainOn;
	            this.source.stop = this.source.stop || this.source.noteOff;
	
	            this.source.playbackRate.value = this.playbackRate;
	            this.source.buffer = this.buffer;
	            // _MD_ // this.source.connect(this.analyser);
	
	
	            // create transport and add engines
	            this.transport = new wavesAudio.Transport();
	
	            setupGranular();
	            //setupMetronome();
	            //setupSegmentPlayer();
	
	
	            //this.transport.add(this.metronome);
	
	            var scheduler = wavesAudio.getScheduler();
	            //scheduler.add(this.metronome);
	
	
	            // create play control
	            this.playControl = new wavesAudio.PlayControl(this.transport);
	            this.playControl.speed = 0.5;
	        }
	    }, {
	        key: 'seekTo',
	        value: function seekTo(start, end) {
	            var doLoop = true;
	
	            if (start == null) {
	                start = this.getCurrentTime();
	                if (start >= this.getDuration()) {
	                    start = 0;
	                }
	            }
	            if (end == null) {
	                end = this.getDuration();
	                doLoop = false;
	            }
	            //this.startPosition = start;
	            this.startPosition = 0;
	            this.lastPlay = this.ac.currentTime;
	
	            if (this.state === this.states[FINISHED]) {
	                this.setState(PAUSED);
	            }
	            // When loop is true, an undesired behavior makes seeking
	            // beyond loopEnd change the position so that it fits inside
	            // loop region. This ugly fix turns off looping when seeking
	            // outside loop region. (Also when playing in reverse (speed < 0),
	            // the same happens at loopStart).
	            if (!doLoop) {
	                this.playControl.setLoopBoundaries(0, this.getDuration());
	            } else {
	                this.playControl.setLoopBoundaries(start, end);
	            }
	
	            this.playControl.seek(start);
	            this.playControl.loop = doLoop;
	
	            this.scheduledPause = end;
	
	            //console.log("start: " + start + " end: " + end);
	
	            return {
	                start: start,
	                end: end
	            };
	        }
	    }, {
	        key: 'getPlayedTime',
	        value: function getPlayedTime() {
	            this.scheduledGranularEngine.position = this.playControl.currentPosition;
	            return this.playControl.currentPosition; //.mod(this.getDuration());
	            //return (this.ac.currentTime - this.lastPlay) * this.playbackRate * this.playControl.speed;
	        }
	    }, {
	        key: 'play',
	        value: function play(start, end) {
	            if (!this.buffer) {
	                return;
	            }
	
	            // need to re-create source on each playback
	            //this.createSource();
	
	            var adjustedTime = this.seekTo(start, end);
	
	            start = adjustedTime.start;
	            end = adjustedTime.end;
	
	            this.scheduledPause = end;
	
	            //this.source.start(0, start, end - start);
	            //play();
	
	            //scheduler.add(this.transportedEngine);
	
	            this.playControl.start();
	            this.playControl.seek(start);
	
	            if (this.ac.state == 'suspended') {
	                this.ac.resume && this.ac.resume();
	            }
	
	            this.setState(PLAYING);
	
	            this.fireEvent('play');
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.scheduledPause = null;
	
	            this.startPosition += this.getPlayedTime();
	            //this.source && this.source.stop(0);
	
	            this.playControl.pause();
	            //scheduler.remove(this.transportedEngine);
	
	
	            this.setState(PAUSED);
	
	            this.fireEvent('pause');
	        }
	    }, {
	        key: 'setPlaybackRate',
	        value: function setPlaybackRate(value) {
	            value = value || 1;
	
	            if (this.playControl) {
	                this.playControl.speed = value;
	            }
	
	            if (this.isPaused()) {
	                this.playbackRate = value;
	            } else {
	                //this.pause();
	                this.playbackRate = value;
	                //this.play();
	            }
	        }
	    }]);
	
	    return MyWebAudio;
	}(_webaudio2.default);
	
	exports.default = MyWebAudio;
	module.exports = exports['default'];

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _audioContext = __webpack_require__(116);
	
	Object.defineProperty(exports, 'audioContext', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_audioContext).default;
	  }
	});
	
	var _timeEngine = __webpack_require__(117);
	
	Object.defineProperty(exports, 'TimeEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_timeEngine).default;
	  }
	});
	
	var _audioTimeEngine = __webpack_require__(118);
	
	Object.defineProperty(exports, 'AudioTimeEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_audioTimeEngine).default;
	  }
	});
	
	var _priorityQueue = __webpack_require__(119);
	
	Object.defineProperty(exports, 'PriorityQueue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_priorityQueue).default;
	  }
	});
	
	var _schedulingQueue = __webpack_require__(120);
	
	Object.defineProperty(exports, 'SchedulingQueue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_schedulingQueue).default;
	  }
	});
	
	var _granularEngine = __webpack_require__(132);
	
	Object.defineProperty(exports, 'GranularEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_granularEngine).default;
	  }
	});
	
	var _metronome = __webpack_require__(133);
	
	Object.defineProperty(exports, 'Metronome', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_metronome).default;
	  }
	});
	
	var _playerEngine = __webpack_require__(134);
	
	Object.defineProperty(exports, 'PlayerEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_playerEngine).default;
	  }
	});
	
	var _segmentEngine = __webpack_require__(135);
	
	Object.defineProperty(exports, 'SegmentEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_segmentEngine).default;
	  }
	});
	
	var _playControl = __webpack_require__(136);
	
	Object.defineProperty(exports, 'PlayControl', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_playControl).default;
	  }
	});
	
	var _transport = __webpack_require__(149);
	
	Object.defineProperty(exports, 'Transport', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_transport).default;
	  }
	});
	
	var _scheduler = __webpack_require__(143);
	
	Object.defineProperty(exports, 'Scheduler', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_scheduler).default;
	  }
	});
	
	var _simpleScheduler = __webpack_require__(148);
	
	Object.defineProperty(exports, 'SimpleScheduler', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_simpleScheduler).default;
	  }
	});
	
	var _factories = __webpack_require__(137);
	
	Object.defineProperty(exports, 'getScheduler', {
	  enumerable: true,
	  get: function get() {
	    return _factories.getScheduler;
	  }
	});
	Object.defineProperty(exports, 'getSimpleScheduler', {
	  enumerable: true,
	  get: function get() {
	    return _factories.getSimpleScheduler;
	  }
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 116 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// exposes a single instance
	var audioContext = null;
	
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	
	if (AudioContext) {
	  audioContext = new AudioContext();
	
	  if (/(iPhone|iPad)/i.test(navigator.userAgent) && audioContext.sampleRate < 44100) {
	    var buffer = audioContext.createBuffer(1, 1, 44100);
	    var dummy = audioContext.createBufferSource();
	    dummy.buffer = buffer;
	    dummy.connect(audioContext.destination);
	    dummy.start(0);
	    dummy.disconnect();
	  }
	}
	
	exports.default = audioContext;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/**
	 * @class TimeEngine
	 */
	
	var TimeEngine = function () {
	  function TimeEngine() {
	    (0, _classCallCheck3.default)(this, TimeEngine);
	
	    this.master = null;
	    this.outputNode = null;
	  }
	
	  (0, _createClass3.default)(TimeEngine, [{
	    key: "resetTime",
	    value: function resetTime() {
	      var time = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
	
	      if (this.master) this.master.resetEngineTime(this, time);
	    }
	
	    /**
	     * Transported interface
	     *   - syncPosition(time, position, speed), called to reposition TimeEngine, returns next position
	     *   - advancePosition(time, position, speed), called to generate next event at given time and position, returns next position
	     */
	
	  }, {
	    key: "resetPosition",
	    value: function resetPosition() {
	      var position = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
	
	      if (this.master) this.master.resetEnginePosition(this, position);
	    }
	
	    /**
	     * Speed-controlled interface
	     *   - syncSpeed(time, position, speed, ), called to
	     */
	
	  }, {
	    key: "currentTime",
	    get: function get() {
	      if (this.master) return this.master.currentTime;
	
	      return undefined;
	    }
	  }, {
	    key: "currentPosition",
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return undefined;
	    }
	
	    /**
	     * Scheduled interface
	     *   - advanceTime(time), called to generate next event at given time, returns next time
	     */
	
	  }], [{
	    key: "implementsScheduled",
	    value: function implementsScheduled(engine) {
	      return engine.advanceTime && engine.advanceTime instanceof Function;
	    }
	  }, {
	    key: "implementsTransported",
	    value: function implementsTransported(engine) {
	      return engine.syncPosition && engine.syncPosition instanceof Function && engine.advancePosition && engine.advancePosition instanceof Function;
	    }
	  }, {
	    key: "implementsSpeedControlled",
	    value: function implementsSpeedControlled(engine) {
	      return engine.syncSpeed && engine.syncSpeed instanceof Function;
	    }
	  }]);
	  return TimeEngine;
	}();

	exports.default = TimeEngine;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _timeEngine = __webpack_require__(117);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	var _audioContext = __webpack_require__(116);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/**
	 * @class AudioTimeEngine
	 */
	
	var AudioTimeEngine = function (_TimeEngine) {
	  (0, _inherits3.default)(AudioTimeEngine, _TimeEngine);
	
	  function AudioTimeEngine() {
	    var audioContext = arguments.length <= 0 || arguments[0] === undefined ? _audioContext2.default : arguments[0];
	    (0, _classCallCheck3.default)(this, AudioTimeEngine);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AudioTimeEngine).call(this));
	
	    _this.audioContext = audioContext;
	    _this.outputNode = null;
	    return _this;
	  }
	
	  (0, _createClass3.default)(AudioTimeEngine, [{
	    key: 'connect',
	    value: function connect(target) {
	      this.outputNode.connect(target);
	      return this;
	    }
	  }, {
	    key: 'disconnect',
	    value: function disconnect(connection) {
	      this.outputNode.disconnect(connection);
	      return this;
	    }
	  }]);
	  return AudioTimeEngine;
	}(_timeEngine2.default);

	exports.default = AudioTimeEngine;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	// works by reference
	function swap(arr, i1, i2) {
	  var tmp = arr[i1];
	  arr[i1] = arr[i2];
	  arr[i2] = tmp;
	}
	
	// https://jsperf.com/js-for-loop-vs-array-indexof/346
	function indexOf(arr, el) {
	  var l = arr.length;
	  // ignore first element as it can't be a entry
	  for (var i = 1; i < l; i++) {
	    if (arr[i] === el) {
	      return i;
	    }
	  }
	
	  return -1;
	}
	
	/**
	 * Define if `time1` should be lower in the topography than `time2`.
	 * Is dynamically affected to the priority queue according to handle `min` and `max` heap.
	 * @param {Number} time1
	 * @param {Number} time2
	 * @return {Boolean}
	 */
	var _isLowerMaxHeap = function _isLowerMaxHeap(time1, time2) {
	  return time1 < time2;
	};
	
	var _isLowerMinHeap = function _isLowerMinHeap(time1, time2) {
	  return time1 > time2;
	};
	
	/**
	 * Define if `time1` should be higher in the topography than `time2`.
	 * Is dynamically affected to the priority queue according to handle `min` and `max` heap.
	 * @param {Number} time1
	 * @param {Number} time2
	 * @return {Boolean}
	 */
	var _isHigherMaxHeap = function _isHigherMaxHeap(time1, time2) {
	  return time1 > time2;
	};
	
	var _isHigherMinHeap = function _isHigherMinHeap(time1, time2) {
	  return time1 < time2;
	};
	
	var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
	
	/**
	 * Priority queue implementing a binary heap.
	 * Acts as a min heap by default, can be dynamically changed to a max heap by setting `reverse` to true.
	 */
	
	var PriorityQueue = function () {
	  /**
	   * @param {String} [accessor='time'] - The attribute of the entries that should be used as the priority value. This attribute must be a number.
	   * @param {Number} [heapLength=100] - The size of the array used to create the heap.
	   */
	
	  function PriorityQueue() {
	    var heapLength = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
	    (0, _classCallCheck3.default)(this, PriorityQueue);
	
	    /**
	     * @type {Number}
	     * A pointer to the first empty index of the heap.
	     */
	    this._currentLength = 1;
	
	    /**
	     * An array of the sorted indexes of the entries, the actual heap. Ignore the index 0.
	     * @type {Array}
	     */
	    this._heap = new Array(heapLength + 1);
	
	    /**
	     * Define the type of the queue: `min` heap if `false`, `max` heap if `true`
	     * @type {Boolean}
	     */
	    this._reverse = null;
	
	    // initialize compare functions
	    this.reverse = false;
	  }
	
	  /**
	   * Return the time of the first element in the binary heap.
	   * @returns {Number}
	   */
	
	  (0, _createClass3.default)(PriorityQueue, [{
	    key: "_bubbleUp",
	
	    /**
	     * Fix the heap by moving an entry to a new upper position.
	     * @param {Number} startIndex - The index of the entry to move.
	     */
	    value: function _bubbleUp(startIndex) {
	      var entry = this._heap[startIndex];
	
	      var index = startIndex;
	      var parentIndex = Math.floor(index / 2);
	      var parent = this._heap[parentIndex];
	
	      while (parent && this._isHigher(entry.queueTime, parent.queueTime)) {
	        swap(this._heap, index, parentIndex);
	
	        index = parentIndex;
	        parentIndex = Math.floor(index / 2);
	        parent = this._heap[parentIndex];
	      }
	    }
	
	    /**
	     * Fix the heap by moving an entry to a new lower position.
	     * @param {Number} startIndex - The index of the entry to move.
	     */
	
	  }, {
	    key: "_bubbleDown",
	    value: function _bubbleDown(startIndex) {
	      var entry = this._heap[startIndex];
	
	      var index = startIndex;
	      var c1index = index * 2;
	      var c2index = c1index + 1;
	      var child1 = this._heap[c1index];
	      var child2 = this._heap[c2index];
	
	      while (child1 && this._isLower(entry.queueTime, child1.queueTime) || child2 && this._isLower(entry.queueTime, child2.queueTime)) {
	        // swap with the minimum child
	        var targetIndex = void 0;
	
	        if (child2) targetIndex = this._isHigher(child1.queueTime, child2.queueTime) ? c1index : c2index;else targetIndex = c1index;
	
	        swap(this._heap, index, targetIndex);
	
	        // update to find next children
	        index = targetIndex;
	        c1index = index * 2;
	        c2index = c1index + 1;
	        child1 = this._heap[c1index];
	        child2 = this._heap[c2index];
	      }
	    }
	
	    /**
	     * Build the heap from bottom up.
	     */
	
	  }, {
	    key: "buildHeap",
	    value: function buildHeap() {
	      // find the index of the last internal node
	      // @todo - make sure that's the right way to do.
	      var maxIndex = Math.floor((this._currentLength - 1) / 2);
	
	      for (var i = maxIndex; i > 0; i--) {
	        this._bubbleDown(i);
	      }
	    }
	
	    /**
	     * Insert a new object in the binary heap, and sort it.
	     * @param {Object} entry - Entry to insert.
	     * @param {Number} time - Time at which the entry should be orderer.
	     * @returns {Number} - Time of the first entry in the heap.
	     */
	
	  }, {
	    key: "insert",
	    value: function insert(entry, time) {
	      if (Math.abs(time) !== POSITIVE_INFINITY) {
	        entry.queueTime = time;
	        // add the new entry at the end of the heap
	        this._heap[this._currentLength] = entry;
	        // bubble it up
	        this._bubbleUp(this._currentLength);
	        this._currentLength += 1;
	
	        return this.time;
	      }
	
	      entry.queueTime = undefined;
	      return this.remove(entry);
	    }
	
	    /**
	     * Move an entry to a new position.
	     * @param {Object} entry - Entry to move.
	     * @param {Number} time - Time at which the entry should be orderer.
	     * @return {Number} - Time of first entry in the heap.
	     */
	
	  }, {
	    key: "move",
	    value: function move(entry, time) {
	      if (Math.abs(time) !== POSITIVE_INFINITY) {
	        var index = indexOf(this._heap, entry);
	
	        if (index !== -1) {
	          entry.queueTime = time;
	          // define if the entry should be bubbled up or down
	          var parent = this._heap[Math.floor(index / 2)];
	
	          if (parent && this._isHigher(time, parent.queueTime)) this._bubbleUp(index);else this._bubbleDown(index);
	        }
	
	        return this.time;
	      }
	
	      entry.queueTime = undefined;
	      return this.remove(entry);
	    }
	
	    /**
	     * This is broken, assuming bubbling down only is false
	     * Remove an entry from the heap and fix the heap.
	     * @param {Object} entry - Entry to remove.
	     * @return {Number} - Time of first entry in the heap.
	     */
	
	  }, {
	    key: "remove",
	    value: function remove(entry) {
	      // find the index of the entry
	      var index = indexOf(this._heap, entry);
	
	      if (index !== -1) {
	        var lastIndex = this._currentLength - 1;
	
	        // if the entry is the last one
	        if (index === lastIndex) {
	          // remove the element from heap
	          this._heap[lastIndex] = undefined;
	          // update current length
	          this._currentLength = lastIndex;
	
	          return this.time;
	        } else {
	          // swap with the last element of the heap
	          swap(this._heap, index, lastIndex);
	          // remove the element from heap
	          this._heap[lastIndex] = undefined;
	
	          if (index === 1) {
	            this._bubbleDown(1);
	          } else {
	            // bubble the (ex last) element up or down according to its new context
	            var _entry = this._heap[index];
	            var parent = this._heap[Math.floor(index / 2)];
	
	            if (parent && this._isHigher(_entry.queueTime, parent.queueTime)) this._bubbleUp(index);else this._bubbleDown(index);
	          }
	        }
	
	        // update current length
	        this._currentLength = lastIndex;
	      }
	
	      return this.time;
	    }
	
	    /**
	     * Clear the queue.
	     */
	
	  }, {
	    key: "clear",
	    value: function clear() {
	      this._currentLength = 1;
	      this._heap = new Array(this._heap.length);
	    }
	  }, {
	    key: "has",
	    value: function has(entry) {
	      return this._heap.indexOf(entry) !== -1;
	    }
	  }, {
	    key: "time",
	    get: function get() {
	      if (this._currentLength > 1) return this._heap[1].queueTime;
	
	      return Infinity;
	    }
	
	    /**
	     * Returns the entry of the first element in the binary heap.
	     * @returns {Number}
	     */
	
	  }, {
	    key: "head",
	    get: function get() {
	      return this._heap[1];
	    }
	
	    /**
	     * Change the order of the queue, rebuild the heap with the existing entries.
	     * @type {Boolean}
	     */
	
	  }, {
	    key: "reverse",
	    set: function set(value) {
	      if (value !== this._reverse) {
	        this._reverse = value;
	
	        if (this._reverse === true) {
	          this._isLower = _isLowerMaxHeap;
	          this._isHigher = _isHigherMaxHeap;
	        } else {
	          this._isLower = _isLowerMinHeap;
	          this._isHigher = _isHigherMinHeap;
	        }
	
	        this.buildHeap();
	      }
	    },
	    get: function get() {
	      return this._reverse;
	    }
	  }]);
	  return PriorityQueue;
	}();

	exports.default = PriorityQueue;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _set = __webpack_require__(121);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _priorityQueue = __webpack_require__(119);
	
	var _priorityQueue2 = _interopRequireDefault(_priorityQueue);
	
	var _timeEngine = __webpack_require__(117);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	var _audioContext = __webpack_require__(116);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/**
	 * @class SchedulingQueue
	 */
	
	var SchedulingQueue = function (_TimeEngine) {
	  (0, _inherits3.default)(SchedulingQueue, _TimeEngine);
	
	  function SchedulingQueue() {
	    (0, _classCallCheck3.default)(this, SchedulingQueue);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SchedulingQueue).call(this));
	
	    _this.__queue = new _priorityQueue2.default();
	    _this.__engines = new _set2.default();
	    return _this;
	  }
	
	  // TimeEngine 'scheduled' interface
	
	
	  (0, _createClass3.default)(SchedulingQueue, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var engine = this.__queue.head;
	      var nextEngineTime = engine.advanceTime(time);
	
	      if (!nextEngineTime) {
	        engine.master = null;
	        this.__engines.delete(engine);
	        this.__queue.remove(engine);
	      } else {
	        this.__queue.move(engine, nextEngineTime);
	      }
	
	      return this.__queue.time;
	    }
	
	    // TimeEngine master method to be implemented by derived class
	
	  }, {
	    key: 'defer',
	
	    // call a function at a given time
	    value: function defer(fun) {
	      var time = arguments.length <= 1 || arguments[1] === undefined ? this.currentTime : arguments[1];
	
	      if (!(fun instanceof Function)) throw new Error("object cannot be defered by scheduler");
	
	      this.add({
	        advanceTime: function advanceTime(time) {
	          fun(time);
	        } }, // make sur that the advanceTime method does not returm anything
	      time);
	    }
	
	    // add a time engine to the scheduler
	
	  }, {
	    key: 'add',
	    value: function add(engine) {
	      var time = arguments.length <= 1 || arguments[1] === undefined ? this.currentTime : arguments[1];
	
	      if (!_timeEngine2.default.implementsScheduled(engine)) throw new Error("object cannot be added to scheduler");
	
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      engine.master = this;
	
	      // add to engines and queue
	      this.__engines.add(engine);
	      var nextTime = this.__queue.insert(engine, time);
	
	      // reschedule queue
	      this.resetTime(nextTime);
	    }
	
	    // remove a time engine from the queue
	
	  }, {
	    key: 'remove',
	    value: function remove(engine) {
	      if (engine.master !== this) throw new Error("object has not been added to this scheduler");
	
	      engine.master = null;
	
	      // remove from array and queue
	      this.__engines.delete(engine);
	      var nextTime = this.__queue.remove(engine);
	
	      // reschedule queue
	      this.resetTime(nextTime);
	    }
	
	    // reset next engine time
	
	  }, {
	    key: 'resetEngineTime',
	    value: function resetEngineTime(engine) {
	      var time = arguments.length <= 1 || arguments[1] === undefined ? this.currentTime : arguments[1];
	
	      if (engine.master !== this) throw new Error("object has not been added to this scheduler");
	
	      var nextTime = void 0;
	
	      if (this.__queue.has(engine)) nextTime = this.__queue.move(engine, time);else nextTime = this.__queue.insert(engine, time);
	
	      this.resetTime(nextTime);
	    }
	
	    // check whether a given engine is scheduled
	
	  }, {
	    key: 'has',
	    value: function has(engine) {
	      return this.__engines.has(engine);
	    }
	
	    // clear queue
	
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.__queue.clear();
	      this.__engines.clear();
	      this.resetTime(Infinity);
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return 0;
	    }
	  }]);
	  return SchedulingQueue;
	}(_timeEngine2.default); /**
	                          * SchedulingQueue base class
	                          * http://wavesjs.github.io/audio/#audio-scheduling-queue
	                          *
	                          * Norbert.Schnell@ircam.fr
	                          * Copyright 2014, 2015 IRCAM – Centre Pompidou
	                          */

	exports.default = SchedulingQueue;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(50);
	__webpack_require__(123);
	__webpack_require__(129);
	module.exports = __webpack_require__(14).Set;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var strong = __webpack_require__(124);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(125)('Set', function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(18).f,
	    create = __webpack_require__(31),
	    redefineAll = __webpack_require__(65),
	    ctx = __webpack_require__(15),
	    anInstance = __webpack_require__(56),
	    defined = __webpack_require__(9),
	    forOf = __webpack_require__(57),
	    $iterDefine = __webpack_require__(10),
	    step = __webpack_require__(53),
	    setSpecies = __webpack_require__(66),
	    DESCRIPTORS = __webpack_require__(22),
	    fastKey = __webpack_require__(86).fastKey,
	    SIZE = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function getEntry(that, key) {
	  // fast case
	  var index = fastKey(key),
	      entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined; // first entry
	      that._l = undefined; // last entry
	      that[SIZE] = 0; // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function _delete(key) {
	        var that = this,
	            entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n,
	              prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */) {
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
	            entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) {
	            entry = entry.p;
	          }
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    if (DESCRIPTORS) dP(C.prototype, 'size', {
	      get: function get() {
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var entry = getEntry(that, key),
	        prev,
	        index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	      // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key, // <- key
	        v: value, // <- value
	        p: prev = that._l, // <- previous entry
	        n: undefined, // <- next entry
	        r: false // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    }return that;
	  },
	  getEntry: getEntry,
	  setStrong: function setStrong(C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = iterated; // target
	      this._k = kind; // kind
	      this._l = undefined; // previous
	    }, function () {
	      var that = this,
	          kind = that._k,
	          entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) {
	        entry = entry.p;
	      } // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(13),
	    $export = __webpack_require__(12),
	    meta = __webpack_require__(86),
	    fails = __webpack_require__(23),
	    hide = __webpack_require__(17),
	    redefineAll = __webpack_require__(65),
	    forOf = __webpack_require__(57),
	    anInstance = __webpack_require__(56),
	    isObject = __webpack_require__(20),
	    setToStringTag = __webpack_require__(46),
	    dP = __webpack_require__(18).f,
	    each = __webpack_require__(126)(0),
	    DESCRIPTORS = __webpack_require__(22);
	
	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME],
	      C = Base,
	      ADDER = IS_MAP ? 'set' : 'add',
	      proto = C && C.prototype,
	      O = {};
	  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function (target, iterable) {
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base();
	      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
	        anInstance(this, C, KEY);
	        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if ('size' in proto) dP(C.prototype, 'size', {
	      get: function get() {
	        return this._c.size;
	      }
	    });
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);
	
	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(15),
	    IObject = __webpack_require__(36),
	    toObject = __webpack_require__(49),
	    toLength = __webpack_require__(39),
	    asc = __webpack_require__(127);
	module.exports = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1,
	      IS_FILTER = TYPE == 2,
	      IS_SOME = TYPE == 3,
	      IS_EVERY = TYPE == 4,
	      IS_FIND_INDEX = TYPE == 6,
	      NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
	      create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this),
	        self = IObject(O),
	        f = ctx(callbackfn, that, 3),
	        length = toLength(self.length),
	        index = 0,
	        result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
	        val,
	        res;
	    for (; length > index; index++) {
	      if (NO_HOLES || index in self) {
	        val = self[index];
	        res = f(val, index, O);
	        if (TYPE) {
	          if (IS_MAP) result[index] = res; // map
	          else if (res) switch (TYPE) {
	              case 3:
	                return true; // some
	              case 5:
	                return val; // find
	              case 6:
	                return index; // findIndex
	              case 2:
	                result.push(val); // filter
	            } else if (IS_EVERY) return false; // every
	        }
	      }
	    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(128);
	
	module.exports = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(20),
	    isArray = __webpack_require__(92),
	    SPECIES = __webpack_require__(47)('species');
	
	module.exports = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }return C === undefined ? Array : C;
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(12);
	
	$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(130)('Set') });

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(55),
	    from = __webpack_require__(131);
	module.exports = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var forOf = __webpack_require__(57);
	
	module.exports = function (iter, ITERATOR) {
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _audioTimeEngine = __webpack_require__(118);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	/**
	 * @class GranularEngine
	 */
	
	var GranularEngine = function (_AudioTimeEngine) {
	  (0, _inherits3.default)(GranularEngine, _AudioTimeEngine);
	
	  /**
	   * @constructor
	   * @param {AudioBuffer} buffer initial audio buffer for granular synthesis
	   *
	   * The engine implements the "scheduled" interface.
	   * The grain position (grain onset or center time in the audio buffer) is optionally
	   * determined by the engine's currentPosition attribute.
	   */
	
	  function GranularEngine() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, GranularEngine);
	
	    /**
	     * Audio buffer
	     * @type {AudioBuffer}
	     */
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GranularEngine).call(this, options.audioContext));
	
	    _this.buffer = optOrDef(options.buffer, null);
	
	    /**
	     * Absolute grain period in sec
	     * @type {Number}
	     */
	    _this.periodAbs = optOrDef(options.periodAbs, 0.01);
	
	    /**
	     * Grain period relative to absolute duration
	     * @type {Number}
	     */
	    _this.periodRel = optOrDef(options.periodRel, 0);
	
	    /**
	     * Amout of random grain period variation relative to grain period
	     * @type {Number}
	     */
	    _this.periodVar = optOrDef(options.periodVar, 0);
	
	    /**
	     * Grain position (onset time in audio buffer) in sec
	     * @type {Number}
	     */
	    _this.position = optOrDef(options.position, 0);
	
	    /**
	     * Amout of random grain position variation in sec
	     * @type {Number}
	     */
	    _this.positionVar = optOrDef(options.positionVar, 0.003);
	
	    /**
	     * Absolute grain duration in sec
	     * @type {Number}
	     */
	    _this.durationAbs = optOrDef(options.durationAbs, 0.1); // absolute grain duration
	
	    /**
	     * Grain duration relative to grain period (overlap)
	     * @type {Number}
	     */
	    _this.durationRel = optOrDef(options.durationRel, 0);
	
	    /**
	     * Absolute attack time in sec
	     * @type {Number}
	     */
	    _this.attackAbs = optOrDef(options.attackAbs, 0);
	
	    /**
	     * Attack time relative to grain duration
	     * @type {Number}
	     */
	    _this.attackRel = optOrDef(options.attackRel, 0.5);
	
	    /**
	     * Shape of attack
	     * @type {String} 'lin' for linear ramp, 'exp' for exponential
	     */
	    _this.attackShape = optOrDef(options.attackShape, 'lin');
	
	    /**
	     * Absolute release time in sec
	     * @type {Number}
	     */
	    _this.releaseAbs = optOrDef(options.releaseAbs, 0);
	
	    /**
	     * Release time relative to grain duration
	     * @type {Number}
	     */
	    _this.releaseRel = optOrDef(options.releaseRel, 0.5);
	
	    /**
	     * Shape of release
	     * @type {String} 'lin' for linear ramp, 'exp' for exponential
	     */
	    _this.releaseShape = optOrDef(options.releaseShape, 'lin');
	
	    /**
	     * Offset (start/end value) for exponential attack/release
	     * @type {Number} offset
	     */
	    _this.expRampOffset = optOrDef(options.expRampOffset, 0.0001);
	
	    /**
	     * Grain resampling in cent
	     * @type {Number}
	     */
	    _this.resampling = optOrDef(options.resampling, 0);
	
	    /**
	     * Amout of random resampling variation in cent
	     * @type {Number}
	     */
	    _this.resamplingVar = optOrDef(options.resamplingVar, 0);
	
	    /**
	     * Linear gain factor
	     * @type {Number}
	     */
	    _this.gain = optOrDef(options.gain, 1);
	
	    /**
	     * Whether the grain position refers to the center of the grain (or the beginning)
	     * @type {Bool}
	     */
	    _this.centered = optOrDef(options.centered, true);
	
	    /**
	     * Whether the audio buffer and grain position are considered as cyclic
	     * @type {Bool}
	     */
	    _this.cyclic = optOrDef(options.cyclic, false);
	
	    /**
	     * Portion at the end of the audio buffer that has been copied from the beginning to assure cyclic behavior
	     * @type {Number}
	     */
	    _this.wrapAroundExtension = optOrDef(options.wrapAroundExtension, 0);
	
	    _this.outputNode = _this.audioContext.createGain();
	    return _this;
	  }
	
	  /**
	   * Get buffer duration (excluding wrapAroundExtension)
	   * @return {Number} current buffer duration
	   */
	
	  (0, _createClass3.default)(GranularEngine, [{
	    key: 'advanceTime',
	
	    // TimeEngine method (scheduled interface)
	    value: function advanceTime(time) {
	      time = Math.max(time, this.audioContext.currentTime);
	      return time + this.trigger(time);
	    }
	
	    /**
	     * Trigger a grain
	     * @param {Number} time grain synthesis audio time
	     * @return {Number} period to next grain
	     *
	     * This function can be called at any time (whether the engine is scheduled or not)
	     * to generate a single grain according to the current grain parameters.
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(time) {
	      var audioContext = this.audioContext;
	      var grainTime = time || audioContext.currentTime;
	      var grainPeriod = this.periodAbs;
	      var grainPosition = this.currentPosition;
	      var grainDuration = this.durationAbs;
	
	      if (this.buffer) {
	        var resamplingRate = 1.0;
	
	        // calculate resampling
	        if (this.resampling !== 0 || this.resamplingVar > 0) {
	          var randomResampling = (Math.random() - 0.5) * 2.0 * this.resamplingVar;
	          resamplingRate = Math.pow(2.0, (this.resampling + randomResampling) / 1200.0);
	        }
	
	        grainPeriod += this.periodRel * grainDuration;
	        grainDuration += this.durationRel * grainPeriod;
	
	        // grain period randon variation
	        if (this.periodVar > 0.0) grainPeriod += 2.0 * (Math.random() - 0.5) * this.periodVar * grainPeriod;
	
	        // center grain
	        if (this.centered) grainPosition -= 0.5 * grainDuration;
	
	        // randomize grain position
	        if (this.positionVar > 0) grainPosition += (2.0 * Math.random() - 1) * this.positionVar;
	
	        var bufferDuration = this.bufferDuration;
	
	        // wrap or clip grain position and duration into buffer duration
	        if (grainPosition < 0 || grainPosition >= bufferDuration) {
	          if (this.cyclic) {
	            var cycles = grainPosition / bufferDuration;
	            grainPosition = (cycles - Math.floor(cycles)) * bufferDuration;
	
	            if (grainPosition + grainDuration > this.buffer.duration) grainDuration = this.buffer.duration - grainPosition;
	          } else {
	            if (grainPosition < 0) {
	              grainTime -= grainPosition;
	              grainDuration += grainPosition;
	              grainPosition = 0;
	            }
	
	            if (grainPosition + grainDuration > bufferDuration) grainDuration = bufferDuration - grainPosition;
	          }
	        }
	
	        // make grain
	        if (this.gain > 0 && grainDuration >= 0.001) {
	          // make grain envelope
	          var envelope = audioContext.createGain();
	          var attack = this.attackAbs + this.attackRel * grainDuration;
	          var release = this.releaseAbs + this.releaseRel * grainDuration;
	
	          if (attack + release > grainDuration) {
	            var factor = grainDuration / (attack + release);
	            attack *= factor;
	            release *= factor;
	          }
	
	          var attackEndTime = grainTime + attack;
	          var grainEndTime = grainTime + grainDuration / resamplingRate;
	          var releaseStartTime = grainEndTime - release;
	
	          envelope.gain.value = 0;
	
	          if (this.attackShape === 'lin') {
	            envelope.gain.setValueAtTime(0.0, grainTime);
	            envelope.gain.linearRampToValueAtTime(this.gain, attackEndTime);
	          } else {
	            envelope.gain.setValueAtTime(this.expRampOffset, grainTime);
	            envelope.gain.exponentialRampToValueAtTime(this.gain, attackEndTime);
	          }
	
	          if (releaseStartTime > attackEndTime) envelope.gain.setValueAtTime(this.gain, releaseStartTime);
	
	          if (this.releaseShape === 'lin') {
	            envelope.gain.linearRampToValueAtTime(0.0, grainEndTime);
	          } else {
	            envelope.gain.exponentialRampToValueAtTime(this.expRampOffset, grainEndTime);
	          }
	
	          envelope.connect(this.outputNode);
	
	          // make source
	          var source = audioContext.createBufferSource();
	
	          source.buffer = this.buffer;
	          source.playbackRate.value = resamplingRate;
	          source.connect(envelope);
	
	          source.start(grainTime, grainPosition);
	          source.stop(grainEndTime);
	        }
	      }
	
	      return grainPeriod;
	    }
	  }, {
	    key: 'bufferDuration',
	    get: function get() {
	      if (this.buffer) {
	        var bufferDuration = this.buffer.duration;
	
	        if (this.wrapAroundExtension) bufferDuration -= this.wrapAroundExtension;
	
	        return bufferDuration;
	      }
	
	      return 0;
	    }
	
	    // TimeEngine attribute
	
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return this.position;
	    }
	  }]);
	  return GranularEngine;
	}(_audioTimeEngine2.default);

	exports.default = GranularEngine;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _audioTimeEngine = __webpack_require__(118);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	var Metronome = function (_AudioTimeEngine) {
	  (0, _inherits3.default)(Metronome, _AudioTimeEngine);
	
	  function Metronome() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Metronome);
	
	    /**
	     * Metronome period
	     * @type {Number}
	     */
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Metronome).call(this, options.audioContext));
	
	    _this.__period = optOrDef(options.period, 1);
	
	    /**
	     * Metronome click frequency
	     * @type {Number}
	     */
	    _this.clickFreq = optOrDef(options.clickFreq, 600);
	
	    /**
	     * Metronome click attack time
	     * @type {Number}
	     */
	    _this.clickAttack = optOrDef(options.clickAttack, 0.002);
	
	    /**
	     * Metronome click release time
	     * @type {Number}
	     */
	    _this.clickRelease = optOrDef(options.clickRelease, 0.098);
	
	    _this.__lastTime = 0;
	    _this.__phase = 0;
	
	    _this.__gainNode = _this.audioContext.createGain();
	    _this.__gainNode.gain.value = optOrDef(options.gain, 1);
	
	    _this.outputNode = _this.__gainNode;
	    return _this;
	  }
	
	  // TimeEngine method (scheduled interface)
	
	
	  (0, _createClass3.default)(Metronome, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      this.trigger(time);
	      this.__lastTime = time;
	      return time + this.__period;
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      if (this.__period > 0) {
	        var nextPosition = (Math.floor(position / this.__period) + this.__phase) * this.__period;
	
	        if (speed > 0 && nextPosition < position) nextPosition += this.__period;else if (speed < 0 && nextPosition > position) nextPosition -= this.__period;
	
	        return nextPosition;
	      }
	
	      return Infinity * speed;
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      this.trigger(time);
	
	      if (speed < 0) return position - this.__period;
	
	      return position + this.__period;
	    }
	
	    /**
	     * Trigger metronome click
	     * @param {Number} time metronome click synthesis audio time
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(time) {
	      var audioContext = this.audioContext;
	      var clickAttack = this.clickAttack;
	      var clickRelease = this.clickRelease;
	
	      var env = audioContext.createGain();
	      env.gain.value = 0.0;
	      env.gain.setValueAtTime(0, time);
	      env.gain.linearRampToValueAtTime(1.0, time + clickAttack);
	      env.gain.exponentialRampToValueAtTime(0.0000001, time + clickAttack + clickRelease);
	      env.gain.setValueAtTime(0, time);
	      env.connect(this.outputNode);
	
	      var osc = audioContext.createOscillator();
	      osc.frequency.value = this.clickFreq;
	      osc.start(time);
	      osc.stop(time + clickAttack + clickRelease);
	      osc.connect(env);
	    }
	
	    /**
	     * Set gain
	     * @param {Number} value linear gain factor
	     */
	
	  }, {
	    key: 'gain',
	    set: function set(value) {
	      this.__gainNode.gain.value = value;
	    }
	
	    /**
	     * Get gain
	     * @return {Number} current gain
	     */
	
	    , get: function get() {
	      return this.__gainNode.gain.value;
	    }
	
	    /**
	     * Set period parameter
	     * @param {Number} period metronome period
	     */
	
	  }, {
	    key: 'period',
	    set: function set(period) {
	      this.__period = period;
	
	      var master = this.master;
	
	      if (master) {
	        if (master.resetEngineTime) master.resetEngineTime(this, this.__lastTime + period);else if (master.resetEnginePosition) master.resetEnginePosition(this);
	      }
	    }
	
	    /**
	     * Get period parameter
	     * @return {Number} value of period parameter
	     */
	
	    , get: function get() {
	      return this.__period;
	    }
	
	    /**
	     * Set phase parameter (available only when 'transported')
	     * @param {Number} phase metronome phase [0, 1[
	     */
	
	  }, {
	    key: 'phase',
	    set: function set(phase) {
	      this.__phase = phase - Math.floor(phase);
	
	      var master = this.master;
	
	      if (master && master.resetEnginePosition !== undefined) master.resetEnginePosition(this);
	    }
	
	    /**
	     * Get phase parameter
	     * @return {Number} value of phase parameter
	     */
	
	    , get: function get() {
	      return this.__phase;
	    }
	  }]);
	  return Metronome;
	}(_audioTimeEngine2.default);

	exports.default = Metronome;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _audioTimeEngine = __webpack_require__(118);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	var PlayerEngine = function (_AudioTimeEngine) {
	  (0, _inherits3.default)(PlayerEngine, _AudioTimeEngine);
	
	  function PlayerEngine() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, PlayerEngine);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PlayerEngine).call(this, options.audioContext));
	
	    _this.transport = null; // set when added to transporter
	
	    /**
	     * Audio buffer
	     * @type {AudioBuffer}
	     */
	    _this.buffer = optOrDef(options.buffer, null);
	
	    /**
	     * Fade time for chaining segments (e.g. in start, stop, and seek)
	     * @type {AudioBuffer}
	     */
	    _this.fadeTime = optOrDef(options.fadeTime, 0.005);
	
	    _this.__time = 0;
	    _this.__position = 0;
	    _this.__speed = 0;
	
	    _this.__bufferSource = null;
	    _this.__envNode = null;
	
	    _this.__gainNode = _this.audioContext.createGain();
	    _this.__gainNode.gain.value = optOrDef(options.gain, 1);
	
	    _this.__cyclic = optOrDef(options.cyclic, false);
	
	    _this.outputNode = _this.__gainNode;
	    return _this;
	  }
	
	  (0, _createClass3.default)(PlayerEngine, [{
	    key: '__start',
	    value: function __start(time, position, speed) {
	      var audioContext = this.audioContext;
	
	      if (this.buffer) {
	        var bufferDuration = this.buffer.duration;
	
	        if (this.__cyclic && (position < 0 || position >= bufferDuration)) {
	          var phase = position / bufferDuration;
	          position = (phase - Math.floor(phase)) * bufferDuration;
	        }
	
	        if (position >= 0 && position < bufferDuration && speed > 0) {
	          this.__envNode = audioContext.createGain();
	          this.__envNode.gain.setValueAtTime(0, time);
	          this.__envNode.gain.linearRampToValueAtTime(1, time + this.fadeTime);
	          this.__envNode.connect(this.__gainNode);
	
	          this.__bufferSource = audioContext.createBufferSource();
	          this.__bufferSource.buffer = this.buffer;
	          this.__bufferSource.playbackRate.value = speed;
	          this.__bufferSource.loop = this.__cyclic;
	          this.__bufferSource.loopStart = 0;
	          this.__bufferSource.loopEnd = bufferDuration;
	          this.__bufferSource.start(time, position);
	          this.__bufferSource.connect(this.__envNode);
	        }
	      }
	    }
	  }, {
	    key: '__halt',
	    value: function __halt(time) {
	      if (this.__bufferSource) {
	        this.__envNode.gain.cancelScheduledValues(time);
	        this.__envNode.gain.setValueAtTime(this.__envNode.gain.value, time);
	        this.__envNode.gain.linearRampToValueAtTime(0, time + this.fadeTime);
	        this.__bufferSource.stop(time + this.fadeTime);
	
	        this.__bufferSource = null;
	        this.__envNode = null;
	      }
	    }
	
	    // TimeEngine method (speed-controlled interface)
	
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      var seek = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	      var lastSpeed = this.__speed;
	
	      if (speed !== lastSpeed || seek) {
	        if (seek || lastSpeed * speed < 0) {
	          this.__halt(time);
	          this.__start(time, position, speed);
	        } else if (lastSpeed === 0 || seek) {
	          this.__start(time, position, speed);
	        } else if (speed === 0) {
	          this.__halt(time);
	        } else if (this.__bufferSource) {
	          this.__bufferSource.playbackRate.setValueAtTime(speed, time);
	        }
	
	        this.__speed = speed;
	      }
	    }
	
	    /**
	     * Set whether the audio buffer is considered as cyclic
	     * @param {Bool} cyclic whether the audio buffer is considered as cyclic
	     */
	
	  }, {
	    key: 'cyclic',
	    set: function set(cyclic) {
	      if (cyclic !== this.__cyclic) {
	        var time = this.currentTime;
	        var position = this.currentosition;
	
	        this.__halt(time);
	        this.__cyclic = cyclic;
	
	        if (this.__speed !== 0) this.__start(time, position, this.__speed);
	      }
	    }
	
	    /**
	     * Get whether the audio buffer is considered as cyclic
	     * @return {Bool} whether the audio buffer is considered as cyclic
	     */
	
	    , get: function get() {
	      return this.__cyclic;
	    }
	
	    /**
	     * Set gain
	     * @param {Number} value linear gain factor
	     */
	
	  }, {
	    key: 'gain',
	    set: function set(value) {
	      var time = this.currentTime;
	      this.__gainNode.cancelScheduledValues(time);
	      this.__gainNode.setValueAtTime(this.__gainNode.gain.value, time);
	      this.__gainNode.linearRampToValueAtTime(0, time + this.fadeTime);
	    }
	
	    /**
	     * Get gain
	     * @return {Number} current gain
	     */
	
	    , get: function get() {
	      return this.__gainNode.gain.value;
	    }
	
	    /**
	     * Get buffer duration
	     * @return {Number} current buffer duration
	     */
	
	  }, {
	    key: 'bufferDuration',
	    get: function get() {
	      if (this.buffer) return this.buffer.duration;
	
	      return 0;
	    }
	  }]);
	  return PlayerEngine;
	}(_audioTimeEngine2.default);

	exports.default = PlayerEngine;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _audioTimeEngine = __webpack_require__(118);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	function getCurrentOrPreviousIndex(sortedArray, value) {
	  var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	  var size = sortedArray.length;
	
	  if (size > 0) {
	    var firstVal = sortedArray[0];
	    var lastVal = sortedArray[size - 1];
	
	    if (value < firstVal) index = -1;else if (value >= lastVal) index = size - 1;else {
	      if (index < 0 || index >= size) index = Math.floor((size - 1) * (value - firstVal) / (lastVal - firstVal));
	
	      while (sortedArray[index] > value) {
	        index--;
	      }while (sortedArray[index + 1] <= value) {
	        index++;
	      }
	    }
	  }
	
	  return index;
	}
	
	function getCurrentOrNextIndex(sortedArray, value) {
	  var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	  var size = sortedArray.length;
	
	  if (size > 0) {
	    var firstVal = sortedArray[0];
	    var lastVal = sortedArray[size - 1];
	
	    if (value <= firstVal) index = 0;else if (value >= lastVal) index = size;else {
	      if (index < 0 || index >= size) index = Math.floor((size - 1) * (value - firstVal) / (lastVal - firstVal));
	
	      while (sortedArray[index] < value) {
	        index++;
	      }while (sortedArray[index + 1] >= value) {
	        index--;
	      }
	    }
	  }
	
	  return index;
	}
	
	/**
	 * @class SegmentEngine
	 */
	
	var SegmentEngine = function (_AudioTimeEngine) {
	  (0, _inherits3.default)(SegmentEngine, _AudioTimeEngine);
	
	  /**
	   * @constructor
	   * @param {AudioBuffer} buffer initial audio buffer for granular synthesis
	   *
	   * The engine implements the "scheduled" and "transported" interfaces.
	   * When "scheduled", the engine  generates segments more or less periodically
	   * (controlled by the periodAbs, periodRel, and perioVar attributes).
	   * When "transported", the engine generates segments at the position of their onset time.
	   */
	
	  function SegmentEngine() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, SegmentEngine);
	
	    /**
	     * Audio buffer
	     * @type {AudioBuffer}
	     */
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SegmentEngine).call(this, options.audioContext));
	
	    _this.buffer = optOrDef(options.buffer, null);
	
	    /**
	     * Absolute segment period in sec
	     * @type {Number}
	     */
	    _this.periodAbs = optOrDef(options.periodAbs, 0);
	
	    /**
	     * Segment period relative to inter-segment distance
	     * @type {Number}
	     */
	    _this.periodRel = optOrDef(options.periodRel, 1);
	
	    /**
	     * Amout of random segment period variation relative to segment period
	     * @type {Number}
	     */
	    _this.periodVar = optOrDef(options.periodVar, 0);
	
	    /**
	     * Array of segment positions (onset times in audio buffer) in sec
	     * @type {Number}
	     */
	    _this.positionArray = optOrDef(options.positionArray, [0.0]);
	
	    /**
	     * Amout of random segment position variation in sec
	     * @type {Number}
	     */
	    _this.positionVar = optOrDef(options.positionVar, 0);
	
	    /**
	     * Array of segment durations in sec
	     * @type {Number}
	     */
	    _this.durationArray = optOrDef(options.durationArray, [0.0]);
	
	    /**
	     * Absolute segment duration in sec
	     * @type {Number}
	     */
	    _this.durationAbs = optOrDef(options.durationAbs, 0);
	
	    /**
	     * Segment duration relative to given segment duration or inter-segment distance
	     * @type {Number}
	     */
	    _this.durationRel = optOrDef(options.durationRel, 1);
	
	    /**
	     * Array of segment offsets in sec
	     * @type {Number}
	     *
	     * offset > 0: the segment's reference position is after the given segment position
	     * offset < 0: the given segment position is the segment's reference position and the duration has to be corrected by the offset
	     */
	    _this.offsetArray = optOrDef(options.offsetArray, [0.0]);
	
	    /**
	     * Absolute segment offset in sec
	     * @type {Number}
	     */
	    _this.offsetAbs = optOrDef(options.offsetAbs, -0.005);
	
	    /**
	     * Segment offset relative to segment duration
	     * @type {Number}
	     */
	    _this.offsetRel = optOrDef(options.offsetRel, 0);
	
	    /**
	     * Time by which all segments are delayed (especially to realize segment offsets)
	     * @type {Number}
	     */
	    _this.delay = optOrDef(options.delay, 0.005);
	
	    /**
	     * Absolute attack time in sec
	     * @type {Number}
	     */
	    _this.attackAbs = optOrDef(options.attackAbs, 0.005);
	
	    /**
	     * Attack time relative to segment duration
	     * @type {Number}
	     */
	    _this.attackRel = optOrDef(options.attackRel, 0);
	
	    /**
	     * Absolute release time in sec
	     * @type {Number}
	     */
	    _this.releaseAbs = optOrDef(options.releaseAbs, 0.005);
	
	    /**
	     * Release time relative to segment duration
	     * @type {Number}
	     */
	    _this.releaseRel = optOrDef(options.releaseRel, 0);
	
	    /**
	     * Segment resampling in cent
	     * @type {Number}
	     */
	    _this.resampling = optOrDef(options.resampling, 0);
	
	    /**
	     * Amout of random resampling variation in cent
	     * @type {Number}
	     */
	    _this.resamplingVar = optOrDef(options.resamplingVar, 0);
	
	    /**
	     * Linear gain factor
	     * @type {Number}
	     */
	    _this.gain = optOrDef(options.gain, 1);
	
	    /**
	     * Index of the segment to synthesize (i.e. of this.positionArray/durationArray/offsetArray)
	     * @type {Number}
	     */
	    _this.segmentIndex = optOrDef(options.segmentIndex, 0);
	
	    /**
	     * Whether the audio buffer and segment indices are considered as cyclic
	     * @type {Bool}
	     */
	    _this.cyclic = optOrDef(options.cyclic, false);
	    _this.__cyclicOffset = 0;
	
	    /**
	     * Portion at the end of the audio buffer that has been copied from the beginning to assure cyclic behavior
	     * @type {Number}
	     */
	    _this.wrapAroundExtension = optOrDef(options.wrapAroundExtension, 0);
	
	    _this.outputNode = _this.audioContext.createGain();
	    return _this;
	  }
	
	  /**
	   * Get buffer duration (excluding wrapAroundExtension)
	   * @return {Number} current buffer duration
	   */
	
	  (0, _createClass3.default)(SegmentEngine, [{
	    key: 'advanceTime',
	
	    // TimeEngine method (transported interface)
	    value: function advanceTime(time) {
	      time = Math.max(time, this.audioContext.currentTime);
	      return time + this.trigger(time);
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      var index = this.segmentIndex;
	      var cyclicOffset = 0;
	      var bufferDuration = this.bufferDuration;
	
	      if (this.cyclic) {
	        var cycles = position / bufferDuration;
	
	        cyclicOffset = Math.floor(cycles) * bufferDuration;
	        position -= cyclicOffset;
	      }
	
	      if (speed > 0) {
	        index = getCurrentOrNextIndex(this.positionArray, position);
	
	        if (index >= this.positionArray.length) {
	          index = 0;
	          cyclicOffset += bufferDuration;
	
	          if (!this.cyclic) return Infinity;
	        }
	      } else if (speed < 0) {
	        index = getCurrentOrPreviousIndex(this.positionArray, position);
	
	        if (index < 0) {
	          index = this.positionArray.length - 1;
	          cyclicOffset -= bufferDuration;
	
	          if (!this.cyclic) return -Infinity;
	        }
	      } else {
	        return Infinity;
	      }
	
	      this.segmentIndex = index;
	      this.__cyclicOffset = cyclicOffset;
	
	      return cyclicOffset + this.positionArray[index];
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      var index = this.segmentIndex;
	      var cyclicOffset = this.__cyclicOffset;
	
	      this.trigger(time);
	
	      if (speed > 0) {
	        index++;
	
	        if (index >= this.positionArray.length) {
	          index = 0;
	          cyclicOffset += this.bufferDuration;
	
	          if (!this.cyclic) return Infinity;
	        }
	      } else {
	        index--;
	
	        if (index < 0) {
	          index = this.positionArray.length - 1;
	          cyclicOffset -= this.bufferDuration;
	
	          if (!this.cyclic) return -Infinity;
	        }
	      }
	
	      this.segmentIndex = index;
	      this.__cyclicOffset = cyclicOffset;
	
	      return cyclicOffset + this.positionArray[index];
	    }
	
	    /**
	     * Trigger a segment
	     * @param {Number} time segment synthesis audio time
	     * @return {Number} period to next segment
	     *
	     * This function can be called at any time (whether the engine is scheduled/transported or not)
	     * to generate a single segment according to the current segment parameters.
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(time) {
	      var audioContext = this.audioContext;
	      var segmentTime = (time || audioContext.currentTime) + this.delay;
	      var segmentPeriod = this.periodAbs;
	      var segmentIndex = this.segmentIndex;
	
	      if (this.buffer) {
	        var segmentPosition = 0.0;
	        var segmentDuration = 0.0;
	        var segmentOffset = 0.0;
	        var resamplingRate = 1.0;
	        var bufferDuration = this.bufferDuration;
	
	        if (this.cyclic) segmentIndex = segmentIndex % this.positionArray.length;else segmentIndex = Math.max(0, Math.min(segmentIndex, this.positionArray.length - 1));
	
	        if (this.positionArray) segmentPosition = this.positionArray[segmentIndex] || 0;
	
	        if (this.durationArray) segmentDuration = this.durationArray[segmentIndex] || 0;
	
	        if (this.offsetArray) segmentOffset = this.offsetArray[segmentIndex] || 0;
	
	        // calculate resampling
	        if (this.resampling !== 0 || this.resamplingVar > 0) {
	          var randomResampling = (Math.random() - 0.5) * 2.0 * this.resamplingVar;
	          resamplingRate = Math.pow(2.0, (this.resampling + randomResampling) / 1200.0);
	        }
	
	        // calculate inter-segment distance
	        if (segmentDuration === 0 || this.periodRel > 0) {
	          var nextSegementIndex = segmentIndex + 1;
	          var nextPosition, nextOffset;
	
	          if (nextSegementIndex === this.positionArray.length) {
	            if (this.cyclic) {
	              nextPosition = this.positionArray[0] + bufferDuration;
	              nextOffset = this.offsetArray[0];
	            } else {
	              nextPosition = bufferDuration;
	              nextOffset = 0;
	            }
	          } else {
	            nextPosition = this.positionArray[nextSegementIndex];
	            nextOffset = this.offsetArray[nextSegementIndex];
	          }
	
	          var interSegmentDistance = nextPosition - segmentPosition;
	
	          // correct inter-segment distance by offsets
	          //   offset > 0: the segment's reference position is after the given segment position
	          if (segmentOffset > 0) interSegmentDistance -= segmentOffset;
	
	          if (nextOffset > 0) interSegmentDistance += nextOffset;
	
	          if (interSegmentDistance < 0) interSegmentDistance = 0;
	
	          // use inter-segment distance instead of segment duration
	          if (segmentDuration === 0) segmentDuration = interSegmentDistance;
	
	          // calculate period relative to inter marker distance
	          segmentPeriod += this.periodRel * interSegmentDistance;
	        }
	
	        // add relative and absolute segment duration
	        segmentDuration *= this.durationRel;
	        segmentDuration += this.durationAbs;
	
	        // add relative and absolute segment offset
	        segmentOffset *= this.offsetRel;
	        segmentOffset += this.offsetAbs;
	
	        // apply segment offset
	        //   offset > 0: the segment's reference position is after the given segment position
	        //   offset < 0: the given segment position is the segment's reference position and the duration has to be corrected by the offset
	        if (segmentOffset < 0) {
	          segmentDuration -= segmentOffset;
	          segmentPosition += segmentOffset;
	          segmentTime += segmentOffset / resamplingRate;
	        } else {
	          segmentTime -= segmentOffset / resamplingRate;
	        }
	
	        // randomize segment position
	        if (this.positionVar > 0) segmentPosition += 2.0 * (Math.random() - 0.5) * this.positionVar;
	
	        // shorten duration of segments over the edges of the buffer
	        if (segmentPosition < 0) {
	          //segmentTime -= grainPosition; hm, not sure if we want to do this
	          segmentDuration += segmentPosition;
	          segmentPosition = 0;
	        }
	
	        if (segmentPosition + segmentDuration > this.buffer.duration) segmentDuration = this.buffer.duration - segmentPosition;
	
	        segmentDuration /= resamplingRate;
	
	        // make segment
	        if (this.gain > 0 && segmentDuration > 0) {
	          // make segment envelope
	          var envelope = audioContext.createGain();
	          var attack = this.attackAbs + this.attackRel * segmentDuration;
	          var release = this.releaseAbs + this.releaseRel * segmentDuration;
	
	          if (attack + release > segmentDuration) {
	            var factor = segmentDuration / (attack + release);
	            attack *= factor;
	            release *= factor;
	          }
	
	          var attackEndTime = segmentTime + attack;
	          var segmentEndTime = segmentTime + segmentDuration;
	          var releaseStartTime = segmentEndTime - release;
	
	          envelope.gain.value = 0;
	          envelope.gain.setValueAtTime(0.0, segmentTime);
	          envelope.gain.linearRampToValueAtTime(this.gain, attackEndTime);
	
	          if (releaseStartTime > attackEndTime) envelope.gain.setValueAtTime(this.gain, releaseStartTime);
	
	          envelope.gain.linearRampToValueAtTime(0.0, segmentEndTime);
	          envelope.connect(this.outputNode);
	
	          // make source
	          var source = audioContext.createBufferSource();
	
	          source.buffer = this.buffer;
	          source.playbackRate.value = resamplingRate;
	          source.connect(envelope);
	
	          source.start(segmentTime, segmentPosition);
	          source.stop(segmentTime + segmentDuration);
	        }
	      }
	
	      return segmentPeriod;
	    }
	  }, {
	    key: 'bufferDuration',
	    get: function get() {
	      if (this.buffer) {
	        var bufferDuration = this.buffer.duration;
	
	        if (this.wrapAroundExtension) bufferDuration -= this.wrapAroundExtension;
	
	        return bufferDuration;
	      }
	
	      return 0;
	    }
	  }]);
	  return SegmentEngine;
	}(_audioTimeEngine2.default);

	exports.default = SegmentEngine;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _get2 = __webpack_require__(98);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _audioContext = __webpack_require__(116);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _schedulingQueue = __webpack_require__(120);
	
	var _schedulingQueue2 = _interopRequireDefault(_schedulingQueue);
	
	var _timeEngine = __webpack_require__(117);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	var _factories = __webpack_require__(137);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var ESPILON = 1e-8;
	
	var LoopControl = function (_TimeEngine) {
	  (0, _inherits3.default)(LoopControl, _TimeEngine);
	
	  function LoopControl(playControl) {
	    (0, _classCallCheck3.default)(this, LoopControl);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LoopControl).call(this));
	
	    _this.__playControl = playControl;
	    _this.lower = -Infinity;
	    _this.upper = Infinity;
	    return _this;
	  }
	
	  // TimeEngine method (scheduled interface)
	
	
	  (0, _createClass3.default)(LoopControl, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var playControl = this.__playControl;
	      var speed = playControl.speed;
	      var lower = this.lower;
	      var upper = this.upper;
	
	      if (speed > 0) time += ESPILON;else time -= EPSILON;
	
	      if (speed > 0) {
	        playControl.syncSpeed(time, lower, speed, true);
	        return playControl.__getTimeAtPosition(upper) - ESPILON;
	      } else if (speed < 0) {
	        playControl.syncSpeed(time, upper, speed, true);
	        return playControl.__getTimeAtPosition(lower) + ESPILON;
	      }
	
	      return Infinity;
	    }
	  }, {
	    key: 'reschedule',
	    value: function reschedule(speed) {
	      var playControl = this.__playControl;
	      var lower = Math.min(playControl.__loopStart, playControl.__loopEnd);
	      var upper = Math.max(playControl.__loopStart, playControl.__loopEnd);
	
	      this.speed = speed;
	      this.lower = lower;
	      this.upper = upper;
	
	      if (lower === upper) speed = 0;
	
	      if (speed > 0) this.resetTime(playControl.__getTimeAtPosition(upper) - ESPILON);else if (speed < 0) this.resetTime(playControl.__getTimeAtPosition(lower) + ESPILON);else this.resetTime(Infinity);
	    }
	  }, {
	    key: 'applyLoopBoundaries',
	    value: function applyLoopBoundaries(position, speed) {
	      var lower = this.lower;
	      var upper = this.upper;
	
	      if (speed > 0 && position >= upper) return lower + (position - lower) % (upper - lower);else if (speed < 0 && position < lower) return upper - (upper - position) % (upper - lower);
	
	      return position;
	    }
	  }]);
	  return LoopControl;
	}(_timeEngine2.default);
	
	// play controlled base class
	
	
	var PlayControlled = function () {
	  function PlayControlled(playControl, engine) {
	    (0, _classCallCheck3.default)(this, PlayControlled);
	
	    this.__playControl = playControl;
	
	    engine.master = this;
	    this.__engine = engine;
	  }
	
	  (0, _createClass3.default)(PlayControlled, [{
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed, seek, lastSpeed) {
	      this.__engine.syncSpeed(time, position, speed, seek);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__playControl = null;
	
	      this.__engine.master = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__playControl.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__playControl.currentPosition;
	    }
	  }]);
	  return PlayControlled;
	}();
	
	// play control for engines implementing the *speed-controlled* interface
	
	
	var PlayControlledSpeedControlled = function (_PlayControlled) {
	  (0, _inherits3.default)(PlayControlledSpeedControlled, _PlayControlled);
	
	  function PlayControlledSpeedControlled(playControl, engine) {
	    (0, _classCallCheck3.default)(this, PlayControlledSpeedControlled);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PlayControlledSpeedControlled).call(this, playControl, engine));
	  }
	
	  return PlayControlledSpeedControlled;
	}(PlayControlled);
	
	// play control for engines implmenting the *transported* interface
	
	
	var PlayControlledTransported = function (_PlayControlled2) {
	  (0, _inherits3.default)(PlayControlledTransported, _PlayControlled2);
	
	  function PlayControlledTransported(playControl, engine) {
	    (0, _classCallCheck3.default)(this, PlayControlledTransported);
	
	    var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PlayControlledTransported).call(this, playControl, engine));
	
	    _this3.__schedulerHook = new PlayControlledSchedulerHook(playControl, engine);
	    return _this3;
	  }
	
	  (0, _createClass3.default)(PlayControlledTransported, [{
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed, seek, lastSpeed) {
	      if (speed !== lastSpeed || seek && speed !== 0) {
	        var nextPosition;
	
	        // resync transported engines
	        if (seek || speed * lastSpeed < 0) {
	          // seek or reverse direction
	          nextPosition = this.__engine.syncPosition(time, position, speed);
	        } else if (lastSpeed === 0) {
	          // start
	          nextPosition = this.__engine.syncPosition(time, position, speed);
	        } else if (speed === 0) {
	          // stop
	          nextPosition = Infinity;
	
	          if (this.__engine.syncSpeed) this.__engine.syncSpeed(time, position, 0);
	        } else if (this.__engine.syncSpeed) {
	          // change speed without reversing direction
	          this.__engine.syncSpeed(time, position, speed);
	        }
	
	        this.__schedulerHook.resetPosition(nextPosition);
	      }
	    }
	  }, {
	    key: 'resetEnginePosition',
	    value: function resetEnginePosition(engine) {
	      var position = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
	
	      if (position === undefined) {
	        var playControl = this.__playControl;
	        var time = playControl.__sync();
	
	        position = this.__engine.syncPosition(time, playControl.__position, playControl.__speed);
	      }
	
	      this.__schedulerHook.resetPosition(position);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__schedulerHook.destroy();
	      this.__schedulerHook = null;
	
	      (0, _get3.default)((0, _getPrototypeOf2.default)(PlayControlledTransported.prototype), 'destroy', this).call(this);
	    }
	  }]);
	  return PlayControlledTransported;
	}(PlayControlled);
	
	// play control for time engines implementing the *scheduled* interface
	
	
	var PlayControlledScheduled = function (_PlayControlled3) {
	  (0, _inherits3.default)(PlayControlledScheduled, _PlayControlled3);
	
	  function PlayControlledScheduled(playControl, engine) {
	    (0, _classCallCheck3.default)(this, PlayControlledScheduled);
	
	    // scheduling queue becomes master of engine
	
	    var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PlayControlledScheduled).call(this, playControl, engine));
	
	    engine.master = null;
	    _this4.__schedulingQueue = new PlayControlledSchedulingQueue(playControl, engine);
	    return _this4;
	  }
	
	  (0, _createClass3.default)(PlayControlledScheduled, [{
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed, seek, lastSpeed) {
	      if (lastSpeed === 0 && speed !== 0) // start or seek
	        this.__engine.resetTime();else if (lastSpeed !== 0 && speed === 0) // stop
	        this.__engine.resetTime(Infinity);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__schedulingQueue.destroy();
	      (0, _get3.default)((0, _getPrototypeOf2.default)(PlayControlledScheduled.prototype), 'destroy', this).call(this);
	    }
	  }]);
	  return PlayControlledScheduled;
	}(PlayControlled);
	
	// translates transported engine advancePosition into global scheduler times
	
	
	var PlayControlledSchedulerHook = function (_TimeEngine2) {
	  (0, _inherits3.default)(PlayControlledSchedulerHook, _TimeEngine2);
	
	  function PlayControlledSchedulerHook(playControl, engine) {
	    (0, _classCallCheck3.default)(this, PlayControlledSchedulerHook);
	
	    var _this5 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PlayControlledSchedulerHook).call(this));
	
	    _this5.__playControl = playControl;
	    _this5.__engine = engine;
	
	    _this5.__nextPosition = Infinity;
	    playControl.__scheduler.add(_this5, Infinity);
	    return _this5;
	  }
	
	  (0, _createClass3.default)(PlayControlledSchedulerHook, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var playControl = this.__playControl;
	      var engine = this.__engine;
	      var position = this.__nextPosition;
	      var nextPosition = engine.advancePosition(time, position, playControl.__speed);
	      var nextTime = playControl.__getTimeAtPosition(nextPosition);
	
	      this.__nextPosition = nextPosition;
	      return nextTime;
	    }
	  }, {
	    key: 'resetPosition',
	    value: function resetPosition() {
	      var position = arguments.length <= 0 || arguments[0] === undefined ? this.__nextPosition : arguments[0];
	
	      var time = this.__playControl.__getTimeAtPosition(position);
	      this.__nextPosition = position;
	      this.resetTime(time);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__playControl.__scheduler.remove(this);
	      this.__playControl = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__playControl.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__playControl.currentPosition;
	    }
	  }]);
	  return PlayControlledSchedulerHook;
	}(_timeEngine2.default);
	
	// internal scheduling queue that returns the current position (and time) of the play control
	
	
	var PlayControlledSchedulingQueue = function (_SchedulingQueue) {
	  (0, _inherits3.default)(PlayControlledSchedulingQueue, _SchedulingQueue);
	
	  function PlayControlledSchedulingQueue(playControl, engine) {
	    (0, _classCallCheck3.default)(this, PlayControlledSchedulingQueue);
	
	    var _this6 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PlayControlledSchedulingQueue).call(this));
	
	    _this6.__playControl = playControl;
	    _this6.__engine = engine;
	
	    _this6.add(engine, Infinity);
	    playControl.__scheduler.add(_this6, Infinity);
	    return _this6;
	  }
	
	  (0, _createClass3.default)(PlayControlledSchedulingQueue, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.__playControl.__scheduler.remove(this);
	      this.remove(this.__engine);
	
	      this.__playControl = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__playControl.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__playControl.currentPosition;
	    }
	  }]);
	  return PlayControlledSchedulingQueue;
	}(_schedulingQueue2.default);
	
	// play control meta-class
	
	
	var PlayControl = function (_TimeEngine3) {
	  (0, _inherits3.default)(PlayControl, _TimeEngine3);
	
	  function PlayControl(engine) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, PlayControl);
	
	    var _this7 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PlayControl).call(this));
	
	    _this7.audioContext = options.audioContext || _audioContext2.default;
	    _this7.__scheduler = (0, _factories.getScheduler)(_this7.audioContext);
	
	    _this7.__playControlled = null;
	
	    _this7.__loopControl = null;
	    _this7.__loopStart = 0;
	    _this7.__loopEnd = 1;
	
	    // synchronized tie, position, and speed
	    _this7.__time = 0;
	    _this7.__position = 0;
	    _this7.__speed = 0;
	
	    // non-zero "user" speed
	    _this7.__playingSpeed = 1;
	
	    if (engine) _this7.__setEngine(engine);
	    return _this7;
	  }
	
	  (0, _createClass3.default)(PlayControl, [{
	    key: '__setEngine',
	    value: function __setEngine(engine) {
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      if (_timeEngine2.default.implementsSpeedControlled(engine)) this.__playControlled = new PlayControlledSpeedControlled(this, engine);else if (_timeEngine2.default.implementsTransported(engine)) this.__playControlled = new PlayControlledTransported(this, engine);else if (_timeEngine2.default.implementsScheduled(engine)) this.__playControlled = new PlayControlledScheduled(this, engine);else throw new Error("object cannot be added to play control");
	    }
	  }, {
	    key: '__resetEngine',
	    value: function __resetEngine() {
	      this.__playControlled.destroy();
	      this.__playControlled = null;
	    }
	
	    /**
	     * Calculate/extrapolate playing time for given position
	     * @param {Number} position position
	     * @return {Number} extrapolated time
	     */
	
	  }, {
	    key: '__getTimeAtPosition',
	    value: function __getTimeAtPosition(position) {
	      return this.__time + (position - this.__position) / this.__speed;
	    }
	
	    /**
	     * Calculate/extrapolate playing position for given time
	     * @param {Number} time time
	     * @return {Number} extrapolated position
	     */
	
	  }, {
	    key: '__getPositionAtTime',
	    value: function __getPositionAtTime(time) {
	      return this.__position + (time - this.__time) * this.__speed;
	    }
	  }, {
	    key: '__sync',
	    value: function __sync() {
	      var now = this.currentTime;
	      this.__position += (now - this.__time) * this.__speed;
	      this.__time = now;
	      return now;
	    }
	
	    /**
	     * Get current master time
	     * @return {Number} current time
	     *
	     * This function will be replaced when the play-control is added to a master.
	     */
	
	  }, {
	    key: 'set',
	    value: function set() {
	      var engine = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      var time = this.__sync();
	      var speed = this.__speed;
	
	      if (this.__playControlled !== null && this.__playControlled.__engine !== engine) {
	
	        this.syncSpeed(time, this.__position, 0);
	
	        if (this.__playControlled) this.__resetEngine();
	
	        if (this.__playControlled === null && engine !== null) {
	          this.__setEngine(engine);
	
	          if (speed !== 0) this.syncSpeed(time, this.__position, speed);
	        }
	      }
	    }
	  }, {
	    key: 'setLoopBoundaries',
	    value: function setLoopBoundaries(loopStart, loopEnd) {
	      this.__loopStart = loopStart;
	      this.__loopEnd = loopEnd;
	
	      this.loop = this.loop;
	    }
	  }, {
	    key: 'syncSpeed',
	
	    // TimeEngine method (speed-controlled interface)
	    value: function syncSpeed(time, position, speed) {
	      var seek = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	      var lastSpeed = this.__speed;
	
	      if (speed !== lastSpeed || seek) {
	        if ((seek || lastSpeed === 0) && this.__loopControl) position = this.__loopControl.applyLoopBoundaries(position, speed);
	
	        this.__time = time;
	        this.__position = position;
	        this.__speed = speed;
	
	        if (this.__playControlled) this.__playControlled.syncSpeed(time, position, speed, seek, lastSpeed);
	
	        if (this.__loopControl) this.__loopControl.reschedule(speed);
	      }
	    }
	
	    /**
	     * Start playing
	     */
	
	  }, {
	    key: 'start',
	    value: function start() {
	      var time = this.__sync();
	      this.syncSpeed(time, this.__position, this.__playingSpeed);
	    }
	
	    /**
	     * Pause playing
	     */
	
	  }, {
	    key: 'pause',
	    value: function pause() {
	      var time = this.__sync();
	      this.syncSpeed(time, this.__position, 0);
	    }
	
	    /**
	     * Stop playing
	     */
	
	  }, {
	    key: 'stop',
	    value: function stop() {
	      var time = this.__sync();
	      this.syncSpeed(time, this.__position, 0);
	      this.seek(0);
	    }
	
	    /**
	     * Set playing speed
	     * @param {Number} speed playing speed (non-zero speed between -16 and -1/16 or between 1/16 and 16)
	     */
	
	  }, {
	    key: 'seek',
	
	    /**
	     * Set (jump to) playing position
	     * @param {Number} position target position
	     */
	    value: function seek(position) {
	      if (position !== this.__position) {
	        var time = this.__sync();
	        this.__position = position;
	        this.syncSpeed(time, position, this.__speed, true);
	      }
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__scheduler.currentTime;
	    }
	
	    /**
	     * Get current master position
	     * @return {Number} current playing position
	     *
	     * This function will be replaced when the play-control is added to a master.
	     */
	
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__position + (this.__scheduler.currentTime - this.__time) * this.__speed;
	    }
	  }, {
	    key: 'loop',
	    set: function set(enable) {
	      if (enable && this.__loopStart > -Infinity && this.__loopEnd < Infinity) {
	        if (!this.__loopControl) {
	          this.__loopControl = new LoopControl(this);
	          this.__scheduler.add(this.__loopControl, Infinity);
	        }
	
	        if (this.__speed !== 0) {
	          var position = this.currentPosition;
	          var lower = Math.min(this.__loopStart, this.__loopEnd);
	          var upper = Math.max(this.__loopStart, this.__loopEnd);
	
	          if (this.__speed > 0 && position > upper) this.seek(upper);else if (this.__speed < 0 && position < lower) this.seek(lower);else this.__loopControl.reschedule(this.__speed);
	        }
	      } else if (this.__loopControl) {
	        this.__scheduler.remove(this.__loopControl);
	        this.__loopControl = null;
	      }
	    },
	    get: function get() {
	      return !!this.__loopControl;
	    }
	  }, {
	    key: 'loopStart',
	    set: function set(loopStart) {
	      this.setLoopBoundaries(loopStart, this.__loopEnd);
	    },
	    get: function get() {
	      return this.__loopStart;
	    }
	  }, {
	    key: 'loopEnd',
	    set: function set(loopEnd) {
	      this.setLoopBoundaries(this.__loopStart, loopEnd);
	    },
	    get: function get() {
	      return this.__loopEnd;
	    }
	  }, {
	    key: 'speed',
	    set: function set(speed) {
	      var time = this.__sync();
	
	      if (speed >= 0) {
	        if (speed < 0.01) speed = 0.01;else if (speed > 100) speed = 100;
	      } else {
	        if (speed < -100) speed = -100;else if (speed > -0.01) speed = -0.01;
	      }
	
	      this.__playingSpeed = speed;
	
	      if (this.__speed !== 0) this.syncSpeed(time, this.__position, speed);
	    }
	
	    /**
	     * Get playing speed
	     * @return current playing speed
	     */
	
	    , get: function get() {
	      return this.__playingSpeed;
	    }
	  }]);
	  return PlayControl;
	}(_timeEngine2.default);

	exports.default = PlayControl;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSimpleScheduler = exports.getScheduler = undefined;
	
	var _weakMap = __webpack_require__(138);
	
	var _weakMap2 = _interopRequireDefault(_weakMap);
	
	var _audioContext = __webpack_require__(116);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _scheduler = __webpack_require__(143);
	
	var _scheduler2 = _interopRequireDefault(_scheduler);
	
	var _simpleScheduler = __webpack_require__(148);
	
	var _simpleScheduler2 = _interopRequireDefault(_simpleScheduler);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var schedulerMap = new _weakMap2.default(); // schedulers should be singletons
	
	var simpleSchedulerMap = new _weakMap2.default();
	
	// scheduler factory
	var getScheduler = exports.getScheduler = function getScheduler() {
	  var audioContext = arguments.length <= 0 || arguments[0] === undefined ? _audioContext2.default : arguments[0];
	
	  var scheduler = schedulerMap.get(audioContext);
	
	  if (!scheduler) {
	    scheduler = new _scheduler2.default({ audioContext: audioContext });
	    schedulerMap.set(audioContext, scheduler);
	  }
	
	  return scheduler;
	};
	
	var getSimpleScheduler = exports.getSimpleScheduler = function getSimpleScheduler() {
	  var audioContext = arguments.length <= 0 || arguments[0] === undefined ? _audioContext2.default : arguments[0];
	
	  var simpleScheduler = simpleSchedulerMap.get(audioContext);
	
	  if (!simpleScheduler) {
	    simpleScheduler = new _simpleScheduler2.default({ audioContext: audioContext });
	    simpleSchedulerMap.set(audioContext, simpleScheduler);
	  }
	
	  return simpleScheduler;
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(5);
	__webpack_require__(50);
	__webpack_require__(140);
	module.exports = __webpack_require__(14).WeakMap;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var each = __webpack_require__(126)(0),
	    redefine = __webpack_require__(27),
	    meta = __webpack_require__(86),
	    assign = __webpack_require__(141),
	    weak = __webpack_require__(142),
	    isObject = __webpack_require__(20),
	    getWeak = meta.getWeak,
	    isExtensible = Object.isExtensible,
	    uncaughtFrozenStore = weak.ufstore,
	    tmp = {},
	    InternalMap;
	
	var wrapper = function wrapper(get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(125)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype,
	        method = proto[key];
	    redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	      }return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	
	var getKeys = __webpack_require__(33),
	    gOPS = __webpack_require__(90),
	    pIE = __webpack_require__(91),
	    toObject = __webpack_require__(49),
	    IObject = __webpack_require__(36),
	    $assign = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(23)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var redefineAll = __webpack_require__(65),
	    getWeak = __webpack_require__(86).getWeak,
	    anObject = __webpack_require__(19),
	    isObject = __webpack_require__(20),
	    anInstance = __webpack_require__(56),
	    forOf = __webpack_require__(57),
	    createArrayMethod = __webpack_require__(126),
	    $has = __webpack_require__(28),
	    arrayFind = createArrayMethod(5),
	    arrayFindIndex = createArrayMethod(6),
	    id = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function UncaughtFrozenStore() {
	  this.a = [];
	};
	var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = id++; // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function _delete(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var data = getWeak(anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _debug = __webpack_require__(144);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _audioContext = __webpack_require__(116);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _schedulingQueue = __webpack_require__(120);
	
	var _schedulingQueue2 = _interopRequireDefault(_schedulingQueue);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var log = (0, _debug2.default)('wavesjs:audio');
	
	var Scheduler = function (_SchedulingQueue) {
	  (0, _inherits3.default)(Scheduler, _SchedulingQueue);
	
	  function Scheduler() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Scheduler);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Scheduler).call(this));
	
	    _this.audioContext = options.audioContext || _audioContext2.default;
	
	    _this.__currentTime = null;
	    _this.__nextTime = Infinity;
	    _this.__timeout = null;
	
	    /**
	     * scheduler (setTimeout) period
	     * @type {Number}
	     */
	    _this.period = options.period || 0.025;
	
	    /**
	     * scheduler lookahead time (> period)
	     * @type {Number}
	     */
	    _this.lookahead = options.lookahead || 0.1;
	    return _this;
	  }
	
	  // setTimeout scheduling loop
	
	
	  (0, _createClass3.default)(Scheduler, [{
	    key: '__tick',
	    value: function __tick() {
	      var audioContext = this.audioContext;
	      var currentTime = audioContext.currentTime;
	      var time = this.__nextTime;
	
	      this.__timeout = null;
	
	      while (time <= currentTime + this.lookahead) {
	        this.__currentTime = time;
	        time = this.advanceTime(time);
	      }
	
	      this.__currentTime = null;
	      this.resetTime(time);
	    }
	  }, {
	    key: 'resetTime',
	    value: function resetTime() {
	      var _this2 = this;
	
	      var time = arguments.length <= 0 || arguments[0] === undefined ? this.currentTime : arguments[0];
	
	      if (this.master) {
	        this.master.reset(this, time);
	      } else {
	        if (this.__timeout) {
	          clearTimeout(this.__timeout);
	          this.__timeout = null;
	        }
	
	        if (time !== Infinity) {
	          if (this.__nextTime === Infinity) log('Scheduler Start');
	
	          var timeOutDelay = Math.max(time - this.lookahead - this.audioContext.currentTime, this.period);
	
	          this.__timeout = setTimeout(function () {
	            _this2.__tick();
	          }, timeOutDelay * 1000);
	        } else if (this.__nextTime !== Infinity) {
	          log('Scheduler Stop');
	        }
	
	        this.__nextTime = time;
	      }
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      if (this.master) return this.master.currentTime;
	
	      return this.__currentTime || this.audioContext.currentTime + this.lookahead;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return undefined;
	    }
	  }]);
	  return Scheduler;
	}(_schedulingQueue2.default);

	exports.default = Scheduler;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(146);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }
	
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return typeof document !== 'undefined' && document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
	  // double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function (v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs(args) {
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return;
	
	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit');
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }
	
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(145)))

/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) {
	    return [];
	};
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(147);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor(namespace) {
	  var hash = 0,
	      i;
	
	  for (i in namespace) {
	    hash = (hash << 5) - hash + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }
	
	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function createDebug(namespace) {
	
	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;
	
	    var self = debug;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);
	
	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	
	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	
	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }
	
	  return debug;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  exports.names = [];
	  exports.skips = [];
	
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {};
	  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str);
	  if (str.length > 10000) {
	    return;
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _set = __webpack_require__(121);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _debug = __webpack_require__(144);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _audioContext = __webpack_require__(116);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _timeEngine = __webpack_require__(117);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var log = (0, _debug2.default)('wavesjs:audio');
	
	var SimpleScheduler = function () {
	  function SimpleScheduler() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, SimpleScheduler);
	
	    this.audioContext = options.audioContext || _audioContext2.default;
	
	    this.__engines = new _set2.default();
	
	    this.__schedEngines = [];
	    this.__schedTimes = [];
	
	    this.__currentTime = null;
	    this.__timeout = null;
	
	    /**
	     * scheduler (setTimeout) period
	     * @type {Number}
	     */
	    this.period = options.period || 0.025;
	
	    /**
	     * scheduler lookahead time (> period)
	     * @type {Number}
	     */
	    this.lookahead = options.lookahead || 0.1;
	  }
	
	  (0, _createClass3.default)(SimpleScheduler, [{
	    key: '__scheduleEngine',
	    value: function __scheduleEngine(engine, time) {
	      this.__schedEngines.push(engine);
	      this.__schedTimes.push(time);
	    }
	  }, {
	    key: '__rescheduleEngine',
	    value: function __rescheduleEngine(engine, time) {
	      var index = this.__schedEngines.indexOf(engine);
	
	      if (index >= 0) {
	        if (time !== Infinity) {
	          this.__schedTimes[index] = time;
	        } else {
	          this.__schedEngines.splice(index, 1);
	          this.__schedTimes.splice(index, 1);
	        }
	      } else if (time < Infinity) {
	        this.__schedEngines.push(engine);
	        this.__schedTimes.push(time);
	      }
	    }
	  }, {
	    key: '__unscheduleEngine',
	    value: function __unscheduleEngine(engine) {
	      var index = this.__schedEngines.indexOf(engine);
	
	      if (index >= 0) {
	        this.__schedEngines.splice(index, 1);
	        this.__schedTimes.splice(index, 1);
	      }
	    }
	  }, {
	    key: '__resetTick',
	    value: function __resetTick() {
	      if (this.__schedEngines.length > 0) {
	        if (!this.__timeout) {
	          log('SimpleScheduler Start');
	          this.__tick();
	        }
	      } else if (this.__timeout) {
	        log('SimpleScheduler Stop');
	        clearTimeout(this.__timeout);
	        this.__timeout = null;
	      }
	    }
	  }, {
	    key: '__tick',
	    value: function __tick() {
	      var _this = this;
	
	      var audioContext = this.audioContext;
	      var currentTime = audioContext.currentTime;
	      var i = 0;
	
	      while (i < this.__schedEngines.length) {
	        var engine = this.__schedEngines[i];
	        var time = this.__schedTimes[i];
	
	        while (time && time <= currentTime + this.lookahead) {
	          time = Math.max(time, currentTime);
	          this.__currentTime = time;
	          time = engine.advanceTime(time);
	        }
	
	        if (time && time < Infinity) {
	          this.__schedTimes[i++] = time;
	        } else {
	          this.__unscheduleEngine(engine);
	
	          // remove engine from scheduler
	          if (!time) {
	            engine.master = null;
	            this.__engines.delete(engine);
	          }
	        }
	      }
	
	      this.__currentTime = null;
	      this.__timeout = null;
	
	      if (this.__schedEngines.length > 0) {
	        this.__timeout = setTimeout(function () {
	          _this.__tick();
	        }, this.period * 1000);
	      }
	    }
	  }, {
	    key: 'defer',
	
	    // call a function at a given time
	    value: function defer(fun) {
	      var time = arguments.length <= 1 || arguments[1] === undefined ? this.currentTime : arguments[1];
	
	      if (!(fun instanceof Function)) throw new Error("object cannot be defered by scheduler");
	
	      this.add({
	        advanceTime: function advanceTime(time) {
	          fun(time);
	        } }, // make sur that the advanceTime method does not returm anything
	      time);
	    }
	
	    // add a time engine to the scheduler
	
	  }, {
	    key: 'add',
	    value: function add(engine) {
	      var time = arguments.length <= 1 || arguments[1] === undefined ? this.currentTime : arguments[1];
	
	      if (!_timeEngine2.default.implementsScheduled(engine)) throw new Error("object cannot be added to scheduler");
	
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      // set master and add to array
	      engine.master = this;
	      this.__engines.add(engine);
	
	      // schedule engine
	      this.__scheduleEngine(engine, time);
	      this.__resetTick();
	    }
	  }, {
	    key: 'remove',
	    value: function remove(engine) {
	      if (!engine.master || engine.master !== this) throw new Error("engine has not been added to this scheduler");
	
	      // reset master and remove from array
	      engine.master = null;
	      this.__engines.delete(engine);
	
	      // unschedule engine
	      this.__unscheduleEngine(engine);
	      this.__resetTick();
	    }
	  }, {
	    key: 'resetEngineTime',
	    value: function resetEngineTime(engine) {
	      var time = arguments.length <= 1 || arguments[1] === undefined ? this.currentTime : arguments[1];
	
	      this.__rescheduleEngine(engine, time);
	      this.__resetTick();
	    }
	
	    // check whether a given engine is scheduled
	
	  }, {
	    key: 'has',
	    value: function has(engine) {
	      return this.__engines.has(engine);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      if (this.__timeout) {
	        clearTimeout(this.__timeout);
	        this.__timeout = null;
	      }
	
	      this.__schedEngines.length = 0;
	      this.__schedTimes.length = 0;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__currentTime || this.audioContext.currentTime + this.lookahead;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return undefined;
	    }
	  }]);
	  return SimpleScheduler;
	}();

	exports.default = SimpleScheduler;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(150);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _get2 = __webpack_require__(98);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _getPrototypeOf = __webpack_require__(74);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(68);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(69);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(78);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(102);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _audioContext = __webpack_require__(116);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _priorityQueue = __webpack_require__(119);
	
	var _priorityQueue2 = _interopRequireDefault(_priorityQueue);
	
	var _schedulingQueue = __webpack_require__(120);
	
	var _schedulingQueue2 = _interopRequireDefault(_schedulingQueue);
	
	var _timeEngine = __webpack_require__(117);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	var _factories = __webpack_require__(137);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function addDuplet(firstArray, secondArray, firstElement, secondElement) {
	  firstArray.push(firstElement);
	  secondArray.push(secondElement);
	}
	
	function removeDuplet(firstArray, secondArray, firstElement) {
	  var index = firstArray.indexOf(firstElement);
	
	  if (index >= 0) {
	    var secondElement = secondArray[index];
	
	    firstArray.splice(index, 1);
	    secondArray.splice(index, 1);
	
	    return secondElement;
	  }
	
	  return null;
	}
	
	// The Transported call is the base class of the adapters between
	// different types of engines (i.e. transported, scheduled, play-controlled)
	// The adapters are at the same time masters for the engines added to the transport
	// and transported TimeEngines inserted into the transport's position-based pritority queue.
	
	var Transported = function (_TimeEngine) {
	  (0, _inherits3.default)(Transported, _TimeEngine);
	
	  function Transported(transport, engine, start, duration, offset) {
	    var stretch = arguments.length <= 5 || arguments[5] === undefined ? 1 : arguments[5];
	    (0, _classCallCheck3.default)(this, Transported);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Transported).call(this));
	
	    _this.master = transport;
	
	    _this.__engine = engine;
	    engine.master = _this;
	
	    _this.__startPosition = start;
	    _this.__endPosition = !isFinite(duration) ? Infinity : start + duration;
	    _this.__offsetPosition = start + offset;
	    _this.__stretchPosition = stretch;
	    _this.__isRunning = false;
	    return _this;
	  }
	
	  (0, _createClass3.default)(Transported, [{
	    key: 'setBoundaries',
	    value: function setBoundaries(start, duration) {
	      var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	      var stretch = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
	
	      this.__startPosition = start;
	      this.__endPosition = start + duration;
	      this.__offsetPosition = start + offset;
	      this.__stretchPosition = stretch;
	      this.resetPosition();
	    }
	  }, {
	    key: 'start',
	    value: function start(time, position, speed) {}
	  }, {
	    key: 'stop',
	    value: function stop(time, position) {}
	  }, {
	    key: 'resetPosition',
	    value: function resetPosition(position) {
	      if (position !== undefined) position += this.__offsetPosition;
	
	      this.master.resetEnginePosition(this, position);
	    }
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      if (speed > 0) {
	        if (position < this.__startPosition) {
	
	          if (this.__isRunning) this.stop(time, position - this.__offsetPosition);
	
	          this.__isRunning = false;
	          return this.__startPosition;
	        } else if (position < this.__endPosition) {
	          this.start(time, position - this.__offsetPosition, speed);
	
	          this.__isRunning = true;
	          return this.__endPosition;
	        }
	      } else {
	        if (position > this.__endPosition) {
	          if (this.__isRunning) // if engine is running
	            this.stop(time, position - this.__offsetPosition);
	
	          this.__isRunning = false;
	          return this.__endPosition;
	        } else if (position > this.__startPosition) {
	          this.start(time, position - this.__offsetPosition, speed);
	
	          this.__isRunning = true;
	          return this.__startPosition;
	        }
	      }
	
	      if (this.__isRunning) // if engine is running
	        this.stop(time, position);
	
	      this.__isRunning = false;
	      return Infinity * speed;
	    }
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      if (!this.__isRunning) {
	        this.start(time, position - this.__offsetPosition, speed);
	        this.__isRunning = true;
	
	        if (speed > 0) return this.__endPosition;
	
	        return this.__startPosition;
	      }
	
	      // stop engine
	      this.stop(time, position - this.__offsetPosition);
	
	      this.__isRunning = false;
	      return Infinity * speed;
	    }
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      if (speed === 0) // stop
	        this.stop(time, position - this.__offsetPosition);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.master = null;
	
	      this.__engine.master = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.master.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.master.currentPosition - this.__offsetPosition;
	    }
	  }]);
	  return Transported;
	}(_timeEngine2.default);
	
	// TransportedTransported
	// has to switch on and off the scheduled engines when the transport hits the engine's start and end position
	
	
	var TransportedTransported = function (_Transported) {
	  (0, _inherits3.default)(TransportedTransported, _Transported);
	
	  function TransportedTransported(transport, engine, startPosition, endPosition, offsetPosition) {
	    (0, _classCallCheck3.default)(this, TransportedTransported);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TransportedTransported).call(this, transport, engine, startPosition, endPosition, offsetPosition));
	  }
	
	  (0, _createClass3.default)(TransportedTransported, [{
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      if (speed > 0 && position < this.__endPosition) position = Math.max(position, this.__startPosition);else if (speed < 0 && position >= this.__startPosition) position = Math.min(position, this.__endPosition);
	
	      return this.__offsetPosition + this.__engine.syncPosition(time, position - this.__offsetPosition, speed);
	    }
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      position = this.__offsetPosition + this.__engine.advancePosition(time, position - this.__offsetPosition, speed);
	
	      if (speed > 0 && position < this.__endPosition || speed < 0 && position >= this.__startPosition) return position;
	
	      return Infinity * speed;
	    }
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      if (this.__engine.syncSpeed) this.__engine.syncSpeed(time, position, speed);
	    }
	  }, {
	    key: 'resetEnginePosition',
	    value: function resetEnginePosition(engine) {
	      var position = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
	
	      if (position !== undefined) position += this.__offsetPosition;
	
	      this.resetPosition(position);
	    }
	  }]);
	  return TransportedTransported;
	}(Transported);
	
	// TransportedSpeedControlled
	// has to start and stop the speed-controlled engines when the transport hits the engine's start and end position
	
	
	var TransportedSpeedControlled = function (_Transported2) {
	  (0, _inherits3.default)(TransportedSpeedControlled, _Transported2);
	
	  function TransportedSpeedControlled(transport, engine, startPosition, endPosition, offsetPosition) {
	    (0, _classCallCheck3.default)(this, TransportedSpeedControlled);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TransportedSpeedControlled).call(this, transport, engine, startPosition, endPosition, offsetPosition));
	  }
	
	  (0, _createClass3.default)(TransportedSpeedControlled, [{
	    key: 'start',
	    value: function start(time, position, speed) {
	      this.__engine.syncSpeed(time, position, speed, true);
	    }
	  }, {
	    key: 'stop',
	    value: function stop(time, position) {
	      this.__engine.syncSpeed(time, position, 0);
	    }
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      if (this.__isRunning) this.__engine.syncSpeed(time, position, speed);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__engine.syncSpeed(this.master.currentTime, this.master.currentPosition - this.__offsetPosition, 0);
	      (0, _get3.default)((0, _getPrototypeOf2.default)(TransportedSpeedControlled.prototype), 'destroy', this).call(this);
	    }
	  }]);
	  return TransportedSpeedControlled;
	}(Transported);
	
	// TransportedScheduled
	// has to switch on and off the scheduled engines when the transport hits the engine's start and end position
	
	
	var TransportedScheduled = function (_Transported3) {
	  (0, _inherits3.default)(TransportedScheduled, _Transported3);
	
	  function TransportedScheduled(transport, engine, startPosition, endPosition, offsetPosition) {
	    (0, _classCallCheck3.default)(this, TransportedScheduled);
	
	    // scheduling queue becomes master of engine
	
	    var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TransportedScheduled).call(this, transport, engine, startPosition, endPosition, offsetPosition));
	
	    engine.master = null;
	    transport.__schedulingQueue.add(engine, Infinity);
	    return _this4;
	  }
	
	  (0, _createClass3.default)(TransportedScheduled, [{
	    key: 'start',
	    value: function start(time, position, speed) {
	      this.master.__schedulingQueue.resetEngineTime(this.__engine, time);
	    }
	  }, {
	    key: 'stop',
	    value: function stop(time, position) {
	      this.master.__schedulingQueue.resetEngineTime(this.__engine, Infinity);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.master.__schedulingQueue.remove(this.__engine);
	      (0, _get3.default)((0, _getPrototypeOf2.default)(TransportedScheduled.prototype), 'destroy', this).call(this);
	    }
	  }]);
	  return TransportedScheduled;
	}(Transported);
	
	// translates advancePosition of *transported* engines into global scheduler times
	
	
	var TransportSchedulerHook = function (_TimeEngine2) {
	  (0, _inherits3.default)(TransportSchedulerHook, _TimeEngine2);
	
	  function TransportSchedulerHook(transport) {
	    (0, _classCallCheck3.default)(this, TransportSchedulerHook);
	
	    var _this5 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TransportSchedulerHook).call(this));
	
	    _this5.__transport = transport;
	
	    _this5.__nextPosition = Infinity;
	    _this5.__nextTime = Infinity;
	    transport.__scheduler.add(_this5, Infinity);
	    return _this5;
	  }
	
	  // TimeEngine method (scheduled interface)
	
	
	  (0, _createClass3.default)(TransportSchedulerHook, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var transport = this.__transport;
	      var position = this.__nextPosition;
	      var speed = transport.__speed;
	      var nextPosition = transport.advancePosition(time, position, speed);
	      var nextTime = transport.__getTimeAtPosition(nextPosition);
	
	      this.__nextPosition = nextPosition;
	      this.__nextTime = nextTime;
	
	      return nextTime;
	    }
	  }, {
	    key: 'resetPosition',
	    value: function resetPosition() {
	      var position = arguments.length <= 0 || arguments[0] === undefined ? this.__nextPosition : arguments[0];
	
	      var transport = this.__transport;
	      var time = transport.__getTimeAtPosition(position);
	
	      this.__nextPosition = position;
	      this.__nextTime = time;
	
	      this.resetTime(time);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__transport.__scheduler.remove(this);
	      this.__transport = null;
	    }
	  }]);
	  return TransportSchedulerHook;
	}(_timeEngine2.default);
	
	// internal scheduling queue that returns the current position (and time) of the play control
	
	
	var TransportSchedulingQueue = function (_SchedulingQueue) {
	  (0, _inherits3.default)(TransportSchedulingQueue, _SchedulingQueue);
	
	  function TransportSchedulingQueue(transport) {
	    (0, _classCallCheck3.default)(this, TransportSchedulingQueue);
	
	    var _this6 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TransportSchedulingQueue).call(this));
	
	    _this6.__transport = transport;
	    transport.__scheduler.add(_this6, Infinity);
	    return _this6;
	  }
	
	  (0, _createClass3.default)(TransportSchedulingQueue, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.__transport.__scheduler.remove(this);
	      this.__transport = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__transport.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__transport.currentPosition;
	    }
	  }]);
	  return TransportSchedulingQueue;
	}(_schedulingQueue2.default);
	
	/**
	 * Transport class
	 */
	
	var Transport = function (_TimeEngine3) {
	  (0, _inherits3.default)(Transport, _TimeEngine3);
	
	  function Transport() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Transport);
	
	    var _this7 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Transport).call(this));
	
	    _this7.audioContext = options.audioContext || _audioContext2.default;
	
	    _this7.__engines = [];
	    _this7.__transported = [];
	
	    _this7.__scheduler = (0, _factories.getScheduler)(_this7.audioContext);
	    _this7.__schedulerHook = new TransportSchedulerHook(_this7);
	    _this7.__transportedQueue = new _priorityQueue2.default();
	    _this7.__schedulingQueue = new TransportSchedulingQueue(_this7);
	
	    // syncronized time, position, and speed
	    _this7.__time = 0;
	    _this7.__position = 0;
	    _this7.__speed = 0;
	    return _this7;
	  }
	
	  (0, _createClass3.default)(Transport, [{
	    key: '__getTimeAtPosition',
	    value: function __getTimeAtPosition(position) {
	      return this.__time + (position - this.__position) / this.__speed;
	    }
	  }, {
	    key: '__getPositionAtTime',
	    value: function __getPositionAtTime(time) {
	      return this.__position + (time - this.__time) * this.__speed;
	    }
	  }, {
	    key: '__syncTransportedPosition',
	    value: function __syncTransportedPosition(time, position, speed) {
	      var numTransportedEngines = this.__transported.length;
	      var nextPosition = Infinity * speed;
	
	      if (numTransportedEngines > 0) {
	        this.__transportedQueue.clear();
	        this.__transportedQueue.reverse = speed < 0;
	
	        for (var i = 0; i < numTransportedEngines; i++) {
	          var engine = this.__transported[i];
	          var nextEnginePosition = engine.syncPosition(time, position, speed);
	          this.__transportedQueue.insert(engine, nextEnginePosition);
	        }
	
	        nextPosition = this.__transportedQueue.time;
	      }
	
	      return nextPosition;
	    }
	  }, {
	    key: '__syncTransportedSpeed',
	    value: function __syncTransportedSpeed(time, position, speed) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)(this.__transported), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var transported = _step.value;
	
	          transported.syncSpeed(time, position, speed);
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
	
	    /**
	     * Get current master time
	     * @return {Number} current time
	     *
	     * This function will be replaced when the transport is added to a master (i.e. transport or play-control).
	     */
	
	  }, {
	    key: 'resetPosition',
	
	    /**
	     * Reset next transport position
	     * @param {Number} next transport position
	     */
	    value: function resetPosition(position) {
	      var master = this.master;
	
	      if (master && master.resetEnginePosition !== undefined) master.resetEnginePosition(this, position);else this.__schedulerHook.resetPosition(position);
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      this.__time = time;
	      this.__position = position;
	      this.__speed = speed;
	
	      return this.__syncTransportedPosition(time, position, speed);
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      var engine = this.__transportedQueue.head;
	      var nextEnginePosition = engine.advancePosition(time, position, speed);
	      return this.__transportedQueue.move(engine, nextEnginePosition);
	    }
	
	    // TimeEngine method (speed-controlled interface)
	
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      var seek = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	      var lastSpeed = this.__speed;
	
	      this.__time = time;
	      this.__position = position;
	      this.__speed = speed;
	
	      if (speed !== lastSpeed || seek && speed !== 0) {
	        var nextPosition = void 0;
	
	        // resync transported engines
	        if (seek || speed * lastSpeed < 0) {
	          // seek or reverse direction
	          nextPosition = this.__syncTransportedPosition(time, position, speed);
	        } else if (lastSpeed === 0) {
	          // start
	          nextPosition = this.__syncTransportedPosition(time, position, speed);
	        } else if (speed === 0) {
	          // stop
	          nextPosition = Infinity;
	          this.__syncTransportedSpeed(time, position, 0);
	        } else {
	          // change speed without reversing direction
	          this.__syncTransportedSpeed(time, position, speed);
	        }
	
	        this.resetPosition(nextPosition);
	      }
	    }
	
	    /**
	     * Add a time engine to the transport
	     * @param {Object} engine engine to be added to the transport
	     * @param {Number} position start position
	     */
	
	  }, {
	    key: 'add',
	    value: function add(engine) {
	      var startPosition = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	      var endPosition = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];
	      var offsetPosition = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	      var transported = null;
	
	      if (offsetPosition === -Infinity) offsetPosition = 0;
	
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      if (_timeEngine2.default.implementsTransported(engine)) transported = new TransportedTransported(this, engine, startPosition, endPosition, offsetPosition);else if (_timeEngine2.default.implementsSpeedControlled(engine)) transported = new TransportedSpeedControlled(this, engine, startPosition, endPosition, offsetPosition);else if (_timeEngine2.default.implementsScheduled(engine)) transported = new TransportedScheduled(this, engine, startPosition, endPosition, offsetPosition);else throw new Error("object cannot be added to a transport");
	
	      if (transported) {
	        var speed = this.__speed;
	
	        addDuplet(this.__engines, this.__transported, engine, transported);
	
	        if (speed !== 0) {
	          // sync and start
	          var nextEnginePosition = transported.syncPosition(this.currentTime, this.currentPosition, speed);
	          var nextPosition = this.__transportedQueue.insert(transported, nextEnginePosition);
	
	          this.resetPosition(nextPosition);
	        }
	      }
	
	      return transported;
	    }
	
	    /**
	     * Remove a time engine from the transport
	     * @param {object} engineOrTransported engine or transported to be removed from the transport
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(engineOrTransported) {
	      var engine = engineOrTransported;
	      var transported = removeDuplet(this.__engines, this.__transported, engineOrTransported);
	
	      if (!transported) {
	        engine = removeDuplet(this.__transported, this.__engines, engineOrTransported);
	        transported = engineOrTransported;
	      }
	
	      if (engine && transported) {
	        var nextPosition = this.__transportedQueue.remove(transported);
	
	        transported.destroy();
	
	        if (this.__speed !== 0) this.resetPosition(nextPosition);
	      } else {
	        throw new Error("object has not been added to this transport");
	      }
	    }
	  }, {
	    key: 'resetEnginePosition',
	    value: function resetEnginePosition(transported) {
	      var position = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
	
	      var speed = this.__speed;
	
	      if (speed !== 0) {
	        if (position === undefined) position = transported.syncPosition(this.currentTime, this.currentPosition, speed);
	
	        var nextPosition = this.__transportedQueue.move(transported, position);
	        this.resetPosition(nextPosition);
	      }
	    }
	
	    /**
	     * Remove all time engines from the transport
	     */
	
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.syncSpeed(this.currentTime, this.currentPosition, 0);
	
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(this.__transported), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var transported = _step2.value;
	
	          transported.destroy();
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
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__scheduler.currentTime;
	    }
	
	    /**
	     * Get current master position
	     * @return {Number} current playing position
	     *
	     * This function will be replaced when the transport is added to a master (i.e. transport or play-control).
	     */
	
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return this.__position + (this.__scheduler.currentTime - this.__time) * this.__speed;
	    }
	  }]);
	  return Transport;
	}(_timeEngine2.default);

	exports.default = Transport;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(50);
	__webpack_require__(6);
	module.exports = __webpack_require__(152);

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(19),
	    get = __webpack_require__(60);
	module.exports = __webpack_require__(14).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(154);
	
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ajax = __webpack_require__(155);
	
	Object.defineProperty(exports, 'ajax', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ajax).default;
	  }
	});
	
	var _getId = __webpack_require__(157);
	
	Object.defineProperty(exports, 'getId', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_getId).default;
	  }
	});
	
	var _max = __webpack_require__(158);
	
	Object.defineProperty(exports, 'max', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_max).default;
	  }
	});
	
	var _min = __webpack_require__(159);
	
	Object.defineProperty(exports, 'min', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_min).default;
	  }
	});
	
	var _observer = __webpack_require__(156);
	
	Object.defineProperty(exports, 'Observer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_observer).default;
	  }
	});
	
	var _extend = __webpack_require__(160);
	
	Object.defineProperty(exports, 'extend', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_extend).default;
	  }
	});
	
	var _style = __webpack_require__(161);
	
	Object.defineProperty(exports, 'style', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_style).default;
	  }
	});
	
	var _debounce = __webpack_require__(162);
	
	Object.defineProperty(exports, 'debounce', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_debounce).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = ajax;
	
	var _observer = __webpack_require__(156);
	
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
/* 156 */
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
/* 157 */
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
/* 158 */
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
/* 159 */
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
/* 160 */
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
/* 161 */
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
/* 162 */
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

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _webaudio_segment_player_noPlayControl = __webpack_require__(164);
	
	var _webaudio_segment_player_noPlayControl2 = _interopRequireDefault(_webaudio_segment_player_noPlayControl);
	
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
	                /*staticProps: {
	                    Backend: MyWebAudio
	                }*/
	            };
	        }
	    }]);
	
	    function BackendPlugin(params, ws) {
	        _classCallCheck(this, BackendPlugin);
	
	        this.wavesurfer = ws;
	        this.wavesurfer.Backend = _webaudio_segment_player_noPlayControl2.default;
	        this.wavesurfer.createBackend();
	
	        this.setupPluginDOM(ws);
	
	        this.wavesurfer.on('ready', function () {
	            //console.log(params);
	            if (params.transport) {
	                ws.backend.setMasterTransport(params.transport);
	            }
	
	            if (params.playctrl) {
	                ws.backend.setMasterPlayControl(params.playctrl);
	            }
	
	            if (params.json) {
	                ws.backend.loadFromJson(params.json);
	            }
	        });
	    }
	
	    _createClass(BackendPlugin, [{
	        key: 'init',
	        value: function init() {
	            console.log('init webaudio_segment_player');
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            console.log('destroy webaudio_segment_player');
	        }
	    }, {
	        key: 'setupPluginDOM',
	        value: function setupPluginDOM(ws) {
	            /*
	            // 1. Create the button
	            const button = document.createElement('button');
	            button.innerHTML = 'Change Chord';
	             // 2. Append somewhere
	            const body = document.getElementsByTagName('body')[0];
	            body.appendChild(button);
	             // 3. Add event handler
	            button.addEventListener('click', () => {
	                ws.backend.switchEngine();
	            });
	             */
	
	            /*        let container = "sliders";
	                    // create a new div element
	                    // and give it some content
	                     var slider = document.createElement("input");
	                    slider.type = "range";
	                    slider.min = 50;
	                    slider.max = 200;
	                    slider.value = 100;
	                     slider.oninput = function() {
	                        var zoomLevel = Number(slider.value) / 100;
	                        //globalPlayControl.speed = zoomLevel * 2;
	                        ws.backend.setPlaybackRate(zoomLevel * 2);
	                    };
	                      // add the newly created element and its content into the DOM
	                    var currentDiv = document.getElementById(container);
	                    currentDiv.appendChild(slider);*/
	
	        }
	    }]);
	
	    return BackendPlugin;
	}();
	
	exports.default = BackendPlugin;
	module.exports = exports['default'];

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _wavesLoaders = __webpack_require__(1);
	
	var wavesLoaders = _interopRequireWildcard(_wavesLoaders);
	
	var _webaudio = __webpack_require__(153);
	
	var _webaudio2 = _interopRequireDefault(_webaudio);
	
	var _index = __webpack_require__(165);
	
	var wavesAudio = _interopRequireWildcard(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import * as wavesAudio from 'waves-audio';
	
	
	//let wavesAudio = require('../waves-audio.umd.js');
	
	
	var PLAYING = 'playing';
	var PAUSED = 'paused';
	var FINISHED = 'finished';
	
	var Modulo = function Modulo(num, mod) {
	    return (num % mod + mod) % mod;
	};
	// Allows individual looping and speed control for 
	// instance if several segment engines have been added to 
	// the same global transport.
	var _WRAP_SEGMENTENGINE_IN_PLAYCONTROL = false;
	
	var MyWebAudio = function (_WebAudio) {
	    _inherits(MyWebAudio, _WebAudio);
	
	    function MyWebAudio(params) {
	        _classCallCheck(this, MyWebAudio);
	
	        //console.log("MyWebAudio params: ");
	        //console.log(params);
	        var _this = _possibleConstructorReturn(this, (MyWebAudio.__proto__ || Object.getPrototypeOf(MyWebAudio)).call(this, params));
	
	        if (params.transport) _this.transport = params.transport;
	        if (params.playctrl) _this.playControl = params.playctrl;
	
	        return _this;
	    }
	
	    _createClass(MyWebAudio, [{
	        key: 'setupSegmentPlayer',
	        value: function setupSegmentPlayer(segmentDescriptions) {
	            var _ref;
	
	            if (!this.buffer) {
	                console.log("No buffer, is wavesurfer ready?");
	                return;
	            }
	            /* Parse and concatenate segments */
	            console.log("segments from file: " + JSON.stringify(segmentDescriptions));
	            var newSegments = {
	                "time": [],
	                "duration": [],
	                "offset": [],
	                "loudness": []
	            };
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = segmentDescriptions.segments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var seg = _step.value;
	
	                    console.log(seg.identifier);
	                    newSegments.time = newSegments.time.concat(seg.time);
	                    newSegments.duration = newSegments.duration.concat(seg.duration);
	                    newSegments.offset = newSegments.offset.concat(seg.offset);
	                }
	                // Add dummy element at end. This is needed otherwise segment engine halts at the
	                // next to last segment.
	                /*let lastTime = newSegments.time[newSegments.time.length-1];
	                let lastDur = newSegments.duration[newSegments.duration.length-1];
	                newSegments.time.push(lastTime+lastDur);
	                newSegments.duration.push(lastDur);*/
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
	
	            console.log("NEW SEGMENT:");
	            console.log(newSegments);
	
	            this.transportedEngine = new wavesAudio.SegmentEngine((_ref = {
	                buffer: this.source.buffer,
	                positionArray: newSegments.time,
	                durationArray: newSegments.duration,
	                offsetArray: newSegments.offset,
	                polyCutoff: segmentDescriptions.cutoffTime || 2,
	                polyEndvol: 0,
	                attackAbs: segmentDescriptions.attackAbs || 0.005,
	                speed: segmentDescriptions.speed || 1.0, /* not used currently */
	                periodAbs: segmentDescriptions.periodAbs || 0.0,
	                periodRel: segmentDescriptions.periodRel || 1, //0.087,
	                periodVar: segmentDescriptions.periodVar || 0, //0.052,
	                position: segmentDescriptions.position || 0.0,
	                positionVar: segmentDescriptions.positionVar || 0.0,
	                durationAbs: segmentDescriptions.durationAbs || 0, //0.43,
	                durationRel: segmentDescriptions.durationRel || 0.95
	            }, _defineProperty(_ref, 'attackAbs', segmentDescriptions.attackAbs || 0.005), _defineProperty(_ref, 'attackRel', segmentDescriptions.attackRel || 0.0), _defineProperty(_ref, 'releaseAbs', segmentDescriptions.releaseAbs || 0.005), _defineProperty(_ref, 'releaseRel', segmentDescriptions.releaseRel || 0), _defineProperty(_ref, 'releaseShape', segmentDescriptions.releaseShape || "lin"), _defineProperty(_ref, 'expRampOffset', segmentDescriptions.expRampOffset || 0.0001), _defineProperty(_ref, 'resampling', segmentDescriptions.resampling || 0.0), _defineProperty(_ref, 'resamplingVar', segmentDescriptions.resamplingVar || 0), _defineProperty(_ref, 'gain', segmentDescriptions.gain || 1.0), _defineProperty(_ref, 'centered', segmentDescriptions.centered || true), _defineProperty(_ref, 'cyclic', segmentDescriptions.cyclic || false), _ref));
	            this.transportedEngine.connect(this.analyser);
	
	            //this.transportedObj = this.transport.add(this.transportedEngine, 99999);
	            //console.log("adding engine at transport pos 99999");
	
	            this.setVolume(segmentDescriptions.gain || 1);
	        }
	    }, {
	        key: 'loadFromJson',
	        value: function loadFromJson(json) {
	            this.segmentDescriptions = json;
	            this.setupSegmentPlayer(json);
	            return 'Dummy';
	        }
	    }, {
	        key: 'setMasterTransport',
	        value: function setMasterTransport(master) {
	
	            this.transport = master;
	            console.log("new master transport:");
	            console.log(master);
	        }
	    }, {
	        key: 'setMasterPlayControl',
	        value: function setMasterPlayControl(control) {
	
	            this.playControl = control;
	            console.log("new master play control:");
	            console.log(control);
	        }
	    }, {
	        key: 'getTransported',
	        value: function getTransported() {
	            return this.transportedEngine;
	        }
	    }, {
	        key: 'switchEngine',
	        value: function switchEngine(part) {
	            var _headroom = 1;
	            //console.log("PART:" + part);
	
	            if (part > this.segmentDescriptions.segments.length - 1) {
	                console.log("Trying to set part that dont exist!");
	                part = 0;
	            }
	            //console.log(this.segmentDescriptions.segments[part]);    
	
	            var _duration = this.segmentDescriptions.segments[part].duration.reduce(function (prev, curr) {
	                return prev + curr;
	            });
	            //console.log(_duration);
	
	            var pos = (this.transport.currentPosition / _duration).toFixed(0) * _duration;
	            console.log("POS:" + pos);
	            if (this.transportedObj) {
	                this.transportedObj.setBoundaries(pos, _duration + _headroom, -(_duration * part), 1);
	                //console.log(this.transportedObj);
	            }
	            this.currentPart = part;
	        }
	    }, {
	        key: 'getAudioContext',
	        value: function getAudioContext() {
	            if (!window.WaveSurferAudioContext) {
	
	                window.WaveSurferAudioContext = wavesAudio.audioContext;
	            }
	
	            return window.WaveSurferAudioContext;
	        }
	    }, {
	        key: 'addOnAudioProcess',
	        value: function addOnAudioProcess() {
	            var my = this;
	
	            this.scriptNode.onaudioprocess = function (e) {
	                var time = my.getCurrentTime();
	
	                if (time >= my.getDuration() || time < 0) {
	                    //my.setState(FINISHED);
	                    my.fireEvent('pause');
	                } else if (time >= my.scheduledPause && my.playControl && !my.playControl.loop) {
	                    //my.setState(PAUSED);
	                    my.fireEvent('pause');
	                } else if (my.state === my.states[PLAYING]) {
	                    my.fireEvent('audioprocess', time);
	                }
	            };
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            console.log('FIXME: Do cleanup of wavesjs etc...');
	            _get(MyWebAudio.prototype.__proto__ || Object.getPrototypeOf(MyWebAudio.prototype), 'destroy', this).call(this);
	        }
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
	
	            //const scheduler = wavesAudio.getScheduler();
	            // Create Progression display
	
	            /*this.positionDisplay = new wavesAudio.TimeEngine();
	            this.positionDisplay.period = 0.05;
	             let _last = -1;
	            this.positionDisplay.advanceTime = (time) => {
	                // console.log(this.currentEngine.segmentIndex);
	                this.fireEvent('audioprocess', time);
	                if (this.transportedEngine) {
	                    const idx = this.currentPart || 0;
	                    const MAX_SEGMENT = this.segmentDescriptions.segments[idx].time.length; // FIXME: This assumes all segments are equal to first.
	                    
	                    const seg = Modulo(this.transportedEngine.segmentIndex - 1, MAX_SEGMENT) + 1;
	                    //console.log("seg: " + seg + " / " + MAX_SEGMENT);
	                    switch (seg) {
	                        case MAX_SEGMENT: //last segment in serie
	                            if (_last != seg) { // use a flag so we only do this once per cycle
	                                 // Fire an event and tell master app that we're ready to accept chord change.
	                                // The master app will look up to correct "next" chord and call this players switchEngine
	                                console.log("last segment, time to change chord");
	                                this.fireEvent('lastsegment'); 
	                                _last = MAX_SEGMENT;
	                             }
	                            break;
	                        default:
	                            if (_last != seg) {
	                                const _duration = this.segmentDescriptions.segments[idx].duration.reduce((prev, curr) => prev + curr);
	                                this.startOffset = this.currentPart * _duration;
	                                _last = seg;
	                            }
	                            break;
	                    }
	                 }
	                  return time + this.positionDisplay.period;
	            };
	             scheduler.add(this.positionDisplay);*/
	            this.setState(PLAYING);
	
	            this.fireEvent('play');
	        }
	    }, {
	        key: 'seekTo',
	        value: function seekTo(start, end) {}
	    }, {
	        key: 'getPlayedTime',
	        value: function getPlayedTime() {
	
	            return this.transportedEngine.currentPosition;
	        }
	    }, {
	        key: 'play',
	        value: function play(start, end) {
	            if (!this.buffer) {
	                return;
	            }
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {}
	    }, {
	        key: 'setPlaybackRate',
	        value: function setPlaybackRate(value) {}
	    }]);
	
	    return MyWebAudio;
	}(_webaudio2.default);
	
	exports.default = MyWebAudio;
	module.exports = exports['default'];

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _audioContext = __webpack_require__(166);
	
	Object.defineProperty(exports, 'audioContext', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_audioContext).default;
	  }
	});
	
	var _timeEngine = __webpack_require__(167);
	
	Object.defineProperty(exports, 'TimeEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_timeEngine).default;
	  }
	});
	
	var _audioTimeEngine = __webpack_require__(168);
	
	Object.defineProperty(exports, 'AudioTimeEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_audioTimeEngine).default;
	  }
	});
	
	var _priorityQueue = __webpack_require__(169);
	
	Object.defineProperty(exports, 'PriorityQueue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_priorityQueue).default;
	  }
	});
	
	var _schedulingQueue = __webpack_require__(170);
	
	Object.defineProperty(exports, 'SchedulingQueue', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_schedulingQueue).default;
	  }
	});
	
	var _granularEngine = __webpack_require__(171);
	
	Object.defineProperty(exports, 'GranularEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_granularEngine).default;
	  }
	});
	
	var _metronome = __webpack_require__(172);
	
	Object.defineProperty(exports, 'Metronome', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_metronome).default;
	  }
	});
	
	var _playerEngine = __webpack_require__(173);
	
	Object.defineProperty(exports, 'PlayerEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_playerEngine).default;
	  }
	});
	
	var _segmentEngine = __webpack_require__(174);
	
	Object.defineProperty(exports, 'SegmentEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_segmentEngine).default;
	  }
	});
	
	var _sequencerEngine = __webpack_require__(175);
	
	Object.defineProperty(exports, 'SequencerEngine', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_sequencerEngine).default;
	  }
	});
	
	var _playControl = __webpack_require__(176);
	
	Object.defineProperty(exports, 'PlayControl', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_playControl).default;
	  }
	});
	
	var _transport = __webpack_require__(184);
	
	Object.defineProperty(exports, 'Transport', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_transport).default;
	  }
	});
	
	var _scheduler = __webpack_require__(178);
	
	Object.defineProperty(exports, 'Scheduler', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_scheduler).default;
	  }
	});
	
	var _simpleScheduler = __webpack_require__(183);
	
	Object.defineProperty(exports, 'SimpleScheduler', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_simpleScheduler).default;
	  }
	});
	
	var _factories = __webpack_require__(177);
	
	Object.defineProperty(exports, 'getScheduler', {
	  enumerable: true,
	  get: function get() {
	    return _factories.getScheduler;
	  }
	});
	Object.defineProperty(exports, 'getSimpleScheduler', {
	  enumerable: true,
	  get: function get() {
	    return _factories.getSimpleScheduler;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 166 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// exposes a single instance
	var audioContext = null;
	
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	
	if (AudioContext) {
	  audioContext = new AudioContext();
	
	  if (/(iPhone|iPad)/i.test(navigator.userAgent) && audioContext.sampleRate < 44100) {
	    var buffer = audioContext.createBuffer(1, 1, 44100);
	    var dummy = audioContext.createBufferSource();
	    dummy.buffer = buffer;
	    dummy.connect(audioContext.destination);
	    dummy.start(0);
	    dummy.disconnect();
	  }
	}
	
	exports.default = audioContext;
	module.exports = exports["default"];

/***/ },
/* 167 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class TimeEngine
	 */
	var TimeEngine = function () {
	  function TimeEngine() {
	    _classCallCheck(this, TimeEngine);
	
	    this.master = null;
	    this.outputNode = null;
	  }
	
	  _createClass(TimeEngine, [{
	    key: "resetTime",
	    value: function resetTime() {
	      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
	
	      if (this.master) this.master.resetEngineTime(this, time);
	    }
	
	    /**
	     * Transported interface
	     *   - syncPosition(time, position, speed), called to reposition TimeEngine, returns next position
	     *   - advancePosition(time, position, speed), called to generate next event at given time and position, returns next position
	     */
	
	  }, {
	    key: "resetPosition",
	    value: function resetPosition() {
	      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
	
	      if (this.master) this.master.resetEnginePosition(this, position);
	    }
	
	    /**
	     * Speed-controlled interface
	     *   - syncSpeed(time, position, speed, ), called to
	     */
	
	  }, {
	    key: "currentTime",
	    get: function get() {
	      if (this.master) return this.master.currentTime;
	
	      return undefined;
	    }
	  }, {
	    key: "currentPosition",
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return undefined;
	    }
	
	    /**
	     * Scheduled interface
	     *   - advanceTime(time), called to generate next event at given time, returns next time
	     */
	
	  }], [{
	    key: "implementsScheduled",
	    value: function implementsScheduled(engine) {
	      return engine.advanceTime && engine.advanceTime instanceof Function;
	    }
	  }, {
	    key: "implementsTransported",
	    value: function implementsTransported(engine) {
	      return engine.syncPosition && engine.syncPosition instanceof Function && engine.advancePosition && engine.advancePosition instanceof Function;
	    }
	  }, {
	    key: "implementsSpeedControlled",
	    value: function implementsSpeedControlled(engine) {
	      return engine.syncSpeed && engine.syncSpeed instanceof Function;
	    }
	  }]);
	
	  return TimeEngine;
	}();
	
	exports.default = TimeEngine;
	module.exports = exports["default"];

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _timeEngine = __webpack_require__(167);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	var _audioContext = __webpack_require__(166);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * @class AudioTimeEngine
	 */
	var AudioTimeEngine = function (_TimeEngine) {
	  _inherits(AudioTimeEngine, _TimeEngine);
	
	  function AudioTimeEngine() {
	    var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _audioContext2.default;
	
	    _classCallCheck(this, AudioTimeEngine);
	
	    var _this = _possibleConstructorReturn(this, (AudioTimeEngine.__proto__ || Object.getPrototypeOf(AudioTimeEngine)).call(this));
	
	    _this.audioContext = audioContext;
	    _this.outputNode = null;
	    return _this;
	  }
	
	  _createClass(AudioTimeEngine, [{
	    key: 'connect',
	    value: function connect(target) {
	      this.outputNode.connect(target);
	      return this;
	    }
	  }, {
	    key: 'disconnect',
	    value: function disconnect(connection) {
	      this.outputNode.disconnect(connection);
	      return this;
	    }
	  }]);
	
	  return AudioTimeEngine;
	}(_timeEngine2.default);
	
	exports.default = AudioTimeEngine;
	module.exports = exports['default'];

/***/ },
/* 169 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// works by reference
	function swap(arr, i1, i2) {
	  var tmp = arr[i1];
	  arr[i1] = arr[i2];
	  arr[i2] = tmp;
	}
	
	// https://jsperf.com/js-for-loop-vs-array-indexof/346
	function indexOf(arr, el) {
	  var l = arr.length;
	  // ignore first element as it can't be a entry
	  for (var i = 1; i < l; i++) {
	    if (arr[i] === el) {
	      return i;
	    }
	  }
	
	  return -1;
	}
	
	/**
	 * Define if `time1` should be lower in the topography than `time2`.
	 * Is dynamically affected to the priority queue according to handle `min` and `max` heap.
	 * @param {Number} time1
	 * @param {Number} time2
	 * @return {Boolean}
	 */
	var _isLowerMaxHeap = function _isLowerMaxHeap(time1, time2) {
	  return time1 < time2;
	};
	
	var _isLowerMinHeap = function _isLowerMinHeap(time1, time2) {
	  return time1 > time2;
	};
	
	/**
	 * Define if `time1` should be higher in the topography than `time2`.
	 * Is dynamically affected to the priority queue according to handle `min` and `max` heap.
	 * @param {Number} time1
	 * @param {Number} time2
	 * @return {Boolean}
	 */
	var _isHigherMaxHeap = function _isHigherMaxHeap(time1, time2) {
	  return time1 > time2;
	};
	
	var _isHigherMinHeap = function _isHigherMinHeap(time1, time2) {
	  return time1 < time2;
	};
	
	var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
	
	/**
	 * Priority queue implementing a binary heap.
	 * Acts as a min heap by default, can be dynamically changed to a max heap by setting `reverse` to true.
	 */
	
	var PriorityQueue = function () {
	  /**
	   * @param {String} [accessor='time'] - The attribute of the entries that should be used as the priority value. This attribute must be a number.
	   * @param {Number} [heapLength=100] - The size of the array used to create the heap.
	   */
	  function PriorityQueue() {
	    var heapLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
	
	    _classCallCheck(this, PriorityQueue);
	
	    /**
	     * @type {Number}
	     * A pointer to the first empty index of the heap.
	     */
	    this._currentLength = 1;
	
	    /**
	     * An array of the sorted indexes of the entries, the actual heap. Ignore the index 0.
	     * @type {Array}
	     */
	    this._heap = new Array(heapLength + 1);
	
	    /**
	     * Define the type of the queue: `min` heap if `false`, `max` heap if `true`
	     * @type {Boolean}
	     */
	    this._reverse = null;
	
	    // initialize compare functions
	    this.reverse = false;
	  }
	
	  /**
	   * Return the time of the first element in the binary heap.
	   * @returns {Number}
	   */
	
	
	  _createClass(PriorityQueue, [{
	    key: "_bubbleUp",
	
	
	    /**
	     * Fix the heap by moving an entry to a new upper position.
	     * @param {Number} startIndex - The index of the entry to move.
	     */
	    value: function _bubbleUp(startIndex) {
	      var entry = this._heap[startIndex];
	
	      var index = startIndex;
	      var parentIndex = Math.floor(index / 2);
	      var parent = this._heap[parentIndex];
	
	      while (parent && this._isHigher(entry.queueTime, parent.queueTime)) {
	        swap(this._heap, index, parentIndex);
	
	        index = parentIndex;
	        parentIndex = Math.floor(index / 2);
	        parent = this._heap[parentIndex];
	      }
	    }
	
	    /**
	     * Fix the heap by moving an entry to a new lower position.
	     * @param {Number} startIndex - The index of the entry to move.
	     */
	
	  }, {
	    key: "_bubbleDown",
	    value: function _bubbleDown(startIndex) {
	      var entry = this._heap[startIndex];
	
	      var index = startIndex;
	      var c1index = index * 2;
	      var c2index = c1index + 1;
	      var child1 = this._heap[c1index];
	      var child2 = this._heap[c2index];
	
	      while (child1 && this._isLower(entry.queueTime, child1.queueTime) || child2 && this._isLower(entry.queueTime, child2.queueTime)) {
	        // swap with the minimum child
	        var targetIndex = void 0;
	
	        if (child2) targetIndex = this._isHigher(child1.queueTime, child2.queueTime) ? c1index : c2index;else targetIndex = c1index;
	
	        swap(this._heap, index, targetIndex);
	
	        // update to find next children
	        index = targetIndex;
	        c1index = index * 2;
	        c2index = c1index + 1;
	        child1 = this._heap[c1index];
	        child2 = this._heap[c2index];
	      }
	    }
	
	    /**
	     * Build the heap from bottom up.
	     */
	
	  }, {
	    key: "buildHeap",
	    value: function buildHeap() {
	      // find the index of the last internal node
	      // @todo - make sure that's the right way to do.
	      var maxIndex = Math.floor((this._currentLength - 1) / 2);
	
	      for (var i = maxIndex; i > 0; i--) {
	        this._bubbleDown(i);
	      }
	    }
	
	    /**
	     * Insert a new object in the binary heap, and sort it.
	     * @param {Object} entry - Entry to insert.
	     * @param {Number} time - Time at which the entry should be orderer.
	     * @returns {Number} - Time of the first entry in the heap.
	     */
	
	  }, {
	    key: "insert",
	    value: function insert(entry, time) {
	      if (Math.abs(time) !== POSITIVE_INFINITY) {
	        entry.queueTime = time;
	        // add the new entry at the end of the heap
	        this._heap[this._currentLength] = entry;
	        // bubble it up
	        this._bubbleUp(this._currentLength);
	        this._currentLength += 1;
	
	        return this.time;
	      }
	
	      entry.queueTime = undefined;
	      return this.remove(entry);
	    }
	
	    /**
	     * Move an entry to a new position.
	     * @param {Object} entry - Entry to move.
	     * @param {Number} time - Time at which the entry should be orderer.
	     * @return {Number} - Time of first entry in the heap.
	     */
	
	  }, {
	    key: "move",
	    value: function move(entry, time) {
	      if (Math.abs(time) !== POSITIVE_INFINITY) {
	        var index = indexOf(this._heap, entry);
	
	        if (index !== -1) {
	          entry.queueTime = time;
	          // define if the entry should be bubbled up or down
	          var parent = this._heap[Math.floor(index / 2)];
	
	          if (parent && this._isHigher(time, parent.queueTime)) this._bubbleUp(index);else this._bubbleDown(index);
	        }
	
	        return this.time;
	      }
	
	      entry.queueTime = undefined;
	      return this.remove(entry);
	    }
	
	    /**
	     * This is broken, assuming bubbling down only is false
	     * Remove an entry from the heap and fix the heap.
	     * @param {Object} entry - Entry to remove.
	     * @return {Number} - Time of first entry in the heap.
	     */
	
	  }, {
	    key: "remove",
	    value: function remove(entry) {
	      // find the index of the entry
	      var index = indexOf(this._heap, entry);
	
	      if (index !== -1) {
	        var lastIndex = this._currentLength - 1;
	
	        // if the entry is the last one
	        if (index === lastIndex) {
	          // remove the element from heap
	          this._heap[lastIndex] = undefined;
	          // update current length
	          this._currentLength = lastIndex;
	
	          return this.time;
	        } else {
	          // swap with the last element of the heap
	          swap(this._heap, index, lastIndex);
	          // remove the element from heap
	          this._heap[lastIndex] = undefined;
	
	          if (index === 1) {
	            this._bubbleDown(1);
	          } else {
	            // bubble the (ex last) element up or down according to its new context
	            var _entry = this._heap[index];
	            var parent = this._heap[Math.floor(index / 2)];
	
	            if (parent && this._isHigher(_entry.queueTime, parent.queueTime)) this._bubbleUp(index);else this._bubbleDown(index);
	          }
	        }
	
	        // update current length
	        this._currentLength = lastIndex;
	      }
	
	      return this.time;
	    }
	
	    /**
	     * Clear the queue.
	     */
	
	  }, {
	    key: "clear",
	    value: function clear() {
	      this._currentLength = 1;
	      this._heap = new Array(this._heap.length);
	    }
	  }, {
	    key: "has",
	    value: function has(entry) {
	      return this._heap.indexOf(entry) !== -1;
	    }
	  }, {
	    key: "time",
	    get: function get() {
	      if (this._currentLength > 1) return this._heap[1].queueTime;
	
	      return Infinity;
	    }
	
	    /**
	     * Returns the entry of the first element in the binary heap.
	     * @returns {Number}
	     */
	
	  }, {
	    key: "head",
	    get: function get() {
	      return this._heap[1];
	    }
	
	    /**
	     * Change the order of the queue, rebuild the heap with the existing entries.
	     * @type {Boolean}
	     */
	
	  }, {
	    key: "reverse",
	    set: function set(value) {
	      if (value !== this._reverse) {
	        this._reverse = value;
	
	        if (this._reverse === true) {
	          this._isLower = _isLowerMaxHeap;
	          this._isHigher = _isHigherMaxHeap;
	        } else {
	          this._isLower = _isLowerMinHeap;
	          this._isHigher = _isHigherMinHeap;
	        }
	
	        this.buildHeap();
	      }
	    },
	    get: function get() {
	      return this._reverse;
	    }
	  }]);
	
	  return PriorityQueue;
	}();
	
	exports.default = PriorityQueue;
	module.exports = exports["default"];

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _priorityQueue = __webpack_require__(169);
	
	var _priorityQueue2 = _interopRequireDefault(_priorityQueue);
	
	var _timeEngine = __webpack_require__(167);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SchedulingQueue base class
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://wavesjs.github.io/audio/#audio-scheduling-queue
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Norbert.Schnell@ircam.fr
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014, 2015 IRCAM – Centre Pompidou
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * @class SchedulingQueue
	 */
	var SchedulingQueue = function (_TimeEngine) {
	  _inherits(SchedulingQueue, _TimeEngine);
	
	  function SchedulingQueue() {
	    _classCallCheck(this, SchedulingQueue);
	
	    var _this = _possibleConstructorReturn(this, (SchedulingQueue.__proto__ || Object.getPrototypeOf(SchedulingQueue)).call(this));
	
	    _this.__queue = new _priorityQueue2.default();
	    _this.__engines = new Set();
	    return _this;
	  }
	
	  // TimeEngine 'scheduled' interface
	
	
	  _createClass(SchedulingQueue, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var engine = this.__queue.head;
	      var nextEngineTime = engine.advanceTime(time);
	
	      if (!nextEngineTime) {
	        engine.master = null;
	        this.__engines.delete(engine);
	        this.__queue.remove(engine);
	      } else {
	        this.__queue.move(engine, nextEngineTime);
	      }
	
	      return this.__queue.time;
	    }
	
	    // TimeEngine master method to be implemented by derived class
	
	  }, {
	    key: 'defer',
	
	
	    // call a function at a given time
	    value: function defer(fun) {
	      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentTime;
	
	      if (!(fun instanceof Function)) throw new Error("object cannot be defered by scheduler");
	
	      this.add({
	        advanceTime: function advanceTime(time) {
	          fun(time);
	        } }, time);
	    }
	
	    // add a time engine to the scheduler
	
	  }, {
	    key: 'add',
	    value: function add(engine) {
	      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentTime;
	
	      if (!_timeEngine2.default.implementsScheduled(engine)) throw new Error("object cannot be added to scheduler");
	
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      engine.master = this;
	
	      // add to engines and queue
	      this.__engines.add(engine);
	      var nextTime = this.__queue.insert(engine, time);
	
	      // reschedule queue
	      this.resetTime(nextTime);
	    }
	
	    // remove a time engine from the queue
	
	  }, {
	    key: 'remove',
	    value: function remove(engine) {
	      if (engine.master !== this) throw new Error("object has not been added to this scheduler");
	
	      engine.master = null;
	
	      // remove from array and queue
	      this.__engines.delete(engine);
	      var nextTime = this.__queue.remove(engine);
	
	      // reschedule queue
	      this.resetTime(nextTime);
	    }
	
	    // reset next engine time
	
	  }, {
	    key: 'resetEngineTime',
	    value: function resetEngineTime(engine) {
	      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentTime;
	
	      if (engine.master !== this) throw new Error("object has not been added to this scheduler");
	
	      var nextTime = void 0;
	
	      if (this.__queue.has(engine)) nextTime = this.__queue.move(engine, time);else nextTime = this.__queue.insert(engine, time);
	
	      this.resetTime(nextTime);
	    }
	
	    // check whether a given engine is scheduled
	
	  }, {
	    key: 'has',
	    value: function has(engine) {
	      return this.__engines.has(engine);
	    }
	
	    // clear queue
	
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.__engines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var engine = _step.value;
	
	          engine.master = null;
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
	
	      this.__queue.clear();
	      this.__engines.clear();
	      this.resetTime(Infinity);
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return 0;
	    }
	  }]);
	
	  return SchedulingQueue;
	}(_timeEngine2.default);
	
	exports.default = SchedulingQueue;
	module.exports = exports['default'];

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audioTimeEngine = __webpack_require__(168);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	/**
	 * @class GranularEngine
	 */
	
	var GranularEngine = function (_AudioTimeEngine) {
	  _inherits(GranularEngine, _AudioTimeEngine);
	
	  /**
	   * @constructor
	   * @param {AudioBuffer} buffer initial audio buffer for granular synthesis
	   *
	   * The engine implements the "scheduled" interface.
	   * The grain position (grain onset or center time in the audio buffer) is optionally
	   * determined by the engine's currentPosition attribute.
	   */
	  function GranularEngine() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, GranularEngine);
	
	    /**
	     * Audio buffer
	     * @type {AudioBuffer}
	     */
	    var _this = _possibleConstructorReturn(this, (GranularEngine.__proto__ || Object.getPrototypeOf(GranularEngine)).call(this, options.audioContext));
	
	    _this.buffer = optOrDef(options.buffer, null);
	
	    /**
	     * Absolute grain period in sec
	     * @type {Number}
	     */
	    _this.periodAbs = optOrDef(options.periodAbs, 0.01);
	
	    /**
	     * Grain period relative to absolute duration
	     * @type {Number}
	     */
	    _this.periodRel = optOrDef(options.periodRel, 0);
	
	    /**
	     * Amout of random grain period variation relative to grain period
	     * @type {Number}
	     */
	    _this.periodVar = optOrDef(options.periodVar, 0);
	
	    /**
	     * Minimum grain period
	     * @type {Number}
	     */
	    _this.periodMin = optOrDef(options.periodMin, 0.001);
	
	    /**
	     * Grain position (onset time in audio buffer) in sec
	     * @type {Number}
	     */
	    _this.position = optOrDef(options.position, 0);
	
	    /**
	     * Amout of random grain position variation in sec
	     * @type {Number}
	     */
	    _this.positionVar = optOrDef(options.positionVar, 0.003);
	
	    /**
	     * Absolute grain duration in sec
	     * @type {Number}
	     */
	    _this.durationAbs = optOrDef(options.durationAbs, 0.1); // absolute grain duration
	
	    /**
	     * Grain duration relative to grain period (overlap)
	     * @type {Number}
	     */
	    _this.durationRel = optOrDef(options.durationRel, 0);
	
	    /**
	     * Absolute attack time in sec
	     * @type {Number}
	     */
	    _this.attackAbs = optOrDef(options.attackAbs, 0);
	
	    /**
	     * Attack time relative to grain duration
	     * @type {Number}
	     */
	    _this.attackRel = optOrDef(options.attackRel, 0.5);
	
	    /**
	     * Shape of attack
	     * @type {String} 'lin' for linear ramp, 'exp' for exponential
	     */
	    _this.attackShape = optOrDef(options.attackShape, 'lin');
	
	    /**
	     * Absolute release time in sec
	     * @type {Number}
	     */
	    _this.releaseAbs = optOrDef(options.releaseAbs, 0);
	
	    /**
	     * Release time relative to grain duration
	     * @type {Number}
	     */
	    _this.releaseRel = optOrDef(options.releaseRel, 0.5);
	
	    /**
	     * Shape of release
	     * @type {String} 'lin' for linear ramp, 'exp' for exponential
	     */
	    _this.releaseShape = optOrDef(options.releaseShape, 'lin');
	
	    /**
	     * Offset (start/end value) for exponential attack/release
	     * @type {Number} offset
	     */
	    _this.expRampOffset = optOrDef(options.expRampOffset, 0.0001);
	
	    /**
	     * Grain resampling in cent
	     * @type {Number}
	     */
	    _this.resampling = optOrDef(options.resampling, 0);
	
	    /**
	     * Amout of random resampling variation in cent
	     * @type {Number}
	     */
	    _this.resamplingVar = optOrDef(options.resamplingVar, 0);
	
	    /**
	     * Linear gain factor
	     * @type {Number}
	     */
	    _this.gain = optOrDef(options.gain, 1);
	
	    /**
	     * Whether the grain position refers to the center of the grain (or the beginning)
	     * @type {Bool}
	     */
	    _this.centered = optOrDef(options.centered, true);
	
	    /**
	     * Whether the audio buffer and grain position are considered as cyclic
	     * @type {Bool}
	     */
	    _this.cyclic = optOrDef(options.cyclic, false);
	
	    /**
	     * Portion at the end of the audio buffer that has been copied from the beginning to assure cyclic behavior
	     * @type {Number}
	     */
	    _this.wrapAroundExtension = optOrDef(options.wrapAroundExtension, 0);
	
	    _this.outputNode = _this.audioContext.createGain();
	    return _this;
	  }
	
	  /**
	   * Get buffer duration (excluding wrapAroundExtension)
	   * @return {Number} current buffer duration
	   */
	
	
	  _createClass(GranularEngine, [{
	    key: 'advanceTime',
	
	
	    // TimeEngine method (scheduled interface)
	    value: function advanceTime(time) {
	      time = Math.max(time, this.audioContext.currentTime);
	      return time + this.trigger(time);
	    }
	
	    /**
	     * Trigger a grain
	     * @param {Number} time grain synthesis audio time
	     * @return {Number} period to next grain
	     *
	     * This function can be called at any time (whether the engine is scheduled or not)
	     * to generate a single grain according to the current grain parameters.
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(time) {
	      var audioContext = this.audioContext;
	      var grainTime = time || audioContext.currentTime;
	      var grainPeriod = this.periodAbs;
	      var grainPosition = this.currentPosition;
	      var grainDuration = this.durationAbs;
	
	      if (this.buffer) {
	        var resamplingRate = 1.0;
	
	        // calculate resampling
	        if (this.resampling !== 0 || this.resamplingVar > 0) {
	          var randomResampling = (Math.random() - 0.5) * 2.0 * this.resamplingVar;
	          resamplingRate = Math.pow(2.0, (this.resampling + randomResampling) / 1200.0);
	        }
	
	        grainPeriod += this.periodRel * grainDuration;
	        grainDuration += this.durationRel * grainPeriod;
	
	        // grain period randon variation
	        if (this.periodVar > 0.0) grainPeriod += 2.0 * (Math.random() - 0.5) * this.periodVar * grainPeriod;
	
	        // center grain
	        if (this.centered) grainPosition -= 0.5 * grainDuration;
	
	        // randomize grain position
	        if (this.positionVar > 0) grainPosition += (2.0 * Math.random() - 1) * this.positionVar;
	
	        var bufferDuration = this.bufferDuration;
	
	        // wrap or clip grain position and duration into buffer duration
	        if (grainPosition < 0 || grainPosition >= bufferDuration) {
	          if (this.cyclic) {
	            var cycles = grainPosition / bufferDuration;
	            grainPosition = (cycles - Math.floor(cycles)) * bufferDuration;
	
	            if (grainPosition + grainDuration > this.buffer.duration) grainDuration = this.buffer.duration - grainPosition;
	          } else {
	            if (grainPosition < 0) {
	              grainTime -= grainPosition;
	              grainDuration += grainPosition;
	              grainPosition = 0;
	            }
	
	            if (grainPosition + grainDuration > bufferDuration) grainDuration = bufferDuration - grainPosition;
	          }
	        }
	
	        // make grain
	        if (this.gain > 0 && grainDuration >= 0.001) {
	          // make grain envelope
	          var envelope = audioContext.createGain();
	          var attack = this.attackAbs + this.attackRel * grainDuration;
	          var release = this.releaseAbs + this.releaseRel * grainDuration;
	
	          if (attack + release > grainDuration) {
	            var factor = grainDuration / (attack + release);
	            attack *= factor;
	            release *= factor;
	          }
	
	          var attackEndTime = grainTime + attack;
	          var grainEndTime = grainTime + grainDuration / resamplingRate;
	          var releaseStartTime = grainEndTime - release;
	
	          envelope.gain.value = 0;
	
	          if (this.attackShape === 'lin') {
	            envelope.gain.setValueAtTime(0.0, grainTime);
	            envelope.gain.linearRampToValueAtTime(this.gain, attackEndTime);
	          } else {
	            envelope.gain.setValueAtTime(this.expRampOffset, grainTime);
	            envelope.gain.exponentialRampToValueAtTime(this.gain, attackEndTime);
	          }
	
	          if (releaseStartTime > attackEndTime) envelope.gain.setValueAtTime(this.gain, releaseStartTime);
	
	          if (this.releaseShape === 'lin') {
	            envelope.gain.linearRampToValueAtTime(0.0, grainEndTime);
	          } else {
	            envelope.gain.exponentialRampToValueAtTime(this.expRampOffset, grainEndTime);
	          }
	
	          envelope.connect(this.outputNode);
	
	          // make source
	          var source = audioContext.createBufferSource();
	
	          source.buffer = this.buffer;
	          source.playbackRate.value = resamplingRate;
	          source.connect(envelope);
	
	          source.start(grainTime, grainPosition);
	          source.stop(grainEndTime);
	        }
	      }
	
	      return Math.max(this.periodMin, grainPeriod);
	    }
	  }, {
	    key: 'bufferDuration',
	    get: function get() {
	      if (this.buffer) {
	        var bufferDuration = this.buffer.duration;
	
	        if (this.wrapAroundExtension) bufferDuration -= this.wrapAroundExtension;
	
	        return bufferDuration;
	      }
	
	      return 0;
	    }
	
	    // TimeEngine attribute
	
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return this.position;
	    }
	  }]);
	
	  return GranularEngine;
	}(_audioTimeEngine2.default);
	
	exports.default = GranularEngine;
	module.exports = exports['default'];

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audioTimeEngine = __webpack_require__(168);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	var Metronome = function (_AudioTimeEngine) {
	  _inherits(Metronome, _AudioTimeEngine);
	
	  function Metronome() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Metronome);
	
	    /**
	     * Metronome period
	     * @type {Number}
	     */
	    var _this = _possibleConstructorReturn(this, (Metronome.__proto__ || Object.getPrototypeOf(Metronome)).call(this, options.audioContext));
	
	    _this.__period = optOrDef(options.period, 1);
	
	    /**
	     * Metronome click frequency
	     * @type {Number}
	     */
	    _this.clickFreq = optOrDef(options.clickFreq, 600);
	
	    /**
	     * Metronome click attack time
	     * @type {Number}
	     */
	    _this.clickAttack = optOrDef(options.clickAttack, 0.002);
	
	    /**
	     * Metronome click release time
	     * @type {Number}
	     */
	    _this.clickRelease = optOrDef(options.clickRelease, 0.098);
	
	    _this.__lastTime = 0;
	    _this.__phase = 0;
	
	    _this.__gainNode = _this.audioContext.createGain();
	    _this.__gainNode.gain.value = optOrDef(options.gain, 1);
	
	    _this.outputNode = _this.__gainNode;
	    return _this;
	  }
	
	  // TimeEngine method (scheduled interface)
	
	
	  _createClass(Metronome, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      this.trigger(time);
	      this.__lastTime = time;
	      return time + this.__period;
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      if (this.__period > 0) {
	        var nextPosition = (Math.floor(position / this.__period) + this.__phase) * this.__period;
	
	        if (speed > 0 && nextPosition < position) nextPosition += this.__period;else if (speed < 0 && nextPosition > position) nextPosition -= this.__period;
	
	        return nextPosition;
	      }
	
	      return Infinity * speed;
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      this.trigger(time);
	
	      if (speed < 0) return position - this.__period;
	
	      return position + this.__period;
	    }
	
	    /**
	     * Trigger metronome click
	     * @param {Number} time metronome click synthesis audio time
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(time) {
	      var audioContext = this.audioContext;
	      var clickAttack = this.clickAttack;
	      var clickRelease = this.clickRelease;
	
	      var env = audioContext.createGain();
	      env.gain.value = 0.0;
	      env.gain.setValueAtTime(0, time);
	      env.gain.linearRampToValueAtTime(1.0, time + clickAttack);
	      env.gain.exponentialRampToValueAtTime(0.0000001, time + clickAttack + clickRelease);
	      env.gain.setValueAtTime(0, time);
	      env.connect(this.outputNode);
	
	      var osc = audioContext.createOscillator();
	      osc.frequency.value = this.clickFreq;
	      osc.start(time);
	      osc.stop(time + clickAttack + clickRelease);
	      osc.connect(env);
	    }
	
	    /**
	     * Set gain
	     * @param {Number} value linear gain factor
	     */
	
	  }, {
	    key: 'gain',
	    set: function set(value) {
	      this.__gainNode.gain.value = value;
	    }
	
	    /**
	     * Get gain
	     * @return {Number} current gain
	     */
	    ,
	    get: function get() {
	      return this.__gainNode.gain.value;
	    }
	
	    /**
	     * Set period parameter
	     * @param {Number} period metronome period
	     */
	
	  }, {
	    key: 'period',
	    set: function set(period) {
	      this.__period = period;
	
	      var master = this.master;
	
	      if (master) {
	        if (master.resetEngineTime) master.resetEngineTime(this, this.__lastTime + period);else if (master.resetEnginePosition) master.resetEnginePosition(this);
	      }
	    }
	
	    /**
	     * Get period parameter
	     * @return {Number} value of period parameter
	     */
	    ,
	    get: function get() {
	      return this.__period;
	    }
	
	    /**
	     * Set phase parameter (available only when 'transported')
	     * @param {Number} phase metronome phase [0, 1[
	     */
	
	  }, {
	    key: 'phase',
	    set: function set(phase) {
	      this.__phase = phase - Math.floor(phase);
	
	      var master = this.master;
	
	      if (master && master.resetEnginePosition !== undefined) master.resetEnginePosition(this);
	    }
	
	    /**
	     * Get phase parameter
	     * @return {Number} value of phase parameter
	     */
	    ,
	    get: function get() {
	      return this.__phase;
	    }
	  }]);
	
	  return Metronome;
	}(_audioTimeEngine2.default);
	
	exports.default = Metronome;
	module.exports = exports['default'];

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audioTimeEngine = __webpack_require__(168);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	var PlayerEngine = function (_AudioTimeEngine) {
	  _inherits(PlayerEngine, _AudioTimeEngine);
	
	  function PlayerEngine() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, PlayerEngine);
	
	    var _this = _possibleConstructorReturn(this, (PlayerEngine.__proto__ || Object.getPrototypeOf(PlayerEngine)).call(this, options.audioContext));
	
	    _this.transport = null; // set when added to transporter
	
	    /**
	     * Audio buffer
	     * @type {AudioBuffer}
	     */
	    _this.buffer = optOrDef(options.buffer, null);
	
	    /**
	     * Fade time for chaining segments (e.g. in start, stop, and seek)
	     * @type {AudioBuffer}
	     */
	    _this.fadeTime = optOrDef(options.fadeTime, 0.005);
	
	    _this.__time = 0;
	    _this.__position = 0;
	    _this.__speed = 0;
	
	    _this.__bufferSource = null;
	    _this.__envNode = null;
	
	    _this.__gainNode = _this.audioContext.createGain();
	    _this.__gainNode.gain.value = optOrDef(options.gain, 1);
	
	    _this.__cyclic = optOrDef(options.cyclic, false);
	
	    _this.outputNode = _this.__gainNode;
	    return _this;
	  }
	
	  _createClass(PlayerEngine, [{
	    key: '__start',
	    value: function __start(time, position, speed) {
	      var audioContext = this.audioContext;
	
	      if (this.buffer) {
	        var bufferDuration = this.buffer.duration;
	
	        if (this.__cyclic && (position < 0 || position >= bufferDuration)) {
	          var phase = position / bufferDuration;
	          position = (phase - Math.floor(phase)) * bufferDuration;
	        }
	
	        if (position >= 0 && position < bufferDuration && speed > 0) {
	          this.__envNode = audioContext.createGain();
	          this.__envNode.gain.setValueAtTime(0, time);
	          this.__envNode.gain.linearRampToValueAtTime(1, time + this.fadeTime);
	          this.__envNode.connect(this.__gainNode);
	
	          this.__bufferSource = audioContext.createBufferSource();
	          this.__bufferSource.buffer = this.buffer;
	          this.__bufferSource.playbackRate.value = speed;
	          this.__bufferSource.loop = this.__cyclic;
	          this.__bufferSource.loopStart = 0;
	          this.__bufferSource.loopEnd = bufferDuration;
	          this.__bufferSource.start(time, position);
	          this.__bufferSource.connect(this.__envNode);
	        }
	      }
	    }
	  }, {
	    key: '__halt',
	    value: function __halt(time) {
	      if (this.__bufferSource) {
	        this.__envNode.gain.cancelScheduledValues(time);
	        this.__envNode.gain.setValueAtTime(this.__envNode.gain.value, time);
	        this.__envNode.gain.linearRampToValueAtTime(0, time + this.fadeTime);
	        this.__bufferSource.stop(time + this.fadeTime);
	
	        this.__bufferSource = null;
	        this.__envNode = null;
	      }
	    }
	
	    // TimeEngine method (speed-controlled interface)
	
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      var seek = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	      var lastSpeed = this.__speed;
	
	      if (speed !== lastSpeed || seek) {
	        if (seek || lastSpeed * speed < 0) {
	          this.__halt(time);
	          this.__start(time, position, speed);
	        } else if (lastSpeed === 0 || seek) {
	          this.__start(time, position, speed);
	        } else if (speed === 0) {
	          this.__halt(time);
	        } else if (this.__bufferSource) {
	          this.__bufferSource.playbackRate.setValueAtTime(speed, time);
	        }
	
	        this.__speed = speed;
	      }
	    }
	
	    /**
	     * Set whether the audio buffer is considered as cyclic
	     * @param {Bool} cyclic whether the audio buffer is considered as cyclic
	     */
	
	  }, {
	    key: 'cyclic',
	    set: function set(cyclic) {
	      if (cyclic !== this.__cyclic) {
	        var time = this.currentTime;
	        var position = this.currentosition;
	
	        this.__halt(time);
	        this.__cyclic = cyclic;
	
	        if (this.__speed !== 0) this.__start(time, position, this.__speed);
	      }
	    }
	
	    /**
	     * Get whether the audio buffer is considered as cyclic
	     * @return {Bool} whether the audio buffer is considered as cyclic
	     */
	    ,
	    get: function get() {
	      return this.__cyclic;
	    }
	
	    /**
	     * Set gain
	     * @param {Number} value linear gain factor
	     */
	
	  }, {
	    key: 'gain',
	    set: function set(value) {
	      var time = this.currentTime;
	      this.__gainNode.cancelScheduledValues(time);
	      this.__gainNode.setValueAtTime(this.__gainNode.gain.value, time);
	      this.__gainNode.linearRampToValueAtTime(0, time + this.fadeTime);
	    }
	
	    /**
	     * Get gain
	     * @return {Number} current gain
	     */
	    ,
	    get: function get() {
	      return this.__gainNode.gain.value;
	    }
	
	    /**
	     * Get buffer duration
	     * @return {Number} current buffer duration
	     */
	
	  }, {
	    key: 'bufferDuration',
	    get: function get() {
	      if (this.buffer) return this.buffer.duration;
	
	      return 0;
	    }
	  }]);
	
	  return PlayerEngine;
	}(_audioTimeEngine2.default);
	
	exports.default = PlayerEngine;
	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audioTimeEngine = __webpack_require__(168);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function optOrDef(opt, def) {
	  if (opt !== undefined) return opt;
	
	  return def;
	}
	
	function getCurrentOrPreviousIndex(sortedArray, value) {
	  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
	
	  var size = sortedArray.length;
	
	  if (size > 0) {
	    var firstVal = sortedArray[0];
	    var lastVal = sortedArray[size - 1];
	
	    if (value < firstVal) index = -1;else if (value >= lastVal) index = size - 1;else {
	      if (index < 0 || index >= size) index = Math.floor((size - 1) * (value - firstVal) / (lastVal - firstVal));
	
	      while (sortedArray[index] > value) {
	        index--;
	      }while (sortedArray[index + 1] <= value) {
	        index++;
	      }
	    }
	  }
	
	  return index;
	}
	
	function getCurrentOrNextIndex(sortedArray, value) {
	  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
	
	  var size = sortedArray.length;
	
	  if (size > 0) {
	    var firstVal = sortedArray[0];
	    var lastVal = sortedArray[size - 1];
	
	    if (value <= firstVal) index = 0;else if (value >= lastVal) index = size;else {
	      if (index < 0 || index >= size) index = Math.floor((size - 1) * (value - firstVal) / (lastVal - firstVal));
	
	      while (sortedArray[index] < value) {
	        index++;
	      }while (sortedArray[index - 1] >= value) {
	        index--;
	      }
	    }
	  }
	
	  return index;
	}
	
	/**
	 * @class SegmentEngine
	 */
	
	var SegmentEngine = function (_AudioTimeEngine) {
	  _inherits(SegmentEngine, _AudioTimeEngine);
	
	  /**
	   * @constructor
	   * @param {AudioBuffer} buffer initial audio buffer for granular synthesis
	   *
	   * The engine implements the "scheduled" and "transported" interfaces.
	   * When "scheduled", the engine  generates segments more or less periodically
	   * (controlled by the periodAbs, periodRel, and perioVar attributes).
	   * When "transported", the engine generates segments at the position of their onset time.
	   */
	  function SegmentEngine() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, SegmentEngine);
	
	    /**
	     * Audio buffer
	     * @type {AudioBuffer}
	     */
	    var _this = _possibleConstructorReturn(this, (SegmentEngine.__proto__ || Object.getPrototypeOf(SegmentEngine)).call(this, options.audioContext));
	
	    _this.buffer = optOrDef(options.buffer, null);
	
	    /**
	     * Absolute segment period in sec
	     * @type {Number}
	     */
	    _this.periodAbs = optOrDef(options.periodAbs, 0);
	
	    /**
	     * Segment period relative to inter-segment distance
	     * @type {Number}
	     */
	    _this.periodRel = optOrDef(options.periodRel, 1);
	
	    /**
	     * Amout of random segment period variation relative to segment period
	     * @type {Number}
	     */
	    _this.periodVar = optOrDef(options.periodVar, 0);
	
	    /**
	     * Minimum segment period
	     * @type {Number}
	     */
	    _this.periodMin = optOrDef(options.periodMin, 0.001);
	
	    /**
	     * Array of segment positions (onset times in audio buffer) in sec
	     * @type {Number}
	     */
	    _this.positionArray = optOrDef(options.positionArray, [0.0]);
	
	    /**
	     * Amout of random segment position variation in sec
	     * @type {Number}
	     */
	    _this.positionVar = optOrDef(options.positionVar, 0);
	
	    /**
	     * Array of segment durations in sec
	     * @type {Number}
	     */
	    _this.durationArray = optOrDef(options.durationArray, [0.0]);
	
	    /**
	     * Absolute segment duration in sec
	     * @type {Number}
	     */
	    _this.durationAbs = optOrDef(options.durationAbs, 0);
	
	    /**
	     * Segment duration relative to given segment duration or inter-segment distance
	     * @type {Number}
	     */
	    _this.durationRel = optOrDef(options.durationRel, 1);
	
	    /**
	     * Array of segment offsets in sec
	     * @type {Number}
	     *
	     * offset > 0: the segment's reference position is after the given segment position
	     * offset < 0: the given segment position is the segment's reference position and the duration has to be corrected by the offset
	     */
	    _this.offsetArray = optOrDef(options.offsetArray, [0.0]);
	
	    /**
	     * Absolute segment offset in sec
	     * @type {Number}
	     */
	    _this.offsetAbs = optOrDef(options.offsetAbs, -0.005);
	
	    /**
	     * Segment offset relative to segment duration
	     * @type {Number}
	     */
	    _this.offsetRel = optOrDef(options.offsetRel, 0);
	
	    /**
	     * Time by which all segments are delayed (especially to realize segment offsets)
	     * @type {Number}
	     */
	    _this.delay = optOrDef(options.delay, 0.005);
	
	    /**
	     * Absolute attack time in sec
	     * @type {Number}
	     */
	    _this.attackAbs = optOrDef(options.attackAbs, 0.005);
	
	    /**
	     * Attack time relative to segment duration
	     * @type {Number}
	     */
	    _this.attackRel = optOrDef(options.attackRel, 0);
	
	    /**
	     * Absolute release time in sec
	     * @type {Number}
	     */
	    _this.releaseAbs = optOrDef(options.releaseAbs, 0.005);
	
	    /**
	     * Release time relative to segment duration
	     * @type {Number}
	     */
	    _this.releaseRel = optOrDef(options.releaseRel, 0);
	
	    /**
	    * Fading volume relase time in seconds when new segment triggers on top of previous one.
	    * @type {Number}
	    */
	    _this.polyCutoff = optOrDef(options.polyCutoff, 2);
	
	    /**
	    * End volume of previous segment at the end of fade release time.
	    * @type {Number}
	    */
	    _this.polyEndvol = optOrDef(options.polyEndvol, 0);
	
	    /**
	     * Segment resampling in cent
	     * @type {Number}
	     */
	    _this.resampling = optOrDef(options.resampling, 0);
	
	    /**
	     * Amout of random resampling variation in cent
	     * @type {Number}
	     */
	    _this.resamplingVar = optOrDef(options.resamplingVar, 0);
	
	    /**
	     * Linear gain factor
	     * @type {Number}
	     */
	    _this.gain = optOrDef(options.gain, 1);
	
	    /**
	     * Index of the segment to synthesize (i.e. of this.positionArray/durationArray/offsetArray)
	     * @type {Number}
	     */
	    _this.segmentIndex = optOrDef(options.segmentIndex, 0);
	
	    /**
	     * Whether the audio buffer and segment indices are considered as cyclic
	     * @type {Bool}
	     */
	    _this.cyclic = optOrDef(options.cyclic, false);
	    _this.__cyclicOffset = 0;
	
	    /**
	     * Portion at the end of the audio buffer that has been copied from the beginning to assure cyclic behavior
	     * @type {Number}
	     */
	    _this.wrapAroundExtension = optOrDef(options.wrapAroundExtension, 0);
	
	    _this.outputNode = _this.audioContext.createGain();
	    return _this;
	  }
	
	  /**
	   * Get buffer duration (excluding wrapAroundExtension)
	   * @return {Number} current buffer duration
	   */
	
	
	  _createClass(SegmentEngine, [{
	    key: 'advanceTime',
	
	
	    // TimeEngine method (transported interface)
	    value: function advanceTime(time) {
	      time = Math.max(time, this.audioContext.currentTime);
	      return time + this.trigger(time);
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      var index = this.segmentIndex;
	      var cyclicOffset = 0;
	      var bufferDuration = this.bufferDuration;
	
	      if (this.cyclic) {
	        var cycles = position / bufferDuration;
	
	        cyclicOffset = Math.floor(cycles) * bufferDuration;
	        position -= cyclicOffset;
	      }
	
	      if (speed > 0) {
	        index = getCurrentOrNextIndex(this.positionArray, position);
	
	        if (index >= this.positionArray.length) {
	          index = 0;
	          cyclicOffset += bufferDuration;
	
	          if (!this.cyclic) return Infinity;
	        }
	      } else if (speed < 0) {
	        index = getCurrentOrPreviousIndex(this.positionArray, position);
	
	        if (index < 0) {
	          index = this.positionArray.length - 1;
	          cyclicOffset -= bufferDuration;
	
	          if (!this.cyclic) return -Infinity;
	        }
	      } else {
	        return Infinity;
	      }
	
	      this.segmentIndex = index;
	      this.__cyclicOffset = cyclicOffset;
	
	      return cyclicOffset + this.positionArray[index];
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      var index = this.segmentIndex;
	      var cyclicOffset = this.__cyclicOffset;
	
	      this.trigger(time);
	
	      if (speed > 0) {
	        index++;
	
	        if (index >= this.positionArray.length) {
	          index = 0;
	          cyclicOffset += this.bufferDuration;
	
	          if (!this.cyclic) return Infinity;
	        }
	      } else {
	        index--;
	
	        if (index < 0) {
	          index = this.positionArray.length - 1;
	          cyclicOffset -= this.bufferDuration;
	
	          if (!this.cyclic) return -Infinity;
	        }
	      }
	
	      this.segmentIndex = index;
	      this.__cyclicOffset = cyclicOffset;
	
	      return cyclicOffset + this.positionArray[index];
	    }
	
	    /**
	     * Trigger a segment
	     * @param {Number} time segment synthesis audio time
	     * @return {Number} period to next segment
	     *
	     * This function can be called at any time (whether the engine is scheduled/transported or not)
	     * to generate a single segment according to the current segment parameters.
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(time) {
	      var audioContext = this.audioContext;
	      var segmentTime = (time || audioContext.currentTime) + this.delay;
	      var segmentPeriod = this.periodAbs;
	      var segmentIndex = this.segmentIndex;
	
	      // fade out previous segment on new segment trigger
	      if (this.prevGain) {
	        // cancel previous faders, i.e. releaseAbs, releaseRel that might interfere and cause clicks
	        // when adding another fader.
	        this.prevGain.gain.cancelScheduledValues(time);
	        // fade out previous segment...
	        this.prevGain.gain.setTargetAtTime(this.polyEndvol, audioContext.currentTime, this.polyCutoff);
	      }
	
	      if (this.buffer) {
	        var segmentPosition = 0.0;
	        var segmentDuration = 0.0;
	        var grainPeriod = this.periodAbs;
	        var segmentOffset = 0.0;
	        var resamplingRate = 1.0;
	        var bufferDuration = this.bufferDuration;
	
	        if (this.cyclic) segmentIndex = segmentIndex % this.positionArray.length;else segmentIndex = Math.max(0, Math.min(segmentIndex, this.positionArray.length - 1));
	
	        if (this.positionArray) segmentPosition = this.positionArray[segmentIndex] || 0;
	
	        if (this.durationArray) segmentDuration = this.durationArray[segmentIndex] || 0;
	
	        if (this.offsetArray) segmentOffset = this.offsetArray[segmentIndex] || 0;
	
	        // calculate resampling
	        if (this.resampling !== 0 || this.resamplingVar > 0) {
	          var randomResampling = (Math.random() - 0.5) * 2.0 * this.resamplingVar;
	          resamplingRate = Math.pow(2.0, (this.resampling + randomResampling) / 1200.0);
	        }
	
	        // calculate inter-segment distance
	        if (segmentDuration === 0 || this.periodRel > 0) {
	          var nextSegmentIndex = segmentIndex + 1;
	          var nextPosition, nextOffset;
	
	          if (nextSegmentIndex === this.positionArray.length) {
	            if (this.cyclic) {
	              nextPosition = this.positionArray[0] + bufferDuration;
	              nextOffset = this.offsetArray[0];
	            } else {
	              nextPosition = bufferDuration;
	              nextOffset = 0;
	            }
	          } else {
	            nextPosition = this.positionArray[nextSegmentIndex];
	            nextOffset = this.offsetArray[nextSegmentIndex];
	          }
	
	          var interSegmentDistance = nextPosition - segmentPosition;
	
	          // correct inter-segment distance by offsets
	          //   offset > 0: the segment's reference position is after the given segment position
	          if (segmentOffset > 0) interSegmentDistance -= segmentOffset;
	
	          if (nextOffset > 0) interSegmentDistance += nextOffset;
	
	          if (interSegmentDistance < 0) interSegmentDistance = 0;
	
	          // use inter-segment distance instead of segment duration
	          if (segmentDuration === 0) segmentDuration = interSegmentDistance;
	
	          // calculate period relative to inter marker distance
	          segmentPeriod += this.periodRel * interSegmentDistance;
	        }
	
	        // add relative and absolute segment duration
	        segmentDuration *= this.durationRel;
	        segmentDuration += this.durationAbs;
	
	        // add relative and absolute segment offset
	        segmentOffset *= this.offsetRel;
	        segmentOffset += this.offsetAbs;
	
	        // apply segment offset
	        //   offset > 0: the segment's reference position is after the given segment position
	        //   offset < 0: the given segment position is the segment's reference position and the duration has to be corrected by the offset
	        if (segmentOffset < 0) {
	          segmentDuration -= segmentOffset;
	          segmentPosition += segmentOffset;
	          segmentTime += segmentOffset / resamplingRate;
	        } else {
	          segmentTime -= segmentOffset / resamplingRate;
	        }
	
	        // randomize segment position
	        if (this.positionVar > 0) segmentPosition += 2.0 * (Math.random() - 0.5) * this.positionVar;
	
	        // shorten duration of segments over the edges of the buffer
	        if (segmentPosition < 0) {
	          //segmentTime -= grainPosition; hm, not sure if we want to do this
	          segmentDuration += segmentPosition;
	          segmentPosition = 0;
	        }
	
	        if (segmentPosition + segmentDuration > this.buffer.duration) segmentDuration = this.buffer.duration - segmentPosition;
	
	        segmentDuration /= resamplingRate;
	
	        // make segment
	        if (this.gain > 0 && segmentDuration > 0) {
	          // make segment envelope
	          this.prevGain = audioContext.createGain();
	          var envelope = this.prevGain;
	
	          var attack = this.attackAbs + this.attackRel * segmentDuration;
	          var release = this.releaseAbs + this.releaseRel * segmentDuration;
	
	          if (attack + release > segmentDuration) {
	            var factor = segmentDuration / (attack + release);
	            attack *= factor;
	            release *= factor;
	          }
	
	          var attackEndTime = segmentTime + attack;
	          var segmentEndTime = segmentTime + segmentDuration;
	          var releaseStartTime = segmentEndTime - release;
	
	          envelope.gain.value = 0;
	          envelope.gain.setValueAtTime(0.0, segmentTime);
	          envelope.gain.linearRampToValueAtTime(this.gain, attackEndTime);
	
	          //if (releaseStartTime > attackEndTime)
	          envelope.gain.setValueAtTime(this.gain, releaseStartTime);
	
	          envelope.gain.linearRampToValueAtTime(0.0, segmentEndTime);
	          envelope.connect(this.outputNode);
	
	          // make source
	          var source = audioContext.createBufferSource();
	
	          source.buffer = this.buffer;
	          source.playbackRate.value = resamplingRate;
	          source.connect(envelope);
	
	          source.start(segmentTime, segmentPosition);
	          source.stop(segmentTime + segmentDuration);
	        }
	      }
	
	      // grain period randon variation
	      if (this.periodVar > 0.0) segmentPeriod += 2.0 * (Math.random() - 0.5) * this.periodVar * grainPeriod;
	
	      return Math.max(this.periodMin, segmentPeriod);
	    }
	  }, {
	    key: 'bufferDuration',
	    get: function get() {
	      if (this.buffer) {
	        var bufferDuration = this.buffer.duration;
	
	        if (this.wrapAroundExtension) bufferDuration -= this.wrapAroundExtension;
	
	        return bufferDuration;
	      }
	
	      return 0;
	    }
	  }]);
	
	  return SegmentEngine;
	}(_audioTimeEngine2.default);
	
	exports.default = SegmentEngine;
	module.exports = exports['default'];

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audioTimeEngine = __webpack_require__(168);
	
	var _audioTimeEngine2 = _interopRequireDefault(_audioTimeEngine);
	
	var _segmentEngine = __webpack_require__(174);
	
	var _segmentEngine2 = _interopRequireDefault(_segmentEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function optOrDef(opt, def) {
	    if (opt !== undefined) return opt;
	
	    return def;
	}
	
	function getCurrentOrPreviousIndex(sortedArray, value) {
	    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
	
	    var size = sortedArray.length;
	
	    if (size > 0) {
	        var firstVal = sortedArray[0];
	        var lastVal = sortedArray[size - 1];
	
	        if (value < firstVal) index = -1;else if (value >= lastVal) index = size - 1;else {
	            if (index < 0 || index >= size) index = Math.floor((size - 1) * (value - firstVal) / (lastVal - firstVal));
	
	            while (sortedArray[index] > value) {
	                index--;
	            }while (sortedArray[index + 1] <= value) {
	                index++;
	            }
	        }
	    }
	
	    return index;
	}
	
	function getCurrentOrNextIndex(sortedArray, value) {
	    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
	
	    var size = sortedArray.length;
	
	    if (size > 0) {
	        var firstVal = sortedArray[0];
	        var lastVal = sortedArray[size - 1];
	
	        if (value <= firstVal) index = 0;else if (value >= lastVal) index = size;else {
	            if (index < 0 || index >= size) index = Math.floor((size - 1) * (value - firstVal) / (lastVal - firstVal));
	
	            while (sortedArray[index] < value) {
	                index++;
	            }while (sortedArray[index - 1] >= value) {
	                index--;
	            }
	        }
	    }
	
	    return index;
	}
	
	/**
	 * @class SequencerEngine
	 */
	
	var SequencerEngine = function (_SegmentEngine) {
	    _inherits(SequencerEngine, _SegmentEngine);
	
	    /**
	     * @constructor
	     * @param {AudioBuffer} buffer initial audio buffer for granular synthesis
	     *
	     * The engine implements the "scheduled" and "transported" interfaces.
	     * When "scheduled", the engine  generates segments more or less periodically
	     * (controlled by the periodAbs, periodRel, and perioVar attributes).
	     * When "transported", the engine generates segments at the position of their onset time.
	     */
	    function SequencerEngine() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        _classCallCheck(this, SequencerEngine);
	
	        /**
	         * A function callback that gets called from trigger().
	         * This lets you set up events to be triggered by the sequencer.
	         * @type {Function}
	         */
	        var _this = _possibleConstructorReturn(this, (SequencerEngine.__proto__ || Object.getPrototypeOf(SequencerEngine)).call(this, options));
	
	        _this.callback = optOrDef(options.callback, null);
	
	        return _this;
	    }
	
	    /**
	     * Trigger a segment
	     * @param {Number} time segment synthesis audio time
	     * @return {Number} period to next segment
	     *
	     * This function can be called at any time (whether the engine is scheduled/transported or not)
	     * to generate a single segment according to the current segment parameters.
	     */
	
	
	    _createClass(SequencerEngine, [{
	        key: 'trigger',
	        value: function trigger(time) {
	            var audioContext = this.audioContext;
	            var segmentTime = (time || audioContext.currentTime) + this.delay;
	            var segmentPeriod = this.periodAbs;
	            var segmentIndex = this.segmentIndex;
	
	            // Ignore buffer for now, this is a sequncer... no audio produced.
	            if ( /*this.buffer*/true) {
	                var segmentPosition = 0.0;
	                var segmentDuration = 0.0;
	                var segmentOffset = 0.0;
	                var resamplingRate = 1.0;
	                var bufferDuration = this.bufferDuration;
	
	                if (this.cyclic) segmentIndex = segmentIndex % this.positionArray.length;else segmentIndex = Math.max(0, Math.min(segmentIndex, this.positionArray.length - 1));
	
	                if (this.positionArray) segmentPosition = this.positionArray[segmentIndex] || 0;
	
	                if (this.durationArray) segmentDuration = this.durationArray[segmentIndex] || 0;
	
	                if (this.offsetArray) segmentOffset = this.offsetArray[segmentIndex] || 0;
	
	                // calculate resampling
	                if (this.resampling !== 0 || this.resamplingVar > 0) {
	                    var randomResampling = (Math.random() - 0.5) * 2.0 * this.resamplingVar;
	                    resamplingRate = Math.pow(2.0, (this.resampling + randomResampling) / 1200.0);
	                }
	
	                // calculate inter-segment distance
	                if (segmentDuration === 0 || this.periodRel > 0) {
	                    var nextSegmentIndex = segmentIndex + 1;
	                    var nextPosition, nextOffset;
	
	                    if (nextSegmentIndex === this.positionArray.length) {
	                        if (this.cyclic) {
	                            nextPosition = this.positionArray[0] + bufferDuration;
	                            nextOffset = this.offsetArray[0];
	                        } else {
	                            nextPosition = bufferDuration;
	                            nextOffset = 0;
	                        }
	                    } else {
	                        nextPosition = this.positionArray[nextSegmentIndex];
	                        nextOffset = this.offsetArray[nextSegmentIndex];
	                    }
	
	                    var interSegmentDistance = nextPosition - segmentPosition;
	
	                    // correct inter-segment distance by offsets
	                    //   offset > 0: the segment's reference position is after the given segment position
	                    if (segmentOffset > 0) interSegmentDistance -= segmentOffset;
	
	                    if (nextOffset > 0) interSegmentDistance += nextOffset;
	
	                    if (interSegmentDistance < 0) interSegmentDistance = 0;
	
	                    // use inter-segment distance instead of segment duration
	                    if (segmentDuration === 0) segmentDuration = interSegmentDistance;
	
	                    // calculate period relative to inter marker distance
	                    segmentPeriod += this.periodRel * interSegmentDistance;
	                }
	                /*
	                // add relative and absolute segment duration
	                segmentDuration *= this.durationRel;
	                segmentDuration += this.durationAbs;
	                 // add relative and absolute segment offset
	                segmentOffset *= this.offsetRel;
	                segmentOffset += this.offsetAbs;
	                 // apply segment offset
	                //   offset > 0: the segment's reference position is after the given segment position
	                //   offset < 0: the given segment position is the segment's reference position and the duration has to be corrected by the offset
	                if (segmentOffset < 0) {
	                    segmentDuration -= segmentOffset;
	                    segmentPosition += segmentOffset;
	                    segmentTime += (segmentOffset / resamplingRate);
	                } else {
	                    segmentTime -= (segmentOffset / resamplingRate);
	                }
	                 // randomize segment position
	                if (this.positionVar > 0)
	                    segmentPosition += 2.0 * (Math.random() - 0.5) * this.positionVar;
	                 // shorten duration of segments over the edges of the buffer
	                if (segmentPosition < 0) {
	                    //segmentTime -= grainPosition; hm, not sure if we want to do this
	                    segmentDuration += segmentPosition;
	                    segmentPosition = 0;
	                }
	                 if (segmentPosition + segmentDuration > this.buffer.duration)
	                    segmentDuration = this.buffer.duration - segmentPosition;
	                 segmentDuration /= resamplingRate;
	                 // make segment
	                if (this.gain > 0 && segmentDuration > 0) {
	                  // make segment envelope
	                  var envelope = audioContext.createGain();
	                  var attack = this.attackAbs + this.attackRel * segmentDuration;
	                  var release = this.releaseAbs + this.releaseRel * segmentDuration;
	                   if (attack + release > segmentDuration) {
	                    var factor = segmentDuration / (attack + release);
	                    attack *= factor;
	                    release *= factor;
	                  }
	                   var attackEndTime = segmentTime + attack;
	                  var segmentEndTime = segmentTime + segmentDuration;
	                  var releaseStartTime = segmentEndTime - release;
	                   envelope.gain.value = 0;
	                  envelope.gain.setValueAtTime(0.0, segmentTime);
	                  envelope.gain.linearRampToValueAtTime(this.gain, attackEndTime);
	                   if (releaseStartTime > attackEndTime)
	                    envelope.gain.setValueAtTime(this.gain, releaseStartTime);
	                   envelope.gain.linearRampToValueAtTime(0.0, segmentEndTime);
	                  envelope.connect(this.outputNode);
	                   // make source
	                  var source = audioContext.createBufferSource();
	                   source.buffer = this.buffer;
	                  source.playbackRate.value = resamplingRate;
	                  source.connect(envelope);
	                   source.start(segmentTime, segmentPosition);
	                  source.stop(segmentTime + segmentDuration);
	                }*/
	            }
	
	            if (this.callback && Object.prototype.toString.call(this.callback) == '[object Function]') {
	                var result = this.callback(segmentIndex);
	                //if (result)
	                //    console.log(result);
	            }
	
	            //console.log("Sequencer.Trigger: " + segmentIndex + " Position: " + segmentPosition);
	
	            // grain period randon variation
	            if (this.periodVar > 0.0) segmentPeriod += 2.0 * (Math.random() - 0.5) * this.periodVar * grainPeriod;
	
	            return Math.max(this.periodMin, segmentPeriod);
	        }
	    }]);
	
	    return SequencerEngine;
	}(_segmentEngine2.default);
	
	exports.default = SequencerEngine;
	module.exports = exports['default'];

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audioContext = __webpack_require__(166);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _schedulingQueue = __webpack_require__(170);
	
	var _schedulingQueue2 = _interopRequireDefault(_schedulingQueue);
	
	var _timeEngine = __webpack_require__(167);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	var _factories = __webpack_require__(177);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ESPILON = 1e-8;
	
	var LoopControl = function (_TimeEngine) {
	  _inherits(LoopControl, _TimeEngine);
	
	  function LoopControl(playControl) {
	    _classCallCheck(this, LoopControl);
	
	    var _this = _possibleConstructorReturn(this, (LoopControl.__proto__ || Object.getPrototypeOf(LoopControl)).call(this));
	
	    _this.__playControl = playControl;
	    _this.lower = -Infinity;
	    _this.upper = Infinity;
	    return _this;
	  }
	
	  // TimeEngine method (scheduled interface)
	
	
	  _createClass(LoopControl, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var playControl = this.__playControl;
	      var speed = playControl.speed;
	      var lower = this.lower;
	      var upper = this.upper;
	
	      if (speed > 0) time += ESPILON;else time -= EPSILON;
	
	      if (speed > 0) {
	        playControl.syncSpeed(time, lower, speed, true);
	        return playControl.__getTimeAtPosition(upper) - ESPILON;
	      } else if (speed < 0) {
	        playControl.syncSpeed(time, upper, speed, true);
	        return playControl.__getTimeAtPosition(lower) + ESPILON;
	      }
	
	      return Infinity;
	    }
	  }, {
	    key: 'reschedule',
	    value: function reschedule(speed) {
	      var playControl = this.__playControl;
	      var lower = Math.min(playControl.__loopStart, playControl.__loopEnd);
	      var upper = Math.max(playControl.__loopStart, playControl.__loopEnd);
	
	      this.speed = speed;
	      this.lower = lower;
	      this.upper = upper;
	
	      if (lower === upper) speed = 0;
	
	      if (speed > 0) this.resetTime(playControl.__getTimeAtPosition(upper) - ESPILON);else if (speed < 0) this.resetTime(playControl.__getTimeAtPosition(lower) + ESPILON);else this.resetTime(Infinity);
	    }
	  }, {
	    key: 'applyLoopBoundaries',
	    value: function applyLoopBoundaries(position, speed) {
	      var lower = this.lower;
	      var upper = this.upper;
	
	      if (speed > 0 && position >= upper) return lower + (position - lower) % (upper - lower);else if (speed < 0 && position < lower) return upper - (upper - position) % (upper - lower);
	
	      return position;
	    }
	  }]);
	
	  return LoopControl;
	}(_timeEngine2.default);
	
	// play controlled base class
	
	
	var PlayControlled = function () {
	  function PlayControlled(playControl, engine) {
	    _classCallCheck(this, PlayControlled);
	
	    this.__playControl = playControl;
	
	    engine.master = this;
	    this.__engine = engine;
	  }
	
	  _createClass(PlayControlled, [{
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed, seek, lastSpeed) {
	      this.__engine.syncSpeed(time, position, speed, seek);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__playControl = null;
	
	      this.__engine.master = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__playControl.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__playControl.currentPosition;
	    }
	  }]);
	
	  return PlayControlled;
	}();
	
	// play control for engines implementing the *speed-controlled* interface
	
	
	var PlayControlledSpeedControlled = function (_PlayControlled) {
	  _inherits(PlayControlledSpeedControlled, _PlayControlled);
	
	  function PlayControlledSpeedControlled(playControl, engine) {
	    _classCallCheck(this, PlayControlledSpeedControlled);
	
	    return _possibleConstructorReturn(this, (PlayControlledSpeedControlled.__proto__ || Object.getPrototypeOf(PlayControlledSpeedControlled)).call(this, playControl, engine));
	  }
	
	  return PlayControlledSpeedControlled;
	}(PlayControlled);
	
	// play control for engines implmenting the *transported* interface
	
	
	var PlayControlledTransported = function (_PlayControlled2) {
	  _inherits(PlayControlledTransported, _PlayControlled2);
	
	  function PlayControlledTransported(playControl, engine) {
	    _classCallCheck(this, PlayControlledTransported);
	
	    var _this3 = _possibleConstructorReturn(this, (PlayControlledTransported.__proto__ || Object.getPrototypeOf(PlayControlledTransported)).call(this, playControl, engine));
	
	    _this3.__schedulerHook = new PlayControlledSchedulerHook(playControl, engine);
	    return _this3;
	  }
	
	  _createClass(PlayControlledTransported, [{
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed, seek, lastSpeed) {
	      if (speed !== lastSpeed || seek && speed !== 0) {
	        var nextPosition;
	
	        // resync transported engines
	        if (seek || speed * lastSpeed < 0) {
	          // seek or reverse direction
	          nextPosition = this.__engine.syncPosition(time, position, speed);
	        } else if (lastSpeed === 0) {
	          // start
	          nextPosition = this.__engine.syncPosition(time, position, speed);
	        } else if (speed === 0) {
	          // stop
	          nextPosition = Infinity;
	
	          if (this.__engine.syncSpeed) this.__engine.syncSpeed(time, position, 0);
	        } else if (this.__engine.syncSpeed) {
	          // change speed without reversing direction
	          this.__engine.syncSpeed(time, position, speed);
	        }
	
	        this.__schedulerHook.resetPosition(nextPosition);
	      }
	    }
	  }, {
	    key: 'resetEnginePosition',
	    value: function resetEnginePosition(engine) {
	      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	
	      if (position === undefined) {
	        var playControl = this.__playControl;
	        var time = playControl.__sync();
	
	        position = this.__engine.syncPosition(time, playControl.__position, playControl.__speed);
	      }
	
	      this.__schedulerHook.resetPosition(position);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__schedulerHook.destroy();
	      this.__schedulerHook = null;
	
	      _get(PlayControlledTransported.prototype.__proto__ || Object.getPrototypeOf(PlayControlledTransported.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return PlayControlledTransported;
	}(PlayControlled);
	
	// play control for time engines implementing the *scheduled* interface
	
	
	var PlayControlledScheduled = function (_PlayControlled3) {
	  _inherits(PlayControlledScheduled, _PlayControlled3);
	
	  function PlayControlledScheduled(playControl, engine) {
	    _classCallCheck(this, PlayControlledScheduled);
	
	    // scheduling queue becomes master of engine
	    var _this4 = _possibleConstructorReturn(this, (PlayControlledScheduled.__proto__ || Object.getPrototypeOf(PlayControlledScheduled)).call(this, playControl, engine));
	
	    engine.master = null;
	    _this4.__schedulingQueue = new PlayControlledSchedulingQueue(playControl, engine);
	    return _this4;
	  }
	
	  _createClass(PlayControlledScheduled, [{
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed, seek, lastSpeed) {
	      if (lastSpeed === 0 && speed !== 0) // start or seek
	        this.__engine.resetTime();else if (lastSpeed !== 0 && speed === 0) // stop
	        this.__engine.resetTime(Infinity);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__schedulingQueue.destroy();
	      _get(PlayControlledScheduled.prototype.__proto__ || Object.getPrototypeOf(PlayControlledScheduled.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return PlayControlledScheduled;
	}(PlayControlled);
	
	// translates transported engine advancePosition into global scheduler times
	
	
	var PlayControlledSchedulerHook = function (_TimeEngine2) {
	  _inherits(PlayControlledSchedulerHook, _TimeEngine2);
	
	  function PlayControlledSchedulerHook(playControl, engine) {
	    _classCallCheck(this, PlayControlledSchedulerHook);
	
	    var _this5 = _possibleConstructorReturn(this, (PlayControlledSchedulerHook.__proto__ || Object.getPrototypeOf(PlayControlledSchedulerHook)).call(this));
	
	    _this5.__playControl = playControl;
	    _this5.__engine = engine;
	
	    _this5.__nextPosition = Infinity;
	    playControl.__scheduler.add(_this5, Infinity);
	    return _this5;
	  }
	
	  _createClass(PlayControlledSchedulerHook, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var playControl = this.__playControl;
	      var engine = this.__engine;
	      var position = this.__nextPosition;
	      var nextPosition = engine.advancePosition(time, position, playControl.__speed);
	      var nextTime = playControl.__getTimeAtPosition(nextPosition);
	
	      this.__nextPosition = nextPosition;
	      return nextTime;
	    }
	  }, {
	    key: 'resetPosition',
	    value: function resetPosition() {
	      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.__nextPosition;
	
	      var time = this.__playControl.__getTimeAtPosition(position);
	      this.__nextPosition = position;
	      this.resetTime(time);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__playControl.__scheduler.remove(this);
	      this.__playControl = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__playControl.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__playControl.currentPosition;
	    }
	  }]);
	
	  return PlayControlledSchedulerHook;
	}(_timeEngine2.default);
	
	// internal scheduling queue that returns the current position (and time) of the play control
	
	
	var PlayControlledSchedulingQueue = function (_SchedulingQueue) {
	  _inherits(PlayControlledSchedulingQueue, _SchedulingQueue);
	
	  function PlayControlledSchedulingQueue(playControl, engine) {
	    _classCallCheck(this, PlayControlledSchedulingQueue);
	
	    var _this6 = _possibleConstructorReturn(this, (PlayControlledSchedulingQueue.__proto__ || Object.getPrototypeOf(PlayControlledSchedulingQueue)).call(this));
	
	    _this6.__playControl = playControl;
	    _this6.__engine = engine;
	
	    _this6.add(engine, Infinity);
	    playControl.__scheduler.add(_this6, Infinity);
	    return _this6;
	  }
	
	  _createClass(PlayControlledSchedulingQueue, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.__playControl.__scheduler.remove(this);
	      this.remove(this.__engine);
	
	      this.__playControl = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__playControl.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__playControl.currentPosition;
	    }
	  }]);
	
	  return PlayControlledSchedulingQueue;
	}(_schedulingQueue2.default);
	
	// play control meta-class
	
	
	var PlayControl = function (_TimeEngine3) {
	  _inherits(PlayControl, _TimeEngine3);
	
	  function PlayControl(engine) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, PlayControl);
	
	    var _this7 = _possibleConstructorReturn(this, (PlayControl.__proto__ || Object.getPrototypeOf(PlayControl)).call(this));
	
	    _this7.audioContext = options.audioContext || _audioContext2.default;
	    _this7.__scheduler = (0, _factories.getScheduler)(_this7.audioContext);
	
	    _this7.__playControlled = null;
	
	    _this7.__loopControl = null;
	    _this7.__loopStart = 0;
	    _this7.__loopEnd = 1;
	
	    // synchronized tie, position, and speed
	    _this7.__time = 0;
	    _this7.__position = 0;
	    _this7.__speed = 0;
	
	    // non-zero "user" speed
	    _this7.__playingSpeed = 1;
	
	    if (engine) _this7.__setEngine(engine);
	    return _this7;
	  }
	
	  _createClass(PlayControl, [{
	    key: '__setEngine',
	    value: function __setEngine(engine) {
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      if (_timeEngine2.default.implementsSpeedControlled(engine)) this.__playControlled = new PlayControlledSpeedControlled(this, engine);else if (_timeEngine2.default.implementsTransported(engine)) this.__playControlled = new PlayControlledTransported(this, engine);else if (_timeEngine2.default.implementsScheduled(engine)) this.__playControlled = new PlayControlledScheduled(this, engine);else throw new Error("object cannot be added to play control");
	    }
	  }, {
	    key: '__resetEngine',
	    value: function __resetEngine() {
	      this.__playControlled.destroy();
	      this.__playControlled = null;
	    }
	
	    /**
	     * Calculate/extrapolate playing time for given position
	     * @param {Number} position position
	     * @return {Number} extrapolated time
	     */
	
	  }, {
	    key: '__getTimeAtPosition',
	    value: function __getTimeAtPosition(position) {
	      return this.__time + (position - this.__position) / this.__speed;
	    }
	
	    /**
	     * Calculate/extrapolate playing position for given time
	     * @param {Number} time time
	     * @return {Number} extrapolated position
	     */
	
	  }, {
	    key: '__getPositionAtTime',
	    value: function __getPositionAtTime(time) {
	      return this.__position + (time - this.__time) * this.__speed;
	    }
	  }, {
	    key: '__sync',
	    value: function __sync() {
	      var now = this.currentTime;
	      this.__position += (now - this.__time) * this.__speed;
	      this.__time = now;
	      return now;
	    }
	
	    /**
	     * Get current master time
	     * @return {Number} current time
	     *
	     * This function will be replaced when the play-control is added to a master.
	     */
	
	  }, {
	    key: 'set',
	    value: function set() {
	      var engine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	      var time = this.__sync();
	      var speed = this.__speed;
	
	      if (this.__playControlled !== null && this.__playControlled.__engine !== engine) {
	
	        this.syncSpeed(time, this.__position, 0);
	
	        if (this.__playControlled) this.__resetEngine();
	
	        if (this.__playControlled === null && engine !== null) {
	          this.__setEngine(engine);
	
	          if (speed !== 0) this.syncSpeed(time, this.__position, speed);
	        }
	      }
	    }
	  }, {
	    key: 'setLoopBoundaries',
	    value: function setLoopBoundaries(loopStart, loopEnd) {
	      this.__loopStart = loopStart;
	      this.__loopEnd = loopEnd;
	
	      this.loop = this.loop;
	    }
	  }, {
	    key: 'syncSpeed',
	
	
	    // TimeEngine method (speed-controlled interface)
	    value: function syncSpeed(time, position, speed) {
	      var seek = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	      var lastSpeed = this.__speed;
	
	      if (speed !== lastSpeed || seek) {
	        if ((seek || lastSpeed === 0) && this.__loopControl) position = this.__loopControl.applyLoopBoundaries(position, speed);
	
	        this.__time = time;
	        this.__position = position;
	        this.__speed = speed;
	
	        if (this.__playControlled) this.__playControlled.syncSpeed(time, position, speed, seek, lastSpeed);
	
	        if (this.__loopControl) this.__loopControl.reschedule(speed);
	      }
	    }
	
	    /**
	     * Start playing
	     */
	
	  }, {
	    key: 'start',
	    value: function start() {
	      var time = this.__sync();
	      this.syncSpeed(time, this.__position, this.__playingSpeed);
	    }
	
	    /**
	     * Pause playing
	     */
	
	  }, {
	    key: 'pause',
	    value: function pause() {
	      var time = this.__sync();
	      this.syncSpeed(time, this.__position, 0);
	    }
	
	    /**
	     * Stop playing
	     */
	
	  }, {
	    key: 'stop',
	    value: function stop() {
	      var time = this.__sync();
	      this.syncSpeed(time, this.__position, 0);
	      this.seek(0);
	    }
	
	    /**
	     * Set playing speed
	     * @param {Number} speed playing speed (non-zero speed between -16 and -1/16 or between 1/16 and 16)
	     */
	
	  }, {
	    key: 'seek',
	
	
	    /**
	     * Set (jump to) playing position
	     * @param {Number} position target position
	     */
	    value: function seek(position) {
	      if (position !== this.__position) {
	        var time = this.__sync();
	        this.__position = position;
	        this.syncSpeed(time, position, this.__speed, true);
	      }
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__scheduler.currentTime;
	    }
	
	    /**
	     * Get current master position
	     * @return {Number} current playing position
	     *
	     * This function will be replaced when the play-control is added to a master.
	     */
	
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__position + (this.__scheduler.currentTime - this.__time) * this.__speed;
	    }
	  }, {
	    key: 'loop',
	    set: function set(enable) {
	      if (enable && this.__loopStart > -Infinity && this.__loopEnd < Infinity) {
	        if (!this.__loopControl) {
	          this.__loopControl = new LoopControl(this);
	          this.__scheduler.add(this.__loopControl, Infinity);
	        }
	
	        if (this.__speed !== 0) {
	          var position = this.currentPosition;
	          var lower = Math.min(this.__loopStart, this.__loopEnd);
	          var upper = Math.max(this.__loopStart, this.__loopEnd);
	
	          if (this.__speed > 0 && position > upper) this.seek(upper);else if (this.__speed < 0 && position < lower) this.seek(lower);else this.__loopControl.reschedule(this.__speed);
	        }
	      } else if (this.__loopControl) {
	        this.__scheduler.remove(this.__loopControl);
	        this.__loopControl = null;
	      }
	    },
	    get: function get() {
	      return !!this.__loopControl;
	    }
	  }, {
	    key: 'loopStart',
	    set: function set(loopStart) {
	      this.setLoopBoundaries(loopStart, this.__loopEnd);
	    },
	    get: function get() {
	      return this.__loopStart;
	    }
	  }, {
	    key: 'loopEnd',
	    set: function set(loopEnd) {
	      this.setLoopBoundaries(this.__loopStart, loopEnd);
	    },
	    get: function get() {
	      return this.__loopEnd;
	    }
	  }, {
	    key: 'speed',
	    set: function set(speed) {
	      var time = this.__sync();
	
	      if (speed >= 0) {
	        if (speed < 0.01) speed = 0.01;else if (speed > 100) speed = 100;
	      } else {
	        if (speed < -100) speed = -100;else if (speed > -0.01) speed = -0.01;
	      }
	
	      this.__playingSpeed = speed;
	
	      if (this.__speed !== 0) this.syncSpeed(time, this.__position, speed);
	    }
	
	    /**
	     * Get playing speed
	     * @return current playing speed
	     */
	    ,
	    get: function get() {
	      return this.__playingSpeed;
	    }
	  }]);
	
	  return PlayControl;
	}(_timeEngine2.default);
	
	exports.default = PlayControl;
	module.exports = exports['default'];

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSimpleScheduler = exports.getScheduler = undefined;
	
	var _audioContext = __webpack_require__(166);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _scheduler = __webpack_require__(178);
	
	var _scheduler2 = _interopRequireDefault(_scheduler);
	
	var _simpleScheduler = __webpack_require__(183);
	
	var _simpleScheduler2 = _interopRequireDefault(_simpleScheduler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var schedulerMap = new WeakMap(); // schedulers should be singletons
	
	var simpleSchedulerMap = new WeakMap();
	
	// scheduler factory
	var getScheduler = exports.getScheduler = function getScheduler() {
	  var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _audioContext2.default;
	
	  var scheduler = schedulerMap.get(audioContext);
	
	  if (!scheduler) {
	    scheduler = new _scheduler2.default({ audioContext: audioContext });
	    schedulerMap.set(audioContext, scheduler);
	  }
	
	  return scheduler;
	};
	
	var getSimpleScheduler = exports.getSimpleScheduler = function getSimpleScheduler() {
	  var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _audioContext2.default;
	
	  var simpleScheduler = simpleSchedulerMap.get(audioContext);
	
	  if (!simpleScheduler) {
	    simpleScheduler = new _simpleScheduler2.default({ audioContext: audioContext });
	    simpleSchedulerMap.set(audioContext, simpleScheduler);
	  }
	
	  return simpleScheduler;
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _debug = __webpack_require__(179);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _audioContext = __webpack_require__(166);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _schedulingQueue = __webpack_require__(170);
	
	var _schedulingQueue2 = _interopRequireDefault(_schedulingQueue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var log = (0, _debug2.default)('wavesjs:audio');
	
	var Scheduler = function (_SchedulingQueue) {
	  _inherits(Scheduler, _SchedulingQueue);
	
	  function Scheduler() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Scheduler);
	
	    var _this = _possibleConstructorReturn(this, (Scheduler.__proto__ || Object.getPrototypeOf(Scheduler)).call(this));
	
	    _this.audioContext = options.audioContext || _audioContext2.default;
	
	    _this.__currentTime = null;
	    _this.__nextTime = Infinity;
	    _this.__timeout = null;
	
	    /**
	     * scheduler (setTimeout) period
	     * @type {Number}
	     */
	    _this.period = options.period || 0.025;
	
	    /**
	     * scheduler lookahead time (> period)
	     * @type {Number}
	     */
	    _this.lookahead = options.lookahead || 0.1;
	    return _this;
	  }
	
	  // setTimeout scheduling loop
	
	
	  _createClass(Scheduler, [{
	    key: '__tick',
	    value: function __tick() {
	      var audioContext = this.audioContext;
	      var currentTime = audioContext.currentTime;
	      var time = this.__nextTime;
	
	      this.__timeout = null;
	
	      while (time <= currentTime + this.lookahead) {
	        this.__currentTime = time;
	        time = this.advanceTime(time);
	      }
	
	      this.__currentTime = null;
	      this.resetTime(time);
	    }
	  }, {
	    key: 'resetTime',
	    value: function resetTime() {
	      var _this2 = this;
	
	      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentTime;
	
	      if (this.master) {
	        this.master.reset(this, time);
	      } else {
	        if (this.__timeout) {
	          clearTimeout(this.__timeout);
	          this.__timeout = null;
	        }
	
	        if (time !== Infinity) {
	          if (this.__nextTime === Infinity) log('Scheduler Start');
	
	          var timeOutDelay = Math.max(time - this.lookahead - this.audioContext.currentTime, this.period);
	
	          this.__timeout = setTimeout(function () {
	            _this2.__tick();
	          }, timeOutDelay * 1000);
	        } else if (this.__nextTime !== Infinity) {
	          log('Scheduler Stop');
	        }
	
	        this.__nextTime = time;
	      }
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      if (this.master) return this.master.currentTime;
	
	      return this.__currentTime || this.audioContext.currentTime + this.lookahead;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return undefined;
	    }
	  }]);
	
	  return Scheduler;
	}(_schedulingQueue2.default);
	
	exports.default = Scheduler;
	module.exports = exports['default'];

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(181);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }
	
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return typeof document !== 'undefined' && document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
	  // double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function (v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs(args) {
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return;
	
	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit');
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }
	
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(180)))

/***/ },
/* 180 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) {
	    return [];
	};
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(182);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor(namespace) {
	  var hash = 0,
	      i;
	
	  for (i in namespace) {
	    hash = (hash << 5) - hash + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }
	
	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function createDebug(namespace) {
	
	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;
	
	    var self = debug;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);
	
	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	
	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	
	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }
	
	  return debug;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  exports.names = [];
	  exports.skips = [];
	
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ },
/* 182 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {};
	  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str);
	  if (str.length > 10000) {
	    return;
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _debug = __webpack_require__(179);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _audioContext = __webpack_require__(166);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _timeEngine = __webpack_require__(167);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var log = (0, _debug2.default)('wavesjs:audio');
	
	var SimpleScheduler = function () {
	  function SimpleScheduler() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, SimpleScheduler);
	
	    this.audioContext = options.audioContext || _audioContext2.default;
	
	    this.__engines = new Set();
	
	    this.__schedEngines = [];
	    this.__schedTimes = [];
	
	    this.__currentTime = null;
	    this.__timeout = null;
	
	    /**
	     * scheduler (setTimeout) period
	     * @type {Number}
	     */
	    this.period = options.period || 0.025;
	
	    /**
	     * scheduler lookahead time (> period)
	     * @type {Number}
	     */
	    this.lookahead = options.lookahead || 0.1;
	  }
	
	  _createClass(SimpleScheduler, [{
	    key: '__scheduleEngine',
	    value: function __scheduleEngine(engine, time) {
	      this.__schedEngines.push(engine);
	      this.__schedTimes.push(time);
	    }
	  }, {
	    key: '__rescheduleEngine',
	    value: function __rescheduleEngine(engine, time) {
	      var index = this.__schedEngines.indexOf(engine);
	
	      if (index >= 0) {
	        if (time !== Infinity) {
	          this.__schedTimes[index] = time;
	        } else {
	          this.__schedEngines.splice(index, 1);
	          this.__schedTimes.splice(index, 1);
	        }
	      } else if (time < Infinity) {
	        this.__schedEngines.push(engine);
	        this.__schedTimes.push(time);
	      }
	    }
	  }, {
	    key: '__unscheduleEngine',
	    value: function __unscheduleEngine(engine) {
	      var index = this.__schedEngines.indexOf(engine);
	
	      if (index >= 0) {
	        this.__schedEngines.splice(index, 1);
	        this.__schedTimes.splice(index, 1);
	      }
	    }
	  }, {
	    key: '__resetTick',
	    value: function __resetTick() {
	      if (this.__schedEngines.length > 0) {
	        if (!this.__timeout) {
	          log('SimpleScheduler Start');
	          this.__tick();
	        }
	      } else if (this.__timeout) {
	        log('SimpleScheduler Stop');
	        clearTimeout(this.__timeout);
	        this.__timeout = null;
	      }
	    }
	  }, {
	    key: '__tick',
	    value: function __tick() {
	      var _this = this;
	
	      var audioContext = this.audioContext;
	      var currentTime = audioContext.currentTime;
	      var i = 0;
	
	      while (i < this.__schedEngines.length) {
	        var engine = this.__schedEngines[i];
	        var time = this.__schedTimes[i];
	
	        while (time && time <= currentTime + this.lookahead) {
	          time = Math.max(time, currentTime);
	          this.__currentTime = time;
	          time = engine.advanceTime(time);
	        }
	
	        if (time && time < Infinity) {
	          this.__schedTimes[i++] = time;
	        } else {
	          this.__unscheduleEngine(engine);
	
	          // remove engine from scheduler
	          if (!time) {
	            engine.master = null;
	            this.__engines.delete(engine);
	          }
	        }
	      }
	
	      this.__currentTime = null;
	      this.__timeout = null;
	
	      if (this.__schedEngines.length > 0) {
	        this.__timeout = setTimeout(function () {
	          _this.__tick();
	        }, this.period * 1000);
	      }
	    }
	  }, {
	    key: 'defer',
	
	
	    // call a function at a given time
	    value: function defer(fun) {
	      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentTime;
	
	      if (!(fun instanceof Function)) throw new Error("object cannot be defered by scheduler");
	
	      this.add({
	        advanceTime: function advanceTime(time) {
	          fun(time);
	        } }, time);
	    }
	
	    // add a time engine to the scheduler
	
	  }, {
	    key: 'add',
	    value: function add(engine) {
	      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentTime;
	
	      if (!_timeEngine2.default.implementsScheduled(engine)) throw new Error("object cannot be added to scheduler");
	
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      // set master and add to array
	      engine.master = this;
	      this.__engines.add(engine);
	
	      // schedule engine
	      this.__scheduleEngine(engine, time);
	      this.__resetTick();
	    }
	  }, {
	    key: 'remove',
	    value: function remove(engine) {
	      if (!engine.master || engine.master !== this) throw new Error("engine has not been added to this scheduler");
	
	      // reset master and remove from array
	      engine.master = null;
	      this.__engines.delete(engine);
	
	      // unschedule engine
	      this.__unscheduleEngine(engine);
	      this.__resetTick();
	    }
	  }, {
	    key: 'resetEngineTime',
	    value: function resetEngineTime(engine) {
	      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentTime;
	
	      this.__rescheduleEngine(engine, time);
	      this.__resetTick();
	    }
	
	    // check whether a given engine is scheduled
	
	  }, {
	    key: 'has',
	    value: function has(engine) {
	      return this.__engines.has(engine);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      if (this.__timeout) {
	        clearTimeout(this.__timeout);
	        this.__timeout = null;
	      }
	
	      this.__schedEngines.length = 0;
	      this.__schedTimes.length = 0;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__currentTime || this.audioContext.currentTime + this.lookahead;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return undefined;
	    }
	  }]);
	
	  return SimpleScheduler;
	}();
	
	exports.default = SimpleScheduler;
	module.exports = exports['default'];

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _audioContext = __webpack_require__(166);
	
	var _audioContext2 = _interopRequireDefault(_audioContext);
	
	var _priorityQueue = __webpack_require__(169);
	
	var _priorityQueue2 = _interopRequireDefault(_priorityQueue);
	
	var _schedulingQueue = __webpack_require__(170);
	
	var _schedulingQueue2 = _interopRequireDefault(_schedulingQueue);
	
	var _timeEngine = __webpack_require__(167);
	
	var _timeEngine2 = _interopRequireDefault(_timeEngine);
	
	var _factories = __webpack_require__(177);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function addDuplet(firstArray, secondArray, firstElement, secondElement) {
	  firstArray.push(firstElement);
	  secondArray.push(secondElement);
	}
	
	function removeDuplet(firstArray, secondArray, firstElement) {
	  var index = firstArray.indexOf(firstElement);
	
	  if (index >= 0) {
	    var secondElement = secondArray[index];
	
	    firstArray.splice(index, 1);
	    secondArray.splice(index, 1);
	
	    return secondElement;
	  }
	
	  return null;
	}
	
	// The Transported call is the base class of the adapters between
	// different types of engines (i.e. transported, scheduled, play-controlled)
	// The adapters are at the same time masters for the engines added to the transport
	// and transported TimeEngines inserted into the transport's position-based pritority queue.
	
	var Transported = function (_TimeEngine) {
	  _inherits(Transported, _TimeEngine);
	
	  function Transported(transport, engine, start, duration, offset) {
	    var stretch = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
	
	    _classCallCheck(this, Transported);
	
	    var _this = _possibleConstructorReturn(this, (Transported.__proto__ || Object.getPrototypeOf(Transported)).call(this));
	
	    _this.master = transport;
	
	    _this.__engine = engine;
	    engine.master = _this;
	
	    _this.__startPosition = start;
	    _this.__endPosition = !isFinite(duration) ? Infinity : start + duration;
	    _this.__offsetPosition = start + offset;
	    _this.__stretchPosition = stretch;
	    _this.__isRunning = false;
	    return _this;
	  }
	
	  _createClass(Transported, [{
	    key: 'setBoundaries',
	    value: function setBoundaries(start, duration) {
	      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var stretch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	
	      this.__startPosition = start;
	      this.__endPosition = start + duration;
	      this.__offsetPosition = start + offset;
	      this.__stretchPosition = stretch;
	      this.resetPosition();
	    }
	  }, {
	    key: 'start',
	    value: function start(time, position, speed) {}
	  }, {
	    key: 'stop',
	    value: function stop(time, position) {}
	  }, {
	    key: 'resetPosition',
	    value: function resetPosition(position) {
	      if (position !== undefined) position += this.__offsetPosition;
	
	      this.master.resetEnginePosition(this, position);
	    }
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      if (speed > 0) {
	        if (position < this.__startPosition) {
	
	          if (this.__isRunning) this.stop(time, position - this.__offsetPosition);
	
	          this.__isRunning = false;
	          return this.__startPosition;
	        } else if (position < this.__endPosition) {
	          this.start(time, position - this.__offsetPosition, speed);
	
	          this.__isRunning = true;
	          return this.__endPosition;
	        }
	      } else {
	        if (position > this.__endPosition) {
	          if (this.__isRunning) // if engine is running
	            this.stop(time, position - this.__offsetPosition);
	
	          this.__isRunning = false;
	          return this.__endPosition;
	        } else if (position > this.__startPosition) {
	          this.start(time, position - this.__offsetPosition, speed);
	
	          this.__isRunning = true;
	          return this.__startPosition;
	        }
	      }
	
	      if (this.__isRunning) // if engine is running
	        this.stop(time, position);
	
	      this.__isRunning = false;
	      return Infinity * speed;
	    }
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      if (!this.__isRunning) {
	        this.start(time, position - this.__offsetPosition, speed);
	        this.__isRunning = true;
	
	        if (speed > 0) return this.__endPosition;
	
	        return this.__startPosition;
	      }
	
	      // stop engine
	      this.stop(time, position - this.__offsetPosition);
	
	      this.__isRunning = false;
	      return Infinity * speed;
	    }
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      if (speed === 0) // stop
	        this.stop(time, position - this.__offsetPosition);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.master = null;
	
	      this.__engine.master = null;
	      this.__engine = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.master.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.master.currentPosition - this.__offsetPosition;
	    }
	  }]);
	
	  return Transported;
	}(_timeEngine2.default);
	
	// TransportedTransported
	// has to switch on and off the scheduled engines when the transport hits the engine's start and end position
	
	
	var TransportedTransported = function (_Transported) {
	  _inherits(TransportedTransported, _Transported);
	
	  function TransportedTransported(transport, engine, startPosition, endPosition, offsetPosition) {
	    _classCallCheck(this, TransportedTransported);
	
	    return _possibleConstructorReturn(this, (TransportedTransported.__proto__ || Object.getPrototypeOf(TransportedTransported)).call(this, transport, engine, startPosition, endPosition, offsetPosition));
	  }
	
	  _createClass(TransportedTransported, [{
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      if (speed > 0 && position < this.__endPosition) position = Math.max(position, this.__startPosition);else if (speed < 0 && position >= this.__startPosition) position = Math.min(position, this.__endPosition);
	
	      return this.__offsetPosition + this.__engine.syncPosition(time, position - this.__offsetPosition, speed);
	    }
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      position = this.__offsetPosition + this.__engine.advancePosition(time, position - this.__offsetPosition, speed);
	
	      if (speed > 0 && position < this.__endPosition || speed < 0 && position >= this.__startPosition) return position;
	
	      return Infinity * speed;
	    }
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      if (this.__engine.syncSpeed) this.__engine.syncSpeed(time, position, speed);
	    }
	  }, {
	    key: 'resetEnginePosition',
	    value: function resetEnginePosition(engine) {
	      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	
	      if (position !== undefined) position += this.__offsetPosition;
	
	      this.resetPosition(position);
	    }
	  }]);
	
	  return TransportedTransported;
	}(Transported);
	
	// TransportedSpeedControlled
	// has to start and stop the speed-controlled engines when the transport hits the engine's start and end position
	
	
	var TransportedSpeedControlled = function (_Transported2) {
	  _inherits(TransportedSpeedControlled, _Transported2);
	
	  function TransportedSpeedControlled(transport, engine, startPosition, endPosition, offsetPosition) {
	    _classCallCheck(this, TransportedSpeedControlled);
	
	    return _possibleConstructorReturn(this, (TransportedSpeedControlled.__proto__ || Object.getPrototypeOf(TransportedSpeedControlled)).call(this, transport, engine, startPosition, endPosition, offsetPosition));
	  }
	
	  _createClass(TransportedSpeedControlled, [{
	    key: 'start',
	    value: function start(time, position, speed) {
	      this.__engine.syncSpeed(time, position, speed, true);
	    }
	  }, {
	    key: 'stop',
	    value: function stop(time, position) {
	      this.__engine.syncSpeed(time, position, 0);
	    }
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      if (this.__isRunning) this.__engine.syncSpeed(time, position, speed);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__engine.syncSpeed(this.master.currentTime, this.master.currentPosition - this.__offsetPosition, 0);
	      _get(TransportedSpeedControlled.prototype.__proto__ || Object.getPrototypeOf(TransportedSpeedControlled.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return TransportedSpeedControlled;
	}(Transported);
	
	// TransportedScheduled
	// has to switch on and off the scheduled engines when the transport hits the engine's start and end position
	
	
	var TransportedScheduled = function (_Transported3) {
	  _inherits(TransportedScheduled, _Transported3);
	
	  function TransportedScheduled(transport, engine, startPosition, endPosition, offsetPosition) {
	    _classCallCheck(this, TransportedScheduled);
	
	    // scheduling queue becomes master of engine
	    var _this4 = _possibleConstructorReturn(this, (TransportedScheduled.__proto__ || Object.getPrototypeOf(TransportedScheduled)).call(this, transport, engine, startPosition, endPosition, offsetPosition));
	
	    engine.master = null;
	    transport.__schedulingQueue.add(engine, Infinity);
	    return _this4;
	  }
	
	  _createClass(TransportedScheduled, [{
	    key: 'start',
	    value: function start(time, position, speed) {
	      this.master.__schedulingQueue.resetEngineTime(this.__engine, time);
	    }
	  }, {
	    key: 'stop',
	    value: function stop(time, position) {
	      this.master.__schedulingQueue.resetEngineTime(this.__engine, Infinity);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.master.__schedulingQueue.remove(this.__engine);
	      _get(TransportedScheduled.prototype.__proto__ || Object.getPrototypeOf(TransportedScheduled.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return TransportedScheduled;
	}(Transported);
	
	// translates advancePosition of *transported* engines into global scheduler times
	
	
	var TransportSchedulerHook = function (_TimeEngine2) {
	  _inherits(TransportSchedulerHook, _TimeEngine2);
	
	  function TransportSchedulerHook(transport) {
	    _classCallCheck(this, TransportSchedulerHook);
	
	    var _this5 = _possibleConstructorReturn(this, (TransportSchedulerHook.__proto__ || Object.getPrototypeOf(TransportSchedulerHook)).call(this));
	
	    _this5.__transport = transport;
	
	    _this5.__nextPosition = Infinity;
	    _this5.__nextTime = Infinity;
	    transport.__scheduler.add(_this5, Infinity);
	    return _this5;
	  }
	
	  // TimeEngine method (scheduled interface)
	
	
	  _createClass(TransportSchedulerHook, [{
	    key: 'advanceTime',
	    value: function advanceTime(time) {
	      var transport = this.__transport;
	      var position = this.__nextPosition;
	      var speed = transport.__speed;
	      var nextPosition = transport.advancePosition(time, position, speed);
	      var nextTime = transport.__getTimeAtPosition(nextPosition);
	
	      this.__nextPosition = nextPosition;
	      this.__nextTime = nextTime;
	
	      return nextTime;
	    }
	  }, {
	    key: 'resetPosition',
	    value: function resetPosition() {
	      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.__nextPosition;
	
	      var transport = this.__transport;
	      var time = transport.__getTimeAtPosition(position);
	
	      this.__nextPosition = position;
	      this.__nextTime = time;
	
	      this.resetTime(time);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.__transport.__scheduler.remove(this);
	      this.__transport = null;
	    }
	  }]);
	
	  return TransportSchedulerHook;
	}(_timeEngine2.default);
	
	// internal scheduling queue that returns the current position (and time) of the play control
	
	
	var TransportSchedulingQueue = function (_SchedulingQueue) {
	  _inherits(TransportSchedulingQueue, _SchedulingQueue);
	
	  function TransportSchedulingQueue(transport) {
	    _classCallCheck(this, TransportSchedulingQueue);
	
	    var _this6 = _possibleConstructorReturn(this, (TransportSchedulingQueue.__proto__ || Object.getPrototypeOf(TransportSchedulingQueue)).call(this));
	
	    _this6.__transport = transport;
	    transport.__scheduler.add(_this6, Infinity);
	    return _this6;
	  }
	
	  _createClass(TransportSchedulingQueue, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.__transport.__scheduler.remove(this);
	      this.__transport = null;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__transport.currentTime;
	    }
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      return this.__transport.currentPosition;
	    }
	  }]);
	
	  return TransportSchedulingQueue;
	}(_schedulingQueue2.default);
	
	/**
	 * Transport class
	 */
	
	
	var Transport = function (_TimeEngine3) {
	  _inherits(Transport, _TimeEngine3);
	
	  function Transport() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Transport);
	
	    var _this7 = _possibleConstructorReturn(this, (Transport.__proto__ || Object.getPrototypeOf(Transport)).call(this));
	
	    _this7.audioContext = options.audioContext || _audioContext2.default;
	
	    _this7.__engines = [];
	    _this7.__transported = [];
	
	    _this7.__scheduler = (0, _factories.getScheduler)(_this7.audioContext);
	    _this7.__schedulerHook = new TransportSchedulerHook(_this7);
	    _this7.__transportedQueue = new _priorityQueue2.default();
	    _this7.__schedulingQueue = new TransportSchedulingQueue(_this7);
	
	    // syncronized time, position, and speed
	    _this7.__time = 0;
	    _this7.__position = 0;
	    _this7.__speed = 0;
	    return _this7;
	  }
	
	  _createClass(Transport, [{
	    key: '__getTimeAtPosition',
	    value: function __getTimeAtPosition(position) {
	      return this.__time + (position - this.__position) / this.__speed;
	    }
	  }, {
	    key: '__getPositionAtTime',
	    value: function __getPositionAtTime(time) {
	      return this.__position + (time - this.__time) * this.__speed;
	    }
	  }, {
	    key: '__syncTransportedPosition',
	    value: function __syncTransportedPosition(time, position, speed) {
	      var numTransportedEngines = this.__transported.length;
	      var nextPosition = Infinity * speed;
	
	      if (numTransportedEngines > 0) {
	        this.__transportedQueue.clear();
	        this.__transportedQueue.reverse = speed < 0;
	
	        for (var i = 0; i < numTransportedEngines; i++) {
	          var engine = this.__transported[i];
	          var nextEnginePosition = engine.syncPosition(time, position, speed);
	          this.__transportedQueue.insert(engine, nextEnginePosition);
	        }
	
	        nextPosition = this.__transportedQueue.time;
	      }
	
	      return nextPosition;
	    }
	  }, {
	    key: '__syncTransportedSpeed',
	    value: function __syncTransportedSpeed(time, position, speed) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.__transported[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var transported = _step.value;
	
	          transported.syncSpeed(time, position, speed);
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
	
	    /**
	     * Get current master time
	     * @return {Number} current time
	     *
	     * This function will be replaced when the transport is added to a master (i.e. transport or play-control).
	     */
	
	  }, {
	    key: 'resetPosition',
	
	
	    /**
	     * Reset next transport position
	     * @param {Number} next transport position
	     */
	    value: function resetPosition(position) {
	      var master = this.master;
	
	      if (master && master.resetEnginePosition !== undefined) master.resetEnginePosition(this, position);else this.__schedulerHook.resetPosition(position);
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'syncPosition',
	    value: function syncPosition(time, position, speed) {
	      this.__time = time;
	      this.__position = position;
	      this.__speed = speed;
	
	      return this.__syncTransportedPosition(time, position, speed);
	    }
	
	    // TimeEngine method (transported interface)
	
	  }, {
	    key: 'advancePosition',
	    value: function advancePosition(time, position, speed) {
	      var engine = this.__transportedQueue.head;
	      var nextEnginePosition = engine.advancePosition(time, position, speed);
	      return this.__transportedQueue.move(engine, nextEnginePosition);
	    }
	
	    // TimeEngine method (speed-controlled interface)
	
	  }, {
	    key: 'syncSpeed',
	    value: function syncSpeed(time, position, speed) {
	      var seek = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	      var lastSpeed = this.__speed;
	
	      this.__time = time;
	      this.__position = position;
	      this.__speed = speed;
	
	      if (speed !== lastSpeed || seek && speed !== 0) {
	        var nextPosition = void 0;
	
	        // resync transported engines
	        if (seek || speed * lastSpeed < 0) {
	          // seek or reverse direction
	          nextPosition = this.__syncTransportedPosition(time, position, speed);
	        } else if (lastSpeed === 0) {
	          // start
	          nextPosition = this.__syncTransportedPosition(time, position, speed);
	        } else if (speed === 0) {
	          // stop
	          nextPosition = Infinity;
	          this.__syncTransportedSpeed(time, position, 0);
	        } else {
	          // change speed without reversing direction
	          this.__syncTransportedSpeed(time, position, speed);
	        }
	
	        this.resetPosition(nextPosition);
	      }
	    }
	
	    /**
	     * Add a time engine to the transport
	     * @param {Object} engine engine to be added to the transport
	     * @param {Number} position start position
	     */
	
	  }, {
	    key: 'add',
	    value: function add(engine) {
	      var startPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var endPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
	      var offsetPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	
	      var transported = null;
	
	      if (offsetPosition === -Infinity) offsetPosition = 0;
	
	      if (engine.master) throw new Error("object has already been added to a master");
	
	      if (_timeEngine2.default.implementsTransported(engine)) transported = new TransportedTransported(this, engine, startPosition, endPosition, offsetPosition);else if (_timeEngine2.default.implementsSpeedControlled(engine)) transported = new TransportedSpeedControlled(this, engine, startPosition, endPosition, offsetPosition);else if (_timeEngine2.default.implementsScheduled(engine)) transported = new TransportedScheduled(this, engine, startPosition, endPosition, offsetPosition);else throw new Error("object cannot be added to a transport");
	
	      if (transported) {
	        var speed = this.__speed;
	
	        addDuplet(this.__engines, this.__transported, engine, transported);
	
	        if (speed !== 0) {
	          // sync and start
	          var nextEnginePosition = transported.syncPosition(this.currentTime, this.currentPosition, speed);
	          var nextPosition = this.__transportedQueue.insert(transported, nextEnginePosition);
	
	          this.resetPosition(nextPosition);
	        }
	      }
	
	      return transported;
	    }
	
	    /**
	     * Remove a time engine from the transport
	     * @param {object} engineOrTransported engine or transported to be removed from the transport
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(engineOrTransported) {
	      var engine = engineOrTransported;
	      var transported = removeDuplet(this.__engines, this.__transported, engineOrTransported);
	
	      if (!transported) {
	        engine = removeDuplet(this.__transported, this.__engines, engineOrTransported);
	        transported = engineOrTransported;
	      }
	
	      if (engine && transported) {
	        var nextPosition = this.__transportedQueue.remove(transported);
	
	        transported.destroy();
	
	        if (this.__speed !== 0) this.resetPosition(nextPosition);
	      } else {
	        throw new Error("object has not been added to this transport");
	      }
	    }
	  }, {
	    key: 'resetEnginePosition',
	    value: function resetEnginePosition(transported) {
	      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	
	      var speed = this.__speed;
	
	      if (speed !== 0) {
	        if (position === undefined) position = transported.syncPosition(this.currentTime, this.currentPosition, speed);
	
	        var nextPosition = this.__transportedQueue.move(transported, position);
	        this.resetPosition(nextPosition);
	      }
	    }
	
	    /**
	     * Remove all time engines from the transport
	     */
	
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.syncSpeed(this.currentTime, this.currentPosition, 0);
	
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = this.__transported[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var transported = _step2.value;
	
	          transported.destroy();
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
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__scheduler.currentTime;
	    }
	
	    /**
	     * Get current master position
	     * @return {Number} current playing position
	     *
	     * This function will be replaced when the transport is added to a master (i.e. transport or play-control).
	     */
	
	  }, {
	    key: 'currentPosition',
	    get: function get() {
	      var master = this.master;
	
	      if (master && master.currentPosition !== undefined) return master.currentPosition;
	
	      return this.__position + (this.__scheduler.currentTime - this.__time) * this.__speed;
	    }
	  }]);
	
	  return Transport;
	}(_timeEngine2.default);
	
	exports.default = Transport;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lars.js.map