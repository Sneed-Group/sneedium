let tabGroup = document.querySelector("tab-group");
function go() {
    let browserFrame = tabGroup.getActiveTab().webview
    let browser = tabGroup.getActiveTab()
    browserFrame.loadURL(document.getElementById("txtUrl").value);
    browserFrame.addEventListener('dom-ready', () => {
        browserFrame.insertCSS(`
        ::-webkit-scrollbar {
          display: none;
        }

        `)
    })
    browserFrame.addEventListener("page-title-updated", (titleEvent) => { 
        let title = browserFrame.getTitle()
        tabGroup.getActiveTab().setTitle(title)
        console.log(title)
    })
    document.getElementById("txtUrl").value = ""
    for (let i = 0; i < userscripts.length; i++) {
        fetch(userscripts[i]).then( r => r.text() ).then( t =>  userscripts.executeJavaScript(t)).catch(() => {
            console.log("Error loading userscripts! (Did you provide any?)")
        })
    }
}

function stop() {
    let browserFrame = tabGroup.getActiveTab().webview
    browserFrame.stop()
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

