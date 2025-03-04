const videoSection2 = document.querySelector('.yt-video-section2');
const loader2 = document.querySelector('.loader-box')
const sectionTitle2 = document.querySelector('.section-title2')

setTimeout(getVideos, 3000)

setTimeout(getPlaylists, 3000)

/* In the fetch link change array result value max result to add more videos*/
function getPlaylists() {
fetch('https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails%2C%20snippet&channelId=UC1lmbL4tbFYvSNy7G7SGDfQ&maxResults=31&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'
)
    // playlist title display:
    .then((res)=> res.json())
    .then((data) =>{
    const el = data.items[25];
    data.items.forEach((el) => {
        console.log(el);
    });
        sectionTitle2.innerHTML += `
            <h3 class="section-title2">${el.snippet.title}</h3>
        `;
    })
}

/* In the fetch link change array result value max result to add more videos*/
function getVideos() {
fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=PLkDOe-nIprdPOweXm94bEMCp2OC2jlADQ&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'
)
    .then((res) => res.json())
    .then((data)=>{
        /* Shift to skip videos which do not have maxresthumbnails, if you do this add 6 videos to account for removed content*/
        data.items.shift(); 
        loader2.style.display = 'none';
        data.items.forEach((el) => {
            console.log(el);
        });
        data.items.forEach((el) => {
            videoSection2.innerHTML += `
            <iframe 
                class="yt-video1"
                src="https://www.youtube.com/embed/${el.snippet.resourceId.videoId}?si=qGL4rse50XIP-aF3&autoplay=0&controls=1&iv_load_policy=3&rel=0" alt="${el.snippet.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
            `;
        });
    }).catch(err => {
        loader2.style.display = 'none';
        console.log(err);
        videoSection2.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
    });
}