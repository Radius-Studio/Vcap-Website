setTimeout(fetchLivestreamData, 3000);
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
    

const API_KEY = 'AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'; // Replace with your YouTube API key
const CHANNEL_ID = 'UC1lmbL4tbFYvSNy7G7SGDfQ';   // Replace with your channel ID

async function fetchLivestreamData() {
    // 1. Check if the channel is live
    const liveResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`);
    const liveData = await liveResponse.json();
    const livestream = liveData.items[0]; // Get the first live video from the response

    const livestreamContainer = document.querySelector('.livestream');
    const playlistContainer = document.querySelector('.yt-video-section');

    if (livestream) {
        // If live stream is found
        const liveVideoId = livestream.id.videoId;
        const liveVideoTitle = livestream.snippet.title;
        const liveVideoDescription = livestream.snippet.description;

        const liveStreamHTML = `
            <h3>Current Livestream: ${liveVideoTitle}</h3>
            <p>${liveVideoDescription}</p>
            <iframe class="yt-video" width="560" height="315" src="https://www.youtube.com/embed/${liveVideoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `;
        livestreamContainer.innerHTML = liveStreamHTML;

        // Fetch past livestreams from the playlist
        fetchPastLivestreams();
    } else {
        // If no live video is found
        livestreamContainer.innerHTML = `
            <p>There is no livestream happening right now, please check out our most recent livestreams below.</p>
        `;
        getVideos();
    }
}

