console.log("Processo de renderização")

function cliente() {
    //console.log("teste do botão cliente")
    api.clientWindow()
}

function os() {
    //console.log("teste do botão os")
    api.osWindow()
}

api.dbStatus((event, message) => {
    console.log(message)
    if (message === 'conectado') {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    }
})