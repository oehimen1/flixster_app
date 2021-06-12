
//API KEY
const apiKey = "698a26922f60d1e46654559c38d05277";
//const apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=698a26922f60d1e46654559c38d05277&include_adult=false";

const form = document.querySelector("#search-form");

//Elements
const buttonElmnt = document.querySelector("#show-more-btn");
const inputElmnt = document.querySelector("#search-input");
const movieArea = document.querySelector("#movie-area");
const cancel = document.querySelector("cancel");
//cancel.addEventListener("submit",cancelSearch);

const ldMoreBtn = document.querySelector("#load-area");
ldMoreBtn.addEventListener("submit",morePlease);

var currentApiPage=1;
var currentSearchTerm="";

//home-page default
getPlayingMovies();
form.addEventListener("submit", handleSubmit);




//Try to find movies that are searched
async function findMovie(){
    const userSearch = inputElmnt.value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&query=${userSearch}`;
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    displayResults(responseData.results);
}

//Helps display movie Results: movie image poster, movie title, movie rating
function displayResults(movieData){
    movieData.forEach(element => {
        movieArea.innerHTML+=`
        <div class="movie-info">
            <img src = "https://image.tmdb.org/t/p/w500${element.poster_path}" alt="${element.title}"/>
            <div class="imageBttm">
                <p id="movie-rating">⭐${element.vote_average}</p>
                <h5 id="movie-title">${element.title}</h5>
            </div>
        </div>
        `;
        console.log(element.title);
    });
}




//Display Now "Playing Movies" in the HomePage
async function getPlayingMovies(){
    
     const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentApiPage}`;
    const response = await fetch(url);
    const responseData = await response.json();
    const movie=responseData.results;
    displayResults(movie);
}

//Function for Cancel or "Clearing"
async function cancelSearch(event){
   movieArea.innerHTML='';
   event.preventDefault();
   cancel.addEventListener("submit",cancelSearch);
   getPlayingMovies();
    
    
    //cancel.value="";
    
}

//Function for Submit Button
function handleSubmit(event){
    event.preventDefault();
    movieArea.innerHTML="";
    findMovie();
    inputElmnt.value="";

}
//Function for Load More Button
function morePlease(event){
    event.preventDefault();
    currentApiPage++;
  //  findMovie();
    getPlayingMovies();

}

cancelSearch();