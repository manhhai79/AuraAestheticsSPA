/* --- 1. HEADER & SCROLL ANIMATION --- */
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
reveal(); 

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

/* --- 4. MODAL & TOAST LOGIC --- */
const modal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close-btn');
const openBtns = document.querySelectorAll('.open-modal-btn');
const bookingForm = document.getElementById('bookingForm');
const serviceSelect = document.getElementById('service');
const toast = document.getElementById("consultation-alert");
const toastClose = document.querySelector(".toast-close");

// Hàm hiện Toast
function showToast() {
    if (toast) {
        toast.className = "show";
        setTimeout(function() {
            toast.className = toast.className.replace("show", "");
        }, 3000); 
    }
}

// Mở Modal
openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "block";
        
        // Logic tự động chọn dịch vụ khi bấm nút Đăng ký ở bảng giá
        // (Nếu nút có data-service="Triệt Nách" thì dropdown sẽ chọn option đó)
        const serviceName = btn.getAttribute('data-service');
        if(serviceName && serviceSelect) {
            serviceSelect.value = serviceName;
        } else {
            // Mặc định chọn Triệt lông vĩnh viễn khi mở ở trang này
            serviceSelect.value = "Triệt lông vĩnh viễn";
        }
    });
});

// Đóng Modal
if(closeBtn) closeBtn.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => {
    if (e.target == modal) modal.style.display = "none";
});

// Submit Form
if(bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.style.display = "none";
        showToast(); // Hiện thông báo góc phải
        bookingForm.reset();
    });
}

// Đóng Toast
if(toastClose) {
    toastClose.addEventListener("click", () => {
        toast.className = toast.className.replace("show", "");
    });
}