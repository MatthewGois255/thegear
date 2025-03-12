function obterData() {
    const dataAtual = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return dataAtual.toLocaleDateString('pt-BR', options)
}

//executar a função ao iniciar o aplicativo(janela principal)
document.getElementById('dataAtual').innerHTML = obterData()

function addService() {
    const servico = document.querySelector("#servicos")
    servico.insertAdjacentHTML("beforebegin", 
    `
    <div class="mt-1 row g-2">
        <div class="col-md-9">
            <input type="text" placeholder="Descrição do serviço" class="form-control form-control-sm" spellcheck="false" maxlength="30">
        </div>
        <div class="col-md-2">
            <input type="number" placeholder="Preço" class="form-control form-control-sm" spellcheck="false" min="0.00" max="99999.99">
        </div>
    </div>
    `
    )
}

const deletar = document.querySelector("#btnRegister")
deletar.className.replace("btn btn-danger")