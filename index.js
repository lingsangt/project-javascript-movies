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

const input = document.querySelector ('input');

const onInput =  async event => {
    const movies = await fetchData (event.target.value);
    for (let movie of movies){
        const div = document.createElement ('div');
        div.innerHTML =`
        <img src="${movie.Poster}"/>
        <h1>${movie.Title}</h1>
        `;

        document.querySelector ('#target').appendChild (div)
    }
    
};

input.addEventListener ('input', debounce (onInput, 500));

/*
bulma.io/documentation/components/dropdown/

2 options for making the autocomplete menu. 
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

