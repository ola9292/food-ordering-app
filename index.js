
import { menuArray } from "./data.js";
const feedBody = document.getElementById('feed-body')
const addBtns = document.getElementsByClassName('add-btn')
const orderContainer = document.getElementById('order-container')
const totalPrice = document.getElementById('total-price')
const removeBtn = document.getElementsByClassName('remove-btn')
const menuOrder = document.getElementById('menu-order')
const completeOrder = document.getElementById('complete-order')
const paymentBtn = document.getElementById('payment-btn')
const payBtn = document.getElementById('pay-btn')
const formContainer = document.getElementById('form-container')

// getting all food menu
function getMenuHtml(){
    let feedMenu = '';
    menuArray.forEach(function(menu, index){
      
      
        feedMenu += `
            <div class="menu-container">
                <div class="menu">
                    <div class="menu-img">
                        <img src="${menu.pic}" alt="">
                    </div>
                    <div class="menu-text">
                        <h2>${menu.name}</h2>
                        <h4>ingredients</h4>
                        <h3>$${menu.price}</h3>
                    </div>
                   
                        <button id="${index}" class="add-btn">+</button>
                    
                </div>
                </div>
              ` 

        
    })
    return feedMenu
}

// rendering food menu
function renderHtml(){
    feedBody.innerHTML = getMenuHtml()

}
renderHtml()

//adding event listener to all add buttons
for(let btn of addBtns){
    btn.addEventListener('click',addItemToCart)
}

const cartItems = []
function addItemToCart(){
   
 cartItems.push(menuArray[this.id])
  console.log(cartItems)
  renderCartItem()
  
}

//rendering ordered menu
function renderCartItem(){
    menuOrder.innerHTML = `<h2>Your Order</h2>`
    let cartItemList =''
    cartItems.forEach(function(cartItem, index){
        cartItemList += `
            <div class="item-list">
                <div class="main">
                    <h3>${cartItem.name}</h3>
                    <button class="remove-btn" id="${index}">remove</button>
                </div>
                    <h4>$${cartItem.price}</h4>
            </div>
                 `
    })
    orderContainer.innerHTML = cartItemList
    
   getTotalPrice()
   remove()
   
}

// get total price of order
function getTotalPrice(){
    let total = 0
    cartItems.forEach(function(cartItem){
        total += cartItem.price
    })
   totalPrice.innerHTML = total

   //render payment button if total cost is > 0
   if(total > 0){
        completeOrder.style.display = 'block'
   }else{
    completeOrder.style.display = 'none'
   }
}

// remove menu from menulist
function remove(){
    for(let btn of removeBtn){
 
        btn.addEventListener('click',removeItem)
    }
}

function removeItem(e){
    
   if(e.target.id){
    
    cartItems.splice(e.target.id,1)
   renderCartItem()
   }
}


paymentBtn.addEventListener('click',makePayment)

    function makePayment(){
      
        formContainer.style.display='block'
    }
const formInner = document.getElementById('form-inner')

formInner.addEventListener('submit',success)

function success(e){
    e.preventDefault()
    
    const formInnerData = new FormData(formInner)
    formContainer.style.display='none'
    const name = formInnerData.get('name')
    orderContainer.innerHTML = `<h2 class="order-container-text">Thanks, ${name}! Your order is on it's way.</h2>`
    menuOrder.innerHTML = ''
    totalPrice.innerHTML = ''
    completeOrder.style.display = 'none'
}