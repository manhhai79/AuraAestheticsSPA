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

/* --- LOGIC ĐẶT LỊCH RIÊNG CHO TRANG GIẢM BÉO --- */

const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close-btn");
const openBtns = document.querySelectorAll(".open-modal-btn"); // Nút ở header
const cardBtns = document.querySelectorAll(".btn-book"); // Nút trong từng gói dịch vụ
const serviceInput = document.getElementById("service-input");

// 1. Xử lý nút "Đặt Lịch Ngay" trong các thẻ Card dịch vụ
cardBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        
        // Logic lấy tên dịch vụ từ thẻ Card
        // Tìm thẻ cha gần nhất là .package-card, sau đó tìm h3 bên trong
        const card = btn.closest(".package-card");
        if(card) {
            const serviceName = card.querySelector("h3").innerText;
            serviceInput.value = serviceName; // Điền tự động
        }
    });
});

// 2. Xử lý nút trên Header (mở modal trống)
openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        serviceInput.value = ""; // Không điền gì
    });
});

// Đóng modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// Submit form
document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Đăng ký thành công! Chuyên viên SlimBody sẽ gọi lại cho bạn ngay.");
    modal.style.display = "none";
});