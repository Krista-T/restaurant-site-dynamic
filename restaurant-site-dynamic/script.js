
//FETCH DATA

fetch("https://kea-alt-del.dk/t5/api/productlist")

//initialize data from json
.then(function(init){
  return init.json();
})

//receive data
.then(function(data) {
  dataReceived(data);
});

function dataReceived(products) {


  //loop through data
  products.forEach(showProduct);

function showProduct(product){
   //find template
  const template = document.querySelector('#products-template').content;
  const copy = template.cloneNode(true);
 //populate template
 copy.querySelector('h1').textContent = product.category;
 copy.querySelector('h3').textContent = product.name;
 copy.querySelector('.about').textContent = product.shortdescription;
  copy.querySelector('.price').textContent = "PRICE:" + " " + product.price;
  copy.querySelector('.discount').textContent = "DISCOUNT:" + " " + product.discount;
  // copy.querySelector('.soldout').textContent =product.soldout;

//if on discount calculate price
if(product.discount) {
  console.log('calc price');
  

}


//if soldout
if(product.soldout){
  console.log('sold');
  copy.querySelector('.price').classList.add('hide');
  copy.querySelector('.discount').classList.add('hide');
  copy.querySelector('.soldout').textContent = "SOLDOUT";
}


      

  //append
  document.querySelector('main').appendChild(copy);
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



 
//EXPAND TEXT

let expands;

expands = document.querySelectorAll('button.expand');

// expands = document.querySelectorAll('button.expand').nextElementSibling;
console.log(expands);


//LOOP
 expands.forEach(setEventListener);


function setEventListener(btn){
  btn.addEventListener('click', toggleText);


 }

function toggleText(e){
 
  
    const description = e.target.nextElementSibling.parentElement;
    // console.log(description);
    description.classList.toggle('.expand');

    console.log('i am in');
    
      if ( description.style.display == 'block') {
         
          description.style.display = 'none';
  
        } else {
          description.style.display = 'block';
        }  
  
}

