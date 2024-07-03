document.getElementById("chat-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var message = document.getElementById("message-input").value;
    // バックエンドのAPIにメッセージを送信
    sendMessage(message);
});

function sendMessage(message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/get-response", true);  // FlaskアプリのエンドポイントにPOSTリクエストを送信
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText).response;
            // チャットの履歴にメッセージとレスポンスを追加
            appendMessage(message, "user");
            appendMessage(response, "bot");
        }
    };
    var data = JSON.stringify({message: message});
    xhr.send(data);  // メッセージをJSON形式で送信
}


function appendMessage(message, sender) {
    var container = document.getElementById("chat-container");
    var element = document.createElement("div");
    element.className = sender;
    element.innerHTML = message;
    container.appendChild(element);
}