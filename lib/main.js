/* global DOMNodeCollection */

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
  // Wrap raw DOM Node/List
  else if(arg instanceof HTMLElement){
    const array = [arg];
    return new DOMNodeCollection(array);
  }else{
    if(arg[0] === "<") {
      // capture the element tag
      const el = arg.match(/([a-zA-Z1-9]+)/)[0];
      return new DOMNodeCollection([document.createElement(el)]);
    }
    // since we are not creating, we are searching
    const nodeList = document.querySelectorAll(arg);
    const nodeListArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeList);
  }
}

$d.extend = function (firstObj, ...args) {
  args.forEach((obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      firstObj[key] = obj[key];
    });
  });
  return firstObj;
};


$d.ajax = function (options) {

  const defaults = {
    method: 'GET',
    data:'',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8' ,
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    success: (data) => {return data ; } ,
    error: () => {console.log("error");}
  };

  if(!options) options = {};
  $d.extend(defaults, options);

  fetch(defaults.url,defaults)
    .then(function(response) {
      if (response.status >= 400 && response.status <= 500) {
        response.json().then( errorResponse =>{
          defaults.error(errorResponse);
        });
      } else if (response.status === 200) {
        response.json().then(data=>{
          defaults.success(data);
        });
      }
    })
    .catch( ()=>console.log("network error") );

};
document.addEventListener('DOMContentLoaded', () => {

  loaded = true;
  callBacks.forEach( (cb) =>
    cb()
  );

});

window.$d = $d;
