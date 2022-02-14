//Mettre le code JavaScript lié à la page photographer.html

async function photographerData() {
    const url = new URLSearchParams(document.location.search);
    const id = url.get('id');
    let response = await fetch('../../data/photographers.json');
    let data = await response.json();
    
    const template = document.querySelector('.template');
    const filterTag = document.querySelector('#filter');
    const descHeader = document.querySelector('.descPhotographer');
    const headerImage = document.querySelector('.imagePhotographer');
    const carrousel = document.querySelectorAll('photoCarrousel');
  
    //filtrer les données media par rapport a l'id des photographe
    const photographer = data.photographers.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerId == photographer.id);
    const photographerName = photographer.name;

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



    //Header photographer Page Elements
    const city = photographer.city;
    const country = photographer.country;
    const tagline = photographer.tagline;
    const image = photographer.portrait;
    const urlImage = `../../assets/images/Photographers ID Photos/${image}`;
    descHeader.innerHTML += `<p class="name">${photographerName}</p>`;
    descHeader.innerHTML += `<p class="cityCountry">${city}, ${country}</p>`;
    descHeader.innerHTML += `<p class="tagline">${tagline}</p>`;
    headerImage.innerHTML = `<img src="${urlImage}"></img>`;

    //Banner Total Likes and Price
    

    displayCard(photographerMedias, template, photographer);
    calculateTotalLikes(photographerMedias, photographer);
    
    let likeValue = 0;
    const heart = document.querySelectorAll('.heart');
    const allLikes = document.querySelector('.likeValue');

} 

photographerData();




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
    })
}); 
}

function calculateTotalLikes(media, photographer) {
  const bannerLikesAndPrice = document.querySelector('.bannerLikesAndPrice');
  let totalLikes = 0;
  media.forEach(medium => {totalLikes += medium.likes;});
  const price = photographer.price;
  bannerLikesAndPrice.innerHTML = `
  <span class="likes"><span class="likeValue">${totalLikes}</span><i class="fas fa-heart"></i></span>
  <span class="priceBanner">${price}€/jour</span>`;
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



function openModalPhoto(picture, title) {  

        document.querySelector('.modalCarrousel').style.display = "inline-grid";

    
        const template = document.querySelector('.photoCarrousel'); 
        const modalPhoto = `
          <div class="photoModal">
            <img src="${picture}" alt="" class="photoContent">
            <span class="modalTitle">${title}</span>
          </div>
        `
        template.innerHTML = modalPhoto;
        return modalPhoto; 
}


function closeModalPhoto() {
      document.querySelector('.modalCarrousel').style.display = "none";
}
 
function leftSlide() {
}
function rightSlide() {
}




