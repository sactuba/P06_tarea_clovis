function displayModal() {
    const modal = document.getElementById("contact_modal");
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
        <input autofocus/>
      </div>
      <div>
        <label>Nom</label>
        <input />
      </div>
      <div>
        <label>Email</label>
        <input />
      </div>
      <div>
        <label>Votre message</label>
        <textarea></textarea>
      </div>
      <button class="contact_button">Envoyer</button>
    </form>
  </div>
    `
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
