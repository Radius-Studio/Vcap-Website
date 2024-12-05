//Single line comment
/*This symbol is for adding
multi line comments
for later use
*/

const videoSection = document.querySelector('section')

fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=UU1lmbL4tbFYvSNy7G7SGDfQ&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE')
.then(res => res.json())
.then(data=>{
    data.items.forEach(el => {
        videoSection.innerHTML +=
        <a href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class="yt-video">
            <img src="${el.snippet.thumbnails.maxres}"/>
            <h3>${el.snippet.title}</h3>
        </a>
    });
    console.log(data.items[0]);
})