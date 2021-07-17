
// Saves options to localStorage.
function saveSettings() {
	select = document.getElementById("loadLocation");
	localStorage["loadLocation"] = select.children[select.selectedIndex].value;
	
	//SauceNAO
	select = document.getElementById("saucenao-enabled");
	if (select.checked==true){
		localStorage["SauceNAO-Enabled"]="1";
	}else{
		localStorage["SauceNAO-Enabled"]="0"
	}
	select = document.getElementById("saucenao-multi");
	if (select.checked==true){
		localStorage["SauceNAO-Multi"]="1";
	}else{
		localStorage["SauceNAO-Multi"]="0"
	}
	localStorage["SauceNAO-Name"]=document.getElementById("saucenao-name").value;
	localStorage["SauceNAO-URL"]=document.getElementById("saucenao-url").value;
	
	//IQDB
	select = document.getElementById("iqdb-enabled");
	if (select.checked==true){
		localStorage["IQDB-Enabled"]="1";
	}else{
		localStorage["IQDB-Enabled"]="0"
	}
	select = document.getElementById("iqdb-multi");
	if (select.checked==true){
		localStorage["IQDB-Multi"]="1";
	}else{
		localStorage["IQDB-Multi"]="0"
	}
	localStorage["IQDB-Name"]=document.getElementById("iqdb-name").value;
	localStorage["IQDB-URL"]=document.getElementById("iqdb-url").value;
	
	//TinEye
	select = document.getElementById("tineye-enabled");
	if (select.checked==true){
		localStorage["TinEye-Enabled"]="1";
	}else{
		localStorage["TinEye-Enabled"]="0"
	}
	select = document.getElementById("tineye-multi");
	if (select.checked==true){
		localStorage["TinEye-Multi"]="1";
	}else{
		localStorage["TinEye-Multi"]="0"
	}
	localStorage["TinEye-Name"]=document.getElementById("tineye-name").value;
	localStorage["TinEye-URL"]=document.getElementById("tineye-url").value;
	
	//Google
	select = document.getElementById("google-enabled");
	if (select.checked==true){
		localStorage["Google-Enabled"]="1";
	}else{
		localStorage["Google-Enabled"]="0"
	}
	select = document.getElementById("google-multi");
	if (select.checked==true){
		localStorage["Google-Multi"]="1";
	}else{
		localStorage["Google-Multi"]="0"
	}
	localStorage["Google-Name"]=document.getElementById("google-name").value;
	localStorage["Google-URL"]=document.getElementById("google-url").value;
	
	//Other1
	select = document.getElementById("other1-enabled");
	if (select.checked==true){
		localStorage["Other1-Enabled"]="1";
	}else{
		localStorage["Other1-Enabled"]="0"
	}
	select = document.getElementById("other1-multi");
	if (select.checked==true){
		localStorage["Other1-Multi"]="1";
	}else{
		localStorage["Other1-Multi"]="0"
	}
	localStorage["Other1-Name"]=document.getElementById("other1-name").value;
	localStorage["Other1-URL"]=document.getElementById("other1-url").value;

	//Other2
	select = document.getElementById("other2-enabled");
	if (select.checked==true){
		localStorage["Other2-Enabled"]="1";
	}else{
		localStorage["Other2-Enabled"]="0"
	}
	select = document.getElementById("other2-multi");
	if (select.checked==true){
		localStorage["Other2-Multi"]="1";
	}else{
		localStorage["Other2-Multi"]="0"
	}
	localStorage["Other2-Name"]=document.getElementById("other2-name").value;
	localStorage["Other2-URL"]=document.getElementById("other2-url").value;	
	
	chrome.contextMenus.removeAll();
	createMenu();

	//Other3
	select = document.getElementById("other3-enabled");
	if (select.checked==true){
		localStorage["Other3-Enabled"]="1";
	}else{
		localStorage["Other3-Enabled"]="0"
	}
	select = document.getElementById("other3-multi");
	if (select.checked==true){
		localStorage["Other3-Multi"]="1";
	}else{
		localStorage["Other3-Multi"]="0"
	}
	localStorage["Other3-Name"]=document.getElementById("other3-name").value;
	localStorage["Other3-URL"]=document.getElementById("other3-url").value;

	//Other4
	select = document.getElementById("other4-enabled");
	if (select.checked==true){
		localStorage["Other4-Enabled"]="1";
	}else{
		localStorage["Other4-Enabled"]="0"
	}
	select = document.getElementById("other4-multi");
	if (select.checked==true){
		localStorage["Other4-Multi"]="1";
	}else{
		localStorage["Other4-Multi"]="0"
	}
	localStorage["Other4-Name"]=document.getElementById("other4-name").value;
	localStorage["Other4-URL"]=document.getElementById("other4-url").value;	
	
	//Other5
	select = document.getElementById("other5-enabled");
	if (select.checked==true){
		localStorage["Other5-Enabled"]="1";
	}else{
		localStorage["Other5-Enabled"]="0"
	}
	select = document.getElementById("other5-multi");
	if (select.checked==true){
		localStorage["Other5-Multi"]="1";
	}else{
		localStorage["Other5-Multi"]="0"
	}
	localStorage["Other5-Name"]=document.getElementById("other5-name").value;
	localStorage["Other5-URL"]=document.getElementById("other5-url").value;	
	
	//Other6
	select = document.getElementById("other6-enabled");
	if (select.checked==true){
		localStorage["Other6-Enabled"]="1";
	}else{
		localStorage["Other6-Enabled"]="0"
	}
	select = document.getElementById("other6-multi");
	if (select.checked==true){
		localStorage["Other6-Multi"]="1";
	}else{
		localStorage["Other6-Multi"]="0"
	}
	localStorage["Other6-Name"]=document.getElementById("other6-name").value;
	localStorage["Other6-URL"]=document.getElementById("other6-url").value;	
	
	//Multi
	select = document.getElementById("multi-enabled");
	if (select.checked==true){
		localStorage["Multi-Enabled"]="1";
	}else{
		localStorage["Multi-Enabled"]="0"
	}
	localStorage["Multi-Name"]=document.getElementById("multi-name").value;
	
	chrome.contextMenus.removeAll();
	createMenu();
	
	
	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Changes Applied...";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
	
	
	
}

