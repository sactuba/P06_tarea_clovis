function photographerFactory(photographer) {
    const { name, portrait, id, country, city, tagline, price } = photographer;

    const picture = `Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {

        const article =
        `<article>
        <a href="/photographer.html?id=${id}" tabindex="1">
        <img src="${picture}" alt="${name}"></img>
        </a>
        <h2>${name}</h2>
        <span>${country}, ${city}</span>
        <p class="tag">${tagline}</p>
        <p class="price">${price} €/jour</p>
        </article>

        `
        return (article);
    }
    return { name, picture,id, country, city, tagline, price, getUserCardDOM }
}  