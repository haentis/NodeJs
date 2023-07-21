const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('backend', {
    save: (text) => ipcRenderer.invoke('save', text),
    load: async () => await ipcRenderer.invoke('load')
});
