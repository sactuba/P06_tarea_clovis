
    async function displayData() {
        const photographersSection = document.querySelector(".photographer_section");
        fetch('../../data/photographers.json')
        .then(res => res.json())
        .then(data => {
            data.photographers.forEach(photographer => {
                const photographerModele =  photographerFactory(photographer);
                const displayModele = photographerModele.getUserCardDOM();
                photographersSection.innerHTML += displayModele;
        });
    });

    };


        // Récupère les datas des photographes
        displayData();

    
        document.onkeydown = checkKey;

        function checkKey(e) {
        
            e = e || window.event;
        
            if (e.keyCode == '38') {
                //up arrow
                alert("baba")
            }
            else if (e.keyCode == '40') {
                //down arrow
                alert("baba")
            }
            else if (e.keyCode == '37') {
               //left arrow
               alert("baba")
            }
            else if (e.keyCode == '39') {
               //right arrow
               alert("baba")
            }
          }