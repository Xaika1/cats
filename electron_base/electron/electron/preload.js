const { contextBridge, ipcRenderer } = require('electron');

const apiArg = process.argv.find((arg) => arg.startsWith('--cats-api='));

contextBridge.exposeInMainWorld('authStorage', {
    load: () => ipcRenderer.invoke('auth:load'),
    save: (tokens) => ipcRenderer.invoke('auth:save', tokens),
    clear: () => ipcRenderer.invoke('auth:clear'),
});

contextBridge.exposeInMainWorld('appConfig', {
    apiUrl: apiArg ? apiArg.slice('--cats-api='.length) : '',
});
