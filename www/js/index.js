fetch('js/backend.json')
.then(response => response.json())
.then (data => {
    //salvar os dados vindo do Back end localmente
    //Vamos utilizar localstorage
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Dados dos produtos salves no LocalStore');
    //esvaziar a área de produtos
    $("#produtos").empty();
    data.forEach(produto =>{
        var produtoHTML = `                                   <div class="item-card">
                                            <a data-id="${produto.id} href="#" class="item">
                                                    <div class="img-container">
                                                        <img src="${produto.imagem}">
                                                    </div>
                                                    <div class="nome-rating"></div>
                                                        <span class="color-gray">${produto.nome} </span>
                                                        <span class="bold margin-right">
                                                            <i class="mdi mdi-star"></i>
                                                            ${produto.rating}
                                                        </span>
                                               <div class="price bold">${produto.preco_promocional.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'})}</div>         
                                            </a>
                                        </div>
                                        `;

                                        $("#produtos").append(produtoHTML);
        
    });
            $(".item").on('click', function() {
                var id = $(this).attr('data-id');
                localStorage.setItem('detalhe', id);
                app.views.main.router.navigate('/detalhes/');
            });
})
.catch (error => console.error ('Erro ao fazer fetch dos dados: '+error) );

//ver quantos itens tem no carrinho
setTimeout(() =>{
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [] ;

    //alimentar o contador da sacola
    $('.btn-cart').attr('data-count', carrinho.length);

},300);
