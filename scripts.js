console.log(' js sourced');
// global search array
var searchResults = [];
var trashBin = [];
var buttonHide = function(){
  if (trashBin == '') {
    $('#emptyDumpster').hide();
  }else{
    $('#emptyDumpster').show();
  }
};

$( document ).ready( function(){
  buttonHide();
  console.log( 'bonesaw is ready!!');
  $('#searchButton').on('click', function(){
    console.log( 'in searchButton on click' );
    // get user input
    var movieName = $('#movieNameIn').val();
    console.log('searching for:', movieName );
    if (movieName == '') {
      alert('Please enter a movie name');
    }else{
    // omdbapi search url
    // can test the url from console log in chrome
    var searchURL = 'http://www.omdbapi.com/?s=' + movieName;
    console.log('searURL:', searchURL);
    // ajax call
    $.ajax({
      url: searchURL,
      dataType: 'JSON',
      success: function( data ){
        console.log('ajax success data:', data.Search );
        // store the search resuls in searchResults
        searchResults = data.Search;
        console.log('searchResults:', searchResults);
        showResults(data.search);
      }// end success

    }); // end ajax
  }
  }); // end searchButton on click

  $('#emptyDumpster').on('click', function(){
    console.log( 'clicked dumpster');
    for (var i = 0; i < trashBin.length; i++) {
      $( '#resultsDiv').append('<p><b>' + trashBin[i].Title + '</b> (' + trashBin[i].Year + ')</p>');
      $( '#resultsDiv').append('<img src="' + trashBin[i].Poster + '">' + '<br> <button onClick="deleteMe(' + i + ')">This movie sucks!</button>');
    }
  });
}); // end doc ready

var showResults = function(){
  console.log('in showResults:', searchResults);
  // empty out the div
  $('#resultsDiv').empty();
  // loop through results
  for (var i = 0; i < searchResults.length; i++) {
    $( '#resultsDiv').append('<p><b>' + searchResults[i].Title + '</b> (' + searchResults[i].Year + ')</p>');
    $( '#resultsDiv').append('<img src="' + searchResults[i].Poster + '">' + '<br> <button onClick="deleteMe(' + i + ')">This movie sucks!</button>');
  }
buttonHide();
};

var deleteMe = function( index ){
  console.log('in deleteMe');
  var trash = {
    Title: searchResults[index].Title,
    Year: searchResults[index].Year,
    Poster: searchResults[index].Poster
  };
  trashBin.push( trash );
  searchResults.splice( index, 1);
  showResults();
  console.log('trashBin =', trashBin);
};
