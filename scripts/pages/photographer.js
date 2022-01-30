//Mettre le code JavaScript lié à la page photographer.html

async function photographerData() {
    const url = new URLSearchParams(document.location.search);
    const id = url.get('id');
    let response = await fetch('../../data/photographers.json');
    let data = await response.json();
    
    //console.log(data);
    const template = document.querySelector('.template');
    //console.log(template);

    //filtrer les données media par rapport a l'id des photographe
    const photographerDataFilter = data.photographers.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerId == photographerDataFilter.id);
    //console.log(photographerMedias);
    console.log(photographerDataFilter);
    const photographerName = photographerDataFilter.name;
    //const photographerPhoto = photographerMedias.image;
    //const photographervideo = photographerMedias.video;
    console.log(photographerName);

    
    photographerMedias.forEach(media => {
        const name = photographerName;
        console.log(name);
        const photographerCard =  factoryPatern(media, name);
        template.innerHTML += photographerCard;
        //console.log(photographerCard);
        //console.log(photographerName);
    })

    return photographerName;

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
    const picture = `Sample Photos/${nameUrl}/${image}`;

    function displayPhotoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <img src="${picture}"></img>
        </div>
        <span class="descPhotoCard">
        <p class="titleCard">${title}</p>
        <p class="likesCard">${likes}</p>
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

    const picture = `Sample Photos/${nameUrl}/${video}`;

    function displayVideoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <img src="${picture}"></img>
        </div>
        <span class="descPhotoCard">
        <p class="titleCard">${title}</p>
        <p class="likesCard">${likes}</p>
        </span>
        </article>

        `
        return (article);
    }
    return { title, nameUrl, video, id, likes, displayVideoCard }
}