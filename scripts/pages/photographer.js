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

    //filtrer les données media par rapport a l'id des photographe
    const photographerDataFilter = data.photographers.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerId == photographerDataFilter.id);
    //console.log(photographerMedias);
    console.log(photographerDataFilter);
    const photographerName = photographerDataFilter.name;
    console.log(photographerName);

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

    const carrousel = document.querySelectorAll('photoCarrousel')


    //Header photographer Page Elements
    const city = photographerDataFilter.city;
    const country = photographerDataFilter.country;
    const tagline = photographerDataFilter.tagline;
    const image = photographerDataFilter.portrait;
    const urlImage = `../../assets/images/Photographers ID Photos/${image}`;
    descHeader.innerHTML += `<p class="name">${photographerName}</p>`;
    descHeader.innerHTML += `<p class="cityCountry">${city}, ${country}</p>`
    descHeader.innerHTML += `<p class="tagline">${tagline}</p>`;
    headerImage.innerHTML = `<img src="${urlImage}"></img>`;

    //Banner Total Likes and Price
    let totalLikes = 0;
    photographerMedias.forEach(media => {totalLikes += media.likes;});
    const price = photographerDataFilter.price;
    bannerLikesAndPrice.innerHTML += `<span class="likes">${totalLikes} <i class="fas fa-heart"></i></span>`;
    bannerLikesAndPrice.innerHTML += `<span class="priceBanner">${price}€/jour</span>`

    incrementeLike(photographerMedias);

    displayCard(photographerMedias, template);
    displayCarrousel(photographerMedias, carrousel);
    carrouselTest(photographerMedias);
}


photographerData();


function incrementeLike(medias) {
  //const likeNumb = document.querySelectorAll('.likesCard');
  //console.log(likeNumb);
  medias.forEach(media => {liketest = media.likes;});
  document.querySelectorAll('.heart').forEach(item => { 
      item.addEventListener("click", function(){
          liketest ++;
          return console.log(liketest);
      })
  })
}
 

function displayCarrousel(medias, template) {
  template.innerHTML = ` `;
  medias.forEach(media => {
    const photographerCarrrousel = factoryPaternModal(media);
    template.innerHTML += photographerCarrrousel;
}); 
}

function displayCard(medias, template) {
  template.innerHTML = ` `;
  medias.forEach(media => {
    const photographerCard = factoryPatern(media);
    template.innerHTML += photographerCard;
}); 
}
  

function factoryPaternModal(media) { 
    if(media.video == undefined) {
      const modalTemplate = modalPhoto(media);
      const display = modalTemplate.displayModalPhoto();
        return display;
    } else if(media.image == undefined) {
      const modalTemplate = modalVideo(media);
      const display = modalTemplate.displayModalVideo();
        return display;
    } else {
        throw "Unknow format";
    }
}

function factoryPatern(media) { 
    if(media.video == undefined) {
      const template = photographerPhotoCard(media);
      const display = template.displayPhotoCard();
        return display;
    } else if(media.image == undefined) {
      const template = photographerVideoCard(media);
      const display = template.displayVideoCard();
        return display;
    } else {
        throw "Unknow format";
    }
}



function photographerPhotoCard(media ) {
    const { title, image, id, likes } = media;
    const picture = `../../assets/images/medias/${image}`;

    function displayPhotoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <img src="${picture}" onclick="openModalPhoto()"></img>
        </div>
        <span class="descPhotoCard">
        <p class="titleCard">${title}</p>
        <p class="likesCard">${likes}<span class="heart">
        <i class="fas fa-heart"></i></span></p>
        </span>
        </article>
        `
        return (article);
    }
    return { title, image, id, likes, displayPhotoCard }
}


function photographerVideoCard(media) {
    const { title,video, id, likes } = media;

    const picture = `../../assets/images/medias/${video}`;

    function displayVideoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <video src="${picture}" type="video/mp4" controls onclick="openModalPhoto()"></video>
        </div>
        <span class="descPhotoCard">
        <p class="titleCard">${title}</p>
        <p class="likesCard">${likes}<span class="heart">
        <i class="fas fa-heart"></i></span></p>
        </span>
        </article>
        `
        return (article);
    }
    return { title, video, id, likes, displayVideoCard }
}


function modalPhoto(media) {
    const { image, title } = media;
    const picture = `../../assets/images/medias/${image}`;

    function displayModalPhoto() {
    const template = document.querySelector('.photoCarrousel'); 
    const modalPhoto = `
      <div class="photoModal">
        <img src="${picture}" alt="" class="photoContent">
        <span class="modalTitle">${title}</span>
      </div>
    `
    template.innerHTML += modalPhoto;
    return modalPhoto;
    }
    return { image, title, displayModalPhoto }
}


function modalVideo(media) {
    const { video, title } = media;

    const picture = `../../assets/images/medias/${video}`;
    function displayModalVideo() {
    const template = document.querySelector('.photoCarrousel'); 

    const modalVideo = `
     
       <div class="photoModal">
         <video src="${picture}" type="video/mp4" controls alt="" class="photoContent">
         <span class="modalTitle">${title}"</span>
       </div>
     
    `
    template.innerHTML += modalVideo;

    return modalVideo;
    }
    return { video, title, displayModalVideo }
}



function openModalPhoto() {  
      document.querySelector('.modalCarrousel').style.display = "inline-grid";
}

function closeModalPhoto() {
    document.querySelector('.modalCarrousel').style.display = "none";
}

function carrouselTest(media) {
  const card = document.querySelector('.photoModal');
  const carrousel = document.querySelector('.photoCarrousel');
  const right = document.querySelector('.arrowRight');
  const left = document.querySelector('.arrowLeft');
  const nbrL = media.length;
  const nbr = media;
  const position = 0;
  console.log(nbr);

  right.addEventListener("click", function() {
      card.style.transform = "translate(0,-500px)";
  }) 
  left.addEventListener("click", function() {
      card.style.transform = "translate(0,500px)";
  }) 
  
}




