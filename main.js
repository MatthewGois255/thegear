console.log("Processo principal")

const { app, BrowserWindow, nativeTheme, Menu, ipcMain, dialog } = require('electron')

const path = require('node:path')

const { conectar, desconectar } = require('./database.js')

const { cadastrarCliente, buscarClienteNome, cadastrarOs } = require('./controllers/controller.js')
const { applyTimestamps } = require('./src/models/Clientes.js')

const { jspdf, default: jsPDF } = require('jspdf')

const fs = require('fs')
// Janela principal
let win
const createWindow = () => {
  // a linha abaixo define o tema (claro ou escuro)
  nativeTheme.themeSource = 'light' //(dark ou light)
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    //autoHideMenuBar: true,
    //minimizable: false,
    resizable: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')
}

function aboutWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  let about
  if (main) {
    about = new BrowserWindow({
      width: 360,
      height: 250,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: main,
      modal: true
    })
  }
  about.loadFile('./src/views/sobre.html')
}

let client
function clientWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    client = new BrowserWindow({
      width: 1010,
      height: 720,
      // autoHideMenuBar: true,
      resizable: false,
      parent: main,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  client.loadFile('./src/views/cliente.html')
  client.center()
}

let os
function osWindow() {
  nativeTheme.themeSource = 'light'
  const main = BrowserWindow.getFocusedWindow()
  if (main) {
    os = new BrowserWindow({
      width: 1010,
      height: 720,
      //autoHideMenuBar: true,
      resizable: false,
      parent: main,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  os.loadFile('./src/views/os.html')
  os.center()
}

// Iniciar a aplicação
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.commandLine.appendSwitch('log-level', '3')

// async function connect() {
//   let conectado
//   await conectar().then((result)=>{conectado = result})
//   console.log(conectado)
// }
// connect()

ipcMain.on('db-connect', (event) => {
  conectar().then((conectado) =>
    event.reply('db-status', 'conectado')
  )
})



app.on('before-quit', () => {
  desconectar()
})

// template do menu
const template = [
  {
    label: 'Cadastro',
    submenu: [
      { label: 'Clientes', click: () => clientWindow() },
      { label: 'OS', click: () => osWindow() },
      { type: 'separator' },
      { label: 'Sair', click: () => app.quit(), accelarator: 'Alt+F4' },
    ]
  },
  {
    label: 'Relatórios',
    submenu: [
      { label: 'OS abertas' },
      { label: 'OS concluídas' }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      { label: 'Aplicar zoom', role: 'zoomIn' },
      { label: 'Reduzir zoom', role: 'zoomOut' },
      { label: 'Restaurar zoom padrão', role: 'resetZoom' },
      { type: 'separator' },
      { label: 'Recarregar', role: 'reload' },
      { type: 'separator' },
      { label: 'DevTools', role: 'toggleDevTools' }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      { label: 'Sobre', click: () => aboutWindow() }
    ]
  }
]

ipcMain.on('client-window', () => {
  clientWindow()
})

ipcMain.on('os-window', () => {
  osWindow()
})

// ================ CRUD =====================

ipcMain.on('new-client', async (event, client) => {
  // talvez a mensagem apareça mesmo sem cadastrar, vou precisar transformar essa função em uma promise
  
  // se eu cadastrar com um cpf igual, mesmo assim ele envia a mensagem

  let cadastrado = false
  async function cadastrar() {
    await cadastrarCliente(client)
    cadastrado = true
  }
  cadastrar()
  if (cadastrado = true) {
    dialog.showMessageBox({
      type: 'info',
      title: 'Aviso',
      message: 'Cliente adicionado com sucesso',
      buttons: ['OK']
    }).then((result) => {
      if (result.response === 0) {
        event.reply('reset-form')
      }
    })
  }
  
})

ipcMain.on('search-client', async (event, name) => {
  const dados = buscarClienteNome(name)
})

ipcMain.on('new-os', async (event, client) => {
  cadastrarOs(os)
})