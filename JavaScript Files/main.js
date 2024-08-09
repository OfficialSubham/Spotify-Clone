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
    console.log(song);
    let ul = document.createElement("ul")
    let list = '';
    song.forEach((song) => {
        let eachSong = `<li data-song-id = ${song}>${songNameGiver(song)}</li>`
        list += eachSong;
    })
    ul.innerHTML = list;
    document.querySelector(".js-list")
        .innerHTML = list
    currentTrack.src = song[3]
    //setInterval(() => {
        //console.log(currentTrack.currentTime);
    //}, 2000)
    let songName = songNameGiver(currentTrack.src)
    document.querySelector(".js-song-name")
        .innerText = songName
    document.querySelector(".js-play-pause-button")
        .addEventListener("click", () => {
            if(currentTrack.paused) {
                currentTrack.play();
                document.querySelector(".js-play-pause-button")
                    .classList.remove("fa-play")
                document.querySelector(".js-play-pause-button")
                    .classList.add("fa-pause")
            }
            else {
                currentTrack.pause();
                document.querySelector(".js-play-pause-button")
                    .classList.remove("fa-pause")
                document.querySelector(".js-play-pause-button")
                    .classList.add("fa-play")
            }
        })
}

function songNameGiver(song) {
    let name = song.split("/Songs%20Data/")[1]
    console.log(name);
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

let ulList = document.querySelector(".js-list")

console.log(ulList.innerHTML);