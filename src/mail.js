function sendMail() {
    const prenom = document.getElementById("first-name").value;
    const nom = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent(`Message de ${prenom} ${nom}`);
    const body = encodeURIComponent(`Message :\n${message}\n\nContact : ${email}`);
    const mailtoLink = `mailto:maxens.melquiond@epita.fr?subject=${subject}&body=${body}`;
    console.log(mailtoLink)

    window.location.href = mailtoLink;
}