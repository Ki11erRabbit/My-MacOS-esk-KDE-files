/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
      id: 'main',
      bounds: { width: 1344, height: 720 }
    });

    
/*
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (e)=>{ console.log(e.responseText); });
    oReq.open("GET", "https://steamcommunity.com/id/nebukam/?xml=1");
    oReq.send();
*/
});