$(document).ready(init);
function init(){
    getUserInput();
    SC.initialize({
      client_id: soundCloudClientID
    });
}
var iframeElement   = document.querySelector('iframe');
var iframeElementID = iframeElement.id;
var widget1         = SC.Widget(iframeElement);
var widget2         = SC.Widget(iframeElementID);

// get input from user...
function getUserInput() {
    $("#js-userSubmit").submit(function(event) {
        event.preventDefault();
        var userInput = $("#js-userInput").val();
        getSoundCloud(userInput);
    })
}
function getSoundCloud(userInput){
    // find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
    SC.get('/users', {
        q: userInput
    }).then(function(users) {
        if(users){
            var userUrl = users[0].uri;
            loadSoundCloud(userUrl);
        } else {
            //TODO add else
        }

    });
}
function loadSoundCloud(userUrl){
    widget1.load(userUrl, {auto_play: true});
}
var state = true;
if (annyang) {
  // Add our commands to annyang
     annyang.addCommands({
        'hello': function() { alert('Hello world!'); },
        'play *artist' : function(artist){
            $('#js-userInput').val(artist);
            getSoundCloud(artist);
        },
    });
    $("#mic").click(function() {
         if(state === true) {
            annyang.start();
            annyang.resume();
            state = false;
         } else if (state === false) {
            annyang.abort();
            state = true;
         }
    });
}
