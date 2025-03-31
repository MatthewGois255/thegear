const clientModel = require('../src/models/Clientes.js')
const osModel = require('../src/models/OS.js')

async function cadastrarCliente(client) {
    try {
        const newClient = new clientModel({
          nomeCliente: client.nameCli,
          cpfCliente: client.cpfCli,
          emailCliente: client.emailCli,
          foneCliente: client.phoneCli,
          cepCliente: client.cepCli,
          logradouroCliente: client.addressCli,
          numeroCliente: client.numberCli,
          complementoCliente: client.complementCli,
          bairroCliente: client.neighborhoodCli,
          cidadeCliente: client.cityCli,
          ufCliente: client.ufCli
        })
    
        await newClient.save()
        console.log("Cliente adicionado")
      } catch (error) {
        if (error.code = 11000) {
          console.log(`Erro: O CPF ${client.cpfCli} já está cadastrado`)
        } else {
          console.log(error)
        }
      }
}

async function buscarClienteNome(nome) {
    try {
        const dadosCliente = await clientModel.find({
            nomeCliente: new RegExp(nome, 'i')
        })
        console.log(dadosCliente)
        return dadosCliente
    } catch (error) {
        console.log(error)
    }
}

async function listarClientes() {
    try {
        const clientes = await clientModel.find().sort({
            nomeCliente: 1
        })
        console.log(clientes)
    } catch (error) {
        console.log(error)
    }
}

async function cadastrarOs(os) {
    try {
        const newOs = new osModel({

        })
        await newOs.save()
        console.log("OS cadastrada")
    } catch (error) {
        console.log(error)
    }
}



async function buscarClienteCpf(cpf) {
    try {
        const clienteCpf = await clienteModel.find({
            cpf: new RegExp(cpf)
        })
        console.log(clienteCpf)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { cadastrarCliente, buscarClienteNome, cadastrarOs}