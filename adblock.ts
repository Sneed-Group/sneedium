const fetchr = require("cross-fetch")
const { ElectronBlocker, fullLists, Requests } = require('@cliqz/adblocker-electron')

let mainWindow: BrowserWindow | null = null;
let blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetchr);
blocker.enableBlockingInSession(mainWindow.webContents.defaultSession);