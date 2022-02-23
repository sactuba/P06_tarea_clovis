function displayModal() {
    const modal = document.getElementById("contact_modal");
    document.body.style.opacity = "0.5";
    //document.querySelector('.modal').style.opacity = "1";
	  modal.style.display = "block";
    modal.innerHTML = `
    <div class="modal">
    <header>
      <h2>Contactez-moi</h2>
      <img src="assets/icons/close.svg" onclick="closeModal()" />
    </header>
    <form>
      <div>
        <label>Prénom</label>
        <input id="prenom" type="text" name="prenom" autofocus tabindex="0"/>
      </div>
      <div>
        <label>Nom</label>
        <input id="nom" type="text" name="nom" tabindex="1"/>
      </div>
      <div>
        <label>Email</label>
        <input id="mail" type="mail" name="mail" tabindex="2"/>
      </div>
      <div>
        <label>Votre message</label>
        <textarea id="message" type="text" name="message" tabindex="3"></textarea>
      </div>
      <button class="contact_button" onclick="submit">Envoyer</button>
    </form>
  </div>
    `
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    document.body.style.opacity = "1";
    modal.style.display = "none";
}

function submit() {
  const prenom = document.getElementById('prenom');
  const nom = document.getElementById('nom');
  const mail = document.getElementById('mail');
  const message = document.getElementById('message');
console.log(prenom.value);
console.log(nom.value);
console.log(mail.value);
console.log(message.value);
}
