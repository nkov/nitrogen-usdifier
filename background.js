chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.ib, { file: 'jquery-3.2.0.min.js' }, function () {
		chrome.tabs.executeScript(tab.id, { file: 'inject.js' })
	});
});
