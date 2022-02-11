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
    const bannerLikesAndPrice = document.querySelector('.bannerLikesAndPrice');
    const carrousel = document.querySelectorAll('photoCarrousel');
  
    //filtrer les données media par rapport a l'id des photographe
    const photographerDataFilter = data.photographers.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerId == photographerDataFilter.id);
    const photographerName = photographerDataFilter.name;

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
    const city = photographerDataFilter.city;
    const country = photographerDataFilter.country;
    const tagline = photographerDataFilter.tagline;
    const image = photographerDataFilter.portrait;
    const urlImage = `../../assets/images/Photographers ID Photos/${image}`;
    descHeader.innerHTML += `<p class="name">${photographerName}</p>`;
    descHeader.innerHTML += `<p class="cityCountry">${city}, ${country}</p>`;
    descHeader.innerHTML += `<p class="tagline">${tagline}</p>`;
    headerImage.innerHTML = `<img src="${urlImage}"></img>`;

    //Banner Total Likes and Price
    let totalLikes = 0;
    photographerMedias.forEach(media => {totalLikes += media.likes;});
    const price = photographerDataFilter.price;
    bannerLikesAndPrice.innerHTML += `<span class="likes">${totalLikes} <i class="fas fa-heart"></i></span>`;
    bannerLikesAndPrice.innerHTML += `<span class="priceBanner">${price}€/jour</span>`;

    displayCard(photographerMedias, template);
    
    
    let likeValue = 0;
    const heart = document.querySelectorAll('.heart');

    photographerMedias.forEach(media => {
      likeValue = media.likes;
      for(let i = 0; i >= likeValue.length; i++){
        likeValue[i];
        console.log(likeValue[i]);
      }
    }) 

    heart.forEach(elt => {
      elt.addEventListener("click", () => {
          const parent= elt.parentNode;
          const likeView = parent.childNodes;
          let testo = likeView[1].textContent;
          const testo1 = parseInt(testo ++);
          console.log(testo);
          console.log(testo1);
          //likeValue ++; 
          likeView[1].innerText = testo1; 
          totalLikes ++;
          //const ttL à document. 
          //console.log(testo1);
        })
  });

} 


photographerData();

/* function Inc(like) {
  const parent= elt.parentNode;
  const likeVal = parent.childNodes;
  like ++; 
  likeVal[1].innerText = like;  
  console.log(like);
} */


function displayCard(medias, template) {
  template.innerHTML = ` `;
  medias.forEach(media => {
    const photographerCard = MediaFactory.render(media);
    template.innerHTML += photographerCard;
}); 
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

function carrousel(media) {
  const right = document.querySelector('.arrowRight');
  const left = document.querySelector('.arrowLeft');
  for(let i=0 ; i <= media  ; i++){
     modalPhoto[i];
     console.log(modalPhoto[i]);
    }
   
}


carrousel();

