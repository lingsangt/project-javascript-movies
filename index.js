const fetchData = async (searchTerm) => {
    const response = await axios.get ('http://www.omdbapi.com/', {
        params: {
            apikey:'c7cc4d10', 
            s: searchTerm
        }
    });

    if (response.data.Error){

    }

    return response.data.Search;

};


//Creates the autocomplete dropdown
const root = document.querySelector ('.autocomplete');
root.innerHTML =`
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;


const input = document.querySelector ('input');
const dropdown = document.querySelector ('.dropdown');
const resultsWrapper = document.querySelector ('.results');

const onInput =  async event => {
    const movies = await fetchData (event.target.value);

    //For empty search, hide dropdown 
    if (!movies.length){
        dropdown.classList.remove ('is-active');
        return;
    }

    //Clears dropdown from previous query
    resultsWrapper.innerHTML='';

    //Shows dropdown 
    dropdown.classList.add('is-active');

    for (let movie of movies){
        const option = document.createElement ('a');

        //If no image is available, don't show anything
        const imgSrc = movie.Poster ==='N/A'?''movie.Poster;

        //Add item to dropdown
        option.classList.add ('dropdown-item');
        option.innerHTML =`
        <img src="${imgSrc}"/>
        ${movie.Title}
        `;

        resultsWrapper.appendChild (option)
    }
    
};

//If user stops typing in search after 0.5 seconds, 'onInput' activates to show dropdown
input.addEventListener ('input', debounce (onInput, 500));

//If user clicks outside of dropdown after search, hides the dropdown
document.addEventListener ('click', event => {
    if (!root.contains (event.target)){
        dropdown.classList.remove ('is-active');
    };
});

/*
bulma.io/documentation/components/dropdown/

2 options for making the autocomplete menu. We go with option 2.
In Option #1, the index.html code is more involved and matches the index.js well. 

index.html
<div class="dropdown">
    <input />
    
    <div class="dropdown-menu">
        <div class="dropdown-content">

            <!-- Eventually pu toptions here --> 
        
        </div>
    </div>
</div>

index.js
Code to:
1) select the autocomplete div
2) Handle the input
3) Do search
4) Add in options to existing HTML



In option #2, the index.html code is more simple, and there is less effort needed to 
mach variable names between index.html and index.js.

index.html
<div class="autocomplete">
</div>

index.js
Code to:
1) select the autocomplete div
2) Create input
3) Handle the input
4) Do search
5) Add in html for menu
6) Add in options to menu



*/

