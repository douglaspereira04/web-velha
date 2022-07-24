# Jogo da Velha
Grupo: 
- Douglas Pereira Luiz: 18203343

A aplicação web é um jogo da velha. A aplicação conta com:
- um documento **html**, **index.html**, para interpretação da interface de usuário por um navegado;
- um documento **javascript**, **velha.js**, com a codificação da classe de modelo do jogo da velha;
- um documento **javascript**, **velha-controle.js**, com a codificação de uma classe de controle do modelo e da interface mencionados anteriormente;
- um documento **css**, **style.css**, com os estilos aplicados à interface de usuário;
- um documento **javascript**, **main.js**, que somente instancia uma classe de controle do jogo.

## index.html
A interface gráfica descrita pelo documento conta com uma barra de status da partida, a parte superior da tela, em azul, e uma área de jogo, onde fica o tabuleiro, em amarelo.
Na área identificada como **status**, **o código prevê campos **\<input\>** de apresentação/edição do nome dos jogadores, acima de um parágrafo **\<p\>** contendo sua pontuação. Esses elementos ficam contidos em uma área **\<div\>** identificada como **placar**.
Ainda em status é apresentado ou o jogador que deve realizar o movimento no turno atual, ou o jogador vencedor, ou velha. Também é apresentado um botão para jogar novamento, no fim de uma partida.
Na área identificado como **jogo**, é definido uma área, **tabuleiro**, contendo, na forma de **\<div\>**, cada célula do tabuleiro do jogo.

## style.css
As principais modificações na interface são:
- definição da àrea **status** como um _container_ **flex** em coluna, com conteúdo alinhado e justificado ao centro;
- definição da àrea **placar** como um _container_ **flex** em linha, com conteúdo alinhado e justificado ao centro;
- definição da àrea **jogo** com conteúdo alinhado e justificado ao centro;
- definição de **tabuleiro** como um _container_ **grid** com _template_ de 3 linhas e 3 colunas, com conteúdo alinhado e justificado ao centro;
- definição da classe **escondido**, que esconde elementos da apresentação, utilizado no botão de jogar novamente e nos textos de "Vez de:" e "Vencedor".

## velha.js
Define **Velha**, a classe de modelo do jogo da velha. Elementos importantes são:
- atributos **\_jogador_1**, **\_jogador_2**, **\_jogador_x**, **\_jogador_o**. Os atributos **\_jogador_1/2**, definem que é o jogador "da esquerda ou da direita" na interface. Os atributos **\_jogador_x/o** definem quem é o "x" e quem é "o", portanto, também definem quem vai começar, porque no jogo da velha sempre se começa por "x". No fim de cada jogo, são invertidos jogadores "x" e "o", porém jogadores "1" e "2" não se altera;
- atributo de **\_placar**. É um objeto, usado como uma tabela, que armazena o placar dos jogadores. O armazenamento se baseia nos valores de **\_jogador_1** e **\_jogador_2**;
- atributo que armezena o tabuleiro, **\_tabuleiro** é um vetor bidimensional _3X3_. Uma posição quando 0 indica vazio, quando 1 indica "x" e quando 2 inidica "o" no tabuleiro;
- atributo **\_movimentos** indica o número de movimentos já feitos na partida. Serve para saber se o tabuleiro está cheio;
- atributo **\_vez** indica de quem é a vez. Se 1, é a vez do jogador "x", se 2, vez do jogador "o";
- método **iniciar()**. Inicializa a partida;
- método **jogar(linha, coluna)**. Adiciona "x" ou "o" (dependendo de **\_vez**) na posição definida pelos parametros se a posição estiver vazia e a partida não estiver terminada. Se adicionou, incrementa **\_movimentos** e alterna **\_vez** e verifica o fim da partida. Retorna se adicionou ou não;
- método **verificar_fim()**. Verifica o fim da partida, e: 
  - se há um vencedor, atribui o nome à **\_vencedor**;
  - se o tabuleiro estiver cheio e não há vencedor, atribui "Velha" à **\_vencedor**;
- método **tabuleiro_cheio()**. Verifica se **\_movimentos** é 9;
- método **inverter_jogadores()**. Inverte os valores de **\_jogador\_x** e **\_jogador\_o**
- **get vez()**. Retorna o nome do jogador que deve jogar neste turno;
- **set jogador_1(novo_nome)** e **set jogador_2(novo_nome)**. Altera o nome do jogador. Trata a substituição dos valores em **\_jogador\_x** ou **\_jogador\_o**, em **\_vencedor** e em **\_placar**;
- método **posicao(linha, coluna)**. Retorna que valor está presente naquela posição do tabuleiro. Valores possíveis são 'x', 'o' ou ' '.

## velha-controle.js
Seu construtor recebe o documento que descreve à interface com o usuário. Os elementos necessários para interação são extraídos e armazenados em atributos.
Uma instância de **Velha** é armazenada em **\_velha**, _listeners_ dos eventos da interface são criados e é iniciado o jogo. 
Os métodos da classe são:
- **apresentarTabuleiro()**. Atualiza o elemento de tabuleiro na interface gráfica com os valores contidos no modelo;
- **atualizarNome()**. Atualiza à aréa que apresenta ou o jogador atual, ou o vencedor, ou velha a partir do atributo **vencedor** do modelo. Se há algum valor no modelo, então a partida acabou, e da visibilidade ao botão de "Jogar novamente";
- **editarJogadores()**. Obtem os nomes dos campos na interface gráfica e atualiza o modelo. Além disso, faz a chamada de **atualizarNome()**, para manter a consistência da interface. No construtor, essa função é adicionada à _listeners_ de modificação dos campos de nome;
- **atualzarPlacar()**. Atualiza a interface gráfica com os dados de placar do modelo;
- **clicarCelula(i,j)**. Função que realiza uma jogada na celula _ixj_ do tabuleiro. Se o modelo indicou que a jogada foi executada (**\_velha.jogar(i, j)** indicar que foi adicianado valor na posição), **atualizarNome()**, **this.apresentarTabuleiro()** são chamadas. Se a jogada provocou o fim da partida (**\_velha.vencedor** tem um valor definido diferente de nulo) também é chamado **atualzarPlacar()**, já que possívelmente o valor do placar se alterou. No construtor, essa função é adicionada à _listeners_ de clique de cada célula do tabuleiro;
- **iniciar()**. São chamados **\_velha.iniciar()**, **this.atualizarNome()** e **this.apresentarTabuleiro()**. É chamada na construção e adicionada à _listener_ de clique do botão de "Jogar novamente".
