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
    if (!value && value!== 0){
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

  toggleClass(value) {
    this.array.forEach((el) => {
      el.classList.toggle(value);
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

  is(selector) {
    let found = false;
    if(selector instanceof DOMNodeCollection){
      this.array.forEach(el=>{
        selector.array.forEach(el2=>{
          if (el === el2){
            found = true;
          }
        });
      });
    }
    return found;
  }

  off(eventType) {
    this.array.forEach((el) => {
      el.removeEventListener(eventType, el.listener);
    });
  }
}
