//let index = 3;
function photographerPhotoCard(media) {
  const { title, image, id, likes } = media;
  const picture = `assets/images/medias/${image}`;
  function displayPhotoCard() {
    const article = `<div>
       <article class="photoCard">
        <div class="imageCard">
        <img
         src="${picture}"
         alt="${title}"
          id="media-${id}"
            onclick="openModalPhoto('${picture}', '${title}')"
             tabindex="0"
             onkeypress="openModalPhoto('${picture}', '${title}')"
             ></img>
        </div>
        <span class="descPhotoCard" tabindex="0">
        <h3 class="titleCard">${title}</h3>
        <p class="likesCard">
        <span class="like" id="media-likes-${media.id}" aria-label="like">${likes}</span>
        <span class="heart">
        <i class="fas fa-heart" id="media-likes-${media.id}" tabindex="0" aria-label="liker la photo"></i></span>
        </p>
        </span> 
        </article>
        </div>
        `;
    //console.log(article);
    return article;
  }
  return { title, image, id, likes, displayPhotoCard };
}

function photographerVideoCard(media) {
  const { title, video, id, likes } = media;
  const picture = `assets/images/medias/${video}`;

  function displayVideoCard() {
    const article = `<div>
       <article class="photoCard">
        <div class="imageCard">
        <video
         title="${title}"
          src="${picture}"
           type="video/mp4"
             id="media-${id}"
             onclick="openModalPhoto('${picture}', '${title}')"
              tabindex="0"
              onkeypress="openModalPhoto('${picture}', '${title}')"
              ></video>
        </div>
        <span class="descPhotoCard" tabindex="0"> 
        <h3 class="titleCard">${title}</h3>
        <p class="likesCard">
        <span class="like" id="media-likes-${media.id}">${likes}</span>
        <span class="heart">
        <i class="fas fa-heart" id="media-likes-${media.id}" tabindex="0" aria-label="like video"></i></span>
        </p>
        </span>
        </article>
        </div>
        `;
    return article;
  }
  return { title, video, id, likes, displayVideoCard };
}
