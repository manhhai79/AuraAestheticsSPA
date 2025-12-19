/* --- PHẦN 1: HEADER & SCROLL REVEAL --- */
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger){
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

window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal, .fade-in');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;
        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
            reveals[i].style.opacity = "1";
            reveals[i].style.transform = "translateY(0)";
        }
    }
}
navSlide();


/* --- PHẦN 2: LOGIC POPUP ĐẶT LỊCH --- */

const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close-btn");
// Chọn tất cả các nút có class .btn-fill (Nút Đặt Lịch Ngay)
const bookBtns = document.querySelectorAll("a.btn-fill"); 
const serviceInput = document.getElementById("service");

// Gán sự kiện cho từng nút
bookBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // Chặn chuyển trang (vì thẻ a href đang là # hoặc link contact)
        e.preventDefault(); 
        
        // Hiện Popup
        modal.style.display = "block";

        // TỰ ĐỘNG ĐIỀN TÊN DỊCH VỤ
        // Tìm thẻ cha chứa thông tin dịch vụ để lấy tên (h2)
        const serviceCard = btn.closest(".service-info"); 
        if(serviceCard) {
            const serviceName = serviceCard.querySelector("h2").innerText;
            serviceInput.value = serviceName; 
        } else {
            // Trường hợp bấm nút trên Header hoặc chỗ khác không có tên dịch vụ
            serviceInput.value = "";
        }
    });
});

// Đóng Modal khi ấn X
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Đóng Modal khi click ra ngoài
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// Xử lý nút Gửi
const successModal = document.getElementById("successModal");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");
const bookingForm = document.getElementById("bookingForm");

if(bookingForm){
    bookingForm.addEventListener("submit", (e) => {
        // 1. Ngăn tải lại trang
        e.preventDefault();

        // 2. Ẩn Popup nhập liệu (Booking Modal)
        const bookingModal = document.getElementById("bookingModal");
        if(bookingModal) bookingModal.style.display = "none";

        // 3. Hiện Popup Thành Công (Success Modal)
        if(successModal) successModal.style.display = "block";

        // 4. Xóa dữ liệu cũ trong form
        bookingForm.reset();
    });
}

// Logic đóng Popup Thành Công
if(closeSuccessBtn){
    closeSuccessBtn.addEventListener("click", () => {
        successModal.style.display = "none";
    });
}

// Logic click ra ngoài thì đóng cả 2 loại Popup
window.addEventListener("click", (e) => {
    const bookingModal = document.getElementById("bookingModal");
    
    // Nếu click ra ngoài bookingModal -> Đóng nó
    if (e.target == bookingModal) {
        bookingModal.style.display = "none";
    }
    
    // Nếu click ra ngoài successModal -> Đóng nó
    if (e.target == successModal) {
        successModal.style.display = "none";
    }
});

