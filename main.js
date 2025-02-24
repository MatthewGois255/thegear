console.log("Processo principal")

const { app, BrowserWindow, nativeTheme, Menu } = require('electron')

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
    resizable: false
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

// template do menu
const template = [
  {
    label: 'Cadastro',
    submenu: [
      { label: 'Clientes' },
      { label: 'OS' },
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
      { label: 'Aplicar zoom', role: 'zoomIn'},
      { label: 'Reduzir zoom', role: 'zoomOut'},
      { label: 'Restaurar zoom padrão', role: 'resetZoom'},
      { type: 'separator'},
      { label: 'Recarregar', role: 'reload'},
      { type: 'separator'},
      { label: 'DevTools', role: 'toggleDevTools'}
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      { label: 'Sobre', click: () => aboutWindow()}
    ]
  }
]