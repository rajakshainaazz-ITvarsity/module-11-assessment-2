var rootPath;
var apiKey;
var foodType;
var numberOfPosts;
var date;
var jsonPosts;

const HEADER_TEXT = document.querySelector(".blog-header.mx-auto.text-center");
const HEADER_TEAM = document.querySelector(".container.team");
const POSTS_SECTION = document.querySelector(".row.container.mx-auto");
const DEFAULT_DATA = {"type":"menuItem","menuItems":
        [
            {"id":419357,"title":"Burger Sliders",
                "image":"./img/burger.webp",
                "imageType":"png","restaurantChain":"Hooters",
                "servingSize":null,"readableServingSize":null,
                "servings":{"number":1,"size":null,"unit":null}},
            {"id":363733,"title":"Apple Turnover (w/o Cinnamon Sugar Topping)",
                "image":"./img/apple.jpeg",
                "imageType":"png","restaurantChain":"Hardee's",
                "servingSize":null,"readableServingSize":null,
                "servings":{"number":1.0,"size":null,"unit":null}},
            {"id":294710,"title":"Seafood Salad",
                "image":"./img/fish.png",
                "imageType":"jpg","restaurantChain":"Old Country Buffet",
                "servingSize":"117g","readableServingSize":"4 oz",
                "servings":{"number":1.0,"size":117.0,"unit":"g"}},
            {"id":341757,"title":"Meyer Lemon Mussels & Frites",
                "image":"./img/mussels.jpg",
                "imageType":"jpg","restaurantChain":"Mimi's Cafe",
                "servingSize":null,"readableServingSize":null,
                "servings":{"number":1.0,"size":null,"unit":null}},
            {"id":374390,"title":"Add Vanilla Bean Ice Cream",
                "image":"./img/vanilla.png",
                "imageType":"jpg","restaurantChain":"White Spot Restaurants",
                "servingSize":"83g","readableServingSize":"3 oz",
                "servings":{"number":1.0,"size":83.0,"unit":"g"}},
            {"id":271624,"title":"Chicken Stir Fry (Kung Pao Sauce) No rice-half sauce",
                "image":"./img/rice.jpg",
                "imageType":"jpg","restaurantChain":"Fresh City",
                "servingSize":null,"readableServingSize":null,
                "servings":{"number":1.0,"size":null,"unit":null}},
            {"id":266499,"title":"Beef Steak on a Classic Fresh Baked Roll",
                "image":"./img/roll.jpg",
                "imageType":"png","restaurantChain":"Wawa",
                "servingSize":null,"readableServingSize":null,
                "servings":{"number":1.0,"size":null,"unit":null}},
            {"id":342861,"title":"Bread Sandwich, Pokket",
                "image":"./img/sandwich.jpg",
                "imageType":"jpg","restaurantChain":"D'Angelo Grilled Sandwiches",
                "servingSize":null,"readableServingSize":"Medium",
                "servings":{"number":1.0,"size":null,"unit":null}},
            {"id":422541,"title":"Tropicana Light Lemonade",
                "image":"./img/lemonade.jpg",
                "imageType":"jpg","restaurantChain":"KFC",
                "servingSize":"12 fl. oz","readableServingSize":"12 floz",
                "servings":{"number":1.0,"size":12.0,"unit":"fl"}},
            {"id":387582,"title":"Combo Pizza (Slice)",
                "image":"./img/pizza.jpg",
                "imageType":"png","restaurantChain":"Pizza My Heart",
                "servingSize":"1 slice","readableServingSize":"Slice",
                "servings":{"number":1.0,"size":1.0,"unit":"slice"}},
            {"id":419452,"title":"Cheesecake Malt",
                "image":"./img/cheesecake.jpg",
                "imageType":"png","restaurantChain":"Sonic",
                "servingSize":"SMALL","readableServingSize":"Small",
                "servings":{"number":1.0,"size":null,"unit":"SMALL"}},
            {"id":282052,"title":"Peking Duck Standard recipe",
                "image":"./img/duck.jpg",
                "imageType":"png","restaurantChain":"Fresh City",
                "servingSize":null,"readableServingSize":null,
                "servings":{"number":1.0,"size":null,"unit":null}}
        ],
            "offset":0,"number":10,"totalMenuItems":6749,"processingTimeMs":144,
            "expires":1662099327130,"isStale":false
        }

function init(){
    rootPath = "https://api.spoonacular.com/food/menuItems/";
    apiKey = 'fc482dbd50804e6cb7db6e0d55c206c4';
    foodType = 'burger'; // dessert; fish; pizza; rice; etc. accepted
    numberOfPosts = '5';

    // current date displayed on posts
    date = new Date + '';
    date = date.substring(0,15);

    document.getElementById("getAll").addEventListener('click', getAllPosts);
    document.getElementById("getLatest").addEventListener('click', getLatestPosts);
    document.getElementById("getPopular").addEventListener('click', getPopularPosts);

    getAllPosts();
}

