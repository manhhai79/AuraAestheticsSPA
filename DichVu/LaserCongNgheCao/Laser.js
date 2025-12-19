/* --- COMMON LOGIC (Menu & Reveal) --- */
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if(burger){
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}

window.addEventListener('scroll', reveal);
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
navSlide();

/* --- LOGIC ĐẶT LỊCH --- */
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close-btn");
const openBtns = document.querySelectorAll(".open-modal-btn");
const cardBtns = document.querySelectorAll(".btn-book"); 
const serviceInput = document.getElementById("service-input");

// 1. Xử lý nút trong thẻ Card
cardBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        const card = btn.closest(".package-card");
        if(card) {
            const serviceName = card.querySelector("h3").innerText;
            serviceInput.value = serviceName;
        }
    });
});

// 2. Xử lý nút Header
openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        serviceInput.value = "";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// Xử lý khi bấm nút "Gửi Ngay"
const bookingForm = document.getElementById("bookingForm");
if(bookingForm){
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn trang web tải lại

        // 1. Ẩn Modal đặt lịch đi
        const modal = document.getElementById("bookingModal");
        modal.style.display = "none";
        document.body.style.overflow = "auto";

        // 2. Hiện thông báo Toast đẹp (Thay cho alert cũ)
        showToast();

        // 3. Xóa dữ liệu cũ trong form
        bookingForm.reset();
    });
}

// Hàm hiển thị Toast
function showToast() {
    const toast = document.getElementById("toast");
    // Thêm class 'show' để nó trượt ra
    toast.className = "show";

    // Sau 4 giây thì tự động ẩn đi
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 4000);
}