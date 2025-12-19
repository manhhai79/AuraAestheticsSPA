/* --- 1. HEADER & SCROLL ANIMATION (Dùng chung) --- */
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}

function reveal() {
    var reveals = document.querySelectorAll('.reveal, .fade-in');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        if (revealtop < windowheight - 50) {
            reveals[i].classList.add('active');
            reveals[i].style.opacity = "1";
            reveals[i].style.transform = "translateY(0)";
        }
    }
}
window.addEventListener('scroll', reveal);
navSlide();
reveal(); // Chạy lần đầu để hiện nội dung ngay

/* --- 2. LOGIC BEFORE/AFTER SLIDER --- */
const sliderRange = document.getElementById('sliderRange');
const resizeImg = document.querySelector('.resize-img');
const sliderBtn = document.querySelector('.slider-button');

if(sliderRange && resizeImg && sliderBtn) {
    sliderRange.addEventListener('input', function() {
        const value = this.value;
        resizeImg.style.width = value + "%";
        sliderBtn.style.left = value + "%";
    });
}

/* --- 3. FAQ ACCORDION --- */
const faqs = document.querySelectorAll('.faq-item');
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faqs.forEach(item => { if(item !== faq) item.classList.remove('active'); });
        faq.classList.toggle('active');
    });
});

/* --- 4. MODAL & SUCCESS POPUP LOGIC --- */
const modal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const closeBtn = document.querySelector('.close-btn');
const successCloseBtn = document.querySelector('.btn-success-close');
const openBtns = document.querySelectorAll('.open-modal-btn');
const serviceInput = document.getElementById('modal-service-name');
const bookingForm = document.getElementById('bookingForm');

// Mở modal đặt lịch
openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Cho modal hiển thị dạng Flex để căn giữa
        modal.style.display = "flex"; 
        
        // Tự động điền tên dịch vụ nếu bấm từ nút "Đăng Ký Ngay" ở bảng giá
        const serviceName = btn.getAttribute('data-service');
        if(serviceName && serviceInput) {
            serviceInput.value = serviceName;
        } else if(serviceInput) {
            serviceInput.value = ""; 
        }
    });
});

// Đóng modal đặt lịch
if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });
}

// Đóng modal thành công
if(successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
        successModal.style.display = "none";
    });
}

// Click ra ngoài vùng trắng thì đóng
window.addEventListener('click', (e) => {
    if (e.target == modal) modal.style.display = "none";
    if (e.target == successModal) successModal.style.display = "none";
});

// Xử lý khi nhấn nút Gửi (Submit)
if(bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn load lại trang
        
        // 1. Ẩn modal nhập liệu
        modal.style.display = "none";
        
        // 2. Hiện modal thành công
        successModal.style.display = "flex";
        
        // 3. Reset form
        bookingForm.reset();
    });
}