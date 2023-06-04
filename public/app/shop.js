let flag = false;
// Page object
const appMain = {
    shopPage: {
        order: {
            name:" ",
            product:[]
        }
    }
};
// Create store name elements
json_obj.forEach((element, index) => {

    let card = `
        <li class="shop-nav-list-item">
            <input id="${element.shopId + 1}"  type="radio" name="radioShop">
            <label class="shop-nav-list-item-btn" id="${element.shopId}" for="${element.shopId + 1}">
             ${element.shopName}
            </label>
        </li>
    `;
    
    document.querySelector(".shop-nav-list").insertAdjacentHTML("beforeend", card);
    document.querySelector(".preloader").classList.add("_visible");
    
    setTimeout(()=>{document.querySelector(".preloader").classList.remove("_visible")}, 500);
    if(index === 0) {
        document.getElementById(`${element.shopId + 1}`).setAttribute("checked", true);
        appMain.shopPage.order.name = json_obj[0].shopName;

        if(!localStorage.orderMemory) {
            localStorage.orderMemory = JSON.stringify({name:json_obj[0].shopName, product:[]});
        }else {
            appMain.shopPage.order = JSON.parse(localStorage.orderMemory);
        };
        
        json_obj.forEach((element) => {
            if(element.shopId === document.querySelector("input[checked] + label").id) {
                element.shopMenu.forEach(e => {
                    createShopProd (e);
                });
            };
        });
    };
});
// Handle click events on the store or product selection buttons
document.querySelector(".main")
.addEventListener("click",(e)=> {
    if(e.target.className === "shop-nav-list-item-btn") {

        if(e.target.previousElementSibling.checked === true) {
            return
        }else{ 
            removeEllChildren(".shop-cont-list");

            json_obj.forEach(element => {

                if(element.shopId === e.target.id) {
                    document.querySelector(".preloader").classList.add("_visible");
                    setTimeout(()=>{document.querySelector(".preloader").classList.remove("_visible")}, 500);

                    appMain.shopPage.order.name = element.shopName;
                    appMain.shopPage.order.product.length = 0;
                    localStorage.orderMemory = JSON.stringify({name:element.shopName, product:[]});

                    element.shopMenu.forEach(product => {
                    createShopProd(product)
                    });
                };
            });
        };

    }else if(e.target.className === "shop-cont-list-item-btn") {
        let product = e.target.id;
        let check = appMain.shopPage.order.product.includes(product);

        if(!check) {
            appMain.shopPage.order.product.push(product);
            return localStorage.orderMemory = JSON.stringify(appMain.shopPage.order);
        };
        document.querySelector(".popup-text").innerHTML = "This product already added, If you want to order more than one go to the 'Shopping cart' and select the quantity you need"
        
        return document.querySelector(".popup").classList.add("_visible");
    };
});
// Function responsible for creating product elements
function createShopProd(e) {
    let card = `
    <li class="shop-cont-list-item">
        <figure class="shop-cont-list-item-img " id="image${e.productId}"></figure>
        <h2 class="shop-cont-list-item-ban">
            ${e.name}
        </h2>
        <button class="shop-cont-list-item-btn" id="${e.productId}">
            add to Cart
        </button>
    </li>
    `;

    document.querySelector(".shop-cont-list").insertAdjacentHTML("beforeend", card);
    document.getElementById(`image${e.productId}`).style.backgroundImage = `url(${e.imgUrl})`;
};
// Removing the popup from the page
document.querySelector(".popup-del").addEventListener("click", ()=> {
    if(flag === false) {
        document.querySelector(".popup").classList.remove('_visible')
    };
});

