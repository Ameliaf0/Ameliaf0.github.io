let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const paragraphs = document.querySelectorAll('.carousel p');
const totalItems = images.length;

function showNextImage() {
    images[currentIndex].classList.remove('active');
    paragraphs[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalItems;
    images[currentIndex].classList.add('active');
    paragraphs[currentIndex].classList.add('active');
}

document.querySelector('.carousel').addEventListener('click', showNextImage);