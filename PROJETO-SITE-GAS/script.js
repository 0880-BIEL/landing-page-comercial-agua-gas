let carrinho = [];

function adicionarAoCarrinho(nome, preco, imagem){

    const ProdutoExistente = carrinho.find(item => item.nome === nome);
    if (ProdutoExistente){
        ProdutoExistente.quantidade +=1;
    }
    else {
        carrinho.push({nome: nome, preco: preco, imagem: imagem, quantidade: 1});
    }
    ExibirItens()

    const aviso = document.getElementById("notificacao");
    aviso.innerText = nome + " adicionado com sucesso! ✅";
    aviso.style.display = "block";
    setTimeout(function(){
        aviso.style.display = "none";
    }, 2000);
    ExibirItens()
    //atualizarContador();

}

function Vercarrinho(){

    document.getElementById("modal-carrinho").style.display = "block";
    ExibirItens();

}

function FecharCarrinho(){

    document.getElementById("modal-carrinho").style.display = "none";

}

function ExibirItens(){

    const lista = document.getElementById("Lista-Itens");
    const totalElemento = document.getElementById("Valor-Total");
    let soma = 0; 
    
    if (carrinho.length === 0){
        lista.innerHTML = `
        <div style= "text-aling: center; padding: 20px; color: #666;">
            <p style = "font-size: 1.2rem; font-weight: bold;">Seu carrinho está vazio 🛒</p>
            <p>Adicione água ou gás para continuar!</p>
        </div>
        `;
        totalElemento.innerHTML ="0.00";
        return;
    }
        
    lista.innerHTML = ""; 

    carrinho.forEach((item, index) => {
        lista.innerHTML += `
            <li class= "item-carrinho-card">
            
                <div class= "foto-produto">
                    <img src="${item.imagem}" alt="${item.nome}">
                </div>

                <div class = "detalhes-produto">
                    <span class="nome-produto-carrinho">${item.nome}</span>

                    <div class = "quantidade-produtos">
                        <button onclick = "QuantidadeItem(${index}, -1)"> - </button>
                        <span> ${item.quantidade}</span>
                        <button onclick = "QuantidadeItem(${index}, 1)"> + </button>
                    </div>

                    <span class="preco-produto-carrinho">R$ ${item.preco.toFixed(2)}</span>
                </div>

                <button class="btn-remover" onclick="removerDoCarrinho(${index})">
                    <span class="x-vermelho">✖</span> Remover
                </button>
            </li> `;
        soma += (item.preco * item.quantidade);

    })

    totalElemento.innerText = soma.toFixed(2);

}
function removerDoCarrinho(index){

    carrinho.splice(index, 1);
    console.log("Tentando remover o produto:,", index)
    //atualizarContador();
    ExibirItens();

}

function QuantidadeItem(index, mudanca){
    carrinho[index].quantidade += mudanca;

    if(carrinho[index].quantidade <1){
        removerDoCarrinho(index);
        return;
    }
    else{
        ExibirItens();
    }

}