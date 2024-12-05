//Single line comment
/*This symbol is for adding
multi line comments
for later use
*/

const videoSection = document.querySelector('section')

fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=UU1lmbL4tbFYvSNy7G7SGDfQ&key=AIzaSyCUD45Edy_JEXZODqBQtpblSuNOE8VYfYE')
.then(res => res.json())
.then(data=>{
    videoSection.innerHTML = data.items[0].snippet.title
    console.log(data.items[0]);
})