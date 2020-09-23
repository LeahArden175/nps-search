'use strict';

const apiKey = "cORc4Jhp2ftpWYa2KZ0XCM18fyvDrmeUTkzZ8e7Y";

const searchUrl = 'https://api.nps.gov/api/v1/parks';

//function to change object into query string paramters
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//function that takes in json data
//erases current html if any an 
//loop through the jsonData to get the params needed
//append results-list
//insert params needed into html
//remove hidden class from html

const displayResults = function (jsonData, maxResults){
  console.log(jsonData);
  $('#results-list').empty();
  for(let i = 0; i < jsonData.data.length; i++){
    $('#results-list').append(
      `
      <li>
      <h3>${jsonData.data[i].fullName}</h3>
      <p>${jsonData.data[i].description}</p>
      <a href=${jsonData.data[i].url}>${jsonData.data[i].url}</a>
      </li>
      `
    )};
    $('#results').removeClass('hidden');
}



//function that takes in the maxResults and the state that is searched for(query)
//creates the url needed by adding the searchURl to the query function outcome above
//uses fetch that contains the new url 

const findParks = function (maxResults, query){
  const params = {
    stateCode: query,
    language: 'en'
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;

  console.log(url);
  fetch(url)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    })
    .then(jsonData => displayResults(jsonData, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


//function to watch submit form
//when submitted prevent default
//add the values from maxResults and the state searches
//call findNatParks function and put through the new values as parametrs

const submitListen = function (){
  $('#js-form').on('submit', event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    findParks(maxResults, searchTerm);
  })
}


//function to call other function whe page is loaded

$(submitListen);

