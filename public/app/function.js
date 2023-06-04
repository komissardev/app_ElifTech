// Function to remove elements
function removeEllChildren(arg = ".root") {
    let [...childrenRoot] = document.querySelector(arg).children;
    childrenRoot.forEach(e=>e.remove(e));

};
// Function for getting the total cost
function getTotalPrise(arrProductOrder) {
    
    let getTotalPrise = 0;
    arrProductOrder.forEach(e => {
        if(e === undefined){
            return
        }
        getTotalPrise += (e.price * e.value);
    });

    document.querySelector(".total_cont-text-vall").textContent = "";
    appMain.sendOrder.totalPrice = "";
    if(getTotalPrise === 0){
        return document.querySelector(".total_cont-text-vall").textContent = 0
    }
    document.querySelector(".total_cont-text-vall").textContent = getTotalPrise + " " + arrProductOrder[0].currency;
    appMain.sendOrder.totalPrice = getTotalPrise + " " + arrProductOrder[0].currency;
};
// Phone number validation function
function validateInput(inputElement) {
    const inputValue = inputElement.value;
    const onlyDigitsRegex = /^\d+$/;
    
    if (!onlyDigitsRegex.test(inputValue)) {
      // Если введены не только цифры, то обнуляем строку
      inputElement.value = "";  
      return false;
    }
    
    // Если все цифры, то возвращаем true или выполняем нужные действия
    return true;
}
// The function of sending the order to the server
function sendPost(url = "http://localhost:3000/api/cart", data) {
    return fetch( url , {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-Type":"application/json"}
    })
    .then(response => response.json())//response.json() - Возвращяет undefined
    .then(result => {
        console.log("Result: your order has been processed and shipped:",data);
        console.log(`All orders can be viewed at: ${url}s`)
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
// Click event handler on burger menu
document.querySelector(".burger-menu").addEventListener("click", ()=>{
    document.querySelector(".burger-menu").classList.toggle("_active")
    document.querySelector(".header-nav-list").classList.toggle("_visible")
})