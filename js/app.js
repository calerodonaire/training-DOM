let nav = document.querySelector("nav");
// console.log(nav);

let active = document.querySelector(".active");
// console.log(active);

let headersAndParagraphs = document.querySelectorAll("p ,h1");
// console.log(headersAndParagraphs[0].innerText);

// //total de elementos hijos
// document.body.children.length
//document.body.childElementCount

// primer y último nodo hijos
// document.body.firstElementChild
// document.body.lastElementChild

// //siguiente y anterior hermano
// document.body.nextElementSibling
// document.body.previousElementSibling

//accediendo a los elementos hijos mediante children
// console.log(nav.children[0].children[0].children[0]);

// console.log(
//   nav.firstElementChild.firstElementChild.firstElementChild.parentNode
//     .nextElementSibling.firstElementChild.firstChild.parentNode
// );

// console.log(headersAndParagraphs[2]);
// console.log(headersAndParagraphs[0].nextElementSibling.nextElementSibling.nextElementSibling);
// let main = document.querySelector("#first");
// console.log(nav.firstElementChild.lastElementChild.firstElementChild);
// console.log(nav.firstElementChild.childElementCount);
// console.log(nav.firstElementChild.children.length);
// console.log(nav.firstElementChild.childNodes);
// console.log(nav.firstElementChild.firstChild.nodeValue);
// console.log(nav.firstElementChild.nodeName);
console.log(nav.firstElementChild.firstChild.nextSibling.nextSibling.previousSibling);