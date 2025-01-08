const videoSection = document.querySelector(".yt-video-section");
const loader = document.querySelector('.loader-box')


setTimeout(getVideos, 3000)

/* In the fetch link change array result value max result to add more videos*/
function getVideos() {
fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=UU1lmbL4tbFYvSNy7G7SGDfQ&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'
)
    .then(res => res.json())
    .then(data=>{
        loader.style.display = 'none';
        data.items.forEach(el => {
            videoSection.innerHTML += `
            <iframe class="yt-video"
            src="https://www.youtube.com/embed/${el.snippet.resourceId.videoId}?si=AZ53OHttNtNd5_1p" alt=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
            `;
        });
    }).catch(err => {
        loader.computedStyleMap.display = 'none';
        console.log(data.items[0]);
        videoSection.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
    });
}