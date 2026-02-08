// ===========================
// MENU DATA - Dữ liệu menu đã chuẩn hóa
// ===========================
const menuData = {
    "Cà Phê Pha Máy": [
        { name: "Cà phê đá", price: 12000 },
        { name: "Cà phê đen", price: 10000 },
        { name: "Cà phê sữa đá", price: 15000 },
        { name: "Cà phê muối", price: 17000 },
        { name: "Bạc xỉu", price: 18000 },
        { name: "Ca cao sữa", price: 15000 }
    ],
    "Sinh Tố": [
        { name: "Sinh tố Bơ", price: 20000 },
        { name: "Sinh tố Sầu riêng", price: 25000 },
        { name: "Sinh tố Mít", price: 20000 },
        { name: "Sinh tố Dâu", price: 20000 },
        { name: "Sinh tố Mãng cầu", price: 20000 },
        { name: "Sinh tố Kiwi", price: 20000 }
    ],
    "Trà Trái Cây": [
        { name: "Trà đào", price: 17000 },
        { name: "Trà vải", price: 17000 },
        { name: "Trà Kiwi", price: 17000 },
        { name: "Trà chanh dây hạt đắc", price: 20000 },
        { name: "Trà dâu tằm hạt đắc", price: 20000 },
        { name: "Trà mãng cầu", price: 20000 },
        { name: "Trà chanh Thái xanh", price: 17000 },
        { name: "Trà dưa lưới", price: 17000 },
        { name: "Trà dâu", price: 17000 },
        { name: "Trà ổi hồng", price: 17000 }
    ],
    "Trà Sữa": [
        { name: "Trà sữa thái xanh", price: 20000 },
        { name: "Trà sữa thái đỏ", price: 20000 },
        { name: "Sữa tươi TCDD", price: 20000 },
        { name: "Trà sữa Matcha", price: 20000 },
        { name: "Matcha latte", price: 20000 },
        { name: "Cacao latte", price: 20000 },
        { name: "Trà sữa việt quất", price: 20000 },
        { name: "Trà sữa socola", price: 20000 }
    ],
    "Đá Xay": [
        { name: "Matcha Đá Xay", price: 25000 },
        { name: "Oreo Đá Xay", price: 25000 }
    ],
    "Soda": [
        { name: "Soda Đủ Vị", price: 15000, hasVariants: true }
    ],
    "Giải Khát": [
        { name: "Lipton tắc xí muội", price: 10000 },
        { name: "Tắc xí muội", price: 10000 },
        { name: "Đá me", price: 10000 },
        { name: "Trà dưỡng", price: 8000 }
    ],
    "Ăn Vặt": [
        { name: "Bánh tráng trộn", price: 15000 },
        { name: "Bò viên chiên", price: 12000 },
        { name: "Cá viên chiên", price: 12000 },
        { name: "Trái cây ly", price: 10000 },
        { name: "Mì ly", price: 10000 },
        { name: "Bánh Flan", price: 4000 },
        { name: "Kem cây", price: 8000 }
    ],
    "Điểm Tâm Sáng": [
        { name: "Hủ tiếu", price: 25000 },
        { name: "Cơm sườn", price: 25000 }
    ],
    "Thuốc Lá": [
        { name: "Saigon Melon", price: 22000 },
        { name: "SaiGon Xì Gà", price: 22000 },
        { name: "Hero", price: 25000 },
        { name: "Jet", price: 30000 },
        { name: "SaiGon Silver", price: 20000 }
    ]
};

// Danh sách vị Soda
const sodaFlavors = [
    { name: "Soda Chanh", icon: "🍋", price: 15000 },
    { name: "Soda Dâu", icon: "🍓", price: 15000 },
    { name: "Soda Kiwi", icon: "🥝", price: 15000 },
    { name: "Soda Xoài", icon: "🥭", price: 15000 },
    { name: "Soda Dưa Hấu", icon: "🍉", price: 15000 },
    { name: "Soda Cam", icon: "🍊", price: 15000 },
    { name: "Soda Việt Quất", icon: "🫐", price: 15000 },
    { name: "Soda Đào", icon: "🍑", price: 15000 }
];

// ===========================
// STATE MANAGEMENT
// ===========================
let currentCategory = Object.keys(menuData)[0];
let cart = [];

// ===========================
// UTILITY FUNCTIONS
// ===========================
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

