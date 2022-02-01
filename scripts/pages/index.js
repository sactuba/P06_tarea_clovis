
    async function displayData() {
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


        // Récupère les datas des photographes
        displayData();

    
