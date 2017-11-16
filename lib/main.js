const DOMNodeCollection = require("./dom_node_collection.js");

const callBacks = [];
let loaded = false;

function $d (arg) {
  if (arg instanceof Function) {
    if (!loaded) {
      callBacks.push(arg);
    } else {
      arg();
    }
  }

  if(arg instanceof HTMLElement){
    const array = [arg];
    return new DOMNodeCollection(array);
  }else{
    if(arg[0] === "<") {
      const el = arg.match(/([a-zA-Z1-9]+)/)[0];
      return new DOMNodeCollection([document.createElement(el)]);
    }else if (arg[0] === "."){
      const els = document.querySelectorAll(arg);
      return new DOMNodeCollection(els);
    }
    const nodeList = document.querySelectorAll(arg);
    const nodeListArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeListArray);
  }
}

$d.extend = function (firstObj, ...args) {
  args.forEach((obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      firstObj[`${key}`] = obj[`${key}`];
    });
  });
  return firstObj;
};


$d.ajax = function (options) {
  const defaults = {
    method: 'GET',
    data:'',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8' ,
    url: "",
    success: () => {console.log("success");},
    error: () => {console.log("error");}
  };

  $d.extend(defaults, options);
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

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  callBacks.forEach( (cb) =>
    cb()
  );

});

window.$d = $d;
