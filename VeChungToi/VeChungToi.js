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

// 3. Counter Animation (Hiệu ứng chạy số)
const counters = document.querySelectorAll('.counter');
const speed = 200; // Tốc độ chạy

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20); // Chạy mượt
            } else {
                counter.innerText = target + "+"; // Thêm dấu + khi xong
            }
        };
        updateCount();
    });
};

// Kích hoạt chạy số khi cuộn đến phần Stats
let hasStarted = false;
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-section');
    if(statsSection) {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if(sectionPos < screenPos && !hasStarted) {
            startCounters();
            hasStarted = true;
        }
    }
});

// 4. Modal & Toast Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-btn");
    const openBtns = document.querySelectorAll(".open-modal-btn");
    const modalForm = document.querySelector(".modal-form");

    if (openBtns) {
        openBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (modal) modal.style.display = "block";
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
            setTimeout(() => {
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
});

navSlide();