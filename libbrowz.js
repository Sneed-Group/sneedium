let tabGroup = document.querySelector("tab-group");
function go() {
    let browserFrame = tabGroup.getActiveTab().webview
    browserFrame.loadURL(document.getElementById("txtUrl").value);
    browserFrame.addEventListener("page-title-updated", (titleEvent) => { 
        let title = browserFrame.getTitle()
        tabGroup.getActiveTab().setTitle(title)
        console.log(title)
    })
    document.getElementById("txtUrl").value = ""
    for (let i = 0; i < extensions.length; i++) {
        fetch(extensions[i]).then( r => r.text() ).then( t =>  browserFrame.executeJavaScript(t))
    }
}
function back() {
    let browserFrame = tabGroup.getActiveTab().webview
    browserFrame.goBack()
}
function forward() {
    let browserFrame = tabGroup.getActiveTab().webview
    browserFrame.goForward()
}

tabGroup.setDefaultTab({
    title: CONF.homepageTitle,
    src: CONF.homepage,
    active: true
});
tabGroup.addTab()
function clickPress(keyEvent) {
    if (keyEvent.keyCode == 13) {
        go()
    }
}
