var button = document.querySelector("input[type=submit]");
var position = document.querySelector("#position");
var phone = document.querySelector("#phone");
var gmail = document.querySelector("#gmail");
var facebook = document.querySelector("#facebook");
var linked = document.querySelector("#linked");


button.addEventListener("click", (event) => {
    event.preventDefault();
    var firstname = document.querySelector("#fname").value;
    var lastname = document.querySelector("#lname").value;
    var companyName = document.querySelector("#cName").value;
    var email = document.querySelector("#mail").value;
    var extra = document.querySelector("#extra").value;
    
    alert(`Förnamn: ${firstname}\nEfternamn: ${lastname}\nFöretag: ${companyName}\nEmail: ${email}\nÖvrigt: ${extra}`);
});

position.addEventListener("click", () => {
    window.open("https://www.google.com/maps/place/Magnusv%C3%A4gen+6A,+177+31+J%C3%A4rf%C3%A4lla/@59.4242294,17.8395928,17z/data=!3m1!4b1!4m5!3m4!1s0x465f9f61f791cbf9:0x9744fddc6db522b3!8m2!3d59.4242294!4d17.8417815");
});

phone.addEventListener("click", () => {
    window.open("https://www.google.com/search?q=0723888755&ie=utf-8&oe=utf-8&client=firefox-b");
});

gmail.addEventListener("click", () => {
    window.open("https://www.gmail.com");
});

facebook.addEventListener("click", () => {
    window.open("https://www.facebook.com");
});

linked.addEventListener("click", () => {
    window.open("https://se.linkedin.com/")
})