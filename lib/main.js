const DOMNodeCollection = require("./dom_node_collection.js");

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
