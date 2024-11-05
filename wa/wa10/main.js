const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let storyText = "It was a brisk 48 degree day in fall near halloween, so :insertx: went for a walk to see the fall colors. As they were walking to :inserty:, they were terrified to see Bob pop out from behind a tree and :insertz: They only weighed 90 pounds and were quickly blown away in the fall breeze.";
const insertX = ["Little Red Riding Hood", "Your mom", "Jesus"];
const insertY = ["The Laughing Goat", "Estes Park", "Campus"]
const insertZ = ["scream really loud.", "throw a worm at them.", "give them a hug and some candy."];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + " stone";
    const temperature =  Math.round((94 - 32) * 5 / 9) + ' centigrade';
    newStory = newStory.replace('48 degree', temperature);
    newStory = newStory.replace('90 pounds', weight);
  }

  
  story.style.visibility = 'visible';


  let xItem = randomValueFromArray(insertX)
  let yItem = randomValueFromArray(insertY)
  let zItem = randomValueFromArray(insertZ)
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);
  textContent = newStory;
  story.textContent = newStory;
}
