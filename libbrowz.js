let tabGroup = document.querySelector("tab-group");
function normalizeUrl(url) {
    // Define regex patterns for matching URL schemes and local addresses
    const httpPattern = /^http:\/\//i;
    const httpsPattern = /^https:\/\//i;
    const filePattern = /^file:\/\//i;
    const indexPattern = /^index\.html/i;
    const localPattern = /^(192\.168|127\.0|localhost)/i;

    // Check if the URL already has a valid scheme
    if (httpPattern.test(url) || httpsPattern.test(url) || filePattern.test(url) || indexPattern.test(url)) {
        return url;
    }

    // Determine if the URL starts with a local address or needs HTTPS
    if (localPattern.test(url)) {
        return `http://${url}`;
    } else {
        return `https://${url}`;
    }
}

let url = undefined
let browserFrame = undefined
function go() {
    browserFrame = tabGroup.getActiveTab().webview
    let browser = tabGroup.getActiveTab()
    url = normalizeUrl(document.getElementById("txtUrl").value)
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
    	url = url.replaceAll("youtube.com", "invidious.nerdvpn.de")
    	url = url.replaceAll("youtu.be", "invidious.nerdvpn.de")
    } else if (url.includes("google.com/?q")) {
    	url = url.replaceAll("google.com/?q", "startpage.com/?q")
    } else if (url.includes("https://news.google.com")) {
    	url = url.replaceAll("https://news.google.com", "http://68k.news")
    } else if (url.includes("google.com") && !url.includes("maps") && !url.includes("news") && !url.includes("webstore") && !url.includes("drive") && !url.includes("docs") && !url.includes("sheets") && !url.includes("slides") && !url.includes("mail")) {
    	url = url.replaceAll("google.com", "search.sparksammy.com")
    }
    document.getElementById("txtUrl").value = ""
    browserFrame.loadURL(url, 
        {userAgent: 'Sneedium/Undefined (Windows NT 5.1; Win32) AppleWebKit/537.92 (Blink, like Electron) Blink/109.0.5414.74 Safari/537.92'});
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

function refresh() {
    if (typeof url != undefined) {
        browserFrame.loadURL(browserFrame.getURL(), 
            {userAgent: 'Sneedium/Undefined (Windows NT 5.1; Win32) AppleWebKit/537.92 (Blink, like Electron) Blink/109.0.5414.74 Safari/537.92'});
    } else {
        window.location.reload()
    }
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