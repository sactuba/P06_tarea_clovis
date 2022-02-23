//Mettre le code JavaScript lié à la page photographer.html

async function photographerData() {
    const url = new URLSearchParams(document.location.search);
    const id = url.get('id');
    let response = await fetch('../../data/photographers.json');
    let data = await response.json();
    
    const template = document.querySelector('.template');
    const filterTag = document.querySelector('#filter');

  
    //filtrer les données media par rapport a l'id des photographe
    const photographer = data.photographers.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerId == photographer.id);

    //recuperer les values des option du select
    filterTag.addEventListener("change", function() {
        const value = filterTag.value;

    //filtrer les photo par rapport au value du select
        if(value == "date") {
           const media = photographerMedias.sort((a,b) => {
               return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            });
           displayCard(media, template)
        } else if(value == "title") {
           const media = photographerMedias.sort((a,b) => {
               if(a.title.toLowerCase() < b.title.toLowerCase()) {
                   return -1;
               } else if(a.title.toLowerCase() > b.title.toLowerCase()) {
                   return 1;
               }
            });
           displayCard(media, template)
        } else {
            const media = photographerMedias.sort((a,b) => b.likes > a.likes);
            displayCard(media, template)
        }
    })

    photographerBanner(photographer);
    displayCard(photographerMedias, template, photographer);
    calculateTotalLikes(photographerMedias, photographer);
} 

photographerData();



function photographerBanner(photographer){
  const descHeader = document.querySelector('.descPhotographer');
  const headerImage = document.querySelector('.imagePhotographer');
  const urlImage = `../../assets/images/Photographers ID Photos/${photographer.portrait}`;
  descHeader.innerHTML += `<p class="name">${photographer.name}</p>`;
  descHeader.innerHTML += `<p class="cityCountry">${photographer.city}, ${photographer.country}</p>`;
  descHeader.innerHTML += `<p class="tagline">${photographer.tagline}</p>`;
  headerImage.innerHTML = `<img src="${urlImage}"></img>`;
}


function calculateTotalLikes(media, photographer) {
  const bannerLikesAndPrice = document.querySelector('.bannerLikesAndPrice');
  let totalLikes = 0;
  media.forEach(medium => {totalLikes += medium.likes;});
  const price = photographer.price;
  bannerLikesAndPrice.innerHTML  = `
  <span class="likes"><span class="likeValue">${totalLikes}</span>
  <i class="fas fa-heart"></i></span>
  <span class="priceBanner">${price}€/jour</span>`;
}

function displayCard(medias, template, photographer) {
  template.innerHTML = ` `;
  medias.forEach(media => {
    const photographerCard = MediaFactory.render(media);
    template.innerHTML += photographerCard;
    document.addEventListener("click", function(e) {
      if(e.target.id == `media-likes-${media.id}`){
        const likesMedia = document.getElementById(`media-likes-${media.id}`)
        media.likes += 1;
        likesMedia.innerText = media.likes;
        calculateTotalLikes(medias, photographer);
      }
    });
  })

  let mediaIndex = 0;
  document.querySelector('.fa-angle-left').addEventListener("click", function() {
    mediaIndex--;
    let mediaLength = medias.length;
    const elt = document.querySelector('.photoContent').src;
    for(let i = 0; i <= mediaLength; i++) {  
      if(mediaIndex <= 0 ) {mediaIndex = mediaLength }
      const media = elt.src =  `assets/images/medias/${medias[mediaIndex].video ? medias[mediaIndex].video : medias[mediaIndex].image}`
      const title = medias[mediaIndex].title;  
      previousMedia(media, title);
      console.log(mediaIndex);
    }
  }) 
  
  document.querySelector('.fa-angle-right').addEventListener("click", function() {
    mediaIndex++;
    let mediaLength = medias.length;
    const elt = document.querySelector('.photoContent');
    for(let i = 0; i <= mediaLength; i++) {
      if(mediaIndex >= mediaLength) {mediaIndex = 0}
           const media = elt.src = `assets/images/medias/${medias[mediaIndex].video ? medias[mediaIndex].video : medias[mediaIndex].image}`;
           const title = medias[mediaIndex].title;   
           nextMedia(media, title);
           console.log(mediaIndex);
         }
  }) 
}

function previousMedia(media, title) {  
  createPhotoLighhtbox(media, title);
}

function nextMedia(media, title) {
  createPhotoLighhtbox(media, title);
}

function openModalPhoto(picture, title) {  
  document.querySelector('.lightbox__modal').style.display = "inline-grid";
  createPhotoLighhtbox(picture, title)
} 

function closeModalPhoto() {
  document.querySelector('.lightbox__modal').style.display = "none";
}


function createPhotoLighhtbox(picture, title) {
const template = document.querySelector('.lightbox__container');

if(picture == picture){
const lightboxMedia = `
<div class="lightbox_modal">
<img src="${picture}" alt="" class="photoContent">
<span class="modalTitle">${title}</span>
</div>
`
template.innerHTML = lightboxMedia;
return lightboxMedia;

} else {
const lightboxMedia = `
<div class="lightbox_modal">
<video class="videoContent" src="${picture}" type="video/mp4" controls></video>        
<span class="modalTitle">${title}</span>
</div>
`
template.innerHTML = lightboxMedia;
return lightboxMedia;

}
} 
class ImageFactory {
  static render(media){
    const template = photographerPhotoCard(media);
    const display = template.displayPhotoCard();    
        return display;
  }
}

class VideoFactory {
  static render(media){
    const template = photographerVideoCard(media);
    const display = template.displayVideoCard();
      return display; 
  }
} 

class MediaFactory {
  static render(media){
    if(media.video == undefined) { 
     return ImageFactory.render(media);
    }  else {
      return VideoFactory.render(media);
    }
  }
}


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        //up arrow
    }
    else if (e.keyCode == '40') {
        //down arrow
    }
    else if (e.keyCode == '37') {
       //left arrow
    }
    else if (e.keyCode == '39') {
       //right arrow
    }
  }

/* class Carrousel {
 
      constructor(media, container){
        this.media = media
        this.container = document.querySelector('.lightbox__container');        
        let items = this.createPhotoCarrousel(media);
        this.children = [].slice.call(container.children); 
        container.innerHTML += items;
      }


       createPhotoCarrousel(media) {
        const picture = `assets/images/medias/${media.video ? media.video : media.image}`;
        //const template = document.querySelector('.carrousel__container');

  if(media.video == undefined){
    const carrouselPhoto = `
      <div class="photoModal">
        <img src="${picture}" alt="" class="photoContent">
        <span class="modalTitle">${media.title}</span>
      </div>
    `
    //template.innerHTML += carrouselPhoto;
    return carrouselPhoto;
  } else {
    const carrouselPhoto = `
      <div class="photoModal">
      <video class="videoContent" src="${picture}" type="video/mp4" controls></video>        
      <span class="modalTitle">${media.title}</span>
      </div>
    `
    //template.innerHTML += carrouselPhoto;
    return carrouselPhoto;
}
}
}
 */
