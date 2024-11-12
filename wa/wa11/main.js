const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const fileNames = ["pic1.jpg", "pic2.jpg","pic3.jpg", "pic4.jpg", "pic5.jpg"]

/* Declaring the alternative text for each image file */

const altText = ["Closeup of a human eye", "Closeup of a marble texture", "Closeup of purple flowers", "Egyption hyroglyphs", "Closeup of a butterfly on a leaf"] 

/* Looping through images */

for (let i = 0; i < fileNames.length; i++) {

    const newImage = document.createElement('img');
    newImage.setAttribute('src', fileNames[i]);
    newImage.setAttribute('alt', altText[i]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', function() {
        displayedImage.setAttribute('src', fileNames[i]);
        displayedImage.setAttribute('alt', altText[i]);
    });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', function() {
    let currentClass = btn.getAttribute('class');
    if (currentClass == "dark") {
        btn.setAttribute('class', "light");
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    }
  else {
    btn.setAttribute('class', "dark");
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
 }
});