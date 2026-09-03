// elementos
const audio = document.getElementById("audio");
const cover = document.querySelector(".cover");
const volLevel = document.getElementById("vol-level");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const lyricsEl = document.getElementById("lyrics");
const lyricsBox = document.getElementById("lyrics-box");
const backPlaylist = document.getElementById("back-playlist");

const songs = [
{ src: "music/disclaimer.mp3", cover: "fotos/lobo.png", title: "wawewiwowu", artist: "yo" , lyrics: "lyrics/disclaimer.html" },
  { src: "music/balidao.mp3", cover: "fotos/balidao.png", title: "Ba Li Dao - 誰先愛上他的(電影原聲帶)", artist: "DJ Didilong" , lyrics: "lyrics/balidao.txt" },
  { src: "music/Lament.mp3", cover: "fotos/la.png", title: "Lament - Time Fate Love", artist: "Luca Prodan" , lyrics: "lyrics/lament.txt"},
  { src: "music/loveryou.mp3", cover: "fotos/loveryou.png", title: "Lover, you should've come over - Grace", artist: "Jeff Buckley" , lyrics: "lyrics/lov.txt"},
  { src: "music/viento.mp3", cover: "fotos/viento.png", title: "Viento - Caifanes", artist: "Caifanes" , lyrics: "lyrics/viento.txt"},
  { src: "music/quevas.mp3", cover: "fotos/que.png", title: "¿Qué Vas A Hacer Tan Sola Hoy? - Especial", artist: "Viejas Locas" , lyrics: "lyrics/quevas.txt"},
  { src: "music/cartas.mp3", cover: "fotos/car.png", title: "Cartas Sin Marcar - Por Mirarte", artist: "Andrés Calamaro" , lyrics: "lyrics/cartas.txt" },
  { src: "music/mujer.mp3", cover: "fotos/mu.png", title: "Mujer - Saint Latin's Day Massacre", artist: "Joe Batan" , lyrics: "lyrics/mujer.txt" },
  { src: "music/languis.mp3", cover: "fotos/lan.png", title: "Languis - Doble Vida", artist: "Soda Stereo" , lyrics: "lyrics/languis.txt" },
    { src: "music/noche.mp3" , cover: "fotos/noc.png" , title: "Noche de los dos" , artist: "Murder" , lyrics: "lyrics/nochede.txt" } ,
  { src: "music/distant.mp3", cover: "fotos/dis.png", title: "Distant Lover - Let's Get It On", artist: "Marvin Gaye" , lyrics: "lyrics/dist.txt" },
  { src: "music/ulterior.mp3", cover: "fotos/ult.png", title: "Ulterior Motives", artist: "Who's Who?" , lyrics: "lyrics/ult.txt" },
  { src: "music/phy.mp3", cover: "fotos/ph.png", title: "Physical (You're So) - Broken", artist: "Nine Inch Nails" , lyrics: "lyrics/physical.txt" },
  { src: "music/opera.mp3", cover: "fotos/op.png", title: "Operación Densa - Pubis Angelical", artist: "Charly García" , lyrics: "lyrics/opera.txt" },
  { src: "music/palomas.mp3", cover: "fotos/pal.png", title: "Palomas y Plazas - Archivo 01", artist: "Gustavo Pena - El Príncipe" , lyrics: "lyrics/palomas.txt" },
  { src: "music/matte.mp3", cover: "fotos/ma.png", title: "Matte Kudasai (alternative version) - Discipline", artist: "King Crimson" , lyrics: "lyrics/matekudasai.txt"}, 
  { src: "music/heaven.mp3", cover: "fotos/he.png", title: "Heaven Knows", artist: "54 Ultra" , lyrics: "lyrics/he.txt" },
  { src: "music/imstill.mp3", cover: "fotos/imstillhere.png", title: "I¨m Still Here - Still Here", artist: "The Notations" , lyrics: "lyrics/im.txt" },
  { src: "music/atadoaunsentimiento.mp3", cover: "fotos/at.png", title: "Atado a un Sentimiento - Cóctel", artist: "Miguel Mateos & Zas" , lyrics: "lyrics/atad.txt"},
   { src: "music/sinti.mp3", cover: "fotos/sinti.png", title: "Sin Ti - Nostalgia Tropical", artist: "Los Panchos" , lyrics: "lyrics/sinti.txt" },
  { src: "music/lachata.mp3", cover: "fotos/ch.png", title: "La Chata - Infectado", artist: "Amén" , lyrics: "lyrics/lachata.txt"},
  { src: "music/arewe.mp3", cover: "fotos/are.png", title: "ARE WE STILL FRIENDS? - IGOR", artist: "Tyler, The Creator" , lyrics: "lyrics/arewes.txt" },
  { src: "music/virus2.mp3", cover: "fotos/sin.png", title: "Sin Disfraz - Locura", artist: "Virus" , lyrics: "lyrics/sin.txt" }
];

 
let currentSong = 1;
let shuffle = false;
let volume = 0.5;


