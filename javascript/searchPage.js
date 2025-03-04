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

function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

const searchPlacement = document.getElementById("search-placement");

const URLParams = new URLSearchParams(window.location.search);
const searchTerm = URLParams.get('searchTerm');
getVideos(searchTerm);

function getVideos(term) {
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC1lmbL4tbFYvSNy7G7SGDfQ&q=${term}&type=video&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE`
    )
        .then((res) => res.json())
        .then((data)=>{
            data.items.forEach((el) => {
                searchPlacement.innerHTML += `
                <iframe 
                    class="yt-video"
                    src="https://www.youtube.com/embed/${el.id.videoId}?si=qGL4rse50XIP-aF3&autoplay=0&controls=1&iv_load_policy=3&rel=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
                `;
            });
       
        }).catch(err => {
            console.log(err);
            searchPlacement.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
        });
    }
