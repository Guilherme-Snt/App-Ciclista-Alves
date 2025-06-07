// Recupera o carrinho do localStorage
var localCarrinho = localStorage.getItem('carrinho');
var carrinho = [];

if (localCarrinho) {
    carrinho = JSON.parse(localCarrinho);
    if (carrinho.length > 0) {
        renderizarCarrinho();
        calcularTotal();
    } else {
        carrinhoVazio();
    }
} else {
    carrinhoVazio();
}

function renderizarCarrinho() {
    $('#listaCarrinho').empty();

    if (carrinho.length === 0) {
        carrinhoVazio();
        return;
    }

    $.each(carrinho, function(index, itemCarrinho) {
        var itemDiv = `
            <div class="item-carrinho">
                <div class="area-img">
                    <img src="${itemCarrinho.item.imagem}" alt="Imagem do produto">
                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="name-prod">${itemCarrinho.item.nome}</span>
                        <a data-index="${index}" class="delete-item" href="#">
                            <i class="mdi mdi-close"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemCarrinho.item.principal_caracteristica}</span>
                    </div>
                    <div class="preco-quantidade">
                        <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'})}</span>
                        <div class="count">
                            <a class="minus" data-index="${index}" href="#">-</a>
                            <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                            <a class="plus" data-index="${index}" href="#">+</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $("#listaCarrinho").append(itemDiv);
    });

    // Eventos dos botões
    $(".minus").off('click').on('click', function(e) {
        e.preventDefault();
        var index = $(this).data('index');
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            calcularTotal();
        } else {
            var itemname = carrinho[index].item.nome;
            app.dialog.confirm(`Gostaria de remover <strong>${itemname}</strong>?`, 'REMOVER', function() {
                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                renderizarCarrinho();
                calcularTotal();
            });
        }
    });

    $(".plus").off('click').on('click', function(e) {
        e.preventDefault();
        var index = $(this).data('index');
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotal();
    });

    $(".delete-item").off('click').on('click', function(e) {
        e.preventDefault();
        var index = $(this).data('index');
        var itemname = carrinho[index].item.nome;
        app.dialog.confirm(`Gostaria de remover <strong>${itemname}</strong>?`, 'REMOVER', function() {
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            calcularTotal();
        });
    });

    $("#toolbarTotais").removeClass('display-none');
    $("#toolbarCheckout").removeClass('display-none');
}

function calcularTotal() {
    var totalCarrinho = 0;
    $.each(carrinho, function(index, itemCarrinho) {
        totalCarrinho += (itemCarrinho.total_item || (itemCarrinho.quantidade * itemCarrinho.item.preco_promocional));
    });
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'}));
}

function carrinhoVazio() {
    $("#listaCarrinho").empty();
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');
    $("#listaCarrinho").html(`
        <div class="text-align-center empty-cart">
            <i class="mdi mdi-cart-off" style="font-size:48px;color:#ccc;"></i>
            <br>
            <span class="color-gray">Nada por enquanto...</span>
        </div>
    `);
}

// Esvaziar carrinho
$("#esvaziar").on('click', function(){
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho?','<strong>ESVAZIAR</strong> ',function(){
        localStorage.removeItem('carrinho');
        carrinho = [];
        renderizarCarrinho();
        calcularTotal();
    });
});
