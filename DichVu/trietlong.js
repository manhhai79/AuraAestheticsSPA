const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    if(burger){
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) link.style.animation = '';
                else link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
            burger.classList.toggle('toggle');
        });
    }
}
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
window.addEventListener('scroll', reveal);
navSlide();
reveal();

// COUNTDOWN TIMER
const deadline = new Date(Date.parse(new Date()) + 2 * 24 * 60 * 60 * 1000); 
function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    if(!clock) return;
    const daysSpan = clock.querySelector('#days');
    const hoursSpan = clock.querySelector('#hours');
    const minutesSpan = clock.querySelector('#minutes');
    const secondsSpan = clock.querySelector('#seconds');
    function updateClock() {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        daysSpan.innerHTML = days;
        hoursSpan.innerHTML = ('0' + hours).slice(-2);
        minutesSpan.innerHTML = ('0' + minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + seconds).slice(-2);
        if (t <= 0) clearInterval(timeinterval);
    }
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}
initializeClock('countdown', deadline);

// SLIDER BEFORE/AFTER
const sliderRange = document.getElementById('sliderRange');
const imgBeforeWrapper = document.querySelector('.img-before-wrapper');
const sliderBtn = document.getElementById('sliderBtn');
if(sliderRange) {
    sliderRange.addEventListener('input', function() {
        imgBeforeWrapper.style.width = this.value + "%";
        sliderBtn.style.left = this.value + "%";
    });
}

// TABS
const tabs = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-pane');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// FAQ ACCORDION
document.querySelectorAll('.accordion-header').forEach(acc => {
    acc.addEventListener('click', function() {
        const item = this.parentElement;
        item.classList.toggle('active');
        const body = item.querySelector('.accordion-body');
        if(item.classList.contains('active')){
            body.style.maxHeight = body.scrollHeight + "px";
        } else {
            body.style.maxHeight = null;
        }
    });
});

// MODAL
const modal = document.getElementById('bookingModal');
const serviceSelect = document.getElementById('serviceSelect');
document.querySelectorAll('.trigger-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const sv = btn.getAttribute('data-service');
        if(sv && serviceSelect) serviceSelect.value = sv;
        modal.classList.add('show');
    });
});
document.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('show'));
window.addEventListener('click', (e) => { if(e.target == modal) modal.classList.remove('show'); });

// TOAST NOTIFICATION
const names = ["Chị Lan", "Bạn Hương", "Chị Mai", "Em Trang"];
const services = ["Nách", "Bikini", "Full Body"];
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
function showToast() {
    if(!toast) return;
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomService = services[Math.floor(Math.random() * services.length)];
    toastMsg.innerText = `${randomName} vừa đăng ký gói ${randomService}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}
setInterval(showToast, 12000);

// BACK TO TOP
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});
if(backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}