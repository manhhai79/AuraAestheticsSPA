/* ======================================================
   1. HEADER & SCROLL REVEAL (HIỆU ỨNG CUỘN)
   ====================================================== */
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

/* ======================================================
   2. LOGIC POPUP ĐẶT LỊCH (BOOKING)
   ====================================================== */
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close-btn");
const bookBtns = document.querySelectorAll("a.btn-fill"); // Chỉ chọn thẻ a
const serviceInput = document.getElementById("service");
const dateInput = document.getElementById("date");

// --- MỚI: CHẶN CHỌN NGÀY QUÁ KHỨ ---
if (dateInput) {
    // 1. Lấy ngày hôm nay định dạng YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    
    // 2. Gán vào thuộc tính min (chặn chọn trên lịch)
    dateInput.setAttribute("min", today);

    // 3. Kiểm tra thêm khi nhập tay (nếu cố tình nhập sai)
    dateInput.addEventListener("change", function() {
        if (this.value && this.value < today) {
            alert("Ngày đặt lịch không thể ở trong quá khứ. Vui lòng chọn lại!");
            this.value = today; // Reset về hôm nay
        }
    });
}
// ------------------------------------

// Gán sự kiện mở Popup
bookBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";

        // Tự động điền tên dịch vụ
        const serviceCard = btn.closest(".service-info");
        if (serviceCard) {
            const serviceName = serviceCard.querySelector("h2").innerText;
            serviceInput.value = serviceName;
        } else {
            serviceInput.value = "";
        }
    });
});

// Đóng Popup
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

/* ======================================================
   3. XỬ LÝ FORM & POPUP THÀNH CÔNG
   ====================================================== */
const successModal = document.getElementById("successModal");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // --- LOGIC KIỂM TRA NGÀY ---
        if (typeof dateInput !== 'undefined' && dateInput) {
            if (!dateInput.value) {
                alert("Vui lòng chọn ngày dự kiến!");
                dateInput.focus(); return;
            }
            const today = new Date().toISOString().split("T")[0];
            if (dateInput.value < today) {
                alert("Ngày dự kiến không hợp lệ!");
                dateInput.value = today; return;
            }
        }
        // ---------------------------

        // 1. Ẩn Popup nhập liệu
        if (typeof modal !== 'undefined' && modal) modal.style.display = "none";
        else document.getElementById("bookingModal").style.display = "none";

        // 2. Hiện Toast Thành Công góc phải
        if (successModal) {
            successModal.style.display = "block";
            
            // --- MỚI: Tự động tắt sau 5 giây (5000ms) ---
            setTimeout(() => {
                successModal.style.display = "none";
            }, 5000);
        }

        // 3. Xóa dữ liệu cũ
        bookingForm.reset();
    });
}

// Đóng Toast khi ấn nút "Tuyệt vời"
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", () => {
        successModal.style.display = "none";
    });
}

