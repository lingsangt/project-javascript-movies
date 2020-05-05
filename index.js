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


//Creates the autocomplete dropdown
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;


const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
    const movies = await fetchData(event.target.value);

    //For empty search, hide dropdown 
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    //Clears dropdown from previous query
    resultsWrapper.innerHTML = '';

    //Shows dropdown 
    dropdown.classList.add('is-active');

    for (let movie of movies) {
        const option = document.createElement('a');

        //If no image is available, don't show anything
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        //Add item to dropdown
        option.classList.add('dropdown-item');
        option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
        `;

        //If a user clicks on an item shown in the dropdown
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;

            onMovieSelect(movie);
        });

        resultsWrapper.appendChild(option)
    }

};

//If user stops typing in search after 0.5 seconds, 'onInput' activates to show dropdown
input.addEventListener('input', debounce(onInput, 500));

//If user clicks outside of dropdown after search, hides the dropdown
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    };
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
    `;
};


/*
Part 3:
get data and render data for movie selected. Make a new function noMovieSelect to handle
this and add it to addEventListener when a user clicks on an item shown in the dropdown.


*/

