const products = [
    {
      id: 0,
      name: "Red",
      price: 168.99,
      instock: 100,
      description:
        "CumstomSoles Acryclic Shoe Paint - Red",
      imgSrc: "paint-swipe-red.jpg",
    },
    {
      id: 1,
      name: "Blue",
      price: 168.99,
      instock: 100,
      description:
        "CumstomSoles Acryclic Shoe Paint - Blue",
      imgSrc: "paint-swipe-blue.jpg",
    },
    {
      id: 2,
      name: "Yellow",
      price: 168.99,
      instock: 100,
      description:
        "CumstomSoles Acryclic Shoe Paint - Yellow",
      imgSrc: "paint-swipe-yellow.jpg",
    },
    {
      id: 3,
      name: "White",
      price: 168.99,
      instock: 100,
      description:
        "CumstomSoles Acryclic Shoe Paint - Black",
      imgSrc: "paint-swipe-white.jpg",
    },
    {
      id: 4,
      name: "Black",
      price: 168.99,
      instock: 100,
      description:
        "CumstomSoles Acryclic Shoe Paint - Black",
      imgSrc: "paint-swipe-black.jpg",
    },
    {
      id: 5,
      name: "Paint Brushes",
      price: 129.99,
      instock: 100,
      description:
        "CumstomSoles Acryclic Shoe Paint - Red",
      imgSrc: "paint-brushes.jpg",
    },
  ];

const productItems = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const quantity = document.querySelector(".quantity")

// Render products on HTML file
function renderProducts() {
    products.forEach((product) => {
        productItems.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
             <div class="card h-100">
                <img src="${product.imgSrc}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                <div class="title fw-bold mb-2">${product.name}</div>
                <div class="price mb-2">R${product.price.toFixed(2)}</div>
                <div class="fw-bold mb-3">${product.description}</div>
                <button type="button" class="btn btn-dark d-block m-auto" onclick="addItem(${product.id})">Add To Cart</button>
                </div>
             </div>
            </div>
        `;
    });
}
renderProducts();

let cart = JSON.parse(localStorage.getItem("CART")) || [];

// Adding items function
function addItem(id) {
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        const item = products.find((product) => product.id === id);
        cart.push({ ...item, numberOfUnits: 1,});
    }

    
    updateCart();
}

// Update cart function
function updateCart() {
    renderCartItems();
    renderSubtotal();

    localStorage.setItem("CART", JSON.stringify(cart));
}

function renderSubtotal() {
    let totalPrice = 0,
      totalItems = 0;
  
    cart.forEach((item) => {
      totalPrice += item.price * item.numberOfUnits;
      totalItems += item.numberOfUnits;
    });
  
    subtotalEl.innerHTML = `Subtotal (${totalItems} items): R${totalPrice.toFixed(2)}`;
    quantity.innerHTML = totalItems;
  }

  // Show items in cart
  function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>R</small>${item.price.toFixed(2)}
            </div>
            <div class="units">
               <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
               <div class="number">${item.numberOfUnits}</div>
               <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}
     
  

  // Remove item from cart if the number of units is 0
function removeItemFromCart(id) {
    cart = cart.filter((item) => itemnumberOfUnits > 0);
  
    updateCart();
  }
  
  // Change number of units for an item
  function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
  
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus" && numberOfUnits < item.instock) {
          numberOfUnits++;
        } else if (action === "minus" && numberOfUnits === 1) {
            return null; // To mark for deletion
        }
      }
  
      return {
        ...item,
        numberOfUnits,
      };
    }).filter(item => item !== null); // Remove null items
  
    updateCart();
  }





