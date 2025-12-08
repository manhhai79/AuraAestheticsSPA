// 1. Chức năng Menu Mobile (Burger)
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links (hiệu ứng từng mục menu hiện ra)
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation (biến thành dấu X)
        burger.classList.toggle('toggle');
    });
}

// 2. Chức năng Scroll Reveal (Cuộn đến đâu hiện đến đó)
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 100;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            // Nếu muốn nó ẩn lại khi cuộn lên thì bỏ comment dòng dưới
            // reveals[i].classList.remove('active'); 
        }
    }
}

// Gọi hàm menu mobile
navSlide();