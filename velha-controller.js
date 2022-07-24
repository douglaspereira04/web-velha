
var jogador_1 = document.getElementById('jogador_1');
var jogador_2 = document.getElementById('jogador_2');

var jogarNovamenteElemento = document.getElementById('jogar-novamente');
var vezDeElemento = document.getElementById('vez-de');
var vencedorElemento = document.getElementById('vencedor');
var nomesElementos = document.getElementsByClassName("nome");
var vezVencedorElemento = document.getElementById('vez-vencedor');
var pontos_1 = document.getElementById('pontos_1');
var pontos_2 = document.getElementById('pontos_2');


var velha = new Velha(jogador_1.value,jogador_2.value);


function clicarCelula(i,j){
	let jogou = velha.jogar(i,j);
	if(jogou){
		velha.verificar_fim();
		apresentarNome();
		apresentarTabuleiro();
		let vencedor = velha.vencedor;
		if(vencedor != null){
			velha.incrementar_placar(vencedor);
			apresentarPlacar();
		}
	}
}

function apresentarPlacar(){
	pontos_1.innerHTML = velha.pontos_1;
	pontos_2.innerHTML = velha.pontos_2;
}

function apresentarNome(){
	
	let fim = false;
	let nome = null;
	let vencedor = velha.vencedor;

	if(vencedor != null){
		fim = true;
		nome = vencedor;
	}else if(velha.tabuleiro_cheio()){
		fim = true;
		nome = "Velha";
	}else{
		nome = velha.jogador_atual;
	}

	if(fim){
		vezDeElemento.classList.add("escondido");
		vencedorElemento.classList.remove("escondido");
		jogarNovamenteElemento.classList.remove("escondido");

	} else {
		vezDeElemento.classList.remove("escondido");
		vencedorElemento.classList.add("escondido");
		jogarNovamenteElemento.classList.add("escondido");
	}


	vezVencedorElemento.innerHTML = nome
}

function editarJogadores(){
	velha.jogador_1 = jogador_1.value;
	velha.jogador_2 = jogador_2.value;

	apresentarNome();
}


function apresentarTabuleiro(){
	for (var i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			document.getElementById("cel-"+i+""+j).innerHTML = velha.posicao(i,j);
		}
	}
}

function reiniciar(){
	velha.iniciar();
	apresentarNome();
	apresentarTabuleiro();
}

for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		document.getElementById("cel-"+i+""+j).addEventListener("click",() => { clicarCelula(i,j) });
	}
}


for (let i = nomesElementos.length - 1; i >= 0; i--) {
	nomesElementos[i].addEventListener('change', (event) => {
		editarJogadores();
	});
}

jogarNovamenteElemento.addEventListener('click', reiniciar);

