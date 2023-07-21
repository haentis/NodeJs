const { ipcRenderer, contextBridge, dialog } = require('electron');
const fs = require('fs');
const { convertRtfToHtml } = require('html-to-rtf');

const boldBtn = document.getElementById('bold');
const italBtn = document.getElementById('italic');
const undlBtn = document.getElementById('underline');
const openBtn = document.getElementById('open');
const saveBtn = document.getElementById('save');
const mainArea = document.getElementById('main-area');

boldBtn.onclick = () => {
    let selected = window.getSelection().toString();
    mainArea.innerHTML = mainArea.innerHTML.replace(selected, `<b>${selected}</b>`);
};

italBtn.onclick = () => {
    let selected = window.getSelection().toString();
    mainArea.innerHTML = mainArea.innerHTML.replace(selected, `<i>${selected}</i>`);
};

undlBtn.onclick = () => {
    let selected = window.getSelection().toString();
    mainArea.innerHTML = mainArea.innerHTML.replace(selected, `<u>${selected}</u>`);
};

openBtn.onclick = async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'RTF Files', extensions: ['rtf'] }]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        const rtfContent = fs.readFileSync(filePath, 'utf-8');
        const htmlContent = convertRtfToHtml(rtfContent);
        mainArea.innerHTML = htmlContent;
    }
};

saveBtn.onclick = () => {
    ipcRenderer.send('save', mainArea.innerHTML);
};
