const videoSection = document.querySelector('.yt-video-section');
const loader = document.querySelector('.loader-box')


setTimeout(getVideos, 3000)

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
<<<<<<< HEAD
            <iframe class="yt-video"
            src="https://www.youtube.com/embed/${el.snippet.resourceId.videoId}?si=AZ53OHttNtNd5_1p" alt=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
            `;
=======
            <div>
                <a href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class="yt-video">
                    <img class="yt-video" src="https://i.ytimg.com/vi/${el.snippet.resourceId.videoId}/maxresdefault.jpg" />
                </a>
            </div>`;
>>>>>>> 2a4c86674e87bdd71a314e1de8b6d9f2fc225d3b
        });
    }).catch(err => {
        loader.style.display = 'none';
        console.log(err);
        videoSection.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
    });
}