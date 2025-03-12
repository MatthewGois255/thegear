function buscarCEP() {
    let cep = document.getElementById('inputCEPClient').value
    let url = `https://viacep.com.br/ws/${cep}/json/`
    fetch(url)
        .then(res => res.json())
        .then(dados => {
            console.log(dados.logradouro)
            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighborhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value = dados.localidade
            document.getElementById('inputUFClient').value = dados.uf
        })
        .catch(error => console.log(error))
}