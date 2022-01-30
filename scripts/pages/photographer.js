//Mettre le code JavaScript lié à la page photographer.html

async function photographerData() {
    const url = new URLSearchParams(document.location.search);
    const id = url.get('id');
    let response = await fetch('../../data/photographers.json');
    let data = await response.json();
    
    const template = document.querySelector('.template');

    //console.log(headerDesc);
    //filtrer les données media par rapport a l'id des photographe
    const photographerDataFilter = data.photographers.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerId == photographerDataFilter.id);
    //console.log(photographerMedias);
    console.log(photographerDataFilter);
    const photographerName = photographerDataFilter.name;
    console.log(photographerName);

    
    photographerMedias.forEach(media => {
        const name = photographerName;
        //console.log(name);
        const photographerCard =  factoryPatern(media, name);
        template.innerHTML += photographerCard;
        //console.log(photographerCard);
        //console.log(photographerName);
    })

    //Header photographer Page Elements
    const descHeader = document.querySelector('.descPhotographer');
    const headerImage = document.querySelector('.imagePhotographer');
    const city = photographerDataFilter.city;
    const country = photographerDataFilter.country;
    const tagline = photographerDataFilter.tagline;
    const image = photographerDataFilter.portrait;
    const urlImage = `../../Sample Photos/Photographers ID Photos/${image}`;
    descHeader.innerHTML += `<p class="name">${photographerName}</p>`;
    descHeader.innerHTML += `<p class="cityCountry">${city}, ${country}</p>`
    descHeader.innerHTML += `<p class="tagline">${tagline}</p>`;
    headerImage.innerHTML = `<img src="${urlImage}"></img>`;
    //console.log(city);

    //Banner Total Likes and Price
    let totalLikes = 0;
    const bannerLikesAndPrice = document.querySelector('.bannerLikesAndPrice');
    photographerMedias.forEach(media => {totalLikes += media.likes; /* console.log(totalLikes); */});
    const price = photographerDataFilter.price;
    bannerLikesAndPrice.innerHTML += `<span class="likes">${totalLikes} <i class="fas fa-heart"></i></span>`;
    bannerLikesAndPrice.innerHTML += `<span class="priceBanner">${price}€/jour</span>`
    //console.log(totalLikes);
    //console.log(price);


}

/* function init(){
 return photographerData();
}

init(); */
photographerData();

function factoryPatern(media, name) {
    if(media.video == undefined) {
      const template = photographerPhotoCard(media, name);
      const display = template.displayPhotoCard();
        return display;
    } else if(media.image == undefined) {
      const template = photographerVideoCard(media, name);
      const display = template.displayVideoCard();
        return display;
    } else {
        "Unknow format";
    }
}



function photographerPhotoCard(media, name) {
    const { title, image, id, likes } = media;
    const nameUrl = name;
    const picture = `../../Sample Photos/${nameUrl}/${image}`;

    function displayPhotoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <img src="${picture}"></img>
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
    return { title, nameUrl, image, id, likes, displayPhotoCard }
}


function photographerVideoCard(media, name) {
    const { title,video, id, likes } = media;
    const nameUrl = name;

    const picture = `../../Sample Photos/${nameUrl}/${video}`;

    function displayVideoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <video src="${picture}"  type="video/mp4" controls></video>
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
    return { title, nameUrl, video, id, likes, displayVideoCard }
}

function headerPhotographer(photographer){
        const { name, country, city, tagline, image} = photographer;
        const picture = `../../Sample Photos/Photographers ID Photos/${name}`
        

        function displayPhotographerHeader(){
           const desc = 
            `
            <article class="descInfo">
            <p>${name}</p>
            <p>${city}, ${country}</p>
            <p>${tagline}</p>
            </article>
            `

            const photo =
            `
            <img src="${picture}"></img>
            `
                
            return desc, photo;
        }
        return { name, country, city, tagline, image, headerPhotographer} 
}

