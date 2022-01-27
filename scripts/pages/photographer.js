//Mettre le code JavaScript lié à la page photographer.html

async function photographerData() {
    const url = new URLSearchParams(document.location.search);
    const id = url.get('id');
    let response = await fetch('../../data/photographers.json');
    let data = await response.json();
    
    //console.log(data);

    //filtrer les données media par rapport a l'id des photographe
    const photographerData = data.media.filter(photographer => photographer.id == id)[0];
    const photographerMedias = data.media.filter(media => media.photographerData == photographerData.id);
    console.log(photographerMedias);
}

photographerData();