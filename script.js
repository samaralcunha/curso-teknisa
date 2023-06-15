$(document).ready(function () {
    $('#cpf').inputmask('999.999.999-99');
});

function validaCPF() {
    const cpfFormatado = document.getElementById("cpf").value;
    const cpf = limpaFormatacao(cpfFormatado);

    if (cpf.length !== 11) {
        mostraResultado('CPF deve conter 11 digitos');
        return;
    }

    if (verificaDigitoRepetido(cpf)) {
        mostraResultado('CPF não deve conter repetição de caracter');
        return;
    }
    
    mostraResultado('CPF valido');
}

function calculaDigitoVerificador(cpf, posicao) {
    const sequencia = cpf.slice(0, 8 + posicao).split('');

    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia) {
        soma += multiplicador + Number(numero);
        multiplicador--;
    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;
}

function limpaFormatacao(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf;
}

function mostraResultado(texto) {
    const span = document.getElementById("resultado");
    span.innerHTML = texto;
}

function verificaDigitoRepetido(cpf) {
    return cpf.split('').every((d => d === cpf[0]));
}
