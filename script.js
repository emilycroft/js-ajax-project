$(document).ready(addFormEventHandler)

function addFormEventHandler() {
    $('form#artist-form').submit(handleFormSubmit)
}

function handleFormSubmit(event) {
    event.preventDefault()
    findAndRenderArtists()
}

function findAndRenderArtists() {
    const searchURL = "https://api.spotify.com/v1/search"
    let $searchInput = $('input#artist-query')
    let userInput = $searchInput.val()
    let searchQuery = userInput.split(' ').join('+')
    $searchInput.val('')

    $.ajax({url: `${searchURL}?q=${searchQuery}&type=artist`, success: renderArtists})
}

function renderArtists(data) {

    let artistList = $('ul#artist-list')
    let errorMessageLocation = $('form')
    artistList.html(' ')
    if (data.artists.items.length !== 0) {
        $('p#error-message').remove()
        data.artists.items.forEach(function(artist) {
            let name = artist.name
            let genres = artist.genres
            artistList.append(`<li class="collection-item">${name} - <a href="#" onclick="getArtistInfo(this)" data-genres="${genres}">More Info</a></li>`)


        })
      } else {
        errorMessageLocation.prepend('<p id="error-message">Sorry, no artists found.</p>')
    }

}


function getArtistInfo(event) {

    let $genreData = event.getAttribute('data-genres')
    let $genres = new Array()
    $genres = $genreData.split(',')
      if ($genres.length == 1) {
        $genres = $genreData.split('\n')
      }

    
    //let name = artist.name
    //let infoTitle = $('h4#artist-info-title')
    //infoTitle.append(`<h4>${name}</h4>`)
    //infoTitle.html(' ')



    let genreList = $('ul#genre-list')
    genreList.html(' ')

            $genres.forEach(function(genre){

              genreList.append(`<li>${genre}</li>`)
            })

      }
