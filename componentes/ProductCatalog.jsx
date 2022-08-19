
import React from 'react';
import ReactDom from 'react-dom';
import InfoModal from './InfoModal';


export default function ProductCatalog({ produto = null, shoppingCart = null }) {
    function addToCart(){
        const root = ReactDom.createRoot(document.getElementById('container'));

        let cartItem = shoppingCart.produtosAdicionados.find( item => item.id === produto.id );
        if (cartItem !== undefined){
            const infoModal = React.createElement(InfoModal, null, 'O produto já se encontra no carrinho!');
            root.render(infoModal);
            return;
        }

        shoppingCart.produtosAdicionados.push(produto);
        const infoModal = React.createElement(InfoModal, null, 'O produto ' + produto.nome + ' foi adicionado ao carrinho');
        root.render(infoModal);
    }

	return (
		<>
			<style jsx>{`
                .rounded-corners {
                    overflow: hidden;
                    border-radius: 10px;
                    background-color:silver;
                }

                .vertical-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
            
                .productImage {
                    height: 290px;
                }
            
                .roundIcon {
                    border: 0px;
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                }
            
                .roundIcon:hover {
                    background-color: #FF8C00;
                }
            
                .addToCart {
                    position: absolute;
                    bottom: 90px;
                    right: 30px;
                    background-image: url('icons/cart.svg');
                    background-color: #00AAFF;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 65%;
                }            
			`}</style>

            <div className='vertical-container rounded-corners'>
                <img className='productImage' src={"data:" + produto.formatoImagem + ", " + produto.foto} alt={produto.nome}></img>
                <h2> {produto.nome} </h2>
                <p> {produto.descricao} </p>
                <p> Preço: R$ {produto.preco} </p>
                <button className='roundIcon addToCart' onClick={addToCart} />
            </div>
		</>
	);
}
