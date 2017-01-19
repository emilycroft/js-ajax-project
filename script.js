$(document).ready(addFormEventHandler)

function addFormEventHandler() {
    $('form#artist-form').submit(handleFormSubmit)
}

function handleFormSubmit(event) {
    event.preventDefault()
    findAndRenderArtists()
}

function findAndRenderArtists() {
    const URL = "https://api.spotify.com/v1/search"
    let $input = $('input#artist-query')
    let userInput = $input.val()
    let query = userInput.split(' ').join('+')
    $input.val('')

    $.ajax({url: `${URL}?q=${query}&type=artist`, success: renderArtists})
}

function renderArtists(data) {
    console.log(data)
    let artistList = $('ul#artist-list')
    let errorMessageLocation = $('form')
    artistList.html(' ')
    if (data.artists.items.length !== 0) {
        $('p#error-message').remove()
        data.artists.items.forEach(function(artist) {
            let name = artist.name
            let genres = artist.genres
            let fullName = name
            artistList.append(`<li>${name} - <a href="#" data-name=${name} onclick='getArtistInfo(this)' data-genres= ${genres}>More Info</a></li>`)
        })
      } else {
        errorMessageLocation.prepend('<p id="error-message">Sorry, no artists found.</p>')
    }

}

function getArtistInfo(event) {
    let infoTitle = $('h4#artist-info-title')
    let genreList = $('ul#genre-list')
    infoTitle.html(' ')
    genreList.html(' ')

    let genres = event.getAttribute('data-genres')
    // let filteredGenres = genres.filter(function(item, pos){
    //   return genres.indexOf(item)== pos
    //   })
    let name = event.getAttribute('data-name')

    infoTitle.append(`<h4>${name}</h4>`)
    genreList.append(`<li>${genres}</li>`)

}

// side panel thingy to display
// artist genre

// add a link to each artist in the ul
