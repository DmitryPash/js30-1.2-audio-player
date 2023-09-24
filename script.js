const D = document;

const audio = D.querySelector('audio');
const PATH = './assets/audio/';
const PATH_IMG = './assets/img/';
const body = D.querySelector('body')

const mp3 = '.mp3';
const png = '.png';

let isPlay = false;
let playNum = 0;
let list_of_music = [
    {
        author: 'Beyonce',
        name_of_song: 'Don`t Hurt Yourself',
        src: 'beyonce',
        img: 'lemonade'
    },
     {
        author: 'William',
        name_of_song: 'Don`t Star Now',
        src: 'dontstartnow',
        img: 'dontstartnow'
    }
]

function playAudio() {
  audio.play();
  isPlay = !isPlay
  changeInfo()
}
function pauseAudio() {
  audio.pause();
  isPlay = !isPlay
}

function changeInfo() {
    const author = D.querySelector('.player-info__author')
    const song = D.querySelector('.player-info__song')
    const img = D.querySelector('.player-info__img')
    author.innerHTML = list_of_music[playNum].author
    song.innerHTML = list_of_music[playNum].name_of_song
    img.src = `${PATH_IMG}${list_of_music[playNum].img}${png}`
    body.style.backgroundImage = `url(${PATH_IMG}${list_of_music[playNum].img}${png})`
}


// Play - Stop
const playBtn = D.querySelector('.player-controls__btn--play');
function control() {
    if(isPlay == true) {
        pauseAudio()
    }
    else {
        playAudio()
    }
}
playBtn.addEventListener('click', control)

//Change track 
const nextBtn = D.querySelector('.player-controls__btn--next');
const prevBtn = D.querySelector('.player-controls__btn--prev');

function playNext() {
    if(playNum >= list_of_music.length - 1) {
        playNum = 0;
    } else {
        playNum++
    }

    audio.src = `${PATH}${list_of_music[playNum].src}${mp3}`
    audio.currentTime = 0;

    playAudio()
}
nextBtn.addEventListener('click', playNext)
function prevNext() {
    if(playNum == 0) {
        playNum = list_of_music.length - 1
    } else {
        playNum--
    }
    audio.src = `${PATH}${list_of_music[playNum].src}${mp3}`
    audio.currentTime = 0;

    playAudio()
}
prevBtn.addEventListener('click', prevNext)

//Progress bar
const progress = D.getElementById("player_progress")
const currentTime = D.getElementById('currentTime');
audio.addEventListener('loadedmetadata', function () {
    duration.textContent = formatTime(audio.duration);

        currentTime.textContent = formatTime(audio.currentTime);
        progress.value = 0; // Устанавливаем
        console.log(progress.value)
        progress.addEventListener('input', () => {
            const seekTime = (progress.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        });
        
        updateProgress();

        if (isPlay) {
            audio.play();
        }
})

function updateProgress() {
    
    const percent = (audio.currentTime / audio.duration) * 100;
    // console.log(percent)
    progress.value = percent;
    currentTime.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', updateProgress);