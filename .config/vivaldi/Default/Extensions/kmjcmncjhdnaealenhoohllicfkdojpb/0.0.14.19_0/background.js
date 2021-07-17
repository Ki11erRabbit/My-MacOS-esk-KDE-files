// Copyright © 2011-2014 Akio Kitano All Rights Reserved.
// Copyright © 2011-2014 Miracreate  All Rights Reserved.

// コンテキストメニューの項目が選択された時のハンドラ
chrome.contextMenus.onClicked.addListener(
//onClickHandler
function(info, tab) {
  //console.log("onClickHandler: info: %O", info);
  //console.log("onClickHandler: info.menuItemId: %O", info.menuItemId)
  // //console.log("tab: %O", tab)
  // console.log("onClickHandler: tab: %O", tab);
  // //console.log(document.activeElement);
  // //console.log(document.activeElement.id);
  // //console.log(document.activeElement.value);

//  switch (info.menuItemId) {
//  case "here_Meiryo":
    chrome.tabs.sendMessage(tab.id, {font: "Meiryo"});
//    break;
//  case "here_MS_PGothic":
//    chrome.tabs.sendMessage(tab.id, {font: "MS PGothic"});
//    break;
//  case "here_reset":
//    chrome.tabs.sendMessage(tab.id, {font: null});
//    break;
//  default:
//    //console.log("onClickHandler: BUG?: %O", info.menuItemId);
//  }
}
);

chrome.contextMenus.create(
  { "title": "ここを強制！", // "ここをメイリオ！／解除！ (試験的機能)",
    "id": "here_Meiryo",
    "contexts": ["page", "selection", "link", "editable"] });
//chrome.contextMenus.create(
//  { "title": "ここをＭＳ Ｐゴシック！",
//     "id": "here_MS_PGothic",
//     "contexts": ["page", "selection", "link", "editable"] });
// chrome.contextMenus.create(
//   { "title": "ここを解除！",
//     "id": "here_reset",
//     "contexts": ["page", "selection", "link", "editable"] });
