document.getElementById('new-comic-btn').addEventListener('click', fetchComic);

function fetchComic() {
    const comicNumber = Math.floor(Math.random() * 3000) + 1;
    const url = `https://corsproxy.io/?https://xkcd.com/${comicNumber}/info.0.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('comic-title').innerText = data.title;
            document.getElementById('comic-img').src = data.img;
            document.getElementById('comic-img').alt = data.alt;
            document.getElementById('comic-alt').innerText = data.alt;
            document.getElementById('comic-date').innerText = `Published on: ${data.year}-${data.month}-${data.day}`;
        })
        .catch(error => console.error('Error fetching comic:', error));
}