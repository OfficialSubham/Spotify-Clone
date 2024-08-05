console.log("hello");

//JS started

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
    console.log(song[0]);

    let audio = new Audio(song[0]);
    audio.play();

}
