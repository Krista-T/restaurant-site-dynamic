// FETCH DATA CATEGORIES

function getData() {
  fetch("https://kea-alt-del.dk/t5/api/categories")

    //initialize data from json
    .then(function (inData) {
      return inData.json();
    })
    //receive data
    .then(function (data) {
      categoriesRecieved(data);
    });
}
getData();


//call functions
function categoriesRecieved(cats) {
  createSections(cats);
  createNavigation(cats);
  fetchData();

}


//create sections
function createSections(categories) {
  //loop through categories
  categories.forEach(createSec);

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
  a.setAttribute("href", `#${cat}`)
  document.querySelector("#nav").appendChild(a);
  console.log(a)
});

}

//FETCH DATA + WRAP IT IN FUNCTION
function fetchData() {
  fetch("https://kea-alt-del.dk/t5/api/productlist")

    //initialize data from json
    .then(function (init) {
      return init.json();
    })

    //receive data
    .then(function (data) {
      dataReceived(data);
    });

}

function dataReceived(products) {

  //loop through data
  products.forEach(showProduct);

  function showProduct(product) {
    //FIND TEMPLATE
    const template = document.querySelector('#products-template').content;
    const copy = template.cloneNode(true);

    copy.querySelector('article').dataset.id = product.id

    //POPULATE TEMPLATE
    //img
    const img = copy.querySelector(".product-img");

    //set attr to img 
    img.setAttribute("src", "https://kea-alt-del.dk/t5/site/imgs/medium/" + product.image + "-md.jpg");

    //other elements
    copy.querySelector('h3').textContent = product.name;
    copy.querySelector('.about').textContent = product.shortdescription;
    copy.querySelector('.price').textContent = "PRICE:" + " " + product.price + ".00dkk";


    //if on discount calculate price 
    if (product.discount) {

      const newprice = product.price - product.discount;

      copy.querySelector('.price').classList.add('hide');
      copy.querySelector('.discount').classList.add('hide');
      copy.querySelector('.sale').textContent = "SALE:" + " " + newprice + ".00dkk";

    }


    //if soldout
    if (product.soldout) {

      copy.querySelector('.price').classList.add('hide');
      copy.querySelector('.discount').classList.add('hide');
      copy.querySelector('.sale').classList.add('hide');
      copy.querySelector('.soldout').textContent = "SOLDOUT";
    }



    //if vegetarian
    if (product.vegetarian) {
      copy.querySelector('.vegetarian').style.visibility = 'visible';
      copy.querySelector('.vegetarian').textContent = " vegetarian friendly";
    }


    //if alcohol
    if (product.alcohol) {
      copy.querySelector('.glass').style.visibility = 'visible';
      copy.querySelector('.glass').textContent = " " + product.alcohol.toString() + "%" + " " + "alc.";
    }


    //filter CLASSES
    const article = copy.querySelector('article.product');

    if (product.vegetarian) {
      article.classList.add('vegetarian');
    }

    if (product.alcohol) {
      article.classList.add('alc');
    }




    //show description
    const btnExpand = copy.querySelector('button.expand');

    setEventListener(btnExpand);


    function setEventListener(btn) {

      btn.addEventListener('click', recieveData);


    }


    //recieve data
    function recieveData() {

      //fetch all ids
      fetch("https://kea-alt-del.dk/t5/api/product?id=" + product.id)

        //initialize data from json
        .then(function (init) {
          return init.json();
        })

        //receive data
        .then(function showDetails(txt) {

          //teacher did this line
          const arti = document.querySelector(`article[data-id="${product.id}"]`);

          const description = arti.querySelector('.description')

          description.textContent =
            txt.longdescription;


          //if allergen (better solution?)
          console.log(txt.allergens.length);
          if (txt.allergens.length != 0) {
            description.textContent =
              txt.longdescription + " " + "CONTAINS:" + " " + txt.allergens;

          }


          fireEvent(description);

        });

    }

    //TOGGLE
    function fireEvent(description) {

      description.classList.toggle('button.expand');

      if (description.style.display == 'block') {

        description.style.display = 'none';

      } else {
        description.style.display = 'block';
      }
    }






    //append
    const parentElement = document.querySelector("section#" + product.category);
    parentElement.appendChild(copy);
  }


}


//FILTERS  E. LISTEnERS
const vegfilter = document.querySelector('#veg-filter');
vegfilter.addEventListener('click', vegFilterClicked);


function vegFilterClicked() {
  vegfilter.classList.toggle('active');
  const articles = document.querySelectorAll("article:not(.vegetarian)");
  articles.forEach(article => article.classList.toggle('hide'));

}

//ALCOHOL
const alcohol = document.querySelector('#non-alc-filter');
alcohol.addEventListener('click', alcoholClicked);

function alcoholClicked() {
  alcohol.classList.toggle('active');
  const articles = document.querySelectorAll("article.alc");
  articles.forEach(article => article.classList.toggle('hide'));

}



//NAVIGATION 

let burger = document.querySelector('#burger i');
let nav = document.querySelector('#nav');

// Toggle burger menu
function toggleNav() {
  console.log('nav-tog');

  burger.classList.toggle('fa-bars');
  burger.classList.toggle('fa-times');

  if (nav.style.display == 'block') {

    nav.style.display = 'none';

  } else {
    nav.style.display = 'block';
  }

}

// Event listener menu
burger.addEventListener('click', toggleNav);