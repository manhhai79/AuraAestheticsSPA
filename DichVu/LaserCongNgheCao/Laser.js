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

// 3. Submit form (Sửa thông báo)
document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Đăng ký thành công! Bác sĩ chuyên khoa Laser sẽ liên hệ tư vấn.");
    modal.style.display = "none";
});