import { menuArray } from './data.js';

const mainSection = document.getElementById('main-section');
const itemSection = document.getElementById('item-section');
const totalPriceSection = document.getElementById('total-price-section')

const checkoutHeader = document.getElementById('checkout-header')

const pizzaItem = document.getElementById('pizza-item')
const hamburgerItem = document.getElementById('hamburger-item')
const beerItem = document.getElementById('beer-item')

const divider = document.getElementById('divider')

const paymentModal = document.getElementById('payment-modal')

const formName = document.getElementById('name')
const formCardNumber = document.getElementById('card-number')
const formCvv = document.getElementById('cvv')

let totalPrice = 0

mainSection.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        handleAddItemClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveItemClick(e.target.dataset.remove)
    } else if (e.target.dataset.complete) {
        handleCompletePurchaseClick()
    } else if (e.target.dataset.pay && formName.value && formCardNumber.value && formCvv.value) {
        e.preventDefault()
        handlePaymentButtonClick()
    }
})

function renderItemSection() {
    menuArray.forEach(item => {
        itemSection.innerHTML += `
            <div class="item">
                <div class="item-details">
                    <p class="item-icon">${item.emoji}</p>
                    <div class="item-description">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-ingredients">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <button data-add="${item.id}" class="add-item-btn">+</button>
            </div>
        `
    })
}

renderItemSection();

function handleAddItemClick(itemId) {
    const filteredItem = menuArray.filter(item => {
        return parseInt(itemId) === item.id
    })[0]
    filteredItem.quantity++;

    menuArray.forEach(item => {
        if (item.quantity) {
            checkoutHeader.classList.remove('hidden')
            divider.classList.remove('hidden')
        }
    })

    const checkoutItem = `
        <div class="checkout-items-list">
            <div class="checkout-item">
                <div class="checkout-item-details">
                    <p class="checkout-item-name">${filteredItem.name} x${filteredItem.quantity}</p>
                    <button data-remove="${filteredItem.id}"class="remove-btn">remove</button>
                </div>
                <p class="checkout-price">$${filteredItem.price * filteredItem.quantity}</p>
            </div>
        </div>
    `

    if (filteredItem.name === 'Pizza') {
        pizzaItem.innerHTML = checkoutItem
    } else if (filteredItem.name === 'Hamburger') {
        hamburgerItem.innerHTML = checkoutItem
    } else if (filteredItem.name === 'Beer') {
        beerItem.innerHTML = checkoutItem
    }

    renderTotalPrice(filteredItem)
}

function handleRemoveItemClick(itemId) {
    const filteredItem = menuArray.filter(item => {
        return parseInt(itemId) === item.id
    })[0]

    totalPrice -= (filteredItem.price * filteredItem.quantity)
    totalPriceSection.innerHTML = `
        <div class="total-price-text">
            <p class="total-price-text">Total price:</p>
            <p class="total-price">$${totalPrice}</p>
        </div>
        <button class="purchase-btn" data-complete="yes">Complete order</button>
    `

    if (!totalPrice) {
        checkoutHeader.classList.add('hidden')
        divider.classList.add('hidden')
        totalPriceSection.innerHTML = ``
    }

    filteredItem.quantity = 0;

    if (filteredItem.name === 'Pizza') {
        pizzaItem.innerHTML = ``
    } else if (filteredItem.name === 'Hamburger') {
        hamburgerItem.innerHTML = ``
    } else if (filteredItem.name === 'Beer') {
        beerItem.innerHTML = ``
    }
}

function renderTotalPrice(item) {
    totalPrice += item.price
    totalPriceSection.innerHTML = `
        <div class="total-price-text">
            <p class="total-price-text">Total price:</p>
            <p class="total-price">$${totalPrice}</p>
        </div>
        <button class="purchase-btn" data-complete="yes">Complete order</button>
    `
}

function handleCompletePurchaseClick() {
    paymentModal.classList.remove('hidden')
}

function handlePaymentButtonClick() {
    paymentModal.classList.add('hidden')
    checkoutHeader.classList.add('hidden')
    divider.classList.add('hidden')
    pizzaItem.innerHTML = ``
    hamburgerItem.innerHTML = ``
    beerItem.innerHTML = ``
    totalPriceSection.innerHTML = `
        <p class="confirmation-msg">Thanks, James! Your order is on its way!</p>
    `
}