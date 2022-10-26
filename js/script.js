const images=[
  {
    country: "Svezia",
    url:"http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg",
    description: "Lorem ipsum dolor sit amet cons magni!"
  },
  {
    country: "Perù",
    url:"https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg",
    description: "Lorem ipsum dolor sit amearum maiores ipsum! Fuga enim fugit natuendis quo excepturi adipisci possimus exercitationem, tenetur sequi corporis magni!"
  },
  {
      country: "Chile",
      url:"https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c",
      description: "Lorem ipsum dolor sit amet consectetur, adifiat, perferendis quo excepturi adipisci possimus exercitationem, tenetur sequi corporis magni!"
  },
  {
    country: "Argentina",
    url:"https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg",
    description: "Lorem  adipisci possimus exercitationem, tenetur sequi corporis magni!"
  },
  {
    country: "Colombia",
    url:"https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop",
    description: "Lorem ipsum dolor"
  }
];

const el = document.querySelector.bind(document);

const slider = el('.slider');
const thumbnails = el('.thumbnails');
const container = el('.container');

slider.innerHTML += `
  <img id="slider-img" src="" alt="">
`;

thumbnails.innerHTML += createImgTagsByUrl (images, "thumbnail-item");

const next = el('.btn-chevron.right');
const prev = el('.btn-chevron.left');

const thumbnailItems = document.getElementsByClassName ('thumbnail-item');

let counterImages=0;
imageSlider(images[counterImages]);
thumbnailItems[counterImages].classList.add('active');

let autoplay;
let directionAutoplay= true;
setAutoplay();
let playing = true;
next.addEventListener('click', nextImage);

prev.addEventListener('click', prevImage);

document.getElementById("reverse").addEventListener('click', reverse);
document.getElementById("play-pause").addEventListener('click', playPause);


function setAutoplay() {
  autoplay = setInterval(nextImage, 1000);
}

function setAutoplayReverse() {
  autoplay = setInterval(prevImage, 1000);
}

function clearAutoplay() {
  clearInterval(autoplay);
}

function createImgTagsByUrl (array, className){
  let tags="";
  for (let image of array) {
    tags += `
    <img class="${className}" src="${image.url}" alt="${image.country}">
    `;
  }
  return tags;
}

function imageSlider(image){
  document.getElementById("slider-img").src=image.url;
  document.getElementById("country-name").innerText=image.country;
  document.getElementById("description").innerText=image.description;
}

function nextImage() {
  thumbnailItems[counterImages].classList.remove('active');
  //mostra l'immagine successiva
  if(counterImages === (images.length - 1)) {
    counterImages=0;
    imageSlider(images[counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  } else {
    imageSlider(images[++counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  }
}

function prevImage() {
  thumbnailItems[counterImages].classList.remove('active');
  //mostra l'immagine precedente
  if(counterImages === 0) {
    counterImages=images.length - 1;
    imageSlider(images[counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  } else {
    imageSlider(images[--counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  }
}

function reverse() {
  clearAutoplay();
  if(directionAutoplay) {
    setAutoplayReverse();
    directionAutoplay = false;
  } else {
    setAutoplay();
    directionAutoplay = true;
  }
}

function playPause() {
  if(playing) {
    clearAutoplay();
    document.getElementById("play-pause").innerText ="Riprendi lo scorrimento automatico";
    playing = false;
  } else {
    setAutoplay();
    document.getElementById("play-pause").innerText ="Interrompi lo scorrimento";
    playing = true;
  }
}