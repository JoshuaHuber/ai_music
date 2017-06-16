$(document).ready(init);
function init(){
    getUserInput();
    closeNav();
    SC.initialize({
      client_id: soundCloudClientID
    });
    annyang.abort();
    modal();
    micBtn();
}
var iframeElement   = document.querySelector('iframe');
var iframeElementID = iframeElement.id;
var widget1         = SC.Widget(iframeElement);
var widget2         = SC.Widget(iframeElementID);
// get input from user...
function getUserInput() {
    $("#js-userSubmit").submit(function(event) {
        $('.noSongs').addClass('hide');
        event.preventDefault();
        var userInput = $("#js-userInput").val();
        if(userInput.length > 1){
            getSoundCloud(userInput);
        } else {
            $('#js-userInput').attr('placeholder', "Please Enter An Artist")
        }
    })
}
//------------------------- SoundCloud start ---------------------------------
function getSoundCloud(userInput){
    SC.get('/users', {
        q: userInput
    }).then(function(users) {
        if(users.length > 0){
            for(var i = 0; i < users.length; i++){
                if( users[i].track_count > 5 && users[i].followers_count > 10 && users[i].track_count > 5){
                    var userUrl = users[i].uri;
                    loadSoundCloud(userUrl);
                    return;
                }
            }
        } else {
            $('.noSongs').toggleClass('hide')
        }
    });
}
//------------------------- SoundCloud end ---------------------------------
//------------------------- annyang start ---------------------------------
var state = true;
function loadSoundCloud(userUrl){
    widget1.load(userUrl, {auto_play: true, limit: 10});
}
if (annyang) {
     annyang.addCommands({
        'hello': function() { alert('Hello world!'); },
        'play *artist' : function(artist){
            $('#js-userInput').val(artist);
            getSoundCloud(artist);
        },
        'play': function() {
            widget1.play();
        },
        'resume': function() {
            widget1.play();
        },
        'pause': function() {
            widget1.pause();
        },
        'stop': function() {
            widget1.pause();
        },
        'next *song': function() {
            widget1.next();
        },
        'next': function() {
            widget1.next();
        },
        'skip': function() {
            widget1.next();
        },
        'previous *song': function() {
            widget1.prev();
        },
        'previous': function() {
            widget1.prev();
        },
        'last *song': function() {
            widget1.prev();
        },
        'last': function() {
            widget1.prev();
        }
    });
    $("#mic").click(function() {
        $(".micFA").toggleClass('record');
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
//------------------------- annyang end ---------------------------------
//------------------------- closeNav ---------------------------------
function closeNav(){
    $(document).click(function (event) {
        var clickover = $(event.target);
        var hamburger = $('.navbar-toggle');
        var navBarwindow = $('.navbar-collapse');
        var opened = navBarwindow.hasClass('in');
        var ul = $('.scroll-nav');
        if (opened === true && !clickover.hasClass("navbar-form") && !clickover.hasClass("in") &&
            !clickover.hasClass("form-control") && !clickover.hasClass("micFA") && !clickover.hasClass('micBtn')) {
            $(hamburger).click();
        }
    });
}
//------------------------- closeNav Ends ---------------------------------
//------------------------- modal starts ---------------------------------
function modal(){
    $('#myModal').modal('show')
}
function micBtn(){
    $('#modalMic').click(function(){
        $('#myModal').modal('hide');
        $("#mic").click();
    })
}
//------------------------- modal Ends ---------------------------------
