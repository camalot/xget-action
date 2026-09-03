/******/ var __webpack_modules__ = ({

/***/ 579:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const cache = __importStar(__nccwpck_require__(377));
const state = __importStar(__nccwpck_require__(155));
async function run() {
    try {
        if (state.isCacheHit()) {
            core.info('xget was restored from cache; skipping cache save');
            return;
        }
        const cacheKey = state.getCacheKey();
        const cachePath = state.getCachePath();
        if (!cacheKey || !cachePath) {
            core.info('no cache entry to save');
            return;
        }
        core.info(`Saving xget to cache with key: ${cacheKey}`);
        await cache.save([cachePath], cacheKey);
    }
    catch (error) {
        core.warning(error.message);
    }
}
run();


/***/ }),

/***/ 377:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.restore = restore;
exports.save = save;
const cache = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/cache'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const core = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
/** Restores a previously saved cache entry; returns the matched key, or undefined on a miss. */
async function restore(paths, key) {
    try {
        return await cache.restoreCache(paths, key);
    }
    catch (error) {
        core.warning(`failed to restore cache: ${error.message}`);
        return undefined;
    }
}
/** Saves a cache entry, tolerating cases where the key already exists. */
async function save(paths, key) {
    try {
        await cache.saveCache(paths, key);
    }
    catch (error) {
        if (error instanceof cache.ReserveCacheError) {
            core.info(`cache key already exists, skipping save: ${error.message}`);
            return;
        }
        core.warning(`failed to save cache: ${error.message}`);
    }
}


/***/ }),

/***/ 242:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STATE_CACHE_PATH = exports.STATE_CACHE_KEY = exports.STATE_CACHE_HIT = exports.TOOL_NAME = exports.REPO_NAME = exports.REPO_OWNER = void 0;
exports.REPO_OWNER = 'camalot';
exports.REPO_NAME = 'xget';
exports.TOOL_NAME = 'xget';
exports.STATE_CACHE_HIT = 'XGET_CACHE_HIT';
exports.STATE_CACHE_KEY = 'XGET_CACHE_KEY';
exports.STATE_CACHE_PATH = 'XGET_CACHE_PATH';


/***/ }),

/***/ 155:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setCacheHit = setCacheHit;
exports.isCacheHit = isCacheHit;
exports.setCacheKey = setCacheKey;
exports.getCacheKey = getCacheKey;
exports.setCachePath = setCachePath;
exports.getCachePath = getCachePath;
const core = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const constants_1 = __nccwpck_require__(242);
function setCacheHit(hit) {
    core.saveState(constants_1.STATE_CACHE_HIT, hit ? 'true' : 'false');
}
function isCacheHit() {
    return core.getState(constants_1.STATE_CACHE_HIT) === 'true';
}
function setCacheKey(key) {
    core.saveState(constants_1.STATE_CACHE_KEY, key);
}
function getCacheKey() {
    return core.getState(constants_1.STATE_CACHE_KEY);
}
function setCachePath(path) {
    core.saveState(constants_1.STATE_CACHE_PATH, path);
}
function getCachePath() {
    return core.getState(constants_1.STATE_CACHE_PATH);
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
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
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/asset-relocator-loader */
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = decodeURIComponent(new URL('.', import.meta.url).pathname).slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __nccwpck_require__(579);
/******/ 