function getCartItemIndex(itemName) {
    return cart.findIndex(item => item.name === itemName);
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ===========================
// RENDER FUNCTIONS
// ===========================
function renderCategories() {
    const tabsContainer = document.getElementById('categoryTabs');
    tabsContainer.innerHTML = '';
    
    Object.keys(menuData).forEach(category => {
        const tab = document.createElement('div');
        tab.className = `category-tab ${category === currentCategory ? 'active' : ''}`;
        tab.textContent = category;
        tab.onclick = () => switchCategory(category);
        tabsContainer.appendChild(tab);
    });
}

function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    const items = menuData[currentCategory];
    
    items.forEach(item => {
        const cartItem = cart.find(c => c.name === item.name);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        
        // Kiểm tra nếu là món có variants (như Soda Đủ Vị)
        if (item.hasVariants) {
            itemDiv.innerHTML = `
                <div class="item-header">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${formatPrice(item.price)}</div>
                </div>
                <div class="item-actions">
                    <button class="qty-btn" onclick="showSodaModal()" style="width: 100%; border-radius: 10px; padding: 10px; font-size: 14px;">
                        Chọn Vị
                    </button>
                </div>
            `;
        } else {
            itemDiv.innerHTML = `
                <div class="item-header">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${formatPrice(item.price)}</div>
                </div>
                <div class="item-actions">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', ${item.price}, -1)">−</button>
                        <span class="qty-display" id="qty-${item.name.replace(/\s/g, '-')}">${quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', ${item.price}, 1)">+</button>
                    </div>
                </div>
            `;
        }
        
        menuGrid.appendChild(itemDiv);
    });
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 2L11 6M15 2L13 6M6 6H18L19 19H5L6 6Z" stroke-width="1.5"/>
                </svg>
                <p>Giỏ hàng trống</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div class="cart-item-name">${item.name}</div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">×</button>
                </div>
                <div class="cart-item-footer">
                    <div class="cart-item-qty">
                        <button class="cart-qty-btn" onclick="updateCartItemQty('${item.name}', -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartItemQty('${item.name}', 1)">+</button>
                    </div>
                    <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
                </div>
            </div>
        `).join('');
    }
    
    totalPriceElement.textContent = formatPrice(calculateTotal());
}

// ===========================
// CART FUNCTIONS
// ===========================
function updateQuantity(itemName, itemPrice, change) {
    const index = getCartItemIndex(itemName);
    
    if (index === -1 && change > 0) {
        // Add new item
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    } else if (index !== -1) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    
    // Update display
    const qtyElement = document.getElementById(`qty-${itemName.replace(/\s/g, '-')}`);
    if (qtyElement) {
        const currentQty = cart.find(c => c.name === itemName)?.quantity || 0;
        qtyElement.textContent = currentQty;
    }
    
    updateCartBadge();
    renderCart();
}

function updateCartItemQty(itemName, change) {
    const index = getCartItemIndex(itemName);
    
    if (index !== -1) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        // Update menu display if item is visible
        const qtyElement = document.getElementById(`qty-${itemName.replace(/\s/g, '-')}`);
        if (qtyElement) {
            const currentQty = cart.find(c => c.name === itemName)?.quantity || 0;
            qtyElement.textContent = currentQty;
        }
        
        updateCartBadge();
        renderCart();
    }
}

function removeFromCart(itemName) {
    const index = getCartItemIndex(itemName);
    
    if (index !== -1) {
        cart.splice(index, 1);
        
        // Update menu display
        const qtyElement = document.getElementById(`qty-${itemName.replace(/\s/g, '-')}`);
        if (qtyElement) {
            qtyElement.textContent = '0';
        }
        
        updateCartBadge();
        renderCart();
    }
}

// ===========================
// CATEGORY SWITCHING
// ===========================
function switchCategory(category) {
    currentCategory = category;
    renderCategories();
    renderMenu();
}

// ===========================
// CART SIDEBAR TOGGLE
// ===========================
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    
    overlay.classList.add('active');
    sidebar.classList.add('active');
}

function closeCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    
    overlay.classList.remove('active');
    sidebar.classList.remove('active');
}

// ===========================
// MODAL FUNCTIONS
// ===========================
function showSodaModal() {
    const modal = document.getElementById('sodaModal');
    const flavorsContainer = document.getElementById('sodaFlavors');
    
    // Render các vị soda
    flavorsContainer.innerHTML = sodaFlavors.map(flavor => `
        <div class="soda-flavor" onclick="selectSodaFlavor('${flavor.name}', ${flavor.price})">
            <div class="flavor-icon">${flavor.icon}</div>
            <div class="flavor-name">${flavor.name}</div>
            <div class="flavor-price">${formatPrice(flavor.price)}</div>
        </div>
    `).join('');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSodaModal() {
    const modal = document.getElementById('sodaModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectSodaFlavor(flavorName, price) {
    // Thêm vào giỏ hàng
    updateQuantity(flavorName, price, 1);
    
    // Đóng modal
    closeSodaModal();
    
    // Hiển thị thông báo nhẹ
    showToast(`Đã thêm ${flavorName} vào giỏ hàng`);
}

function showOrderModal() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống! Vui lòng chọn món trước khi đặt hàng.');
        return;
    }
    
    const modal = document.getElementById('orderModal');
    const summaryContainer = document.getElementById('orderSummary');
    
    // Tạo tóm tắt đơn hàng
    let summaryHTML = '<h4>📋 Đơn Hàng Của Bạn</h4>';
    summaryHTML += '<div class="summary-items">';
    
    cart.forEach(item => {
        summaryHTML += `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
            </div>
        `;
    });
    
    summaryHTML += '</div>';
    summaryHTML += `
        <div class="summary-total">
            <span>Tổng cộng:</span>
            <span>${formatPrice(calculateTotal())}</span>
        </div>
    `;
    
    summaryContainer.innerHTML = summaryHTML;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showToast(message) {
    // Tạo toast notification đơn giản
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--primary-brown), var(--dark-brown));
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===========================
// ORDER FUNCTIONS
// ===========================
function generateOrderMessage() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống! Vui lòng chọn món trước khi đặt hàng.');
        return null;
    }
    
    let message = '🛒 ĐƠN HÀNG MỚI - COFFEE SANG\n';
    message += '━━━━━━━━━━━━━━━━━━━\n\n';
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   × ${item.quantity} - ${formatPrice(item.price * item.quantity)}\n\n`;
    });
    
    message += '━━━━━━━━━━━━━━━━━━━\n';
    message += `💰 TỔNG CỘNG: ${formatPrice(calculateTotal())}\n\n`;
    message += '📞 Liên hệ: 0984 771 687\n';
    message += '🙏 Cảm ơn quý khách!';
    
    return message;
}

