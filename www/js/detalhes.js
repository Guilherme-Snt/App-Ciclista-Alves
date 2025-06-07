//Recuperar o id detalhe no localstorage
var id = parseInt(localStorage.getItem('detalhe'));

//pegar os produtos do localstorage
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

if(item){
    //tem o item
    console.log('Produto encontrado:',item);

    //alimentar os campos
    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
     $("#reviews-detalhe").html(item.reviews +'reviews');
     $("#descricao-detalhe").html(item.descricao);
     $("#preco-detalhe").html(item.preco.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'}));
     $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'}));

     var tabelaDetalhes = $("#tabdetalhes");

     item.detalhes.forEach(detalhe=> {
                var linha = `  
                        <tr>
                           <td>${detalhe.caracteristica}</td>
                           <td>${detalhe.detalhes}</td>
                        </tr>
                        `;

                        tabelaDetalhes.append(linha);
     });

}else{
    //não tem o item
    console.log('Não foi encontrado');
}


var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

//função para adicionar ao carrinho
function adicionarAoCarrinho(item, quantidade){
    var itemNoCarrinho = carrinho.find(c=> c.item.id === item.id);

    if(itemNoCarrinho){
        //ja tem o item no carrinho
        // adcionar a quantidade
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional
    }else{
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade* item.preco_promocional,
        })
    }

    //atualizar o localstorage de carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

}

//cliclou no add cart
    $(".add-cart").on('click',function () {
        //ADD AO CARRINHO
        adicionarAoCarrinho(item, 1);

      var  toastCenter = app.toast.create({
          text: `${item.nome} adicionado ao carrinho`,
          position: 'center',
          closeTimeout: 2000,
        });

        toastCenter.open();
})
