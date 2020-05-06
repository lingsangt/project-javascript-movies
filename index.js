const autoCompleteConfig={
    renderOption(movie) {
        //If no image is available, don't show anything
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        return `
        <img src="${imgSrc}"/>
        ${movie.Title} (${movie.Year})
        `
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
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

    }

};


createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'), "left");
    },
});


createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), "right");
    },  
});



let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c7cc4d10',
            i: movie.imdbID
        }
    });

    summaryElement.innerHTML = movieTemplate(response.data);

    if (side === 'left'){
        leftMovie = response.data;
    }else{
        rightMovie = response.data;
    }

    if (leftMovie && rightMovie){
        runComparison();
    }

};

/*

*/
const runComparison = ()=> {
    console.log ('Comparison running');
};


//helper function for onMovieSelect for displaying details on HTML after selection
const movieTemplate = (movieDetail) => {

    /*
    movieDetail.BoxOffice is a string of format "$629,000,000". 
    Need to remove dollar sign and commas, and convert to number.
    */
    const dollars = parseInt (movieDetail.BoxOffice.replace (/\$/g, '').replace (/,/g, ''));
    const metascore = parseInt (movieDetail.Metascore);
    const imdbRating = parseFloat (movieDetail.imdbRating);
    const imdbVotes = parseInt (movieDetail.imdbVotes.replace (/,/g, ''));

    //Keep it simple here and just use total number of awards and nominations for comparison
    const awards=movieDetail.Awards.split (' ').reduce ((prev, word)=>{
        const value= parseInt (word);
        if(isNaN(value)){
            return prev;
        }else{
            return prev+value;
        }
    }, 0);

    console.log (awards);

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
Part 5: Show two columns for the two movie searches.

*/