function orderViaSMS() {
    const message = generateOrderMessage();
    if (!message) return;
    
    closeOrderModal();
    
    const phoneNumber = '0984771687';
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `sms:${phoneNumber}?body=${encodedMessage}`;
}

function orderViaWhatsApp() {
    const message = generateOrderMessage();
    if (!message) return;
    
    closeOrderModal();
    
    const phoneNumber = '84984771687'; // Format: 84 + số điện thoại không có số 0 đầu
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function orderViaZalo() {
    const message = generateOrderMessage();
    if (!message) return;
    
    closeOrderModal();
    
    const phoneNumber = '0984771687';
    
    // Zalo deep link - sẽ mở app Zalo nếu có, hoặc Zalo web
    const zaloLink = `https://zalo.me/${phoneNumber}`;
    
    // Hiển thị thông báo cho người dùng
    alert(`Đơn hàng của bạn:\n\n${message}\n\nVui lòng gửi tin nhắn này cho chúng tôi qua Zalo!`);
    
    // Mở Zalo
    window.open(zaloLink, '_blank');
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderMenu();
    renderCart();
    updateCartBadge();
    
    // Close cart when clicking overlay
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    
    // Close modals when clicking overlay
    document.getElementById('sodaModal').addEventListener('click', (e) => {
        if (e.target.id === 'sodaModal') {
            closeSodaModal();
        }
    });
    
    document.getElementById('orderModal').addEventListener('click', (e) => {
        if (e.target.id === 'orderModal') {
            closeOrderModal();
        }
    });
    
    // Prevent scroll when cart is open
    const cartSidebar = document.getElementById('cartSidebar');
    const observer = new MutationObserver(() => {
        if (cartSidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    observer.observe(cartSidebar, {
        attributes: true,
        attributeFilter: ['class']
    });
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
