function createMenu(){
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
	menuItems[10] = "Multi";
	for(i=0;i<menuItems.length;i++) {
		if (localStorage[menuItems[i]+"-Enabled"]=="1"){
			chrome.contextMenus.create({"title": localStorage[menuItems[i]+"-Name"], "id": menuItems[i], "contexts": ["image"]});
		}
	}
}