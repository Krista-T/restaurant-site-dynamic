// FETCH DATA CATEGORIES

function getData() {
  fetch("https://kea-alt-del.dk/t5/api/categories")
   //initialize data from json
  .then(function(inData){
       return inData.json();
   })
   //receive data
 .then(function(data) {
  categoriesRecieved(data);
});
}
getData();


//call functions

function  categoriesRecieved(cats) {
  
  createSections(cats);
  createNavigation(cats);
  fetchData();
 
}


//create sections
function createSections(categories) {
 //loop through categories
  categories.forEach(createSec);
  console.log(categories);
  function createSec(category) {
    const section = document.createElement("section");
    //set attr (what, where)
    section.setAttribute("id", category);
    const h1 = document.createElement("h1");
    h1.textContent = category;
    section.appendChild(h1);
    document.querySelector("main").appendChild(section);
  }

}

//create navigation
function createNavigation(categories) {
  categories.forEach(cat => {
    const a = document.createElement("a");
    a.textContent = cat;
    a.setAttribute("href", "#" + cat)
    document.querySelector("#nav").appendChild(a);
  })
}

  //FETCH DATA + WRAP IT IN FUNCTION
function fetchData() {
fetch("https://kea-alt-del.dk/t5/api/productlist")

//initialize data from json
.then(function(init){
  return init.json();
})

//receive data
.then(function(data) {
  dataReceived(data);
});

}

function dataReceived(products) {
  console.log(products);
  //loop through data
  products.forEach(showProduct);

function showProduct(product){
   //find template
  const template = document.querySelector('#products-template').content;
  const copy = template.cloneNode(true);

   //populate template

  //img
 const img = copy.querySelector(".product-img");

 //set attr to img 
// img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${product.image}-md.jpg`);

img.setAttribute("src", "https://kea-alt-del.dk/t5/site/imgs/medium/" + product.image + "-md.jpg");


//  copy.querySelector('h1').textContent = product.category;
 copy.querySelector('h3').textContent = product.name;

 copy.querySelector('.about').textContent = product.shortdescription;
  copy.querySelector('.price').textContent = "PRICE:" + " " + product.price + ".00dkk";
  // copy.querySelector('.discount').textContent = "DISCOUNT:" + " " + product.discount;
  // copy.querySelector('.soldout').textContent =product.soldout;
  //  let newprice = product.price - product.discount;


//if on discount calculate price 
if(product.discount) {
  console.log('calc price');
   const newprice = product.price - product.discount;
  console.log(newprice);
   copy.querySelector('.price').classList.add('hide');
  copy.querySelector('.discount').classList.add('hide');
  copy.querySelector('.sale').textContent = "SALE:" + " " + newprice + ".00dkk";

}


//if soldout
if(product.soldout){
  console.log('sold');
  copy.querySelector('.price').classList.add('hide');
  copy.querySelector('.discount').classList.add('hide');
  copy.querySelector('.sale').classList.add('hide');
  copy.querySelector('.soldout').textContent = "SOLDOUT";
}

//if allergens


//if vegetarian

//if alcohol



  


  //EXPAND TEXT NE RADI - FETCH DATA LONG DSCR

let  expands = document.querySelectorAll('button.expand');

//loop
 expands.forEach(setEventListener);


function setEventListener(btn){
  console.log('expand');
  btn.addEventListener('click',  () => {
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(toggleText);
  });

 }

function toggleText(e){
 
    const description = e.target.nextElementSibling;
     console.log(description);
    description.classList.toggle('.expand');

    console.log('i am in');
    
      if ( description.style.display == 'block') {
         
          description.style.display = 'none';
  
        } else {
          description.style.display = 'block';
        }  
  
}
     

  //append
  const parentElement = document.querySelector("section#" +product.category);
  parentElement.appendChild(copy);
}
}
 
   


//MENU GLOBAL VARIABLES

let burger = document.querySelector('#burger i');
let nav = document.querySelector('#nav');

// Toggle burger menu
function toggleNav() {
   console.log('nav-tog');

    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-times');
  
    if (  nav.style.display == 'block') {
       
        nav.style.display = 'none';

      } else {
        nav.style.display = 'block';
      }
   
}

// Event listener menu
 burger.addEventListener('click', toggleNav);



 
// //EXPAND TEXT

// let expands;

// expands = document.querySelectorAll('button.expand');

// // expands = document.querySelectorAll('button.expand').nextElementSibling;
// console.log(expands);


// //LOOP
//  expands.forEach(setEventListener);


// function setEventListener(btn){
//   btn.addEventListener('click', toggleText);


//  }

// function toggleText(e){
 
  
//     const description = e.target.nextElementSibling.parentElement;
//     // console.log(description);
//     description.classList.toggle('.expand');

//     console.log('i am in');
    
//       if ( description.style.display == 'block') {
         
//           description.style.display = 'none';
  
//         } else {
//           description.style.display = 'block';
//         }  
  
// }

