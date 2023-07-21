const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const html2rtf = require('html-to-rtf');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preloader.js')
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady()
    .then(() => {
        ipcMain.handle('save', saveTextToFile);
        ipcMain.handle('load', loadTextFromFile);
        createWindow();
    });

app.on('window-all-closed', app.quit);

function saveTextToFile(ev, text) {
    let rtf = html2rtf.convertHtmlToRtf(text);
    let fname = dialog.showSaveDialogSync(mainWindow, {
        defaultPath: 'document.rtf',
        filters: [{ name: 'RTF Files', extensions: ['rtf'] }]
    });

    if (!fname) {
        return;
    }

    if (!fname.endsWith('.rtf')) fname += '.rtf';

    html2rtf.saveRtfInFile(fname, rtf);
}

function loadTextFromFile() {
    let files = dialog.showOpenDialogSync(mainWindow, {
        properties: ['openFile'],
        filters: [{ name: 'RTF Files', extensions: ['rtf'] }]
    });

    if (!files || files.length === 0) {
        
        return null;
    }

    let filePath = files[0];
    let rtfContent = fs.readFileSync(filePath, 'utf-8');
    let htmlContent = html2rtf.convertRtfToHtml(rtfContent);

    return htmlContent;
}
