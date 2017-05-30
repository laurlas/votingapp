$(document).ready(function() {
    var socket = io();
    socket.on('message', function (response) {
        if (response) {
            var statistics= JSON.parse(response);
            var total=statistics.George+statistics.Maria+statistics.John+statistics.Joanna;
            $('#progress-George').css('width',statistics.George*100/total+'%');
            $('#progress-Maria').css('width',statistics.Maria*100/total+'%');
            $('#progress-John').css('width',statistics.John*100/total+'%');
            $('#progress-Joanna').css('width',statistics.Joanna*100/total+'%');
        }
    });
    $('.dropdown-menu li a').on('click', function(){
        var selectedCandidate=$(this).html();
        socket.send(selectedCandidate);
        $('.dropdown').addClass('hidden');
    });
});

