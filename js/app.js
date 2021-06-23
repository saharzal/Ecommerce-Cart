const cart = document.querySelector('.cart-container');
const cartBtn = document.querySelector('#cart-btn');
const total = document.querySelector("#total-price");
const itemList = document.querySelector('.items');
const totalInBtn = document.querySelector('#total-price-btn');
const count = document.querySelector("#count");
const clearAll = document.querySelector("#clearAllBtn");
let products = [
    // {name:'کیک دو طبقه', price:23000 ,img:'images/cake1.jpg'},
];
const cartFunc = () => {
    cart.classList.toggle("hide");   
}
cartBtn.onclick = cartFunc;
function addItemsToCart(){
    clearAll.addEventListener('click',()=>{
        products = [];
        addItemsToCart();
    });
    let totalPrice = 0 ;
    itemList.innerHTML = '';
    products.forEach(e=>{
        itemList.insertAdjacentHTML('beforeend',`<div class="item-cart d-flex flex-row align-items-center justify-content-between p-3 mx-2"><div class="right-item d-flex flex-row"><div class="img-container"><img src="${e.img}" alt="" class="item-img"></div><div class="item-info d-flex flex-column mx-3"><p class="item-title">${e.name}</p><div class="item-price d-flex flex-row"><p class="price-amount">${correctPrice(e.price)}</p><p class="price-currency px-1">تومان</p></div></div></div><i class="fa fa-trash delete-item"></i></div>`);
        totalPrice+= e.price;
        console.log(e);
    });
    total.textContent =  correctPrice(totalPrice) ;
    totalInBtn.textContent = correctPrice(totalPrice);
    count.textContent = products.length;   
    const deleteBtns = document.querySelectorAll(".delete-item");
    deleteBtns.forEach(e=>{
        e.addEventListener('click',()=>{
            const nameP = e.previousElementSibling.children[1].children[0].textContent;
            for(let i = 0 ; i< products.length ; i++){
                if(products[i].name === nameP){
                    products.splice(i,1);
                    addItemsToCart();
                    products.forEach(e=>{
                        console.log(e);
                    });
                    break;
                }
            }           
        });
    });  
}
function addProducts(){
    const addBtns = document.querySelectorAll('.add-to-cart');
    addBtns.forEach(e=>{
        e.addEventListener('click',()=>{
            const price = parseInt(e.previousElementSibling.children[0].textContent);
            const name = e.parentElement.previousElementSibling.children[1].textContent;
            const src = e.parentElement.previousElementSibling.children[0].children[0].src;
            products.push({name:name,price:price,img:src});
            addItemsToCart();
        });
    });
    
}
function correctPrice(price){
    let priceStr = '';
    while(price>999){
        if(price%1000<10){
            priceStr= ',00'+price%1000+priceStr;
        }else if(price%1000 <100){
            priceStr= ',0'+price%1000+priceStr;
        }else{
            priceStr= ','+price%1000+priceStr;
        }
        price = price/1000;
        price = Math.floor(price);
    }
    priceStr = price+priceStr;
    return priceStr;
}
addProducts();
