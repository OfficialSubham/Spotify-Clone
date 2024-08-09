console.log("hello");

//JS started

let currentTrack = new Audio()

main();

async function getSongs() {
    let data = await fetch("http://127.0.0.1:5500/Songs%20Data")
    let jsonData = await data.text();
    let div = document.createElement("div")
    div.innerHTML = jsonData;
    let a = div.getElementsByTagName("a")
    console.log(a);
    let songsArray = [];
    for(let i = 0; i < a.length; i++) {
        let song = a[i]
        if(song.href.endsWith(".mp3")) {
            songsArray.push(song.href)
        }
    }
    
    return songsArray;

}

async function main() {
    let song = await getSongs();
    let ul = document.createElement("ul")
    let list = '';
    song.forEach((song) => {
        let className = removeLinkPart(song)
        let eachSong = `<li data-song-id = ${song} class = "js-${className} js-song">${songNameGiver(song)}</li>`
        list += eachSong;
    })
    ul.innerHTML = list;
    document.querySelector(".js-list")
        .innerHTML = list
    currentTrack.src = song[8]
    let timeInterval;
    let songName = songNameGiver(currentTrack.src)
    document.querySelector(".js-song-name")
        .innerText = songName
    document.querySelector(".js-play-pause-button")
        .addEventListener("click", () => {
            if(currentTrack.paused) {
                document.querySelector(".js-play-pause-button")
                    .classList.remove("fa-play")
                document.querySelector(".js-play-pause-button")
                    .classList.add("fa-pause")
                    currentTrack.play();
                songTime(currentTrack.duration)
                 timeInterval = setInterval(() => {
                    songTimer(currentTrack.currentTime);
                }, 1000)
            }
            else {
                currentTrack.pause();
                document.querySelector(".js-play-pause-button")
                    .classList.remove("fa-pause")
                document.querySelector(".js-play-pause-button")
                    .classList.add("fa-play")
                songTime(currentTrack.duration)
                clearInterval(timeInterval);
            }
        })
}

function songNameGiver(song) {
    let name = song.split("/Songs%20Data/")[1]
    let newName = name.replaceAll(/[%20, %2, (), _,]/g, " ")
    return newName
}

visibleHamburgerMenu();

function visibleHamburgerMenu() {
    let isMenuOn = false
    document.querySelector(".js-hamburger")
        .addEventListener('click', () => {
            if(!isMenuOn) {
                document.querySelector(".js-hamburger")
                    .innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
                let menu = document.querySelector(".hamburger-menu")
                menu.style.display = "initial";
                isMenuOn = true
                let search = document.querySelector(".js-header")
                search.style.opacity = 0;
                subham.style.display = "block"

            }
            else {
                document.querySelector(".js-hamburger")
                    .innerHTML = ' <i class="fa fa-bars" aria-hidden="true"></i>'
                let menu = document.querySelector(".hamburger-menu")
                menu.style.display = "none";
                isMenuOn = false
                let search = document.querySelector(".js-header")
                search.style.opacity = 1;
                subham.style.display = "none"
            }            
       
        })
}   

playSong();

function removeLinkPart(fullLink) {
    let newLink = fullLink.split("/Songs%20Data/")[1];
    let removeSpace = newLink.replaceAll("%20", "-")
    newLink = removeSpace.replace(".mp3", "")
    return newLink;
}

function playSong() {
    let ulList = document.querySelector(".js-list")
    let list = ulList.getElementsByTagName("li")
    console.log(list);

}

document.querySelectorAll("ul")
    .forEach((song) => {
        console.log("hi");
        document.querySelectorAll(".js-song")
            .forEach(()=> {
                console.log("hell nawh");
            })
        console.log(song);
        song.addEventListener('click', () => {
            console.log(song);
        })
});

function songTime(currentSong) {
    let time = currentSong
    let mainMinute = Math.floor(Number(time) / 60);
    let mainSecond = Math.floor(Number(time) % 60);
    let minute;
    let second;
    if(mainMinute < 10) {
        minute = "0" + mainMinute;
    }
    else {
        minute = mainMinute;
    }
    if(mainSecond < 10) {
        second = "0" + mainSecond;
        console.log(second);
    }
    else {
        second = mainSecond
    }

    document.querySelector(".js-minute")
        .innerText = minute;
    document.querySelector(".js-second")
        .innerText = second;
}

function songTimer(time) {
    let mainMinute = Math.floor(time / 60);
    let mainSecond = Math.floor(time % 60);
    let minute;
    let second;

    if(mainMinute < 10) {
        minute = "0" + mainMinute;
    }
    else {
        minute = mainMinute;
    }
    if(mainSecond < 10) {
        second = "0" + mainSecond;
    }
    else {
        second = mainSecond
    }

    document.querySelector(".js-minute-timer")
        .innerText = minute;
    document.querySelector(".js-second-timer")
        .innerText = second;

}