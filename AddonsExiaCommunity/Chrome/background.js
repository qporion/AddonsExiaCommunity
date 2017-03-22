chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "http://127.0.0.1/ExiaCommunity/index.html";
    chrome.tabs.create({ url: newURL });
});

function getXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
           xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest");
        return null;
    }
    return xhr;
}

function notify () {
	var xhr = getXMLHttpRequest();
	xhr.open("GET", "https://api.twitch.tv/kraken/streams/exiacommunity", true);
	xhr.setRequestHeader("Accept","application/vnd.twitchtv.v3+json");
	xhr.setRequestHeader("Client-ID","ojc8866ltenas4oz7bgw7c5lgeq1qnn");
	xhr.onreadystatechange = function() {
    	if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
    		var json = JSON.parse(xhr.responseText);
    		if (json.stream != "null") {
	       		var notification = new Notification('Exia Community', {
			      icon: 'manette.png',
			      body: "Actuellment en stream sur : "+json.stream.game,
			    });

			    notification.onclick = function () {
			      window.open("http://127.0.0.1/ExiaCommunity/stream.html");      
			    };
			}
			else {
				
			}
    	}
	};		    				
	xhr.send(null);
    setTimeout(notify,60000);
}

notify();