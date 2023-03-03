# F-Stopium
A basic web browser in Electron.
[![powered by Ghostery](https://img.shields.io/badge/ghostery-powered-blue?logo=ghostery)](https://github.com/ghostery/adblocker)

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.
- `preload.js` - A content script that runs before the renderer process loads.


## To Use

To clone and run this repository you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install dependencies
npm install
# Run the app
npm start
```

## License

[MIT Modified](LICENSE.md)

## Disclaimer

"Insider's Look" builds are meant for people who are just testing core functionality by default, and aren't interested in changes! If you want changes, compile it.
