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

//genera il tag img all'interno dello slider; ne genera solo 1 e successivamente, per mostrare le varie immagini
//verrà sostituito il valore di src
slider.innerHTML += `
  <img id="slider-img" src="" alt="">
`;

//genera tutte le thumbnails e le inserisce nell'html
createThumnailImgTagsByUrl(images, "thumbnail-item");

const next = el('.btn-chevron.right');
const prev = el('.btn-chevron.left');
const thumbnailItems = document.getElementsByClassName ('thumbnail-item');

//inizializza il contatore a 0, mostra la prima immagine e evidenzia la prima thumbnail
let counterImages=0;
imageSlider(images[counterImages]);
thumbnailItems[counterImages].classList.add('active');

let autoplay;
let directionAutoplay= true;

//fa partire l'autoplay
setAutoplay();
let playing = true;

//al click cambia immagine
next.addEventListener('click', nextImage);
prev.addEventListener('click', prevImage);

//al clik inverte l'ordine di scorrimento
document.getElementById("reverse").addEventListener('click', reverse);
//al clik interrompe o fa partire l'autoplay
document.getElementById("play-pause").addEventListener('click', playPause);

/**************************************************
          FUNCTIONS      
**************************************************/

/**
 * Esegue la funzione nextImage a ogni intervallo
 */
function setAutoplay() {
  autoplay = setInterval(nextImage, 1000);
}

/**
 * Esegue la funzione prevImage a ogni intervallo
 */
function setAutoplayReverse() {
  autoplay = setInterval(prevImage, 1000);
}

/**
 * Interrompe l'autoplay
 */
function clearAutoplay() {
  clearInterval(autoplay);
}

/**
 * Genera i tag img partendo da un array e dal nome della classe
 * @param {*} array Array (contiene tutti gli oggetti per cui bisogna creare il tag img)
 * @param {*} className String (nome della classe)
 * @returns String (tutti i tag che sono stati generati)
 */
function createThumnailImgTagsByUrl (array, className){
  let i=0;
  for (let image of array) {
    thumbnails.append(createImg(image, i));
    i++;
  }
}

/**
 * Mostra l'immagine dell'oggetto image sullo slider
 * @param {*} image Oggetto immagine (immagine che deve essere mostrata dallo slider)
 */
function imageSlider(image){
  document.getElementById("slider-img").src=image.url;
  document.getElementById("country-name").innerText=image.country;
  document.getElementById("description").innerText=image.description;
}

/**
 * Mostra l'immagine successiva
 */
function nextImage() {
  thumbnailItems[counterImages].classList.remove('active');
  if(counterImages === (images.length - 1)) {
    counterImages=0;
    imageSlider(images[counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  } else {
    imageSlider(images[++counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  }
}

/**
 * Mostra l'immagine precedente
 */
function prevImage() {
  thumbnailItems[counterImages].classList.remove('active');
  if(counterImages === 0) {
    counterImages=images.length - 1;
    imageSlider(images[counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  } else {
    imageSlider(images[--counterImages]);
    thumbnailItems[counterImages].classList.add('active');
  }
}

/**
 * Inverte l'ordine di scorrimento
 */
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

/**
 * Fa partire l'autoplay o lo ferma in base al contenuto di playing:
 * - se il valore di playing è true vuol dire che lo scorrimento automatico è in esecuzione, quindi lo ferma e mostra la nuova scritta all'interno del bottone;
 * - se il valore di playing è false vuol dire che lo scorrimento automatico non è in esecuzione, quindi lo fa partire e mostra la nuova scritta all'interno del bottone;
 */
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

/**
 * Al click sulla thumbnail viene cambiata l'immagine mostrata
 * @param {*} event 
 */
function clickThumbnail(event) {
  thumbnailItems[counterImages].classList.remove('active');
  
  counterImages = this.idElement;
  imageSlider(images[counterImages]);
  thumbnailItems[counterImages].classList.add('active');
}

/**
 * Genera un elemento img
 * @param {*} image Oggetto immagine (oggetto da cui prende tutte le informazioni per creare l'oggetto)
 * @param {*} id Intero (numero intero che corrispondera al valore dell'id)
 * @returns 
 */
function createImg(image, id) {
  const imageTag = document.createElement('img');
  imageTag.className = "thumbnail-item";
  imageTag.src = image.url;
  imageTag.idElement = id;
  imageTag.addEventListener('click', clickThumbnail)
  return imageTag;
}