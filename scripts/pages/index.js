    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const template = document.querySelector('.photographer_section');
 
        /* .catch(err => console.error(error.err)); */
       
       
        // et bien retourner le tableau photographers seulement une fois
        return {}
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        fetch('../../data/photographers.json')
        .then(res => res.json())
        .then(data => {
            data.photographers.forEach(photographer => {
                const photographerModele =  photographerFactory(photographer);
                const displayModele = photographerModele.getUserCardDOM();
                photographersSection.innerHTML += displayModele;

                //console.log(data);
                console.log(photographerModele);
        });
    });

    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    