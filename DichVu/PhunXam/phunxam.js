const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close-btn");
const bookBtns = document.querySelectorAll(".btn-book");
const serviceInput = document.getElementById("service");
const bookingForm = document.getElementById("bookingForm");

// Mở modal + tự điền tên dịch vụ
bookBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        modal.style.display = "block";

        const serviceBox = btn.closest(".service-info");
        serviceInput.value = serviceBox
            ? serviceBox.querySelector("h2").innerText
            : "";
    });
});

// Đóng modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Gửi form
const toast = document.getElementById("toast");
const toastClose = document.querySelector(".toast-close");

bookingForm.addEventListener("submit", e => {
    e.preventDefault();

    // Thêm class show để toast hiển thị animation
    toast.classList.add("show");

    // Ẩn toast sau 3 giây
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

    // Reset form & đóng modal
    bookingForm.reset();
    modal.style.display = "none";
});

// Đóng toast khi nhấn ×
toastClose.addEventListener("click", () => {
    toast.classList.remove("show");
});
// Ngăn chọn ngày trong quá khứ
const dateInput = document.getElementById("date");

function setMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, "0");
    const minDate = `${year}-${month}-${day}`;
    dateInput.setAttribute("min", minDate);
}
// Gọi khi load trang
setMinDate(); // gọi trực tiếp sau khi khai báo hàm


bookingForm.addEventListener("submit", e => {
    e.preventDefault();

    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset giờ phút giây để so sánh chính xác

    if (dateInput.value && selectedDate < today) {
        alert("Vui lòng chọn ngày hiện tại hoặc tương lai.");
        return; // ngăn submit
    }

    // Thêm class show để toast hiển thị animation
    toast.classList.add("show");

    // Ẩn toast sau 3 giây
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

    // Reset form & đóng modal
    bookingForm.reset();
    modal.style.display = "none";
});

// Gọi khi load trang
document.addEventListener('DOMContentLoaded', () => {
    // === 1. LOGIC MENU MOBILE ===
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Bật/tắt class hiển thị menu
            nav.classList.toggle('nav-active');

            // Hiệu ứng các dòng chữ bay vào
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Hiệu ứng nút Burger xoay thành dấu X
            burger.classList.toggle('toggle');
        });
    } else {
        console.error("Lỗi: Không tìm thấy menu (burger) hoặc danh sách link (nav-links)");
    }

    // === 2. LOGIC HIỆU ỨNG KHI CUỘN (SCROLL REVEAL) ===
    const reveals = document.querySelectorAll(".reveal");
    function revealOnScroll() {
        reveals.forEach(item => {
            const windowHeight = window.innerHeight;
            const elementTop = item.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                item.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Gọi 1 lần ngay khi tải trang
});