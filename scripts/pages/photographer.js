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
           photographerMedias.sort((a,b) => b.date > a.date);
           photographerMedias.forEach(media => {
            const name = photographerName;
            const photographerCard =  factoryPatern(media, name);
            //template.replaceAll(articles);
            template.innerHTML += photographerCard;
        })
        } else if(value == "title") {
           photographerMedias.sort((a,b) => a.title > b.title);
           photographerMedias.forEach(media => {
            const name = photographerName;
            const photographerCard =  factoryPatern(media, name);
            //template.replaceAll(articles);
            template.innerHTML += photographerCard;
        })
           console.log(photographerMedias);
        } else {
            photographerMedias.sort((a,b) => b.likes > a.likes);
            photographerMedias.forEach(media => {
                const name = photographerName;
                const photographerCard =  factoryPatern(media, name);
               // template.replaceAll(articles);
                template.innerHTML += photographerCard;
            })
            console.log(photographerMedias);
        }
        console.log(value);
    })

    photographerMedias.forEach(media => {
        const name = photographerName;
        //console.log(name);
        const photographerCard =  factoryPatern(media, name);
        template.innerHTML += photographerCard;
        //console.log(photographerCard);
        //console.log(photographerName);
    })



    //Header photographer Page Elements
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
    photographerMedias.forEach(media => {totalLikes += media.likes; /* console.log(totalLikes); */});
    const price = photographerDataFilter.price;
    bannerLikesAndPrice.innerHTML += `<span class="likes">${totalLikes} <i class="fas fa-heart"></i></span>`;
    bannerLikesAndPrice.innerHTML += `<span class="priceBanner">${price}€/jour</span>`
    //console.log(totalLikes);
    //console.log(price);

    let liketest = 0;
    photographerMedias.forEach(media => {liketest = media.likes;  /* console.log(liketest); */});
    const test1 = document.querySelectorAll('.likesCard');
    //console.log(test1);
    document.querySelectorAll('.heart').forEach(item => { 
        item.addEventListener("click", function(){
            console.log(item);
            liketest ++;
            //window.alert("hello");
            return console.log(liketest);
        })
    })
    
  

    //console.log(like);
     

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
    return { title, nameUrl, video, id, likes, displayVideoCard }
}



function openModalPhoto() {
document.querySelector('.photoModalTag').style.display = "block";
document.querySelectorAll('.photoModalTag').innerHTML = `
    <div class="modalContent">
      <span class="close">
        <i class="fas fa-times" onclick="closeModalPhoto()"></i>
      </span>
      <span class="arrowRight">
        <i class="fas fa-angle-right"></i>
      </span>
      <span class="arrowLeft">
        <i class="fas fa-angle-left"></i>
      </span>
      <div class="photoModal">
        <img src="" alt="" class="photoContent">
        <span class="modalTitle"></span>
      </div>
    </div>
`
}

function closeModalPhoto() {
    document.querySelectorAll('.photoModal').style.display = "none";
}