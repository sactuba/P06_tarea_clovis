function displayModal() {
    const modal = document.getElementById("contact_modal");
    document.querySelector('.header-photographerPage').style.opacity = "0.5";
    document.querySelector('#main').style.opacity = "0.5";
	  modal.style.display = "block";
    modal.innerHTML = `
    <div class="modal">
    <header>
      <h2 aria-label="contact">Contactez-moi</h2>
      <img src="assets/icons/close.svg" onclick="closeModal()" />
    </header>
    <form methode="GET" action="#">
      <div>
        <label for="prenom" tabindex="0">Prénom</label>
        <input id="prenom" type="text" name="prenom" tabindex="0"/>
      </div>
      <div>
        <label for="nom" tabindex="0">Nom</label>
        <input id="nom" type="text" name="nom" tabindex="0"/>
      </div>
      <div>
        <label for="mail" tabindex="0">Email</label>
        <input id="mail" type="mail" name="mail" tabindex="0"/>
      </div>
      <div>
        <label for="message" tabindex="0">Votre message</label>
        <textarea id="message" type="text" name="message" tabindex="0"></textarea>
      </div>
      <button type="button" class="contact_button" onclick="submitForm(); closeModal();" aria-hidden="true" tabindex="0" aria-label="Validate">Envoyer</button>
    </form>
  </div>
    `
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    document.querySelector('.header-photographerPage').style.opacity = "1";
    document.querySelector('#main').style.opacity = "1";
    modal.style.display = "none";
}

function submitForm() {
  let prenom = document.getElementById('prenom');
  let nom = document.getElementById('nom');
  let mail = document.getElementById('mail');
  let message = document.getElementById('message');
console.log(prenom.value);
console.log(nom.value);
console.log(mail.value);
console.log(message.value);
}

function focusForm() {
    const test = document.getElementById('prenom').focus();
}