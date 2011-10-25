var websocketGame = {}
// init script when the DOM is ready.
$(function() {
    // check if existence of WebSockets in browser
    if (window["WebSocket"]) {
        // create connection
        _socket=websocketGame.socket = new WebSocket("ws://10.128.42.132:8000");
        // on open event
        _socket.onopen = function(e) {
            console.log('WebSocket connection established.');
        };
        // on message event
        _socket.onmessage = function(e) {
            console.log(e.data);
        };
        // on close event
        _socket.onclose = function(e) {
            console.log('WebSocket connection closed.');
        };
        $("#send").click(sendMessage);
        $("#chat-input").keypress(function(event) {
            if (event.keyCode == '13') {
                sendMessage();
            }
        });

        function sendMessage() {
            var message = $("#chat-input").val();
            _socket.send(message);
            $("#chat-input").val("");
        }


    }
});