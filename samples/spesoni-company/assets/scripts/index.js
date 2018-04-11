window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        const header = document.querySelector('.main-header');
        header.classList.add('active');
    } else {
        const header = document.querySelector('.main-header');
        header.classList.remove('active');
    }
});

// fix parcel related problems

[...document.querySelectorAll('.circle')].forEach(svg => {
	svg.setAttribute('viewBox', '0 0 200 200');
});

[...document.querySelectorAll('.circle-inside')].forEach(svg => {
	svg.setAttribute('viewBox', '0 0 150 150');
});