const fortune = document.querySelector('.fortune');
const age = document.querySelector('.age');
const number = document.querySelector('.number');


function tellFortune(children, partnerName, location, job){
    let original = "You will be a :X: in :Y:, and married to :Z: with :N: kids.";
    let result = original;
    result = result.replace(':X:', job);
    result = result.replace(':Y:', location);
    result = result.replace(':Z:', partnerName);
    result = result.replace(':N:', children);
    fortune.textContent = result;

}

tellFortune(10,"John", "Boulder", "Scientist");
tellFortune(0,"Katie", "Paris", "Opera singer");
tellFortune(2,"Steve", "LA", "Graphic designer");

function calculateDogAge(pupAge){
    let original = "Your doggie is :NN: years old in dog years!";
    let result = original;
    result = result.replace(':NN:', pupAge * 7);
    age.textContent = result;
}

calculateDogAge(5)

function reverseNumber(num){
    let string = num.toString().split('').reverse().join('');
    number.textContent = string;
}

reverseNumber(52830)
reverseNumber(758392033847277)
reverseNumber(03851015)