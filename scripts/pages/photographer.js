//Mettre le code JavaScript lié à la page photographer.html

async function photographerData() {
  const url = new URLSearchParams(document.location.search);
  const id = url.get("id");
  let response = await fetch("../../data/photographers.json");
  let data = await response.json();

  const template = document.querySelector(".template");
  const filterTag = document.querySelector("#filter");

  //filtrer les données media par rapport a l'id des photographe
  const photographer = data.photographers.filter(
    (photographer) => photographer.id == id
  )[0];
  const photographerMedias = data.media.filter(
    (media) => media.photographerId == photographer.id
  );

  //recuperer les values des option du select
  filterTag.addEventListener("change", function () {
    const value = filterTag.value;

    //filtrer les photo par rapport au value du select
    if (value == "date") {
      const media = photographerMedias.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
      });
      displayCard(media, template);
    } else if (value == "title") {
      const media = photographerMedias.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
      });
      displayCard(media, template);
    } else {
      const media = photographerMedias.sort((a, b) => b.likes > a.likes);
      displayCard(media, template);
    }
  });

  photographerBanner(photographer);
  displayCard(photographerMedias, template, photographer);
  calculateTotalLikes(photographerMedias, photographer);
}

photographerData();

//Bannniere du photographe de la page photographer.html
function photographerBanner(photographer) {
  const descHeader = document.querySelector(".descPhotographer");
  const headerImage = document.querySelector(".imagePhotographer");
  const urlImage = `../../assets/images/Photographers ID Photos/${photographer.portrait}`;
  descHeader.innerHTML += `<h1 class="name" tabindex="0">${photographer.name}</h1>`;
  descHeader.innerHTML += `<h2 class="cityCountry" tabindex="0">${photographer.city}, ${photographer.country}</h2>`;
  descHeader.innerHTML += `<p class="tagline" tabindex="0">${photographer.tagline}</p>`;
  headerImage.innerHTML = `<img src="${urlImage}" alt="${photographer.name}" tabindex="0"></img>`;
}

//Fonction d'incrementation du total de likes
function calculateTotalLikes(media, photographer) {
  const bannerLikesAndPrice = document.querySelector(".bannerLikesAndPrice");
  let totalLikes = 0;
  media.forEach((medium) => {
    totalLikes += medium.likes;
  });
  const price = photographer.price;
  bannerLikesAndPrice.innerHTML = `
  <span class="likes"><span class="likeValue" tabindex="0">${totalLikes}</span>
  <i class="fas fa-heart"></i></span>
  <span class="priceBanner" tabindex="0">${price}€/jour</span>`;
}

//Fonction pour afficher les photos et incrementer les likes par photo
function displayCard(medias, template, photographer) {
  template.innerHTML = ` `;
  medias.forEach((media) => {
    const photographerCard = MediaFactory.render(media);
    template.innerHTML += photographerCard;
    document.addEventListener("click", function (e) {
      if (e.target.id == `media-likes-${media.id}`) {
        const likesMedia = document.getElementById(`media-likes-${media.id}`);
        media.likes += 1;
        likesMedia.innerText = media.likes;
        calculateTotalLikes(medias, photographer);
      }
    });
    document.addEventListener("keypress", function (e) {
      if (e.target.id == `media-likes-${media.id}`) {
        const likesMedia = document.getElementById(`media-likes-${media.id}`);
        media.likes += 1;
        likesMedia.innerText = media.likes;
        calculateTotalLikes(medias, photographer);
      }
    });
  });

  //Fonction pour les element de la lightbox

  let mediaIndex = 0;

  //Fonction pour afficher la prochaine photos dans la lightbox
  document
    .querySelector(".fa-angle-left")
    .addEventListener("click", function () {
      showNextMedia();
    });

  function showNextMedia() {
    mediaIndex--;
    let mediaLength = medias.length;
    for (let i = 0; i <= mediaLength; i++) {
      if (mediaIndex < 0) {
        mediaIndex = mediaLength - 1;
      }
      const media = `assets/images/medias/${
        medias[mediaIndex].video
          ? medias[mediaIndex].video
          : medias[mediaIndex].image
      }`;
      const title = medias[mediaIndex].title;
      createPhotoLighhtbox(media, title);
    }
  }

  //Fonction pour afficher la precedente photos dans la lightbox

  document
    .querySelector(".fa-angle-right")
    .addEventListener("click", function () {
      showPreviousMedia();
    });

  function showPreviousMedia() {
    mediaIndex++;
    let mediaLength = medias.length;
    for (let i = 0; i <= mediaLength; i++) {
      if (mediaIndex >= mediaLength) {
        mediaIndex = 0;
      }
      const media = `assets/images/medias/${
        medias[mediaIndex].video
          ? medias[mediaIndex].video
          : medias[mediaIndex].image
      }`;
      const title = medias[mediaIndex].title;
      createPhotoLighhtbox(media, title);
    }
  }

  //Fonction pour piloter la lightbox avec les fleches
  document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == "37") {
      showPreviousMedia();
    }
    if (e.keyCode == "39") {
      showNextMedia();
    }
    if (e.keyCode == "27") {
      closeModalPhoto() || closeModal();
    }
  };
}

//Fonction pour ouvrir la lightbox
function openModalPhoto(picture, title) {
  document.querySelector(".lightbox__modal").style.display = "inline-grid";
  createPhotoLighhtbox(picture, title);
}

//Fonction pour fermer la lightbox
function closeModalPhoto() {
  document.querySelector(".lightbox__modal").style.display = "none";
}

//Fonction pour afficher les photos dans la lightbox
function createPhotoLighhtbox(picture, title) {
  const template = document.querySelector(".lightbox__container");
  const extension = picture.split(".").pop();
  if (extension == "jpg") {
    const lightboxMedia = `
       <div class="lightbox_modal">
       <img src="${picture}" alt="" class="photoContent">
       <span class="modalTitle">${title}</span>
       </div>
       `;
    template.innerHTML = lightboxMedia;
    return lightboxMedia;
  } else {
    const lightboxMedia = `
      <div class="lightbox_modal">
      <video class="videoContent" src="${picture}" type="video/mp4" controls></video>        
      <span class="modalTitle">${title}</span>
      </div>
      `;
    template.innerHTML = lightboxMedia;
    return lightboxMedia;
  }
}

//factory pour trier les card selon que se soit un photo ou une video
class ImageFactory {
  static render(media) {
    const template = photographerPhotoCard(media);
    const display = template.displayPhotoCard();
    return display;
  }
}

class VideoFactory {
  static render(media) {
    const template = photographerVideoCard(media);
    const display = template.displayVideoCard();
    return display;
  }
}

class MediaFactory {
  static render(media) {
    if (media.video == undefined) {
      return ImageFactory.render(media);
    } else {
      return VideoFactory.render(media);
    }
  }
}
