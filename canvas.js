//variaveis

//pegar o canvas criado no html e seu contexto em 2d
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//atribuir a Altura e Largura o tamanho do canvas
var Altura = canvas.height;
var Largura = canvas.width;


//Objeto = chao do cenario (atributos e metodos)
var chao = {
	y: 550,
	altura: 50,
	desenha: function(){
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,this.y, Largura, this.altura);
	}

};

//Objeto = personagem (atributos e metodos)
var personagem = {
	x: 250,
	y:0,
	altura:80,
	largura:50,
	//após atribuir os valores referentes a tamanho é necessário variaveis para o pulo do personagem acontecer
	gravidade:1.0,
	velocidade:0,
	forcaPulo:15,
	qntPulo:0,

	atualiza: function(){
		//a gravidade inplementa a velocidade, para o persongame poder cair e pular
		this.velocidade += this.gravidade;
		this.y += this.velocidade;

		// para não passar do chão
		if (this.y > chao.y - this.altura){
			this.y = chao.y - this.altura;
			//quando atinge o chão zera o número de pulos
			this.qntPulo = 0;

		}
	},

	desenha: function(){
		ctx.fillStyle = "FF80BF";
		ctx.fillRect(this.x,this.y, this.largura, this.altura)
	},

	//metodo pular vai alterar o score e a velocidade do personagem devido a gravidade
	pula: function(){
		//altera a velocidade contra a gravidade
		this.velocidade = - this.forcaPulo;

		//limite de pulos
		this.qntPulo += 1
		}

};

// persoangem e fundo Imagem
//conferir  se ja foi feito o download da imagem a partir do link
var perReady = false;
var perImage = new Image();
perImage.onload = function() {
  perReady = true;
};
perImage.src = "pe.gif";

//conferir  se ja foi feito o download da imagem a partir do link
var funReady = false;
var funImage = new Image();
funImage.onload = function() {
  funReady = true;
};
funImage.src = "a.gif"


// evento do clique do mouse, chama o metodo pular do objeto personagem
function clique(evento){
	//chamar o metodo pulo do personagem
	personagem.pula();
}

//função principal
function main(){
	//evento
	document.addEventListener("mousedown", clique);

	//chamar o loop
	loop();
}

//função loop atualiza e desenha para sempre
function loop(){
	//atualiza o jogo e desenha
	atualiza();
	desenha();


	//para torna infinito, sempre se auto chamar
	window.requestAnimationFrame(loop);
}

//função atualiza
function atualiza (){
	//atualizar o personagem
	personagem.atualiza();
}

//função desenha
function desenha(){
	//borda
	canvas.style.border = "1px solid #000";
	//conferi se a imagem já está pronta, caso esteja desenha-a
 	if (funReady) {
    	ctx.drawImage(funImage, 0, 0, Largura, Altura);
  	}
  	if (perReady) {
    ctx.drawImage(perImage, personagem.x, personagem.y, 50, 80);
  	}

 	//Score
  	ctx.fillStyle = "#FFF4F9";
  	ctx.font = "45px Roboto";
  	ctx.fillText("Score: " + personagem.qntPulo, 250, 50);
  

	//desenhar o chao
	chao.desenha();

}

//inicia
main();