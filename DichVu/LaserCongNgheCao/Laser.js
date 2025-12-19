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

// 2. Scroll Animation
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal, .fade-in');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
    }
}

// 3. Modal Logic & Auto-Fill & Toast
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    
    // Chọn nút đặt lịch theo class chung
    const bookBtns = document.querySelectorAll(".btn-book-now"); 
    const serviceInput = document.getElementById("service");
    
    // --- LOGIC CHẶN NGÀY QUÁ KHỨ ---
    const dateInput = document.getElementById("date");
    if(dateInput){
        // 1. Lấy ngày hôm nay
        const today = new Date();
        
        // 2. Cộng thêm 1 ngày (để bắt buộc chọn từ ngày mai)
        today.setDate(today.getDate() + 1);

        // 3. Chuyển đổi sang định dạng YYYY-MM-DD
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        
        const minDate = `${yyyy}-${mm}-${dd}`;
        
        // 4. Gán thuộc tính min
        dateInput.setAttribute("min", minDate);
    }

    // Xử lý nút mở Modal và điền tự động tên dịch vụ
    if (bookBtns) {
        bookBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (modal) modal.style.display = "block";

                // Tìm thẻ cha .card-body để lấy tên dịch vụ (thẻ h3)
                const cardBody = btn.closest('.card-body');
                if (cardBody) {
                    const serviceName = cardBody.querySelector('h3').innerText;
                    if(serviceInput) {
                        serviceInput.value = serviceName;
                    }
                }
            });
        });
    }

    // Xử lý nút đóng Modal
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Đóng khi click ra ngoài Modal
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
    
    // Xử lý Submit Form và Hiện Toast
    const form = document.getElementById("bookingForm");
    const toast = document.getElementById("toast");
    const toastClose = document.querySelector(".toast-close");

    if(form){
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            // 1. Ẩn Modal đặt lịch đi
            if(modal) modal.style.display = "none";

            // 2. Hiện Toast thông báo
            if(toast) {
                toast.classList.add("show");
                
                // Tự động ẩn sau 4 giây
                setTimeout(function(){ 
                    toast.classList.remove("show"); 
                }, 4000);
            }

            // 3. Reset form trắng
            form.reset();
        });
    }

    // Xử lý khi bấm nút X trên thông báo
    if(toastClose) {
        toastClose.addEventListener("click", () => {
            toast.classList.remove("show");
        });
    }
});

navSlide();