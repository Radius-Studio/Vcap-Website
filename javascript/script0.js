const videoSection0 = document.querySelector('.yt-video-section0');
const loader0 = document.querySelector('.loader-box')
const sectionTitle = document.querySelector('.section-title')

setTimeout(getVideos, 3000)

setTimeout(getPlaylists, 3000)

/* In the fetch link change array result value max result to add more videos*/
function getPlaylists() {
fetch('https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails%2C%20snippet&channelId=UC1lmbL4tbFYvSNy7G7SGDfQ&maxResults=8&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'
)
    // playlist title display:
    .then((res)=> res.json())
    .then((data) =>{
    const el = data.items[3];
    data.items.forEach((el) => {
        console.log(el);
    });
        sectionTitle.innerHTML += `
            <h3 class="section-title">${el.snippet.title}</h3>
        `;
    })
}

function getVideos() {
fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=PLkDOe-nIprdOrsCglIvClWWrx6EHN94FO&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE'
)
    .then((res) => res.json())
    .then((data)=>{
        loader0.style.display = 'none';

        data.items.forEach((el) => {
            console.log(el);
        });
        data.items.forEach((el) => {
            videoSection0.innerHTML += `
            <iframe 
                class="yt-video0"
                src="https://www.youtube.com/embed/${el.snippet.resourceId.videoId}?si=qGL4rse50XIP-aF3&autoplay=0&controls=1&iv_load_policy=3&rel=0" alt="${el.snippet.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
            `;
        });

    }).catch(err => {
        loader0.style.display = 'none';
        console.log(err);
        videoSection0.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
    });
}