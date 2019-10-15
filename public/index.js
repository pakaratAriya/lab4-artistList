let addArtistButton = document.getElementById("add-artist")
let addingForm = document.getElementById("adding-form")
let searchText = document.querySelector("#art-dir-text")
//================================ adding form ==================================
let artistNameInput = document.querySelector("#artist-name")
let artistAboutInput = document.querySelector("#artist-about")
let artistUrlInput = document.querySelector("#artist-url")
let artistAddBtn = document.querySelector("#add")
// ================================= artist content ============================
let artistContent = document.querySelector(".content")
let artistList = []
let selectedList = []
addingForm.style.display = "none"

async function loadArtists(){
    let fetchedData = await fetch("/getData")
    artistList = await fetchedData.json();
    if(artistList.length != 0){
        selectedList = artistList;
        renderArtists();
    }
}

let renderArtists = () => {
    document.querySelectorAll('.content').forEach((n)=>{
        document.body.removeChild(n)
    })
    selectedList.forEach((e,i)=>{
        create_an_artist(e.name,e.about,e.url,i)
    })
}


let click_add = ()=>{
    if(addingForm.style.display == "none"){
        artistNameInput.value = ""
        artistAboutInput.value = ""
        artistUrlInput.value = ""
        addingForm.style.display = "block"
    }else{
        addingForm.style.display = "none"
    }
}

let search = () => {
    let searchingWord = searchText.value;
    if(searchingWord.trim != "")
        selectedList = artistList.filter((e)=>e.name.includes(searchingWord))
    else
        selectedList = artistList
    renderArtists()
}

let create_an_artist = (name,about,url,i) =>{
    let wrapper = document.createElement("div")
    wrapper.className = "content"
    let content = document.createElement("div")
    content.className = "artist-list"
    let image = document.createElement("img")
    image.src = url
    image.className = "art-img"
    content.appendChild(image)
    let artistSubContent = document.createElement("div")
    artistSubContent.className = "art-content"
    let artistName = document.createElement("h3")
    artistName.textContent = name
    let artistAbout = document.createElement("p")
    artistAbout.textContent = about
    artistSubContent.appendChild(artistName)
    artistSubContent.appendChild(artistAbout)
    content.appendChild(artistSubContent)
    let button = document.createElement("button")
    button.className="delete"
    button.textContent="Delete"
    content.appendChild(button)
    wrapper.appendChild(content)
    document.body.appendChild(wrapper)
    button.addEventListener('click',async function(){
        content.remove();
        await fetch("/deleteArtist/"+i,{
            method: 'DELETE'
        }).then(() => {
            loadArtists()
        })
    })
}

loadArtists();
addArtistButton.addEventListener('click',click_add);
