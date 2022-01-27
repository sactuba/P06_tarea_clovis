//Mettre le code JavaScript lié à la page photographer.html

async function photographerData() {
    const url = new URLSearchParams(document.location.search);
    const id = url.get('id');
    let response = await fetch('../../data/photographers.json');
    let data = await response.json();
    
    //console.log(data);

    //filtrer les données media par rapport a l'id des photographe
    const photographer = data.photographers.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerId == photographer.id);
    //console.log(photographer);
    console.log(photographerMedias);

    const template = document.querySelector('.template');
    console.log(template);
}

photographerData();