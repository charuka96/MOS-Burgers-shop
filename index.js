let foodItems = [
  {
    code: "B1001",
    name: "Classic Burger (Large)",
    category: "Burgers",
    price: 750.0,
    discount: 0,
    quantity: 50,
    expiry: "2025-12-31",
  },
  {
    code: "B1002",
    name: "Classic Burger (Regular)",
    category: "Burgers",
    price: 1500.0,
    discount: 15,
    quantity: 30,
    expiry: "2025-12-31",
  },
  {
    code: "B1003",
    name: "Turkey Burger",
    category: "Burgers",
    price: 1600.0,
    discount: 0,
    quantity: 25,
    expiry: "2025-12-31",
  },
  {
    code: "B1004",
    name: "Chicken Burger (Large)",
    category: "Burgers",
    price: 1400.0,
    discount: 0,
    quantity: 40,
    expiry: "2025-12-31",
  },
  {
    code: "B1005",
    name: "Chicken Burger (Regular)",
    category: "Burgers",
    price: 800.0,
    discount: 20,
    quantity: 35,
    expiry: "2025-12-31",
  },
  {
    code: "B1016",
    name: "Crispy Chicken Submarine (Large)",
    category: "Submarines",
    price: 2000.0,
    discount: 0,
    quantity: 20,
    expiry: "2025-12-31",
  },
  {
    code: "B1017",
    name: "Crispy Chicken Submarine (Regular)",
    category: "Submarines",
    price: 1500.0,
    discount: 0,
    quantity: 25,
    expiry: "2025-12-31",
  },
  {
    code: "B1025",
    name: "Steak Fries (Large)",
    category: "Fries",
    price: 1200.0,
    discount: 0,
    quantity: 50,
    expiry: "2025-12-31",
  },
  {
    code: "B1031",
    name: "Chicken n Cheese Pasta",
    category: "Pasta",
    price: 1600.0,
    discount: 15,
    quantity: 15,
    expiry: "2025-12-31",
  },
  {
    code: "B1038",
    name: "Fried Chicken (Small)",
    category: "Chicken",
    price: 1200.0,
    discount: 0,
    quantity: 30,
    expiry: "2025-12-31",
  },
  {
    code: "B1044",
    name: "Pepsi (330ml)",
    category: "Beverages",
    price: 990.0,
    discount: 5,
    quantity: 100,
    expiry: "2025-06-30",
  },
];

function displayItemStore() {
  const container = document.getElementById("storeItems");
  container.innerHTML = "";
  foodItems.forEach((item) => {
    const isExpired = new Date(item.expiry) < new Date();
    const itemDiv = document.createElement("div");
    itemDiv.className = `food-item ${isExpired ? "expired" : ""}`;

    itemDiv.innerHTML = `
     <h4>${item.name}</h4>
     <p><strong>Code:</strong> ${item.code}</p>
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p class="price">LKR ${item.price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <p><strong>Expiry:</strong> ${item.expiry}</p>
                     ${
                       item.discount > 0
                         ? `<span class="discount">${item.discount}% OFF</span>`
                         : ""
                     }
                       ${
                         isExpired
                           ? '<span class="expired-tag">EXPIRED</span>'
                           : ""
                       }

                         <div style="margin-top: 15px;">
                        <button class="btn btn-primary" onclick="editItem('${
                          item.code
                        }')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteItem('${
                          item.code
                        }')">Delete</button>
                    </div> `;
    container.append(itemDiv);
  });
}

function addNewItem() {
  document.getElementById("addItemModal").style.display = "block";
}
function saveNewItem(event) {
  event.preventDefault();
  const newItem = {
    code: document.getElementById("newItemCode").value,
    name: document.getElementById("newItemName").value,
    category: document.getElementById("newItemCategory").value,
    price: parseFloat(document.getElementById("newItemPrice").value),
    quantity: parseInt(document.getElementById("newItemQuantity").value),
    discount: parseInt(document.getElementById("newItemDiscount").value),
    expiry: document.getElementById("newItemExpiry").value || "2025-12-31",
  };
  console.log(newItem);

  if (foodItems.forEach((item) => item.code == newItem.code)) {
    alert("Item code already exists!");
    return;
  } else {
    foodItems.push(newItem);
  }
}
function editItem(code) {
  const item = foodItems.find((item) => item.code === code);

  if (item) {
    document.getElementById("newItemCode").value = item.code;
    document.getElementById("newItemName").value = item.name;
    document.getElementById("newItemCategory").value = item.category;
    document.getElementById("newItemPrice").value = item.price;
    document.getElementById("newItemQuantity").value = item.quantity;
    document.getElementById("newItemDiscount").value = item.discount;
    document.getElementById("newItemExpiry").value = item.expiry;
    foodItems = foodItems.filter((item) => item.code !== code);
  }
  addNewItem();
}
