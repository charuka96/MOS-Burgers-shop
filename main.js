
        // Initial data based on the coursework requirements
        let items = [
            {code: 'B1001', name: 'Classic Burger (Large)', category: 'Burgers', price: 750.00, discount: 0, quantity: 50, expiry: '2025-12-31'},
            {code: 'B1002', name: 'Classic Burger (Regular)', category: 'Burgers', price: 1500.00, discount: 15, quantity: 30, expiry: '2025-12-31'},
            {code: 'B1003', name: 'Turkey Burger', category: 'Burgers', price: 1600.00, discount: 0, quantity: 25, expiry: '2025-12-31'},
            {code: 'B1004', name: 'Chicken Burger (Large)', category: 'Burgers', price: 1400.00, discount: 0, quantity: 40, expiry: '2025-12-31'},
            {code: 'B1005', name: 'Chicken Burger (Regular)', category: 'Burgers', price: 800.00, discount: 20, quantity: 35, expiry: '2025-12-31'},
            {code: 'B1016', name: 'Crispy Chicken Submarine (Large)', category: 'Submarines', price: 2000.00, discount: 0, quantity: 20, expiry: '2025-12-31'},
            {code: 'B1025', name: 'Steak Fries (Large)', category: 'Fries', price: 1200.00, discount: 0, quantity: 60, expiry: '2025-12-31'},
            {code: 'B1031', name: 'Chicken n Cheese Pasta', category: 'Pasta', price: 1600.00, discount: 15, quantity: 15, expiry: '2025-12-31'},
            {code: 'B1038', name: 'Fried Chicken (Small)', category: 'Chicken', price: 1200.00, discount: 0, quantity: 30, expiry: '2025-12-31'},
            {code: 'B1044', name: 'Pepsi (330ml)', category: 'Beverages', price: 990.00, discount: 5, quantity: 100, expiry: '2025-12-31'}
        ];

        let customers = [];
        let orders = [];
        let cart = [];
        let currentEditingItem = null;
        let currentEditingCustomer = null;

        // Navigation functionality
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links and sections
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Show corresponding section
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
                
                // Update header
                updateHeader(sectionId);
                
                // Load section-specific content
                loadSectionContent(sectionId);
            });
        });

        function updateHeader(sectionId) {
            const titles = {
                'store-management': 'Store Management',
                'order-management': 'Order Management',
                'customer-management': 'Customer Management',
                'reports': 'Reports & Analytics'
            };
            
            const descriptions = {
                'store-management': 'Manage your food items, prices, and inventory',
                'order-management': 'Process customer orders and manage cart',
                'customer-management': 'Manage customer information and history',
                'reports': 'View sales reports and business analytics'
            };
            
            document.getElementById('section-title').textContent = titles[sectionId];
            document.getElementById('section-description').textContent = descriptions[sectionId];
        }

        function loadSectionContent(sectionId) {
            switch(sectionId) {
                case 'store-management':
                    displayItems();
                    updateStats();
                    break;
                case 'order-management':
                    displayMenuItems();
                    updateCart();
                    break;
                case 'customer-management':
                    displayCustomers();
                    break;
                case 'reports':
                    displayReports();
                    break;
            }
        }

        // Store Management Functions
        function displayItems(searchTerm = '') {
            const container = document.getElementById('items-container');
            const filteredItems = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            container.innerHTML = filteredItems.map(item => {
                const isExpired = new Date(item.expiry) < new Date();
                return `
                    <div class="item-card">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${item.name}</div>
                                <div class="item-code">Code: ${item.code}</div>
                            </div>
                            <div class="item-category">${item.category}</div>
                        </div>
                        <div class="item-details">
                            <div class="item-price">LKR ${item.price.toFixed(2)}</div>
                            <div class="item-info">Quantity: ${item.quantity}</div>
                            <div class="item-info">Expiry: ${item.expiry}</div>
                            ${item.discount > 0 ? `<span class="discount-badge">${item.discount}% OFF</span>` : ''}
                            ${isExpired ? `<span class="expired-badge">EXPIRED</span>` : ''}
                        </div>
                        <div class="item-actions">
                            <button class="btn btn-primary" onclick="editItem('${item.code}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteItem('${item.code}')">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function updateStats() {
            const totalItems = items.length;
            const expiredItems = items.filter(item => new Date(item.expiry) < new Date()).length;
            const discountedItems = items.filter(item => item.discount > 0).length;
            
            document.getElementById('total-items').textContent = totalItems;
            document.getElementById('expired-items').textContent = expiredItems;
            document.getElementById('discounted-items').textContent = discountedItems;
        }

        function openAddItemModal() {
            currentEditingItem = null;
            document.getElementById('modal-title').textContent = 'Add New Item';
            document.getElementById('item-form').reset();
            document.getElementById('item-modal').style.display = 'block';
        }

        function editItem(code) {
            currentEditingItem = items.find(item => item.code === code);
            if (currentEditingItem) {
                document.getElementById('modal-title').textContent = 'Edit Item';
                document.getElementById('item-code').value = currentEditingItem.code;
                document.getElementById('item-name').value = currentEditingItem.name;
                document.getElementById('item-category').value = currentEditingItem.category;
                document.getElementById('item-price').value = currentEditingItem.price;
                document.getElementById('item-quantity').value = currentEditingItem.quantity;
                document.getElementById('item-discount').value = currentEditingItem.discount;
                document.getElementById('item-expiry').value = currentEditingItem.expiry;
                document.getElementById('item-modal').style.display = 'block';
            }
        }

        function deleteItem(code) {
            if (confirm('Are you sure you want to delete this item?')) {
                items = items.filter(item => item.code !== code);
                displayItems();
                updateStats();
                showNotification('Item deleted successfully!', 'success');
            }
        }

        function checkExpiredItems() {
            const expired = items.filter(item => new Date(item.expiry) < new Date());
            if (expired.length > 0) {
                const expiredNames = expired.map(item => item.name).join('\n');
                if (confirm(`Found ${expired.length} expired items:\n${expiredNames}\n\nDo you want to remove them?`)) {
                    items = items.filter(item => new Date(item.expiry) >= new Date());
                    displayItems();
                    updateStats();
                    showNotification('Expired items removed successfully!', 'success');
                }
            } else {
                showNotification('No expired items found!', 'success');
            }
        }

        // Order Management Functions
        function displayMenuItems(searchTerm = '', category = '') {
            const container = document.getElementById('menu-items');
            const availableItems = items.filter(item => new Date(item.expiry) >= new Date() && item.quantity > 0);
            
            const filteredItems = availableItems.filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.code.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = category === '' || item.category === category;
                return matchesSearch && matchesCategory;
            });
            
            container.innerHTML = filteredItems.map(item => `
                <div class="item-card">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${item.name}</div>
                            <div class="item-code">Code: ${item.code}</div>
                        </div>
                        <div class="item-category">${item.category}</div>
                    </div>
                    <div class="item-details">
                        <div class="item-price">LKR ${item.price.toFixed(2)}</div>
                        <div class="item-info">Available: ${item.quantity}</div>
                        ${item.discount > 0 ? `<span class="discount-badge">${item.discount}% OFF</span>` : ''}
                    </div>
                    <div class="item-actions">
                        <input type="number" id="qty-${item.code}" min="1" max="${item.quantity}" value="1" style="width: 80px; padding: 5px; margin-right: 10px;">
                        <button class="btn btn-primary" onclick="addToCart('${item.code}')">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(code) {
            const item = items.find(i => i.code === code);
            const quantity = parseInt(document.getElementById(`qty-${code}`).value);
            
            if (!item || quantity <= 0 || quantity > item.quantity) {
                showNotification('Invalid quantity!', 'error');
                return;
            }
            
            const cartItem = cart.find(c => c.code === code);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                cart.push({
                    code: item.code,
                    name: item.name,
                    price: item.price,
                    discount: item.discount,
                    quantity: quantity
                });
            }
            
            updateCart();
            showNotification('Item added to cart!', 'success');
        }

        function updateCart() {
            const container = document.getElementById('cart-items');
            const subtotal = cart.reduce((sum, item) => {
                const itemTotal = item.price * item.quantity;
                const discountAmount = itemTotal * (item.discount / 100);
                return sum + itemTotal - discountAmount;
            }, 0);
            
            const orderDiscount = parseFloat(document.getElementById('order-discount').value) || 0;
            const discountAmount = subtotal * (orderDiscount / 100);
            const total = subtotal - discountAmount;
            
            container.innerHTML = cart.map((item, index) => {
                const itemTotal = item.price * item.quantity;
                const itemDiscountAmount = itemTotal * (item.discount / 100);
                const itemFinal = itemTotal - itemDiscountAmount;
                
                return `
                    <div class="cart-item">
                        <div>
                            <strong>${item.name}</strong><br>
                            <small>LKR ${item.price.toFixed(2)} x ${item.quantity}</small>
                            ${item.discount > 0 ? `<br><small>Discount: ${item.discount}%</small>` : ''}
                        </div>
                        <div style="text-align: right;">
                            <strong>LKR ${itemFinal.toFixed(2)}</strong><br>
                            <button class="btn btn-danger" style="font-size: 12px; padding: 5px 10px;" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    </div>
                `;
            }).join('');
            
            document.getElementById('cart-total').innerHTML = `
                Subtotal: LKR ${subtotal.toFixed(2)}<br>
                ${orderDiscount > 0 ? `Order Discount (${orderDiscount}%): -LKR ${discountAmount.toFixed(2)}<br>` : ''}
                <strong>Total: LKR ${total.toFixed(2)}</strong>
            `;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            showNotification('Item removed from cart!', 'success');
        }

        function clearCart() {
            cart = [];
            updateCart();
            showNotification('Cart cleared!', 'success');
        }

        function processOrder() {
            if (cart.length === 0) {
                showNotification('Cart is empty!', 'error');
                return;
            }
            
            const customerPhone = document.getElementById('customer-phone').value;
            if (!customerPhone) {
                showNotification('Please enter customer phone number!', 'error');
                return;
            }
            
            // Find or create customer
            let customer = customers.find(c => c.phone === customerPhone);
            if (!customer) {
                customer = {
                    id: Date.now().toString(),
                    name: `Customer ${customerPhone}`,
                    phone: customerPhone,
                    email: '',
                    address: '',
                    orders: []
                };
                customers.push(customer);
            }
            
            // Calculate totals
            const subtotal = cart.reduce((sum, item) => {
                const itemTotal = item.price * item.quantity;
                const discountAmount = itemTotal * (item.discount / 100);
                return sum + itemTotal - discountAmount;
            }, 0);
            
            const orderDiscount = parseFloat(document.getElementById('order-discount').value) || 0;
            const discountAmount = subtotal * (orderDiscount / 100);
            const total = subtotal - discountAmount;
            
            // Create order
            const order = {
                id: Date.now().toString(),
                customerId: customer.id,
                customerPhone: customerPhone,
                items: [...cart],
                subtotal: subtotal,
                orderDiscount: orderDiscount,
                total: total,
                date: new Date().toISOString(),
                status: 'completed'
            };
            
            orders.push(order);
            customer.orders.push(order.id);
            
            // Update inventory
            cart.forEach(cartItem => {
                const item = items.find(i => i.code === cartItem.code);
                if (item) {
                    item.quantity -= cartItem.quantity;
                }
            });
            
            // Generate receipt (simplified)
            generateReceipt(order);
            
            // Clear cart
            cart = [];
            document.getElementById('customer-phone').value = '';
            document.getElementById('order-discount').value = '';
            updateCart();
            
            showNotification(`Order processed successfully! Order ID: ${order.id}`, 'success');
        }

        function generateReceipt(order) {
            const receiptWindow = window.open('', '_blank');
            const receiptHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Receipt - Order ${order.id}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .order-info { margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .total { font-weight: bold; font-size: 18px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>🍔 MOS Burgers</h1>
                        <p>Restaurant Management System</p>
                    </div>
                    <div class="order-info">
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Customer Phone:</strong> ${order.customerPhone}</p>
                        <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Discount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => {
                                const itemTotal = item.price * item.quantity;
                                const itemDiscountAmount = itemTotal * (item.discount / 100);
                                const itemFinal = itemTotal - itemDiscountAmount;
                                return `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>LKR ${item.price.toFixed(2)}</td>
                                        <td>${item.quantity}</td>
                                        <td>${item.discount}%</td>
                                        <td>LKR ${itemFinal.toFixed(2)}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; text-align: right;">
                        <p>Subtotal: LKR ${order.subtotal.toFixed(2)}</p>
                        ${order.orderDiscount > 0 ? `<p>Order Discount (${order.orderDiscount}%): -LKR ${(order.subtotal * order.orderDiscount / 100).toFixed(2)}</p>` : ''}
                        <p class="total">Total: LKR ${order.total.toFixed(2)}</p>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <p>Thank you for your business!</p>
                    </div>
                </body>
                </html>
            `;
            
            receiptWindow.document.write(receiptHTML);
            receiptWindow.document.close();
        }

        // Customer Management Functions
        function displayCustomers(searchTerm = '') {
            const container = document.getElementById('customers-container');
            const filteredCustomers = customers.filter(customer => 
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            container.innerHTML = filteredCustomers.map(customer => `
                <div class="item-card">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${customer.name}</div>
                            <div class="item-code">Phone: ${customer.phone}</div>
                        </div>
                        <div class="item-category">${customer.orders.length} Orders</div>
                    </div>
                    <div class="item-details">
                        <div class="item-info">Email: ${customer.email || 'N/A'}</div>
                        <div class="item-info">Address: ${customer.address || 'N/A'}</div>
                        <div class="item-info">Total Orders: ${customer.orders.length}</div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-primary" onclick="editCustomer('${customer.id}')">Edit</button>
                        <button class="btn btn-secondary" onclick="viewCustomerOrders('${customer.id}')">View Orders</button>
                        <button class="btn btn-danger" onclick="deleteCustomer('${customer.id}')">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        function openAddCustomerModal() {
            currentEditingCustomer = null;
            document.getElementById('customer-modal-title').textContent = 'Add New Customer';
            document.getElementById('customer-form').reset();
            document.getElementById('customer-modal').style.display = 'block';
        }

        function editCustomer(id) {
            currentEditingCustomer = customers.find(customer => customer.id === id);
            if (currentEditingCustomer) {
                document.getElementById('customer-modal-title').textContent = 'Edit Customer';
                document.getElementById('customer-name').value = currentEditingCustomer.name;
                document.getElementById('customer-phone-input').value = currentEditingCustomer.phone;
                document.getElementById('customer-email').value = currentEditingCustomer.email;
                document.getElementById('customer-address').value = currentEditingCustomer.address;
                document.getElementById('customer-modal').style.display = 'block';
            }
        }

        function deleteCustomer(id) {
            if (confirm('Are you sure you want to delete this customer?')) {
                customers = customers.filter(customer => customer.id !== id);
                displayCustomers();
                showNotification('Customer deleted successfully!', 'success');
            }
        }

        function viewCustomerOrders(customerId) {
            const customer = customers.find(c => c.id === customerId);
            const customerOrders = orders.filter(order => order.customerId === customerId);
            
            let orderDetails = `Orders for ${customer.name}:\n\n`;
            customerOrders.forEach(order => {
                orderDetails += `Order ID: ${order.id}\n`;
                orderDetails += `Date: ${new Date(order.date).toLocaleString()}\n`;
                orderDetails += `Total: LKR ${order.total.toFixed(2)}\n`;
                orderDetails += `Items: ${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}\n\n`;
            });
            
            alert(orderDetails);
        }

        // Reports Functions
        function displayReports() {
            const totalOrders = orders.length;
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
            const totalCustomers = customers.length;
            
            document.getElementById('total-orders').textContent = totalOrders;
            document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2);
            document.getElementById('total-customers').textContent = totalCustomers;
            
            // Recent orders
            const recentOrders = orders.slice(-10).reverse();
            const recentOrdersContainer = document.getElementById('recent-orders');
            
            recentOrdersContainer.innerHTML = recentOrders.map(order => `
                <div class="item-card">
                    <div class="item-header">
                        <div>
                            <div class="item-title">Order #${order.id}</div>
                            <div class="item-code">Customer: ${order.customerPhone}</div>
                        </div>
                        <div class="item-category">LKR ${order.total.toFixed(2)}</div>
                    </div>
                    <div class="item-details">
                        <div class="item-info">Date: ${new Date(order.date).toLocaleString()}</div>
                        <div class="item-info">Items: ${order.items.length}</div>
                        <div class="item-info">Status: ${order.status}</div>
                    </div>
                </div>
            `).join('');
        }

        // Form submissions
        document.getElementById('item-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                code: document.getElementById('item-code').value,
                name: document.getElementById('item-name').value,
                category: document.getElementById('item-category').value,
                price: parseFloat(document.getElementById('item-price').value),
                quantity: parseInt(document.getElementById('item-quantity').value),
                discount: parseFloat(document.getElementById('item-discount').value) || 0,
                expiry: document.getElementById('item-expiry').value
            };
            
            if (currentEditingItem) {
                // Edit existing item
                const index = items.findIndex(item => item.code === currentEditingItem.code);
                items[index] = formData;
                showNotification('Item updated successfully!', 'success');
            } else {
                // Add new item
                if (items.find(item => item.code === formData.code)) {
                    showNotification('Item code already exists!', 'error');
                    return;
                }
                items.push(formData);
                showNotification('Item added successfully!', 'success');
            }
            
            document.getElementById('item-modal').style.display = 'none';
            displayItems();
            updateStats();
        });

        document.getElementById('customer-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('customer-name').value,
                phone: document.getElementById('customer-phone-input').value,
                email: document.getElementById('customer-email').value,
                address: document.getElementById('customer-address').value
            };
            
            if (currentEditingCustomer) {
                // Edit existing customer
                currentEditingCustomer.name = formData.name;
                currentEditingCustomer.phone = formData.phone;
                currentEditingCustomer.email = formData.email;
                currentEditingCustomer.address = formData.address;
                showNotification('Customer updated successfully!', 'success');
            } else {
                // Add new customer
                if (customers.find(customer => customer.phone === formData.phone)) {
                    showNotification('Customer with this phone number already exists!', 'error');
                    return;
                }
                formData.id = Date.now().toString();
                formData.orders = [];
                customers.push(formData);
                showNotification('Customer added successfully!', 'success');
            }
            
            document.getElementById('customer-modal').style.display = 'none';
            displayCustomers();
        });

        // Search functionality
        document.getElementById('search-items').addEventListener('input', function() {
            displayItems(this.value);
        });

        document.getElementById('search-menu').addEventListener('input', function() {
            const category = document.getElementById('category-filter').value;
            displayMenuItems(this.value, category);
        });

        document.getElementById('category-filter').addEventListener('change', function() {
            const search = document.getElementById('search-menu').value;
            displayMenuItems(search, this.value);
        });

        document.getElementById('search-customers').addEventListener('input', function() {
            displayCustomers(this.value);
        });

        document.getElementById('order-discount').addEventListener('input', function() {
            updateCart();
        });

        // Modal functionality
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });

        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        });

        // Notification system
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            displayItems();
            updateStats();
            displayMenuItems();
            updateCart();
        });

        // Mobile responsive menu toggle (optional)
        function toggleMobileMenu() {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        }
    