function photographerFactory(photographer) {
    const { name, portrait, id, title, country, city, tagline, price } = photographer;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
/*      const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2); */
        const article =
        `<article>
        <a href="/photographer.html?id=${id}">
        <img src="${picture}"></img>
        </a>
        <h2>${title}</h2>
        <span>${country}, ${city}</span>
        <p>${tagline}</p>
        <p>${price} €/jour</p>
        </article>

        `
        return (article);
    }
    return { name, picture, getUserCardDOM }
}