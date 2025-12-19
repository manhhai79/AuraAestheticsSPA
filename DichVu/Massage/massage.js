/* --- PHẦN 1: LOGIC HEADER & SCROLL (GIỮ NGUYÊN) --- */
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


/* --- PHẦN 2: LOGIC POPUP (MỚI THÊM) --- */

// Lấy các element
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close-btn");
// Lấy tất cả nút "Đặt Lịch Ngay" trong trang
const bookBtns = document.querySelectorAll("a.btn-fill"); 
const serviceInput = document.getElementById("service");

// Gán sự kiện click cho từng nút Đặt Lịch
bookBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // Ngăn chặn hành động chuyển trang mặc định của thẻ <a>
        e.preventDefault(); 
        
        // Mở Modal
        modal.style.display = "block";

        // TÍNH NĂNG TỰ ĐIỀN TÊN DỊCH VỤ
        // Tìm thẻ h2 nằm cùng khối cha với nút được nhấn để lấy tên dịch vụ
        const serviceCard = btn.closest(".service-info"); 
        if(serviceCard) {
            const serviceName = serviceCard.querySelector("h2").innerText;
            serviceInput.value = serviceName; // Điền vào ô input
        } else {
            // Nếu bấm nút trên Header thì để trống hoặc điền mặc định
            serviceInput.value = "";
        }
    });
});

// Sự kiện tắt Modal khi ấn dấu X
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Sự kiện tắt Modal khi click ra ngoài vùng trắng
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// Xử lý khi ấn Gửi
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

/* =========================================
   LOGIC REVIEW & NÚT GỌI NỔI (MỚI)
   ========================================= */

// 1. Tắt/Bật Popup Liên Hệ
function toggleContactPopup() {
    const popup = document.getElementById('contact-popup');
    if (popup) {
        popup.classList.toggle('active');
    }
}

// 2. Logic hiện Review ngẫu nhiên
document.addEventListener("DOMContentLoaded", () => {
    const reviewToast = document.getElementById('review-toast');
    const reviewName = document.getElementById('review-name');
    const reviewText = document.getElementById('review-text');

    // Danh sách review (Bạn có thể sửa lại cho phù hợp từng trang nếu thích)
    const reviews = [
        { name: "Chị Minh Anh", text: "Dịch vụ rất tốt, nhân viên nhẹ nhàng." },
        { name: "Bạn Thu Thảo", text: "Làm xong thấy thư giãn hẳn, sẽ quay lại!" },
        { name: "Chị Lan Hương", text: "Không gian sang trọng, mùi tinh dầu rất thơm." },
        { name: "Em Ngọc Mai", text: "Tư vấn nhiệt tình, không chèo kéo." },
        { name: "Bạn Khánh Vy", text: "Tay nghề kỹ thuật viên rất đồng đều." }
    ];

    function showRandomReview() {
        if (!reviewToast) return;

        // Chọn ngẫu nhiên 1 review
        const randomReview = reviews[Math.floor(Math.random() * reviews.length)];

        // Gán nội dung
        reviewName.innerText = randomReview.name;
        reviewText.innerText = randomReview.text;

        // Hiện lên
        reviewToast.classList.add('show');

        // Ẩn đi sau 5 giây
        setTimeout(() => {
            reviewToast.classList.remove('show');
        }, 5000); 
    }

    // Hiện lần đầu sau 3 giây
    setTimeout(showRandomReview, 3000);

    // Lặp lại mỗi 15 giây
    setInterval(showRandomReview, 15000); 
});