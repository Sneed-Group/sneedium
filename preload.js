/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  enforceDomainRestrictions: (url) => ipcRenderer.sendSync('check-domain', url),
});


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, 'sneedium-version')
  }

  ipcRenderer.on('windowmaker', (event, arg) => {
    console.log(arg) // prints "pong"
  })
    //button and its event listener
  const makeWindowButton = document.getElementById('nwBtn');
  makeWindowButton.addEventListener('click', () => {
      ipcRenderer.send('windowmaker', 'ping')
  })
})
