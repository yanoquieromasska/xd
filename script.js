
function checkPassword() {
    let input = document.getElementById("password").value.toLowerCase();

    if (input ===  "soy pobre" , "soi pobre" , "soy povre"  , "zoi pobre" , "onichan uwu") {

        // Oculta contraseña
        document.getElementById("screen1").classList.remove("active");

        // Muestra caos de gatitos
        document.getElementById("screenVideo").classList.add("active");

        startVideoChaos();

        // Después de 6 segundos...
        setTimeout(() => {

            // Oculta pantalla de gatitos
            document.getElementById("screenVideo").classList.remove("active");

            // Muestra cumpleaños
            document.getElementById("birthdayScreen").style.display = "flex";

        }, 6000);

    } else {
        document.getElementById("msg").innerText = ":(";
    }
}






function startVideoChaos() {

    let container = document.getElementById("screenVideo");
    let count = 0;

    let interval = setInterval(() => {

        let vid = document.createElement("video");

        vid.src = "videos/gato.mp4";
        vid.classList.add("mini-video");

        vid.autoplay = true;
        vid.loop = true;
        vid.muted = false;

        // Primer gato grita, los demás respetan un poco
        if (count === 0) {
            vid.volume = 1;
        } else {
            vid.volume = 0.2;
        }

        // Posiciones aleatorias
        vid.style.top = Math.random() * 80 + "%";
        vid.style.left = Math.random() * 80 + "%";

        container.appendChild(vid);

        count++;

        if (count >= 8) {
            clearInterval(interval);
        }

    }, 500);


    // Limpiar absolutamente todos los gatitos
    setTimeout(() => {

        clearInterval(interval);

        let videos = container.querySelectorAll("video");

        videos.forEach(v => {
            v.pause();
            v.currentTime = 0;
        });

        container.innerHTML = "";

    }, 6000);

}


function irAlReproductor() {
    window.location.href ="reproductores/verdeprin/index.html";
}






function holabuenastardes() {

    // Oculta cumpleaños
    document.getElementById("birthdayScreen").style.display = "none";

    // Muestra pantalla final
    document.getElementById("screen3").classList.add("active");

}