audio.volume = volume;
volLevel.style.width = (volume * 100) + "%";

// coso de la barra
audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        const percent = (audio.currentTime / audio.duration) * 100;

        progress.style.width = percent + "%";

        currentTimeEl.textContent = formatTime(audio.currentTime);

        durationEl.textContent = formatTime(audio.duration);

    }

});

progressContainer.addEventListener("click", (e) => {

    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime = (clickX / width) * audio.duration;

});

// tiempo 
function formatTime(seconds){

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return minutes + ":" + String(secs).padStart(2,"0");

}

async function loadLyrics(path) {

    try {

        const response = await fetch(path);
        const text = await response.text();

        if (path.endsWith(".html")) {

            lyricsEl.innerHTML = text;

        } else {

            lyricsEl.textContent = text;

        }

    } catch {

        lyricsEl.textContent = "no hay letra disponible.";

    }

}




function loadSong(index) {
  audio.src = songs[index].src;
  cover.src = songs[index].cover;
  titleEl.textContent = songs[index].title;
  artistEl.textContent = songs[index].artist;

  if (songs[index].lyrics) {
    loadLyrics(songs[index].lyrics);
  } else {
    lyricsEl.textContent = "no hay letra disponible.";
  }

  songLoaded = true;

  document.querySelectorAll(".song").forEach((song, i) => {
    if (i === index) {
      song.classList.add("active");
    } else {
      song.classList.remove("active");
    }
  });
}


function nextSong() {
  if (shuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
  audio.play();
}


function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
}


document.getElementById("play").onclick = () => {

  if (!audio.src || audio.src === window.location.href) {
    loadSong(currentSong);
  }

  audio.play();

};


document.getElementById("pause").onclick = () => audio.pause();

// siguienteatras
document.getElementById("next").onclick = nextSong;
document.getElementById("prev").onclick = prevSong;

// dies mas dies menos
document.getElementById("forward10").onclick = () => {
  audio.currentTime += 10;
};

document.getElementById("back10").onclick = () => {
  audio.currentTime -= 10;
};

// shuffle
document.getElementById("shuffle").onclick = () => {
  shuffle = !shuffle;
  alert("Shuffle: " + (shuffle ? "ON" : "OFF"));
};

// volumen
document.getElementById("vol-up").onclick = () => {
  volume = Math.min(1, volume + 0.1);
  audio.volume = volume;
  volLevel.style.width = (volume * 100) + "%";
};

document.getElementById("vol-down").onclick = () => {
  volume = Math.max(0, volume - 0.1);
  audio.volume = volume;
  volLevel.style.width = (volume * 100) + "%";
};
songs.forEach((song, index) => {

  const item = document.createElement("div");

  item.className = "song";

  item.textContent = "♪ " + song.title;

item.onclick = () => {

    currentSong = index;

    if (audio.src.includes(songs[index].src)) {
        
        loadLyrics(songs[index].lyrics);
    } else {
        
        loadSong(currentSong);

        audio.onloadeddata = () => {
            audio.play();
        };
    }

    playlist.style.display = "none";
    lyricsBox.style.display = "block";

};

  playlist.appendChild(item);

});



cover.src = "fotos/gato.png";


audio.addEventListener("ended", nextSong);

backPlaylist.onclick = () => {

    lyricsBox.style.display = "none";
    playlist.style.display = "block";

};
