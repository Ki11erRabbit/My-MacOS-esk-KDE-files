function doSearch(info, tab){
	var src = info.srcUrl;

	if (src.indexOf('data:') == 0) {
		// incompatible
		alert("Not Yet Compatible With Data URIs");
	}else if(info.menuItemId=="Multi"){
		var menuItems = new Array()
		menuItems[0] = "SauceNAO";
		menuItems[1] = "IQDB";
		menuItems[2] = "TinEye";
		menuItems[3] = "Google";
		menuItems[4] = "Other1";
		menuItems[5] = "Other2";
		menuItems[6] = "Other3";
		menuItems[7] = "Other4";
		menuItems[8] = "Other5";
		menuItems[9] = "Other6";
		for(i=0;i<menuItems.length;i++) {
			if (localStorage[menuItems[i]+"-Multi"]=="1"){
				var url = localStorage[menuItems[i] + "-URL"] + encodeURIComponent(src);
				if ((localStorage["loadLocation"]=="1")){
					chrome.tabs.create({ url: url, selected: true });
				}else{
					chrome.tabs.create({ url: url, selected: false });
				}
			}
		}
	}else{
		var url = localStorage[info.menuItemId + "-URL"] + encodeURIComponent(src);
		if ((localStorage["loadLocation"]=="1")){
			chrome.tabs.create({ url: url, selected: true });
		}else{
			chrome.tabs.create({ url: url, selected: false });
		}
	}
	return true;
}




function initialize(){
	if(localStorage.getItem("loadLocation") === null) localStorage["loadLocation"] = "1";

	if(localStorage.getItem("SauceNAO-Enabled") === null) localStorage["SauceNAO-Enabled"] = "1";
	if(localStorage.getItem("SauceNAO-Multi") === null) localStorage["SauceNAO-Multi"] = "1";
	if(localStorage.getItem("SauceNAO-Name") === null) localStorage["SauceNAO-Name"] = "SauceNAO Search";
	if(localStorage.getItem("SauceNAO-URL") === null) localStorage["SauceNAO-URL"] = "https://saucenao.com/search.php?db=999&url=";

	if(localStorage.getItem("IQDB-Enabled") === null) localStorage["IQDB-Enabled"] = "1";
	if(localStorage.getItem("IQDB-Multi") === null) localStorage["IQDB-Multi"] = "1";
	if(localStorage.getItem("IQDB-Name") === null) localStorage["IQDB-Name"] = "IQDB Search";
	if(localStorage.getItem("IQDB-URL") === null) localStorage["IQDB-URL"] = "https://iqdb.org/?url=";

	if(localStorage.getItem("TinEye-Enabled") === null) localStorage["TinEye-Enabled"] = "1";
	if(localStorage.getItem("TinEye-Multi") === null) localStorage["TinEye-Multi"] = "1";
	if(localStorage.getItem("TinEye-Name") === null) localStorage["TinEye-Name"] = "TinEye Search";
	if(localStorage.getItem("TinEye-URL") === null) localStorage["TinEye-URL"] = "https://tineye.com/search/?url=";

	if(localStorage.getItem("Google-Enabled") === null) localStorage["Google-Enabled"] = "1";
	if(localStorage.getItem("Google-Multi") === null) localStorage["Google-Multi"] = "1";
	if(localStorage.getItem("Google-Name") === null) localStorage["Google-Name"] = "Google Search";
	if(localStorage.getItem("Google-URL") === null) localStorage["Google-URL"] = "https://www.google.com/searchbyimage?image_url=";

	if(localStorage.getItem("Other1-Enabled") === null) localStorage["Other1-Enabled"] = "0";
	if(localStorage.getItem("Other1-Multi") === null) localStorage["Other1-Multi"] = "0";
	if(localStorage.getItem("Other1-Name") === null) localStorage["Other1-Name"] = "Other Search 1";
	if(localStorage.getItem("Other1-URL") === null) localStorage["Other1-URL"] = "https://other-site-1";

	if(localStorage.getItem("Other2-Enabled") === null) localStorage["Other2-Enabled"] = "0";
	if(localStorage.getItem("Other2-Multi") === null) localStorage["Other2-Multi"] = "0";
	if(localStorage.getItem("Other2-Name") === null) localStorage["Other2-Name"] = "Other Search 2";
	if(localStorage.getItem("Other2-URL") === null) localStorage["Other2-URL"] = "https://other-site-2";

	if(localStorage.getItem("Other3-Enabled") === null) localStorage["Other3-Enabled"] = "0";
	if(localStorage.getItem("Other3-Multi") === null) localStorage["Other3-Multi"] = "0";
	if(localStorage.getItem("Other3-Name") === null) localStorage["Other3-Name"] = "Other Search 3";
	if(localStorage.getItem("Other3-URL") === null) localStorage["Other3-URL"] = "https://other-site-3";

	if(localStorage.getItem("Other4-Enabled") === null) localStorage["Other4-Enabled"] = "0";
	if(localStorage.getItem("Other4-Multi") === null) localStorage["Other4-Multi"] = "0";
	if(localStorage.getItem("Other4 Name") === null) localStorage["Other4-Name"] = "Other Search 4";
	if(localStorage.getItem("Other4-URL") === null) localStorage["Other4-URL"] = "https://other-site-4";

	if(localStorage.getItem("Other5-Enabled") === null) localStorage["Other5-Enabled"] = "0";
	if(localStorage.getItem("Other5-Multi") === null) localStorage["Other5-Multi"] = "0";
	if(localStorage.getItem("Other5-Name") === null) localStorage["Other5-Name"] = "Other Search 5";
	if(localStorage.getItem("Other5-URL") === null) localStorage["Other5-URL"] = "https://other-site-5";

	if(localStorage.getItem("Other6-Enabled") === null) localStorage["Other6-Enabled"] = "0";
	if(localStorage.getItem("Other6-Multi") === null) localStorage["Other6-Multi"] = "0";
	if(localStorage.getItem("Other6-Name") === null) localStorage["Other6-Name"] = "Other Search 6";
	if(localStorage.getItem("Other6-URL") === null) localStorage["Other6-URL"] = "https://other-site-6";
	
	if(localStorage.getItem("Multi-Enabled") === null) localStorage["Multi-Enabled"] = "1";
	if(localStorage.getItem("Multi-Name") === null) localStorage["Multi-Name"] = "ALL";
	createMenu();
}
chrome.runtime.onInstalled.addListener(initialize);
chrome.runtime.onStartup.addListener(initialize);
chrome.contextMenus.onClicked.addListener(doSearch);