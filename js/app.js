var buildHTML = '';
// get input from user...
getUserInput();

function getUserInput() {
    $("#js-userSubmit").submit(function(event) {
        event.preventDefault();
        var userInput = $("#js-userInput").val();
        console.log(userInput);
        getSpotify(userInput);
    })
}

//send usersInput to spotify api to get json

var getSpotify = function(userInput) {
    $.getJSON(
        "https://api.spotify.com/v1/search",           //make a call to this url
    {                                                         //https://developers.google.com/youtube/v3/docs/search/list --
        q: userInput,
        limit: 1,                                           //the userInput from the function
        type: "artist"                                           //other types are playlist and channel
    },
        function(receivedApiData) {                               //callback???
            console.log(receivedApiData)                            //make sure I'm getting data
            if(receivedApiData.artists.total == 0) {        //if the results return 0 or "0"
              alert("No songs found!");                            //alert no videos
            }
            else {
                console.log(receivedApiData.artists.items[0].id)
                var artistId = receivedApiData.artists.items[0].id
                $('p').html(receivedApiData.artists.items[0].name + "'s <br> Top 5 Tracks");
                var getTopTracks = function() {
                    $.getJSON(
                        'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US',
                    {
                        limit: 5
                    },
                        function(recivedTracks) {
                            var tracks = recivedTracks.tracks;
                            console.log(recivedTracks.tracks);
                            for(var i = 0; i < 5; i++){                     // FIX!!!
                                buildHTML += "<iframe src='https://embed.spotify.com/?uri=";                            
                                buildHTML += tracks[i].uri + "' ";
                                buildHTML += 'width="200" height="300" frameborder="0" allowtransparency="true"></iframe>'
                                $(".js-search-results").html(buildHTML);
                            }
                            console.log(buildHTML);
                            $(".js-search-results").html(buildHTML);
                            buildHTML = '';

                        }
                    );
                } 
                getTopTracks();
               
            }
        }
    )
}
