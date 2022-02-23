let index = 0;
function photographerPhotoCard(media) {
    const { title, image, id, likes } = media;
    const picture = `assets/images/medias/${image}`;
    function displayPhotoCard() {

        const article =
       `<article class="photoCard">
        <div class="imageCard">
        <img src="${picture}" alt="${title}" id="media-${id}"  onclick="openModalPhoto('${picture}', '${title}')" tabindex="${index++}"></img>
        </div>
        <span class="descPhotoCard">
        <p class="titleCard">${title}</p>
        <p class="likesCard">
        <span class="like" id="media-likes-${media.id}">${likes}</span>
        <span class="heart">
        <i class="fas fa-heart" id="media-likes-${media.id}"></i></span>
        </p>
        </span> 
        </article>
        `
        //console.log(article);
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
        <video title="${title}" src="${picture}" type="video/mp4" controls id="media-${id}" onclick="openModalPhoto('${picture}', '${title}')" tabindex="${index++}"></video>
        </div>
        <span class="descPhotoCard"> 
        <p class="titleCard">${title}</p>
        <p class="likesCard">
        <span class="like" id="media-likes-${media.id}">${likes}</span>
        <span class="heart">
        <i class="fas fa-heart" id="media-likes-${media.id}"></i></span>
        </p>
        </span>
        </article>
        `
        return (article);
    }
    return { title, video, id, likes, displayVideoCard }
}




