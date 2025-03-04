const searchPlacement = document.quereySelector(".search-placement");

function search(searchTerm) {
    const searchTerm = document.getElementById("userSearch").value;
    if (variable === "" || variable === null || variable === undefined) {
        window.open('http://127.0.0.1:3002/HTML/search.html');
    } else {
        window.open('http://127.0.0.1:3002/HTML/search.html');
        getVideos(searchTerm);
    }
}

function getVideos(term) {
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC1lmbL4tbFYvSNy7G7SGDfQ&q=${term}&type=video&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE`
    )
        .then((res) => res.json())
        .then((data)=>{
            loader.style.display = 'none';
            data.items.forEach((el) => {
                console.log(el);
            });
            data.items.forEach((el) => {
                searchPlacement.innerHTML += `
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
            searchPlacement.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
        });
    }