// Restores select box state to saved value from localStorage.
function loadSettings() {
	
	//Load Location
	select = document.getElementById("loadLocation");
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
		if (child.value == localStorage["loadLocation"]) {
			child.selected = "true";
			break;
		}
	}
	//SauceNAO
	select = document.getElementById("saucenao-enabled");
	if (localStorage["SauceNAO-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("saucenao-multi");
	if (localStorage["SauceNAO-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("saucenao-name").value=localStorage["SauceNAO-Name"];
	document.getElementById("saucenao-url").value=localStorage["SauceNAO-URL"];
	
	//IQDB
	select = document.getElementById("iqdb-enabled");
	if (localStorage["IQDB-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("iqdb-multi");
	if (localStorage["IQDB-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("iqdb-name").value=localStorage["IQDB-Name"];
	document.getElementById("iqdb-url").value=localStorage["IQDB-URL"];
	
	//TinEye
	select = document.getElementById("tineye-enabled");
	if (localStorage["TinEye-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("tineye-multi");
	if (localStorage["TinEye-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("tineye-name").value=localStorage["TinEye-Name"];
	document.getElementById("tineye-url").value=localStorage["TinEye-URL"];
	
	//Google
	select = document.getElementById("google-enabled");
	if (localStorage["Google-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
		select = document.getElementById("google-multi");
	if (localStorage["Google-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("google-name").value=localStorage["Google-Name"];
	document.getElementById("google-url").value=localStorage["Google-URL"];
	
	//Other1
	select = document.getElementById("other1-enabled");
	if (localStorage["Other1-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("other1-multi");
	if (localStorage["Other1-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("other1-name").value=localStorage["Other1-Name"];
	document.getElementById("other1-url").value=localStorage["Other1-URL"];
	
	//Other2
	select = document.getElementById("other2-enabled");
	if (localStorage["Other2-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("other2-multi");
	if (localStorage["Other2-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("other2-name").value=localStorage["Other2-Name"];
	document.getElementById("other2-url").value=localStorage["Other2-URL"];
	
	//Other3
	select = document.getElementById("other3-enabled");
	if (localStorage["Other3-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("other3-multi");
	if (localStorage["Other3-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("other3-name").value=localStorage["Other3-Name"];
	document.getElementById("other3-url").value=localStorage["Other3-URL"];
	
	//Other4
	select = document.getElementById("other4-enabled");
	if (localStorage["Other4-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("other4-multi");
	if (localStorage["Other4-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("other4-name").value=localStorage["Other4-Name"];
	document.getElementById("other4-url").value=localStorage["Other4-URL"];
	
	//Other5
	select = document.getElementById("other5-enabled");
	if (localStorage["Other5-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("other5-multi");
	if (localStorage["Other5-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("other5-name").value=localStorage["Other5-Name"];
	document.getElementById("other5-url").value=localStorage["Other5-URL"];
	
	//Other6
	select = document.getElementById("other6-enabled");
	if (localStorage["Other6-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	select = document.getElementById("other6-multi");
	if (localStorage["Other6-Multi"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("other6-name").value=localStorage["Other6-Name"];
	document.getElementById("other6-url").value=localStorage["Other6-URL"];
	
	//Multi
	select = document.getElementById("multi-enabled");
	if (localStorage["Multi-Enabled"]=="1"){
		select.checked=true;
	}else{
		select.checked=false;
	}
	document.getElementById("multi-name").value=localStorage["Multi-Name"];
	
}

window.addEventListener("load", function() {
	loadSettings();
	document.getElementById("saveSettings").addEventListener("click",saveSettings);
	document.getElementById("loadSettings").addEventListener("click",loadSettings);
});