let favoriteMovies = [];
getStorage();

function updateStorage(favoriteMovies){
    console.log('im here');
    localStorage.setItem("favoriteMovies",JSON.stringify(favoriteMovies));

}

if (getStorage() === null){
    updateStorage(favoriteMovies);
}

function getStorage() {
    return JSON.parse(localStorage.getItem("favoriteMovies"))
};

const api = "4eeb7fc8"
async function getMovies(query){
    const objData = await fetch(`https://www.omdbapi.com/?apikey=${api}&s=${query}`);
    const strData = await objData.json();
    console.log(strData);
    renderData(strData);
}

function search(){
    const movieName = document.getElementById("input").value;
    getMovies(movieName);
}
function renderData(objectsArray){

    const main = document.getElementById("movieList");
    main.setAttribute("class","container")
    main.innerHTML = ""

    const search = objectsArray.Search;

    for (let objects of search){
        const div = document.createElement("div");
        div.setAttribute("class","cards");
        const img = document.createElement("img");
        img.setAttribute("id","poster");
        img.setAttribute("class","same");
        img.src  = objects.Poster;
        div.appendChild(img);
        
        for (let features in objects){
            if(features!=="Poster" && features!=="imdbID"){
            const subDiv = document.createElement("div");
            subDiv.textContent = objects[features]; 
            subDiv.setAttribute("class","same");       
            div.appendChild(subDiv);}

        }
        const butDiv = document.createElement("div");
        butDiv.setAttribute("id","buttonid");
        const button = document.createElement("button");
        button.setAttribute("class","same");
        
        button.textContent = '\u2661';
        button.addEventListener('click',function toggle(){
                const like = button.textContent;
                if(like==whiteHeart){
                    button.textContent = blackHeart;
                    addToFavorite(objects);

                }else{
                    button.textContent = whiteHeart;
                    removeFromFavorite(objects);

                }
            });
        butDiv.appendChild(button);
        div.appendChild(butDiv);
        main.appendChild(div);
        
        
            
            


    
    }

}

function addToFavorite(movieName){
    
    favoriteMovies=getStorage();
    favoriteMovies.push(movieName);
    console.log(favoriteMovies);
    updateStorage(favoriteMovies);
    display(movieName);
    
}


function removeFromFavorite(movieName){
    const movie = document.getElementById(movieName.imdbID);
    movie.remove();
    
    let favoriteMovies = getStorage();
    favoriteMovies = favoriteMovies.filter(movie => movie.imdbID !== movieName.imdbID);
    updateStorage(favoriteMovies);
    display();
}

const whiteHeart = '\u2661';
const blackHeart = '\u2764';


function display(movieName){
    const favorites = document.getElementById("favorite");
    let favoriteMovies = getStorage();
    favorites.innerHTML = "";
    for (let movies of favoriteMovies){
        const div = document.createElement("div");
        div.setAttribute("class","cards");
        div.setAttribute("id",movies.imdbID);
        const img = document.createElement("img");
        img.setAttribute("class", "same");
        img.setAttribute("id","poster");
        img.src = movies.Poster;
        div.appendChild(img);

        for (let feature in movies) {
            if (feature !== "Poster" && feature !== "imdbID") {
                const subDiv = document.createElement("div");
                subDiv.textContent = movies[feature];
                subDiv.setAttribute("class", "same");
                div.appendChild(subDiv);
            }
        }
        favorites.appendChild(div);

    }

}
