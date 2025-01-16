const videoSection = document.querySelector('.wrapper');
const loader = document.querySelector('.loader-box');

setTimeout(getElements, 3000);

/* In the fetch link change array result value max result to add more videos*/
function getElements() {
fetch('')
    .then((res) => res.json())
    .then((data)=>{
        loader.style.display = 'none';
        data.items.forEach((el) => {
            console.log(el);
        });
    }).catch(err => {
        loader.style.display = 'none';
        console.log(err);
        videoSection.innerHTML = '<h3>Sorry somthing went wrong, try again later</h3>'
    });
}