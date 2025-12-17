const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// document.addEventListener("mousemove", (e) => {
//   const x = (window.innerWidth / 2 - e.clientX) / 25;
//   const y = (window.innerHeight / 2 - e.clientY) / 25;
//   container.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
// });

// document.addEventListener("mouseleave", () => {
//   container.style.transform = `rotateY(0deg) rotateX(0deg)`;
// });