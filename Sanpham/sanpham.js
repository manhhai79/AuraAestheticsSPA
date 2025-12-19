/* --- 1. DANH SÁCH SẢN PHẨM (DATABASE GIẢ LẬP) --- */
const products = [
    {
        id: 1,
        name: "Serum Vàng 24K Aura",
        price: 1500000,
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887",
        category: "face"
    },
    {
        id: 2,
        name: "Kem Chống Nắng Phổ Rộng",
        price: 850000,
        img: "https://images.unsplash.com/photo-1556228720-1957be83f709?q=80&w=1887",
        category: "face"
    },
    {
        id: 3,
        name: "Sữa Dưỡng Thể Trắng Da",
        price: 650000,
        img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1926",
        category: "body"
    },
    {
        id: 4,
        name: "Toner Hoa Hồng Cấp Ẩm",
        price: 450000,
        img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1887",
        category: "face"
    },
    {
        id: 5,
        name: "Mặt Nạ Bùn Khoáng",
        price: 350000,
        img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1935",
        category: "face"
    },
    {
        id: 6,
        name: "Kem Tan Mỡ Body Slim",
        price: 1200000,
        img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1780",
        category: "body"
    },
    {
        id: 7,
        name: "Bộ Trị Mụn Chuyên Sâu",
        price: 950000,
        img: "https://images.unsplash.com/photo-1571781565036-d3f75df02f67?q=80&w=1938",
        category: "face"
    },
    {
        id: 8,
        name: "Tinh Dầu Massage Body",
        price: 250000,
        img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1886",
        category: "body"
    }
];

// Khởi tạo giỏ hàng trống
let cart = []; 

/* --- 2. HÀM HIỂN THỊ SẢN PHẨM --- */
function renderProducts(filter = 'all') {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; // Xóa danh sách cũ

    // Lọc sản phẩm
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    // Vẽ HTML cho từng sản phẩm
    filteredProducts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <span class="product-price">${p.price.toLocaleString('vi-VN')}đ</span>
                <button class="btn-add-cart" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Xử lý nút bộ lọc (Filter)
function filterProduct(category) {
    // Đổi màu nút active
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active'); // Nút vừa bấm sẽ sáng lên
    renderProducts(category);
}

/* --- 3. LOGIC GIỎ HÀNG --- */

// Thêm vào giỏ
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart) {
        itemInCart.quantity++; // Đã có thì tăng số lượng
    } else {
        cart.push({ ...product, quantity: 1 }); // Chưa có thì thêm mới
    }
    
    updateCartUI(); // Cập nhật giao diện
    openCartSidebar(); // Tự động mở giỏ hàng cho khách xem
}

// Xóa khỏi giỏ
function removeItem(index) {
    if(confirm("Bạn có muốn xóa sản phẩm này?")) {
        cart.splice(index, 1);
        updateCartUI();
    }
}

// Cập nhật giao diện giỏ hàng (Sidebar & Icon menu)
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items-container');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    cartItemsDiv.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString('vi-VN')}đ x <strong>${item.quantity}</strong></p>
                </div>
                <span class="remove-item" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </span>
            </div>
        `;
    });

    // Nếu giỏ trống
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-msg" style="text-align:center; color:#999; margin-top:20px;">Giỏ hàng đang trống.</p>';
    }
    
    cartCountSpan.innerText = count;
    cartTotalSpan.innerText = total.toLocaleString('vi-VN') + 'đ';
}

// Đóng/Mở Sidebar Giỏ Hàng
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    // Kiểm tra xem đang đóng hay mở để đảo ngược lại
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    } else {
        sidebar.classList.add('open');
        overlay.classList.add('open');
    }
}

// Hàm phụ trợ để luôn mở sidebar (dùng khi thêm hàng)
function openCartSidebar() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.querySelector('.cart-overlay').classList.add('open');
}

/* --- 4. LOGIC THANH TOÁN (CHECKOUT) --- */

// Mở Form Thanh Toán
function openCheckoutModal() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống! Vui lòng chọn sản phẩm trước.");
        return;
    }
    
    document.getElementById('checkoutModal').style.display = 'block';
    toggleCart(); // Đóng sidebar giỏ hàng lại cho gọn
    
    // Tạo tóm tắt đơn hàng trong Modal
    let summaryText = "";
    cart.forEach(item => {
        summaryText += `- ${item.name} (x${item.quantity})\n`;
    });
    
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Hiển thị tóm tắt (thay đổi text xuống dòng bằng thẻ <br> nếu cần hiển thị đẹp hơn trên HTML)
    document.getElementById('order-summary-text').innerText = summaryText;
    document.getElementById('order-total-text').innerText = total.toLocaleString('vi-VN') + 'đ';
}

// Đóng Form Thanh Toán
function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

// Xử lý khi bấm nút "Đặt Hàng Ngay"
function processOrder(e) {
    e.preventDefault(); // Chặn load lại trang
    
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    
    if(name && phone && address) {
        // Giả lập gửi đơn thành công
        alert(`✅ ĐẶT HÀNG THÀNH CÔNG!\n\nCảm ơn ${name}.\nĐơn hàng trị giá ${document.getElementById('order-total-text').innerText} sẽ được giao tới: ${address}.\nChúng tôi sẽ liên hệ qua SĐT ${phone} để xác nhận.`);
        
        // Reset lại mọi thứ
        cart = [];
        updateCartUI();
        closeCheckoutModal();
        document.querySelector('.modal-form').reset();
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
}

/* --- 5. BURGER MENU (CHO MOBILE) --- */
// Logic này để menu 3 gạch hoạt động trên điện thoại
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render sản phẩm ngay khi vào trang
    renderProducts();

    // 2. Kích hoạt Burger Menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation
            burger.classList.toggle('toggle');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
    
    // 3. Đóng modal khi click ra ngoài (cho Modal Checkout)
    window.onclick = function(event) {
        const modal = document.getElementById('checkoutModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});