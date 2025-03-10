const videoSection = document.querySelector('.yt-video-section');
const loader = document.querySelector('.loader-box');

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

/* In the fetch link change array result value max result to add more videos*/
function getVideos() {
fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=UU1lmbL4tbFYvSNy7G7SGDfQ&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'
)
    .then((res) => res.json())
    .then((data)=>{
        loader.style.display = 'none';
        data.items.forEach((el) => {
            console.log(el);
        });
        data.items.forEach((el) => {
            videoSection.innerHTML += `
            <iframe 
                class="yt-video"
                src="https://www.youtube.com/embed/${el.snippet.resourceId.videoId}?si=qGL4rse50XIP-aF3&autoplay=0&controls=1&iv_load_policy=3&rel=0" alt="${el.snippet.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
            `;
        });
    }).catch(err => {
        loader.style.display = 'none';
        console.log(err);
        videoSection.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
    });
}

const searchForm = document.getElementById('youtube-search');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  let searchQuery = document.getElementById('search-input').value;
  let youtubeUrl = `https://www.youtube.com/@DrexelUniversityVCaP/search?query=${searchQuery}`;
  window.location.href = youtubeUrl;
});
