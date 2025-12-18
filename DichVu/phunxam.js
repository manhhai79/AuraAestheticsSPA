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
