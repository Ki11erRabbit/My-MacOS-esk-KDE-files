// Copyright © 2011-2014 Akio Kitano All Rights Reserved.
// Copyright © 2011-2014 Miracreate  All Rights Reserved.

//alert("Hi!");

var clickedElement = null;

document.addEventListener("mousedown", function(event) {
  if (event.button == 2) {	// right click (context menuを出す時にclickされる)
    //alert("Hello!");
    //console.log("mousedown: event: %O", event);
    clickedElement = event.target;
    //console.log("mousedown: clickedElement: %O", clickedElement);
  }
}, true);

// TODO: clickだけじゃなくてmenuキーにも対応
//document.addEventListener('keydown', function(event) {if(event.keyCode==93)console.log(event)}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log("onMessage: request: %O", request);
    //console.log("onMessage: sender: %O", sender);
    //console.log("onMessage: sendResponse: %O", sendResponse);
    // frameが複数ある場合、対象のframe以外ではclickedElementが
    // nullになっているようなので、その時は何もしない
    if (clickedElement
//	&& request.font == "Meiryo"
       ) {
      // console.log(sender.tab ?
      //	  "onMessage: Request from a content script:" + sender.tab.url :
      //	  "onMessage: Request from the extension: " + sender.id);
      // console.log("onMessage: clickedElement: %O", clickedElement);
      // console.log("onMessage: request: %O", request);

      // FIXME range指定が効かない!!!
      if (clickedElement.style.fontFamily == request.font)
	clickedElement.style.fontFamily = null;
      else
	clickedElement.style.fontFamily = request.font;
      //clickedElement.style.unicodeRange = "U+2E80-FFFF";
      //clickedElement.style.src = "local(Meiryo)";

      //sendResponse({element: clickedElement.value});
      //sendResponse({element: "test dayo."});
    }

//    if (request == "getClickedElement") {
//      sendResponse({value: clickedElement.value});
//    }
  });