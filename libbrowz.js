let tabGroup = document.querySelector("tab-group");
function go() {
    let browserFrame = tabGroup.getActiveTab().webview
    let browser = tabGroup.getActiveTab()
    let url = document.getElementById("txtUrl").value
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
    	url = url.replaceAll("youtube.com", "yewtu.be")
    	url = url.replaceAll("youtu.be", "yewtu.be")
    } else if (url.includes("google.com/?q")) {
    	url = url.replaceAll("google.com/?q", "startpage.com/?q")
    } else if (url.includes("https://news.google.com")) {
    	url = url.replaceAll("https://news.google.com", "http://68k.news")
    } else if (url.includes("news.google.com")) {
    	url = url.replaceAll("news.google.com", "68k.news")
    } else if (url.includes("google.com") && !url.includes("maps") && !url.includes("news") && !url.includes("webstore") && !url.includes("mail")) {
    	url = url.replaceAll("google.com", "startpage.com")
    }
    document.getElementById("txtUrl").value = ""
    browserFrame.loadURL(url);
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

