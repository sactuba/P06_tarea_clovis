function photographerPhotoCard(media ) {
    const { title, image, id, likes } = media;
    const picture = `assets/images/medias/${image}`;

    function displayPhotoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <img src="${picture}" onclick="openModalPhoto('${picture}', '${title}')"></img>
        </div>
        <span class="descPhotoCard">
        <p class="titleCard">${title}</p>
        <p class="likesCard">
        <span class="like">${likes}</span>
        <span class="heart">
        <i class="fas fa-heart"></i></span>
        </p>
        </span>
        </article>
        `
        return (article);
    }
    return { title, image, id, likes, displayPhotoCard }
}


function photographerVideoCard(media) {
    const { title,video, id, likes } = media;

    const picture = `assets/images/medias/${video}`;

    function displayVideoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <video src="${picture}" type="video/mp4" controls onclick="openModalPhoto('${picture}', '${title}')"></video>
        </div>
        <span class="descPhotoCard"> 
        <p class="titleCard">${title}</p>
        <p class="likesCard">
        <span class="like">${likes}</span>
        <span class="heart">
        <i class="fas fa-heart"></i></span>
        </p>
        </span>
        </article>
        `
        return (article);
    }
    return { title, video, id, likes, displayVideoCard }
}




 
/* function modalCarousel(picture, title) {
    //const { image, title } = media;
    //const picture = `../../assets/images/medias/${image}`; */


/*     return { picture, title, displayModalPhoto }
}
 */


