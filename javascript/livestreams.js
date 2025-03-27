setTimeout(fetchLivestreamData, 3000);
setTimeout(getVideos, 3000);
const videoSection = document.querySelector('.yt-video-section');

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

const searchForm = document.getElementById('youtube-search');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  let searchQuery = document.getElementById('search-input').value;
  let youtubeUrl = `https://www.youtube.com/@DrexelUniversityVCaP/search?query=${searchQuery}`;
  window.location.href = youtubeUrl;
});

function getVideos() {
    fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=UU1lmbL4tbFYvSNy7G7SGDfQ&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'
    )
        .then((res) => res.json())
        .then((data)=>{
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
            console.log(err);
            videoSection.innerHTML = ""
            videoSection.innerHTML = "<h1>This function is not working</h1>"
        });
    }
    

const API_KEY = 'AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'; 
const CHANNEL_ID = 'UC1lmbL4tbFYvSNy7G7SGDfQ';   

async function fetchLivestreamData() {
    
    const liveResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`);
    const liveData = await liveResponse.json();
    const livestream = liveData.items[0]; 

    const livestreamContainer = document.querySelector('.livestream');
    const playlistContainer = document.querySelector('.yt-video-section');

    if (livestream) {
        const liveVideoId = livestream.id.videoId;
        const liveVideoTitle = livestream.snippet.title;

        const liveStreamHTML = `
            <iframe class="yt-live" src="https://www.youtube.com/embed/${liveVideoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `;
        livestreamContainer.innerHTML = liveStreamHTML;
    } else {
  
        livestreamContainer.innerHTML = `
            <h2>There is no active livestream on the VCAP Channel<br>If you would like to view past livestreams, please click the livestreams button below</h2> 
        `;
    }
}

