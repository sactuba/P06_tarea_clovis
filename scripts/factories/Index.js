function photographerFactory(photographer) {
    const { name, portrait, id, country, city, tagline, price } = photographer;

    const picture = `assets/images/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {

        const article =
        `<article>
        <a href="/photographer.html?id=${id}" tabindex="0">
        <img src="${picture}" alt="${name}"></a>
        </a>
        <h2>${name}</h2>
        <span arira-label="country and city" tabindex="0">${country}, ${city}</span>
        <p class="tag" aria-label="tagline" tabindex="0">${tagline}</p>
        <p class="price" aria-label="price" tabindex="0">${price} €/jour</p>
        </article>

        `
        return (article);
    }
    return { name, picture,id, country, city, tagline, price, getUserCardDOM }
}  