// DỮ LIỆU SẢN PHẨM MẪU
const products = [
    { id: 1, name: "Serum Phục Hồi Obagi B5", price: 850000, category: "special", brand: "Obagi", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000", sold: "2.5k", desc: "Tinh chất cấp ẩm, phục hồi da tổn thương.", use: "Sử dụng 3-5 giọt thoa đều mặt sau bước Toner." },
    { id: 2, name: "Kem Chống Nắng La Roche-Posay", price: 550000, category: "protection", brand: "La Roche-Posay", image: "https://tse2.mm.bing.net/th/id/OIP.Fy5HkvKhwfKTED9wC9eDvAHaHa?w=182&h=182&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1", sold: "10k+", desc: "Bảo vệ da phổ rộng, kiểm soát dầu nhờn.", use: "Thoa kem trước khi ra nắng 20 phút." },
    { id: 3, name: "Sữa Rửa Mặt CeraVe", price: 420000, category: "skin", brand: "CeraVe", image: "https://bizweb.dktcdn.net/100/407/286/products/cerave-foaming-facial-cleanser.jpg?v=1621057161027", sold: "5.5k", desc: "Làm sạch sâu nhưng vẫn giữ ẩm.", use: "Làm ướt mặt, massage nhẹ nhàng rồi rửa sạch." },
    { id: 4, name: "Retinol 1.0 Obagi", price: 1450000, category: "special", brand: "Obagi", image: "https://www.obagi.vn/cdn/shop/files/New-Retinol10-packshot-fn.png?v=1743741942", sold: "1.2k", desc: "Trẻ hóa da, giảm nếp nhăn.", use: "Dùng vào buổi tối. Tuần đầu dùng 2 lần." },
    { id: 5, name: "Dưỡng Thể Vaseline 50X", price: 180000, category: "body", brand: "Vaseline", image: "https://bizweb.dktcdn.net/100/348/157/files/duong-the-trang-da-vaseline-thai-jpg-1649824454-13042022113414.jpg?v=1676966082535", sold: "8.9k", desc: "Dưỡng trắng da body, chống nắng.", use: "Thoa đều toàn thân sau khi tắm." },
    { id: 6, name: "Tẩy Da Chết Paula's Choice", price: 950000, category: "special", brand: "Paula's Choice", image: "https://tse4.mm.bing.net/th/id/OIP.PfW7xKU1RYz7RShjsNx6aQHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", sold: "3.4k", desc: "Loại bỏ tế bào chết, thu nhỏ lỗ chân lông.", use: "Dùng bông tẩy trang thoa đều mặt." }
];

let cart = [];
let currentDetail = null;
const formatVND = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

// --- RENDER & FILTER ---
function render(data = products) {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="product-card fade-in" onclick="openDetail(${p.id})">
            <div class="badge-sale">15%<br>GIẢM</div>
            <div class="card-img-wrap">
                <img src="${p.image}">
            </div>
            <div class="card-body">
                <div class="card-name">${p.name}</div>
                <div class="card-meta">
                    <div class="card-price">${formatVND(p.price)}</div>
                    <div class="card-sold">Đã bán ${p.sold}</div>
                </div>
                <button class="btn-quick" onclick="quickAdd(${p.id}); event.stopPropagation();">Thêm vào giỏ</button>
            </div>
        </div>
    `).join('');
}

function filterCategory(cat, el) {
    document.querySelectorAll('.cat-list li').forEach(li => li.classList.remove('active'));
    el.classList.add('active');
    render(cat === 'all' ? products : products.filter(p => p.category === cat));
}

function handleSearch() {
    const val = document.getElementById('searchInput').value.toLowerCase();
    render(products.filter(p => p.name.toLowerCase().includes(val)));
}

function handleSort(type) {
    let sorted = [...products];
    if(type === 'price-asc') sorted.sort((a,b) => a.price - b.price);
    if(type === 'price-desc') sorted.sort((a,b) => b.price - a.price);
    render(sorted);
}

// --- DETAIL MODAL ---
function openDetail(id) {
    currentDetail = products.find(p => p.id === id);
    document.getElementById('detail-img').src = currentDetail.image;
    document.getElementById('detail-name').innerText = currentDetail.name;
    document.getElementById('detail-price').innerText = formatVND(currentDetail.price);
    document.getElementById('detail-brand').innerText = currentDetail.brand;
    document.getElementById('tab-desc').innerText = currentDetail.desc;
    document.getElementById('tab-use').innerText = currentDetail.use;
    document.getElementById('detail-qty').value = 1;
    document.getElementById('productModal').style.display = 'block';
}

function updateQty(n) {
    let el = document.getElementById('detail-qty');
    let v = parseInt(el.value) + n;
    if(v > 0) el.value = v;
}

function openTab(tab, el) {
    document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
}

// --- CART LOGIC ---
function quickAdd(id) {
    const p = products.find(i => i.id === id);
    addToCart(p, 1);
}

function addToCartFromDetail() {
    const qty = parseInt(document.getElementById('detail-qty').value);
    addToCart(currentDetail, qty);
    closeModal('productModal');
}

function addToCart(p, qty) {
    const item = cart.find(i => i.id === p.id);
    if(item) item.qty += qty;
    else cart.push({...p, qty});
    updateUI();
    showToast("Đã thêm vào giỏ hàng!", "success");
}

function updateUI() {
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    
    document.getElementById('cart-badge').innerText = totalQty;
    document.getElementById('cart-total-qty').innerText = `(${totalQty})`;
    document.getElementById('cart-total-price').innerText = formatVND(totalPrice);

    const list = document.getElementById('cartList');
    list.innerHTML = cart.length === 0 ? '<p style="text-align:center; padding:30px; color:#999;">Giỏ hàng trống</p>' 
    : cart.map((item, idx) => `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="ci-info" style="flex:1">
                <h4>${item.name}</h4>
                <p style="color:#d0011b">${formatVND(item.price)} x ${item.qty}</p>
            </div>
            <i class="fa-solid fa-trash ci-remove" onclick="removeCart(${idx})"></i>
        </div>
    `).join('');
}

function removeCart(idx) { cart.splice(idx, 1); updateUI(); }
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

// --- CHECKOUT ---
function openCheckout() {
    if(cart.length === 0) return showToast("Giỏ hàng đang trống!", "error");
    toggleCart(); 
    
    const list = document.getElementById('checkout-list');
    list.innerHTML = cart.map(item => `
        <div class="co-item">
            <span>${item.name} <strong>(x${item.qty})</strong></span>
            <span>${formatVND(item.price * item.qty)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById('final-total').innerText = formatVND(total);
    
    document.getElementById('checkoutModal').style.display = 'block';
}

document.getElementById('checkoutForm').onsubmit = (e) => {
    e.preventDefault();
    closeModal('checkoutModal');
    setTimeout(() => {
        showToast("Đặt hàng thành công! Aura sẽ gọi xác nhận.", "success");
        cart = []; updateUI();
    }, 500);
};

// --- MOBILE MENU LOGIC (Updated) ---
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    nav.classList.toggle('active');
    burger.classList.toggle('toggle'); // Hiệu ứng burger (nếu có CSS)
}

// --- UTILS ---
function showToast(msg, type) {
    const box = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<i class="fa-solid ${type==='success'?'fa-circle-check':'fa-circle-exclamation'}"></i> ${msg}`;
    box.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = (e) => { if(e.target.className === 'modal') e.target.style.display = 'none'; }

// Init 
render();