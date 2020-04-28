const fetchData = async () => {
    const response = await axios.get ('http://www.omdbapi.com/', {
        params: {
            apikey:'c7cc4d10', 
            s: 'avengers'
        }
    });

    console.log (response.data);
};

fetchData ();

