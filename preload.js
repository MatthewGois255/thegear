const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api', {
    clientWindow: () => ipcRenderer.send('client-window'),
    osWindow: () => ipcRenderer.send('os-window'),
    dbStatus: (message) => ipcRenderer.on('db-status', message),
    newClient: (client) => ipcRenderer.send('new-client', client),
    searchClient: (name) => ipcRenderer.send('search-client', name),
    resetForm: (args) => ipcRenderer.on('reset-form', args)
})