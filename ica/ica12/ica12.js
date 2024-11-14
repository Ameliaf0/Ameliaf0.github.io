const paw = document.querySelector('.paw');
const button = document.querySelector('.get-fact');
let fact = document.querySelector('.catFact');
const api = "https://catfact.ninja/fact"

button.addEventListener('click', getFact);

function getFact(){
    console.log("Hello world")
    fetch(api)
        .then(response => response.json())
        .then(data => {
            fact.textContent = data.fact
            
        })
}