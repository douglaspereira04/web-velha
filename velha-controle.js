class VelhaControle{

	constructor(documento){
		this._velha_html = documento;
		this._jogador_1 = document.getElementById('jogador_1');
		this._jogador_2 = document.getElementById('jogador_2');

		this._jogarNovamenteElemento = document.getElementById('jogar-novamente');
		this._vezDeElemento = document.getElementById('vez-de');
		this._vencedorElemento = document.getElementById('vencedor');
		this._nomesElementos = document.getElementsByClassName("nome");
		this._vezVencedorElemento = document.getElementById('vez-vencedor');
		this._pontos_1 = document.getElementById('pontos_1');
		this._pontos_2 = document.getElementById('pontos_2');

		this._velha = new Velha(this._jogador_1.value,jogador_2.value);

		//adiciona ação ao evento de clique no tabuleiro
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this._velha_html.getElementById("cel-"+i+""+j).addEventListener("click",() => { 
					this.clicarCelula(i,j) 
				});
			}
		}

		//adiciona açao à alteração dos nomes
		for (let i = this._nomesElementos.length - 1; i >= 0; i--) {
			this._nomesElementos[i].addEventListener('change', (event) => {
				this.editarJogadores();
			});
		}

		//adiciona ação ao botao de jogar novamente
		this._jogarNovamenteElemento.addEventListener('click', (event) => {
			this._velha.inverter_jogadores();
			this.iniciar();
		});

		this.iniciar();
	}

	//inicia/reinicia a partida
	iniciar(){
		this._velha.iniciar();
		this.apresentarNome();
		this.apresentarTabuleiro();
	}

	//ação ao clicar na celula i j do tabuleiro
	clicarCelula(i,j){
		let jogou = this._velha.jogar(i,j);
		if(jogou){
			this._velha.verificar_fim();
			this.apresentarNome();
			this.apresentarTabuleiro();
			let vencedor = this._velha.vencedor;
			if(vencedor != null){
				this._velha.incrementar_placar(vencedor);
				this.apresentarPlacar();
			}
		}
	}

	//apresenta placar na interface grafica
	apresentarPlacar(){
		pontos_1.innerHTML = this._velha.pontos_1;
		pontos_2.innerHTML = this._velha.pontos_2;
	}

	//apresenta ou nome do jogador da vez, ou do vencedor ou velha
	apresentarNome(){
		
		let fim = false;
		let nome = null;
		let vencedor = this._velha.vencedor;

		if(vencedor != null){
			fim = true;
			nome = vencedor;
		}else if(this._velha.tabuleiro_cheio()){
			fim = true;
			nome = "Velha";
		}else{
			nome = this._velha.jogador_atual;
		}

		if(fim){
			this._vezDeElemento.classList.add("escondido");
			this._vencedorElemento.classList.remove("escondido");
			this._jogarNovamenteElemento.classList.remove("escondido");

		} else {
			this._vezDeElemento.classList.remove("escondido");
			this._vencedorElemento.classList.add("escondido");
			this._jogarNovamenteElemento.classList.add("escondido");
		}


		this._vezVencedorElemento.innerHTML = nome
	}

	//ação ao alterar nome de jogador
	editarJogadores(){
		this._velha.jogador_1 = this._jogador_1.value;
		this._velha.jogador_2 = this._jogador_2.value;

		this.apresentarNome();
	}

	//apresenta o estado do tabuleiro na interface
	apresentarTabuleiro(){
		for (var i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this._velha_html.getElementById("cel-"+i+""+j).innerHTML = this._velha.posicao(i,j);
			}
		}
	}
}