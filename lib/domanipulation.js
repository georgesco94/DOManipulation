/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

function $l (arg) {
  if (arg instanceof Function) {
    const funcArray = [];
    funcArray.push(arg);
    document.addEventListener("DOMContentLoaded", function(event) {
      funcArray.forEach((f) => {
        f();
      });
    });
    return;
  }

  if(arg instanceof HTMLElement){
    const array = [arg];
    return new DOMNodeCollection(array);
  }else{
    const nodeList = document.querySelectorAll(arg);
    const nodeListArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeListArray);
  }
}

$l.extend = function (firstObj, ...args) {
  args.forEach((obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      firstObj[`${key}`] = obj[`${key}`];
    });
  });
  return firstObj;
};


$l.ajax = function (options) {
  const defaults = {
    method: 'GET',
    data:'',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8' ,
    url: "",
    success: () => {console.log("success");},
    error: () => {console.log("error");}
  };

  $l.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(defaults.method, defaults.url);

  xhr.onload = function () {
    if (xhr.status < 300 && xhr.status >= 200 ) {
       defaults.success(xhr.response);
    } else if (xhr.status <= 400) {
      defaults.error();
    }
  };

  xhr.send(JSON.stringify(defaults.data));
};

$l(
  () => {
    console.log("ready");
  }
);



window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html (str) {
    if(str) {
      this.array.forEach((el) => {
        el.innerHTML = str;
      });
    }else{
      return this.array[0].innerHTML;
    }
  }

  empty () {
    this.html(' ');
  }

  append(arg){
    if (arg instanceof HTMLElement) {
      this.array.forEach((el) => {
        el.innerHTML += arg.outerHTML;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.array.forEach((el) => {
        arg.array.forEach((el2) => {
          el.innerHTML += el2.outerHTML;
        });
      });
    } else {
      this.array.forEach((el) => {
        el.innerHTML += arg;
      });
    }
  }

  attr(attrName, value) {
    if (!value){
      return (
        this.array[0].getAttribute(attrName)
      );
    }
    this.array.forEach((el) => {
      el.setAttribute(attrName, value);
    });
  }

  addClass(value) {
    this.array.forEach((el) => {
      el.classList.add(value);
    });
  }

  removeClass(value) {
    this.array.forEach((el) => {
      el.classList.remove(value);
    });
  }

  children() {
    let childArray = [];
    this.array.forEach((el) => {
      childArray = childArray.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childArray);
  }

  parent() {
    let pArray = [];
    this.array.forEach((el) => {
      pArray.push(el.parentNode);
    });
    return new DOMNodeCollection(pArray);
  }

  find(str){
    let arr = [];
    this.array.forEach((el) => {
      arr = arr.concat(Array.from(el.querySelectorAll(str)));
    });

    return arr;
  }

  remove(){
    this.array.forEach((el) => {
      el.remove();
    });
  }

  on(type, listener) {
    this.array.forEach((el) => {
      el.addEventListener(type, listener);
      el.listener = listener;
    });
  }

  off(eventType) {
    this.array.forEach((el) => {
      el.removeEventListener(eventType, el.listener);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
