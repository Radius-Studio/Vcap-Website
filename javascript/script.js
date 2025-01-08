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
            <div>
                <a href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class="yt-video">
                    <img class="yt-video" src="${el.snippet.thumbnails.high.url}" />
                </a>
            </div>`;
        });
    }).catch(err => {
        loader.computedStyleMap.display = 'none';
        console.log(data.items[0]);
        videoSection.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
    });
}