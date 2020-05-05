const createAutoComplete = ({root}) => {

    root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;


    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

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

};