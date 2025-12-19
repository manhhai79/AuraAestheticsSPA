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

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    const openBtns = document.querySelectorAll(".open-modal-btn");
    const modalForm = document.querySelector(".modal-form");

    if (openBtns) {
        openBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (modal) {
                    modal.style.display = "block";
                }
            });
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    function showToast() {
        const toast = document.getElementById("consultation-alert");
        if (toast) {
            toast.className = "show";
            setTimeout(function() {
                toast.className = toast.className.replace("show", "");
            }, 3000);
        }
    }

    if (modalForm) {
        modalForm.addEventListener("submit", function(e) {
            e.preventDefault();
            modal.style.display = "none";
            showToast();
            modalForm.reset();
        });
    }

    const toastClose = document.querySelector(".toast-close");
    if (toastClose) {
        toastClose.addEventListener("click", function() {
            const toast = document.getElementById("consultation-alert");
            toast.className = toast.className.replace("show", "");
        });
    }

    // --- LOGIC REVIEW KHÁCH HÀNG (MỚI) ---
    const reviewToast = document.getElementById('review-toast');
    const reviewName = document.getElementById('review-name');
    const reviewText = document.getElementById('review-text');

    const reviews = [
        { name: "Chị Minh Anh", text: "Dịch vụ chăm sóc da rất tốt, nhân viên nhẹ nhàng." },
        { name: "Bạn Thu Thảo", text: "Làm liệu trình Laser xong da sáng hẳn, ưng ý lắm!" },
        { name: "Chị Lan Hương", text: "Không gian sang trọng, mùi tinh dầu rất thư giãn." },
        { name: "Em Ngọc Mai", text: "Đã triệt lông ở nhiều nơi nhưng ở Aura là êm nhất." },
        { name: "Chị Thanh Hằng", text: "Bác sĩ tư vấn có tâm, không chèo kéo mua thêm gói." },
        { name: "Bạn Khánh Vy", text: "Massage body phê quên lối về, sẽ quay lại tuần sau." },
        { name: "Cô Kim Xuân", text: "Nhân viên lễ tân đón tiếp rất chu đáo, nhiệt tình." }
    ];

    function showRandomReview() {
        if (!reviewToast) return;

        const randomReview = reviews[Math.floor(Math.random() * reviews.length)];

        reviewName.innerText = randomReview.name;
        reviewText.innerText = randomReview.text;

        reviewToast.classList.add('show');

        setTimeout(() => {
            reviewToast.classList.remove('show');
        }, 5000); 
    }

    // Hiện lần đầu sau 3 giây
    setTimeout(showRandomReview, 3000);

    // Lặp lại mỗi 15 giây
    setInterval(showRandomReview, 15000); 
});

navSlide();

/* --- LOGIC ĐÓNG MỞ POPUP LIÊN HỆ --- */
function toggleContactPopup() {
    const popup = document.getElementById('contact-popup');
    if (popup) {
        popup.classList.toggle('active');
    } else {
        console.error("Không tìm thấy phần tử contact-popup!");
    }
}