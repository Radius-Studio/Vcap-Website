const images = document.querySelectorAll('#carousel img');
const dots = document.querySelector('#dots');
const desc = document.querySelector('#desc');

setTimeout(getVideos, 3000);
loadScript('/javascript/scriptRow1.js');
loadScript('/javascript/scriptRow2.js');
loadScript('/javascript/scriptRow3.js');

function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

let speed = 3000;
let index = 0;
let intervalID;

/* img Carousel */
images.forEach((image, i) => {
    const span = document.createElement('span');
    span.className = 'dot';
    if (i === 0) span.classList.add('active');
    span.addEventListener('click', () => {
        index = i;
        startInterval();
        updateContent();
    });
    dots.appendChild(span);
})

startInterval()
function startInterval() {
    if (intervalID) clearInterval(intervalID);
    intervalID = setInterval(() => {
        index++;
        if (index === images.length) index = 0;
        updateContent();
    },speed);
}

updateContent()
function updateContent() {

    images.forEach(item => item.classList.remove('active'));
    images[index].classList.add('active');

    const dots = document.querySelectorAll('.dot');
    dots.forEach(item => item.classList.remove('active'));
    dots[index].classList.add('active');

    desc.textContent = images[index].dataset.desc;

}

/* function and variables for hamburger menu */
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
    if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    } else {
        menu.classList.add("showMenu");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    }
}

hamburger.addEventListener("click", toggleMenu)
closeIcon.style.display = "none";

menuItems.forEach(
    function(menuItem) {
        menuItem.addEventListener("click", toggleMenu);
    }
)
