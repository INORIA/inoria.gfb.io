window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        const header = document.querySelector('.main-header');
        header.classList.add('active');
    } else {
        const header = document.querySelector('.main-header');
        header.classList.remove('active');
    }
});