function getAllPosts(){
    category = "getAll";
    
    fetchPosts();
    setActiveLink(category);
    headerSectionHide(false);
}
                

function getLatestPosts(){
    category = "getLatest";
    
    sortLatestPosts();
    setActiveLink(category);
    headerSectionHide(true);
}

function getPopularPosts(){
    category = "getPopular";

    sortPopularPosts();
    setActiveLink(category);
    headerSectionHide(true);
}
                
function fetchPosts(){
    // api works if uncommented; removed because images returned were of bad quality
    fetch(/*rootPath + 'search?query=' + foodType + '&number=' + numberOfPosts + '&apiKey=' + apiKey*/)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            displayPosts(data);
            jsonPosts = data;
        })
        .catch(function(err){
            jsonPosts = DEFAULT_DATA;
            displayPosts(DEFAULT_DATA);
        })
}

function displayPosts(data){
    var output = "";
    for(a = 0; a < data.menuItems.length; a++){
        output += `
                    <div class="card mb-4 box-shadow">
                        <div class="card-header">
                            <h4 class="my-0 font-weight-normal">
                                ${data.menuItems[a].title} @ 
                                ${data.menuItems[a].restaurantChain}
                            </h4>
                        </div>
                        <div class="card-body">
                            <img src="${data.menuItems[a].image}" class="card-img-top">
                            <p class="card-text">
                                This delicious item
                                from ${data.menuItems[a].restaurantChain}
                                serves ${data.menuItems[a].servings.number}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn-lg btn-link"><i class="far fa-heart"></i></button>
                                    <button type="button" class="btn-lg btn-link"><i class="far fa-comment"></i></button>
                                    <button type="button" class="btn-lg btn-link"><i class="fa fa-retweet"></i></button>
                                </div>
                                ${(data.menuItems[a].rating)?`<small class="text-muted"><strong>${data.menuItems[a].rating}/100</strong></small>`:''}
                                <small class="text-muted">${date}</small>
                                
                            </div>
                        </div>
                    </div>
        `;
    }

    document.getElementById('posts').innerHTML = output;
}

function setActiveLink(id){
    document.getElementById("getAll").classList.remove("active");
    document.getElementById("getPopular").classList.remove("active");
    document.getElementById("getLatest").classList.remove("active");

    document.getElementById(id).classList.add("active");
}

function headerSectionHide(hide){
    if (hide) {
        HEADER_TEAM.style = "display: none;"
        HEADER_TEXT.style = "display: none;"
        POSTS_SECTION.style = "margin-top: 10rem;"
    }else{
        HEADER_TEAM.style = "display: block;"
        HEADER_TEXT.style = "display: block;"
        POSTS_SECTION.style = "margin-top: calc(-1 * var(--bs-gutter-y));"
    }
}

function sortLatestPosts(){
    latestPosts = {'menuItems':[]};
    // reverse order of posts
    for (let i = (jsonPosts.menuItems.length-1); i >= 0; i--) {
        latestPosts.menuItems.push(jsonPosts.menuItems[i]);
    }
    displayPosts(latestPosts);
}

function sortPopularPosts(){
    originalPosts = jsonPosts.menuItems;
    copyPosts = []

    const deepCopy = (arr) =>{
        let copy = [];
        arr.forEach(elem => {
            if (Array.isArray(elem)) { 
                copy.push(deepCopy(elem));
            } else {
                if (typeof(elem)==='object') {
                    copy.push(deepCopyObj(elem));
                } else {
                    copy.push(elem);
                }
            }
        });
        return copy;
    }

    const deepCopyObj = (obj) => {
        let tempObj = {};
        for(let [key, value] of Object.entries(obj)){
            if (Array.isArray(value)) {
                tempObj[key]=deepCopy(value);
            } else {
                if (value===null) {
                    tempObj[key]=null;
                } else {
                    if (typeof(value)==='object') {
                        tempObj[key]=deepCopyObj(value);
                    } else {
                        tempObj[key]=value;
                    }
                }
            }
        }
        return tempObj;
    }
    copyPosts = deepCopy(originalPosts)

    // give posts random rating from 50-100
    for (let p = 0; p < copyPosts.length; p++) {
        copyPosts[p]['rating'] = Math.floor( Math.random() * 50) + 50;        
    }

    // sort posts according to rating in descending order
    for (let i = 0; i < copyPosts.length-1; i++) {
        for (let g = i+1; g < copyPosts.length; g++) {
            if(copyPosts[i].rating < copyPosts[g].rating){
                temp = copyPosts[i]
                copyPosts[i] = copyPosts[g]
                copyPosts[g] = temp
            }
        }
    }
    popularPosts = {'menuItems':copyPosts};
    displayPosts(popularPosts);
}

window.onscroll = function() {
    var currentScrollPosition = window.pageYOffset;
    if(currentScrollPosition <= 0){
        // show logo at top of page
        document.querySelector(".fixed-top").style = "top: 0!important;";
    }else{
        // hide logo on scroll
        document.querySelector(".fixed-top").style = "top: -88px!important;";
    }
}