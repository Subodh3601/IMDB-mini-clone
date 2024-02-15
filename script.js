// API key
const key = '2aad390b';

// Get the search input element
let searchInput = document.getElementById('Input');

// Add event listener for input events
searchInput.addEventListener('input', findMovies);

// Fetch details of a single movie
async function singleMovie() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`;
    const res = await fetch(url);
    const data = await res.json();

    // Generate HTML output
    let output = `
        <div class="movieimg">
            <img src="${data.Poster}" alt="Movie img">
        </div>
        <div class="moviedetails">
            <div class="detailsheader">
                <div class="detailstitle">
                    <h1>${data.Title}</h1>
                </div>
                <div class="addtofavourite">
                    <i class="fa-solid fa-bookmark" onClick="addTofavorites('${id}')"></i>
                </div>
            </div>
            <span class="details1">${data.Year} &nbsp; &nbsp; ${data.Country} &nbsp; &nbsp;<img class="starimage" src="star.png">${data.imdbRating} <span></span>/10</span>
            <ul class="details2">
                <li><strong>Actors: </strong>${data.Actors}</li>
                <li><strong>Director: </strong>${data.Director}</li>
                <li><strong>Writers: </strong>${data.Writer}</li>
            </ul>
            <ul class="details2">
                <li><strong>Genre: </strong>${data.Genre}</li>
                <li><strong>Box Office: </strong>${data.BoxOffice}</li>
                <li><strong>Runtime: </strong>${data.Runtime}</li>
            </ul>
            <p>${data.Plot}</p>
            <p>
                <i class="fa-solid fa-award"></i>
                &nbsp; ${data.Awards}
            </p>
        </div>
    `;
    // Append the output
    document.querySelector('.movieoutercontainer').innerHTML = output;
}

// Add a movie to favorites
async function addTofavorites(id) {
    localStorage.setItem('favorite' + id, id.toString());
    alert('Movie Added to Favourite list!');
}

// Remove a movie from favorites
async function removeFromfavorites(id) {
    console.log(id);
    for (let i in localStorage) {
        console.log(i);
        if (localStorage[i] == id) {
            localStorage.removeItem(i);
            break;
        }
        window.location.replace('favorite.html');
    }


}

// Display a list of movies
async function displayMovieList(movies) {
    let output = "";
    for (let i of movies) {
        let img = i.Poster != 'N/A' ? i.Poster : 'https://c8.alamy.com/comp/2AEN70N/white-blank-poster-template-on-brick-wall-clean-advertising-template-with-copy-space-beside-2AEN70N.jpg';
        let id = i.imdbID;
        output += `
            <div class="moviecontainer">
                <div class="moviecontainerimg">
                    <a href="movie.html?id=${id}"><img src="${img}" alt="movie image"></a>
                </div>
                <div class="searchmoviedetails">
                    <div class="moviedetailsbox">
                        <div class="movienamecontainer">
                            <div class="movienamediv">
                                <p class="moviename"><a href="movie.html?id=${id}">${i.Title}</a></p>
                            </div>
                            <p class="movierating"><a href="movie.html?id=${id}">${i.Year} &nbsp; <img class="starimage" src="star.png">8.7<span>/10</span></a></p>
                        </div>
                        <div class="favouriteicon">
                            <i class="fa-solid fa-bookmark" onClick="addTofavorites('${id}')"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    // Append to the movie-display class
    document.querySelector('.displaycontainer').innerHTML = output;
}

// Find movies based on search input
async function findMovies() {
    document.querySelector("#blankpagemsg img").style.display = "none";
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchInput.value.trim())}&page=1&apikey=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Search) {
        displayMovieList(data.Search);
    }
}

// Load favorite movies from local storage
async function favoritesMovieLoader() {
    let output = '';
    for (let i in localStorage) {
        let id = localStorage.getItem(i);
        if (id != null) {
            const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`;
            const res = await fetch(url);

            const data = await res.json();
            let img = data.Poster ? data.Poster : 'https://c8.alamy.com/comp/2AEN70N/white-blank-poster-template-on-brick-wall-clean-advertising-template-with-copy-space-beside-2AEN70N.jpg';
            let Id = data.imdbID;
            console.log(data);
            console.log(data.imbdRating);
            output += `
                <div class="moviecontainer">
                    <div class="moviecontainerimg">
                        <a href="movie.html?id=${id}"><img src="${img}" alt="movie image"></a>
                    </div>
                    <div class="searchmoviedetails">
                        <div class="moviedetailsbox">
                            <div class="movienamecontainer">
                                <div class="movienamediv">
                                    <p class="moviename">${data.Title}</p>
                                </div>
                                <p class="movierating">${data.Year} &nbsp; <span><img class="starimage" src="star.png">${data.imbdRating}</span>/10</p>
                            </div>
                            <div class="favouriteicon" style="color: maroon">
                                <i class="fa-solid fa-trash" style="cursor:pointer;" onClick="removeFromfavorites('${Id}')"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    document.querySelector('.displaycontainer').innerHTML = output;
}
