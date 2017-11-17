# DOManipulation

## Description
DOManipulation is a DOM manipulation library inspired by JQuery and written in vanilla JavaScript. Supported functionality includes:
* Create DOM Elements
* Select DOM Elements by HTML tag, id or class
* Add and Remove event handlers
* Append elements
* Make AJAX requests

## Using DOManipulation
* Clone the library in your project
* Simply import domanipulation.js with a script tag in the header of your HTML.

## API

### $d
The $d wrapper has three main uses :
* Creates a new DOMNodeCollection object.
` $d("<li>");`
* Takes an HTMLElement and wraps it to return an DOMNodeCollection object
* Selects elements via tags, css selectors or id.

` $d(".hidden")`
or
` $d("div")`
or
` $d("#red-item")`


### DOM Traversal
find(selector).
Returns a DOMNodeCollection of all the nodes that match the argument that are children of the DOMNodeCollection nodes.  


children().

Returns a DOMNodeCollection of all children of all nodes within the DOMNodeCollection.  

`$d(".hidden").children()`

parent()    

Returns a DOMNodeCollection of the parent of all nodes within the DOMNodeCollection.  
`$d(".hidden").parent()`. 

  remove()  


Removes the element from the DOM.

### Event Handling

on(action,cb).
Installs an 'action' event handler. When triggered runs the cb callback.
`$d(".addtodo-button").on("click", () => {
  const inp = $d(".hidden")
  inp.removeClass("hidden")
  inp.addClass("shown");
});`


off(action).
Removes the 'action' listener from the DOM


### Manipulation

*addClass(className)

Adds a class attritube to all nodes within the DOMNodeCollection.  
`todoTitle.addClass("todo-title");`

*removeClass(className)

Remove a class attritube of all nodes within the DOMNodeCollection.  
`todoTitle.removeClass("todo-title");`

* append(arg)
arg can be a string, HTMLElement, or DOMNodeCollection object
Appends the outerHTML of each element in the argument to the innerHTML of ALL nodes within the DOMNodeCollection.
`todoTitle.append(`${title}`);`
`newTodo.append(subButton);` where subButton is an instance of DOMNodeCollection

*empty()

Clears the content from all nodes within the DOMNodeCollection.

*attr(key, [value])

Accepts a key and optional value.
If the value exists, it will add that value and key to all nodes within the DOMNodeCollection.
If there is no value, it will return the value corresponding for the key of the first node.
