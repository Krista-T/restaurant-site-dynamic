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
   //FIND TEMPLATE
  const template = document.querySelector('#products-template').content;
  const copy = template.cloneNode(true);

  copy.querySelector('article').dataset.id=product.id
   //POPULATE TEMPLATE



  //img
 const img = copy.querySelector(".product-img");

 //set attr to img 
img.setAttribute("src", "https://kea-alt-del.dk/t5/site/imgs/medium/" + product.image + "-md.jpg");



 copy.querySelector('h3').textContent = product.name;
 copy.querySelector('.about').textContent = product.shortdescription;

  copy.querySelector('.price').textContent = "PRICE:" + " " + product.price + ".00dkk";


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


//if allergens NO DATA IN OBJ!
if(product.allergens) {
  copy.querySelector('#allergen').style.visibility = 'visible';
  copy.querySelector('#allergen').textContent = "contains:" + " " +product.allergens;
  
}



//if vegetarian
if(product.vegetarian) {
  copy.querySelector('#vegetarian').style.visibility = 'visible';
  copy.querySelector('#vegetarian').textContent = " vegetarian friendly";
}


//if alcohol
if(product.alcohol) {
  copy.querySelector('#alcohol').style.visibility = 'visible';
  copy.querySelector('#alcohol').textContent = " " +  product.alcohol.toString()  + "%"   + " " + "alc.";
}

 
//filter CLASS!!
const article = copy.querySelector('article');
if(product.vegetarian) {
  article.classList.add('#vegetarian');
  //console.log(article);
}


  //show description SEMI-WORKING
const btnExpand = copy.querySelector('button.expand');

setEventListener(btnExpand);


function setEventListener(btn){
  //console.log('setting event');
  //btn.addEventListener('click', fireEvent);
  btn.addEventListener('click', recieveData);
 
  
}


        //recieve data
  function recieveData(){
    console.log(copy)
    //fetch all ids
    fetch("https://kea-alt-del.dk/t5/api/product?id=" + product.id )

    //initialize data from json
    .then(function(init){
      return init.json();
    })
    
    //receive data
    .then(function showDetails(txt) {
      const arti = document.querySelector(`article[data-id="${product.id}"]`)
        console.log('show details');
      //  showDetails(); 
      const description=arti.querySelector('.description')
  description.textContent =
    txt.longdescription 
    fireEvent(description)
  
  });

  
  }
  
//TOGGLE CHECK!!!
function fireEvent(description) {
  console.log('i fired event');


  //SEMI-WORKING
  //const description = e.target.parentElement.nextElementSibling;

    console.log(description); //NULL
    
    description.classList.toggle('button.expand');

    console.log('i am in toggle');
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


//FILTERS EV LIST-PUTS HIDE ON ALL ARTICLES!!!
const vegfilter = document.querySelector('#veg-filter');

vegfilter.addEventListener('click', vegFilterClicked);

function vegFilterClicked(){
const articles = document.querySelectorAll("article:not(.vegetarian)");
console.log(articles);
//  articles.forEach(el=>{
//    el.classList.add('hide');
//  })
}



 //NAVIGATION 

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



 
