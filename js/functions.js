$(function(){
	$(document).ready(function(){
		validarCPF();
		somenteLetras();
		registarMascaras();		
		verificaSenha();		
		maxCaracteres();
		mensagemCheckbox();
		enviar();
	});
});
function validarCPF(){
	//evento change do campo cpf
	$("#cpf").on("change", function (){
		var cpf = $("#cpf").val();
		var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;
		if(!filtro.test(cpf)){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		cpf = remove(cpf, ".");
		cpf = remove(cpf, "-");	
		if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" 
							|| cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999"){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		//verifica o primeiro digito
		soma = 0;
		for(i = 0; i < 9; i++)
			soma += parseInt(cpf.charAt(i)) * (10 - i);
		resto = 11 - (soma % 11);
		if(resto == 10 || resto == 11)
			resto = 0;
		if(resto != parseInt(cpf.charAt(9))){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		//verifica com o primeiro digito e o segundo
		soma = 0;
		for(i = 0; i < 10; i ++)
			soma += parseInt(cpf.charAt(i)) * (11 - i);
		resto = 11 - (soma % 11);
		if(resto == 10 || resto == 11)
			resto = 0;
		if(resto != parseInt(cpf.charAt(10))){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		return true;
	});
	//remove os pontos e traço do numero de cpf antes de verificar
	function remove(str, sub) {
		i = str.indexOf(sub);
		r = "";
		if (i == -1) return str;
		r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
		return r;
	}
}
function somenteLetras(){
	$("#nome").keypress(function(event){
		//variavel recebendo o valor do evento da tecla pressionada
		var tecla = event.keyCode || event.which;  
		//Somente as letras minusculas, maisculas e o espaço
		if((tecla >= 65 && tecla <= 90 || tecla >= 97 && tecla <= 122 || tecla == 32)) 
			return true;
		else{
			//apagar e esc liberados
			if (tecla==8 || tecla==0) 
			return true;
		else  
			return false;
		}
	});
}
function registarMascaras(){
	$("#telefone").mask('(00) 00000-0000');
    $("#cpf").mask('000.000.000-00');
    $("#cep").mask('00000-000');
}
function verificaSenha(){
	$("#senha").keypress(function(event){
		//variavel recebendo o valor do evento da tecla pressionada
		var tecla = event.keyCode || event.which;   
		//Somente as letras minusculas, maisculas e os numeros
		if((tecla >= 65 && tecla <= 90 || tecla >= 97 && tecla <= 122 || tecla >= 48 && tecla <= 57))
			return true;
		else{
			//não digitar caracteres especiais
			if (tecla==8 || tecla==0) 
				return true;
			else  
				return false;
		}
	});
}
function maxCaracteres(){
	//evento keypress do campo obs
	$("#obs").keypress(function(event){
		//verifica se tem mais do que 200 caracteres
		if(cadastroCliente.obs.value.length == 200){
			alert("A observa\u00e7\u00e3o deve conter no m\u00e1ximo 200 caracteres.");
			//nao deixa digitar mais que 200
			event.preventDefault();
			cadastroCliente.obs.focus();
			return false;
		}
	});
}
function mensagemCheckbox(){
	//evento click no checkbox
	$("#promocao").on("change",function () {  
		verificaCheck();
	});
}
function verificaCheck(){
	if($("#promocao").is(":checked")){
		$("#mensagem").show();
	}else
		$("#mensagem").hide();
}
function enviar() {
    var operacao = "A";
    var posicao = -1;
    var dadosTb = localStorage.getItem("Dados");
    dadosTb = JSON.parse(dadosTb);
    if (dadosTb == null)
        dadosTb = [];
		$("#cadastroCliente").on("submit", function () {
    if (operacao == "A")
        adicionarElemento();
    else
        editarElemento();
    });
    $("#dadosTb").on("click", "#btnEditar", function(){
		$("#enviar").attr('value', "Alterar");
		operacao = "E";
        posicao = parseInt($(this).attr("alt"));
        
        var cli = JSON.parse(dadosTb[posicao]);
			$("#cpf").val(cli.cpf);
			$("#nome").val(cli.nome);
			$("#estadoCivil").val(cli.estadoCivil);
			$("#sexo").val(cli.sexo);
			$("#telefone").val(cli.telefone);
			$("#cep").val(cli.cep);
			$("#endereco").val(cli.endereco);
			$("#bairro").val(cli.bairro);
			$("#estado").val(cli.estado);
			$("#cidade").val(cli.cidade);
			$("#email").val(cli.email);
			$("#senha").val(cli.senha);
			$("#obs").val(cli.obs);
			$("#promocao").attr("checked", cli.promocao);
			$("#nome").focus();
		verificaCheck();
    });
    $("#dadosTb").on("click", "#btnExcluir", function(){
        posicao = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });
	function adicionarElemento() {
		var cliente = JSON.stringify({
			cpf: $("#cpf").val(), 
			nome: $("#nome").val(), 
			estadoCivil: $("#estadoCivil").val(),
			sexo: $("#sexo").val(),
			telefone: $("#telefone").val(),
			cep: $("#cep").val(),
			endereco: $("#endereco").val(),
			bairro: $("#bairro").val(),
			estado: $("#estado").val(),
			cidade: $("#cidade").val(),
			email: $("#email").val(),
			senha: $("#senha").val(),
			obs: $("#obs").val(),
			promocao: $("#promocao").is(":checked")
		});
		dadosTb.push(cliente);
		localStorage.setItem("Dados", JSON.stringify(dadosTb));
		alert("Registrado com sucesso.");
		return true;
	}
	function editarElemento(){
		dadosTb[posicao] = JSON.stringify({
			cpf: $("#cpf").val(), 
			nome: $("#nome").val(), 
			estadoCivil: $("#estadoCivil").val(),
			sexo: $("#sexo").val(),
			telefone: $("#telefone").val(),
			cep: $("#cep").val(),
			endereco: $("#endereco").val(),
			bairro: $("#bairro").val(),
			estado: $("#estado").val(),
			cidade: $("#cidade").val(),
			email: $("#email").val(),
			senha: $("#senha").val(),
			obs: $("#obs").val(),
			promocao: $("#promocao").is(":checked")
		});
		localStorage.setItem("Dados", JSON.stringify(dadosTb));
		alert("Registrado com sucesso.");
		operacao = "A";
		return true;
	}
	function excluir(){
		dadosTb.splice(posicao, 1);
		localStorage.setItem("Dados", JSON.stringify(dadosTb));
		alert("Registro Exluido com Sucesso");
		return true;
	}
	function listar() {
        $("#corpoTabela").html("");
		for (var i in dadosTb) {
			var cli = JSON.parse(dadosTb[i]);
			$('#dadosTb').find('tbody').append('<tr>' +
			'<td><b>' + cli.cpf + '</b></td>' +
			'<td><b>' + cli.nome + '</b></td>' +
			'<td><input type = "button" id = "btnEditar" class = "btn btn-danger" alt = " '+i+' " value = "Editar" />' +
			'<input type = "button" id = "btnExcluir" class = "btn btn-danger" alt = " '+i+' " value = "Remover"/></td>' +
			'</tr>');
			destacarLinha();
			limpar();
		}
	}
	//CANCELAR
	$("#cancelar").click(function(){
		operacao = "A";
		$("#enviar").attr('value', "Enviar");
		limpar();
	});
    listar();
	$("#enviar").attr('value', "Enviar");
}
function limpar(){
	$('#cpf').val('');
	$('#nome').val('');
	$('#estadoCivil').val('');
	$('#sexo').val('');
	$('#telefone').val('');
	$('#cep').val('');
	$('#endereco').val('');
	$('#bairro').val('');
	$('#estado').val('');
	$('#cidade').val('');
	$('#email').val('');
	$('#senha').val('');
	$('#obs').val('');
	$('#promocao').val('');
}
function destacarLinha(){
	$('table#dadosTb tbody tr').hover(
		function(){
			$(this).addClass('destaque');
		},
		function(){
			$(this).removeClass('destaque');
		}
    );
}