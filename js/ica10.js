console.log("Hello World")
console.log(document.getElementById("my_head"));
document.getElementById("my_card").addEventListener("click",function(e){
    document.body.style.backgroundColor = "blue"
    document.getElementById("info").innerHTML="Amelia knows how to use CSS, HTML, and Javascript<br>Javascript is <strong>NOT</strong> the same as Java"
})