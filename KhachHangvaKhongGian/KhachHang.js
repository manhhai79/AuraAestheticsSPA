// 1. Mobile Menu
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
    }
}

// 2. Scroll Animation (Hiệu ứng cuộn)
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 100;
        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
    }
}

// 3. Xử lý Form Review và hiện Toast
const reviewForm = document.getElementById('reviewForm');

// Hàm hiển thị Toast
function showToast() {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.className = "show"; // Thêm class để hiện
        
        // Tự động tắt sau 3 giây
        setTimeout(function() {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }
}

if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Ngăn load lại trang

        const btn = document.querySelector('.btn-submit');
        const originalText = btn.innerText;

        // Hiệu ứng đang gửi
        btn.innerText = "Đang gửi...";
        btn.style.opacity = "0.7";
        btn.disabled = true;

        setTimeout(() => {
            // Hiện Toast thông báo thành công
            showToast();

            // Reset form
            reviewForm.reset();
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.disabled = false;
        }, 1500);
    });
}

// Xử lý nút tắt trên Toast (nếu người dùng bấm X)
const toastClose = document.querySelector(".toast-close");
if (toastClose) {
    toastClose.addEventListener("click", function() {
        const toast = document.getElementById("toast");
        toast.className = toast.className.replace("show", "");
    });
}

// Chạy hàm
navSlide();