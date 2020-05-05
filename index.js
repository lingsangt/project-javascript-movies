const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c7cc4d10',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;

};


createAutoComplete ({
    root: document.querySelector ('.autocomplete')
});

createAutoComplete ({
    root: document.querySelector ('.autocomplete-two')
});

createAutoComplete ({
    root: document.querySelector ('.autocomplete-three')
});



const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c7cc4d10',
            i: movie.imdbID
        }
    });

    document.querySelector('#summary').innerHTML=movieTemplate(response.data);
};

//helper function for onMovieSelect for displaying details on HTML after selection
const movieTemplate = (movieDetail) => {
    return `
        <article class ="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>


        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};


/*
Part 4:
Refactor code from Part 3. 

Issues with Implementation from Part 3: 
The code touches everything, but autocomplete widget was supposed to be reusable. 
Autocomplete is not supposed to have knowledge of what a movie object is, no what to 
show for each option, nor what to do when a movie is clicked. Many global variables 
refer to specific elements, and it will be difficult to show a second autocomplete
on the screen.


We refactor to have the following format:

In index.js
Non-reusable code for the specific project. Config for Autocomplete:
fetData()-function to find movies
renderOption()-function that knows how to render a movie
onOptionSelect()- function that gets invoked when user clicks an option
root - element that the autocomplete should be rendered into

autocomplete.js
reusable code to get an autocomplete to work.

*/

