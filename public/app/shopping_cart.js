let order = JSON.parse(localStorage.orderMemory);
let obj;
let flag = false;
// Page object
const appMain = {
    userOrder:[],
    sendOrder: {
        totalProduct:[],
        totalPrice: 0
    }
};
// Construction of the page element responsible for the products
if(order.product.length > 0 || order.product === undefined) {
    json_obj.forEach(element => {
        if(element.shopName === order.name) {
            obj = element;
        }
        return
    });

    order.product.forEach(element => {
        obj.shopMenu.forEach(e => {
            if(e.productId === parseInt(element)) {
                let card = `
                    <li  class="shop_cart-cont-list-item">
                        <figure class="list-item-img_prod" id="image${e.productId}"></figure>
                        <div class="list-item-info_prod">
                            <i class="_dell_element" id="dell${e.productId}"></i>
                            <h2 class="info_prod-ban">${e.name}</h2>
                            <p class="info_prod-text">Price: <span class="info_prod-text-vall">${e.price} ${e.currency}</span></p>
                            <div class="info_prod-counter">
                                <p class="info_prod-counter-vall">1</p>
                                <div class="info_prod-counter-btn"  id="${e.productId}">
                                    <button class="info_prod-counter-btn-up"></button>
                                    <button class="info_prod-counter-btn-down"></button>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
                appMain.userOrder.push({name: e.name, value: 1, price: e.price, id: e.productId, currency: e.currency})

                document.querySelector(".shop_cart-cont-list")
                .insertAdjacentHTML("beforeend", card);
                document.getElementById(`image${e.productId}`).style.backgroundImage = `url(${e.imgUrl})`;
            };
        });
    });
    getTotalPrise(appMain.userOrder);
}else{
    let card = "<p class ='_not_order'>You didn't order anything. Please go to the section 'Shop', and choose what you would like to order.</p>"
    removeEllChildren(arg = ".shop_cart-cont-list");

    document.querySelector(".shop_cart-cont-list")
    .insertAdjacentHTML("beforeend", card);
    document.querySelector(".total_cont-text-vall").textContent = "0";
}
// Logic for adding the quantity of goods
document.querySelector(".shop_cart-cont-list").addEventListener("click", (e)=> {

    if(e.target.className === "info_prod-counter-btn-up") {
        let paren = document.getElementById(`${e.target.parentElement.id}`);
        let value = parseInt(paren.parentElement.firstElementChild.innerText);

        paren.parentElement.firstElementChild.innerText = value + 1;

        appMain.userOrder.forEach(element => {
            if(element.id === parseInt(e.target.parentElement.id)) {
                element.value += 1;
            };
        });
        getTotalPrise(appMain.userOrder);
    }else if(e.target.className === "info_prod-counter-btn-down") {
        let paren = document.getElementById(`${e.target.parentElement.id}`);
        let value = parseInt(paren.parentElement.firstElementChild.innerText);

        if(value > 1) {
            paren.parentElement.firstElementChild.innerText = value - 1;

            appMain.userOrder.forEach(element => {
                if(element.id === parseInt(e.target.parentElement.id)) {
                    element.value -= 1;
                };
            });
        };
        getTotalPrise(appMain.userOrder);
    };

});
// Submit order and validate user data
document.querySelector(".shop_cart-total_btn").addEventListener("click", (e)=> {

    if(checkTotalPrise("total_cont-text-vall")) {
        checkFormValue("shop_cart-form-input");

    }else {
        document.querySelector(".popup-text").innerHTML = "Return to the product selection page 'Shop' and select the product you need"
        document.querySelector(".popup").classList.add("_visible");
    };
});
// Function for checking the final price
function checkTotalPrise(classEll = "total_cont-text-vall") {
    let vall = document.querySelector(`.${classEll}`).textContent;

    if(vall !== "0") {
        return true
    }else {
        return false
    }
}
// Function to validate and submit user and cart data
function checkFormValue(formInputClassName = "shop_cart-form-input") {
    let [...dataFormElement] = document.querySelectorAll(`.${formInputClassName}`);
    let check;
    // сбрасывание классов input и проверке на заполнение
    dataFormElement.forEach(e=> {
        check = [];
        e.classList.remove("_check_false");
        e.classList.remove("_check_true");
    })

    // добавление классов валидности к input 
    dataFormElement.forEach(e=> {

        if(e.value.length < e.minLength) {
            e.classList.add("_check_false");
            check.push(false);
        }else {
            e.classList.add("_check_true");
            check.push(true);
        };
    });

    // проверка валидности всех input и отправка(без url не могу отправить результат используя fetch, )
    if(check.includes(false)) {
        document.querySelector(".popup-text").innerHTML = "Fill in all your details correctly"
        document.querySelector(".popup").classList.add("_visible");
    }else {
        const randomId = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let id = '';
            for (let i = 0; i < 8; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              id += characters[randomIndex];
            }
            return id;
        };
        appMain.userOrder.forEach(e=> {
            appMain.sendOrder.totalProduct.push({
                nameProduct: e.name,
                valueProduct: e.value,
                priceProduct: e.price + e.currency
            });
        });
        appMain.sendOrder.nameShop = obj.shopName;
        appMain.sendOrder.userInfo = {
            name: document.getElementById("userName").value,
            email: document.getElementById("userEmail").value,
            phone: document.getElementById("userTel").value,
            address: document.getElementById("userAddres").value
        };
        appMain.sendOrder.cartId = randomId();
        sendPost(url = "http://localhost:3000/api/cart", appMain.sendOrder);

        document.querySelector(".popup-text").innerHTML = "Thank you for your order, our specialist will contact you to clarify the information"
        document.querySelector(".popup").classList.add("_visible");
        flag = true;
        
    };
};
// Removing the popup from the page and redirecting to the main page after submitting the data
document.querySelector(".popup-del").addEventListener("click", ()=> {
    if(flag === false) {

        document.querySelector(".popup").classList.remove('_visible');
    }else{
        localStorage.clear();
        window.location.href = "./../index.html";
    };
});

//List of all product elements on the page
let [...arrDellEll] = document.querySelectorAll("._dell_element");
//Processing the removal of product elements by clicking on the cross
arrDellEll.forEach(element => {
    element.addEventListener("click", (e)=> {

        let deletedEllId = e.target.id.replace("dell","");
        let targetEllParent = e.target.parentElement;

        appMain.userOrder.forEach((product, index) => {
            if(product.id === parseInt(deletedEllId)) {
                appMain.userOrder.splice(index, 1);
            };
        });

        order.product.forEach((product, index) =>{
            if(product === deletedEllId){
                order.product.splice(index, 1)
            };
        });
        localStorage.orderMemory = JSON.stringify(order)
        targetEllParent.parentElement.remove();
        getTotalPrise(appMain.userOrder);

        if(appMain.userOrder.length === 0) {
            let card = "<p class ='_not_order'>You didn't order anything. Please go to the section 'Shop', and choose what you would like to order.</p>"
            removeEllChildren(arg = ".shop_cart-cont-list");
        
            document.querySelector(".shop_cart-cont-list")
            .insertAdjacentHTML("beforeend", card);
        };
    });
});