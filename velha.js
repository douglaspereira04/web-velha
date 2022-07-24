class Velha{
	constructor(jogador_1, jogador_2) {
		//vez == 1 == x; vez == 2 == o
		this._jogador_x = jogador_1;
		this._jogador_o = jogador_2;
		this._jogador_1 = jogador_1;
		this._jogador_2 = jogador_2;
		this._placar = {[jogador_1]:0,[jogador_2]:0};

		this.iniciar();
	}

	//coloca partida no estado inicial
	iniciar(){
		this._vez = 1;
		this._tabuleiro = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];
		this._movimentos = 0;
		this._vencedor = null;
	}

	//faz jogada
	//retorna se a jogada foi realizada ou por fim de partida ou por celula preenchida
	jogar(linha, coluna){
		if(this._vencedor == null && this._tabuleiro[linha][coluna] == 0){
			this._tabuleiro[linha][coluna] = this._vez
			this._vez = (this._vez%2)+1; //alternar entre 1 e 2
			this._movimentos++; // incrementa rodada
			this.verificar_fim();
			return true;
		}
		return false;
		
	}

	//define vencedor em this._vencedor
	//se não há vencedor e o tabuleiro está cheio, "Velha"
	verificar_fim(){
		var vencedor = 0;

		for (var i = 0; i < 3; i++) {
			//verifica linha
			if(	this._tabuleiro[i][0] == this._tabuleiro[i][1] &&
				this._tabuleiro[i][1] == this._tabuleiro[i][2] &&
				this._tabuleiro[i][0] != 0){
				vencedor = this._tabuleiro[i][0];
				break;
			}
			//verifica coluna
			if(	this._tabuleiro[0][i] == this._tabuleiro[1][i] &&
				this._tabuleiro[1][i] == this._tabuleiro[2][i] &&
				this._tabuleiro[0][i] != 0){
				vencedor =  this._tabuleiro[0][i];
				break;
			}
		}


		if(vencedor == 0){
		//se ainda não há vencedor
			//verifica diagonais
			if(((this._tabuleiro[0][0] == this._tabuleiro[1][1] && 
				this._tabuleiro[1][1] == this._tabuleiro[2][2]) ||
				(this._tabuleiro[0][2] == this._tabuleiro[1][1] && 
				 this._tabuleiro[1][1] == this._tabuleiro[2][0])) &&
				this._tabuleiro[1][1] != 0){
				vencedor =  this._tabuleiro[1][1];
			}
		}

		//retorna vencedor
		if(this.tabuleiro_cheio() && vencedor == 0){
			this._vencedor = "Velha";
		}else if(vencedor == 1){
			this._vencedor = this._jogador_x;
			this.incrementar_placar(this._vencedor);
		}else if(vencedor == 2){
			this._vencedor = this._jogador_o;
			this.incrementar_placar(this._vencedor);
		}
	}

	//verifica se o tabuleiro ta chceio
	tabuleiro_cheio(){
		return this._movimentos == 9;
	}

	//incrementa placar de determinado jogador
	incrementar_placar(jogador){
		this._placar[jogador]++;
	}

	//inverte quem é x e quem é o
	//(para começo de nova partida)
	inverter_jogadores(){
		let temp = this._jogador_x;
		this._jogador_x = this._jogador_o;
		this._jogador_o = temp;
	}

	//retorna jogador atual
	get vez(){
		if(this._vez == 1){
			return this._jogador_x;
		}
		return this._jogador_o;
	}

	//pega jogador 1
	get jogador_1(){
		return this._jogador_1;
	}

	//altera o nome do jogador 1
	set jogador_1(novo_nome){
		let pontos = this._placar[this._jogador_1]; //salva pontos
		delete this._placar[this._jogador_1]; //deleta nome do placar antigo
		if(this._jogador_x == this._jogador_1){ //substitui nome no x ou o
			this._jogador_x = novo_nome;
		} else{
			this._jogador_o = novo_nome;
		}
		if(this._vencedor == this._jogador_1){ //substitui nome no x ou o
			this._vencedor = novo_nome;
		}
		this._jogador_1 = novo_nome; //substitui nome _jogador_1
		this._placar[novo_nome] = pontos; //adiciona novo nome no placar com os pontos antigos
	}

	//pega jogador 2
	get jogador_2(){
		return this._jogador_2;
	}

	//altera o nome do jogador 2
	set jogador_2(novo_nome){
		let pontos = this._placar[this._jogador_2]; //salva pontos
		delete this._placar[this._jogador_2]; //deleta nome do placar antigo
		if(this._jogador_x == this._jogador_2){ //substitui nome no x ou o
			this._jogador_x = novo_nome;
		} else{
			this._jogador_o = novo_nome;
		}
		if(this._vencedor == this._jogador_2){ //substitui nome no x ou o
			this._vencedor = novo_nome;
		}
		this._jogador_2 = novo_nome; //substitui nome _jogador_2
		this._placar[novo_nome] = pontos; //adiciona novo nome no placar com os pontos antigos
	}

	//retorna jogador atual
	get jogador_atual(){
		if (this._vez == 1) {
			return this._jogador_x;
		}
		return this._jogador_o;
	}

	//pega pontos do jogador 1
	get pontos_1(){
		return this._placar[this._jogador_1];
	}

	//pega pontos do jogador 2
	get pontos_2(){
		return this._placar[this._jogador_2];
	}

	//pega jogador vencedor
	get vencedor(){
		return this._vencedor;
	}

	//pega valor em posição do tabuleiro
	posicao(linha, coluna){
		//retorna vencedor
		if(this._tabuleiro[linha][coluna] == 0){
			return ' ';
		}else if(this._tabuleiro[linha][coluna] == 1){
			return 'x';
		}else if(this._tabuleiro[linha][coluna] == 2){
			return 'o';
		}
	}

}