const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['minds', 'higher', 'retro', 'sweet', 'psychedelic'];

// Keep track of song
let songIndex = 0;

// Initailly load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./mp3/${song}.mp3`;
  cover.src = `./img/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const proportion = (currentTime / duration) * 100;
  progress.style.width = `${proportion}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Next Song
function nextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
    loadSong(songs[songIndex]);
  } else {
    songIndex++;
    loadSong(songs[songIndex]);
  }
  audio.play();
}

// Prev Song
function prevSong() {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
  } else {
    songIndex--;
    loadSong(songs[songIndex]);
  }
  audio.play();
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', prevSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song end
audio.addEventListener('ended', nextSong);
