chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var searchBy = 'https://www.google.com/searchbyimage?image_url=';
		var box = document.querySelectorAll("div.immersive-container");

		for (var i=0; i < box.length; i++) {
			// Getting the data 
			var imgSelector = box[i].querySelectorAll("div.irc_mimg > a.irc_mil > img.irc_mi");
			var imgLink = imgSelector[0].getAttribute("src");
			var singleBox = box[i].querySelectorAll("table._FKw > tbody > tr");
			var searchImage = box[i].querySelectorAll(".irc_bimg div.irc_hd > span._cis");
			var searchLink = searchBy+encodeURIComponent(imgLink);

			// Preparing the button
			var tdView = document.createElement('td');
			var aView = document.createElement('a');
			var spanView = document.createElement('span');
			spanView.appendChild(document.createTextNode('View image'));
			aView.setAttribute('href', imgLink);
			aView.setAttribute('rel', 'noreferrer');
			aView.setAttribute('target', '_blank');
			aView.setAttribute('class','gotoimage');
			aView.appendChild(spanView);
			tdView.appendChild(aView);

			// Preparing search by image
			var aSearch = document.createElement('a');
			var spanSearch = document.createElement('span');
			spanSearch.appendChild(document.createTextNode('Search by image'));
			spanSearch.setAttribute('class','_r3');
			aSearch.setAttribute('href', searchLink);
			aSearch.setAttribute('class','_ZR searchimage');
			aSearch.appendChild(spanSearch);


			// Creating the button
			singleBox[0].insertBefore(tdView, singleBox[0].childNodes[0]);

			searchImage[0].innerHTML = '';

			// Creating Search by  Image
			searchImage[0].appendChild(aSearch);
		}


		document.addEventListener("click", function(){
			var box = document.querySelectorAll("div.immersive-container");
			for (var i=0; i < box.length; i++) {
				// Getting the data, again
				var imgSelector = box[i].querySelectorAll("div.irc_mimg > a.irc_mil > img.irc_mi");
				var imgLink = imgSelector[0].getAttribute("src");
				var singleHref = box[i].querySelectorAll("table._FKw > tbody > tr > td > a.gotoimage");
				var searchHref = box[i].querySelectorAll(".irc_bimg div.irc_hd > span._cis > .searchimage");
				var searchLink = searchBy+encodeURIComponent(imgLink);

				// Updating the button
				singleHref[0].setAttribute('href', imgLink);
				searchHref[0].setAttribute('href', searchLink);
			}
		});

	}
	}, 10);
});