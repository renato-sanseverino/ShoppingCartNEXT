import CartItem from './CartItem';
import { useState, useEffect } from 'react';


export const CartItemList = ({ carrinho }) => {
    const [products, setProducts] = useState([]);

    const getItems = () => {
        if (!carrinho) {
            setProducts([]);
            return;
        }

        setProducts(carrinho.produtosAdicionados);
    }

    useEffect(() => {
        getItems();
    }, []);

	return (
		<div style={{padding: '20px'}}>{
                carrinho && products.map((produto) => (
                    <div key={produto.id}>
                        <CartItem produto={produto} shoppingCart={carrinho} parentRef={{getItems}}></CartItem>
                    </div>
                )
            )}
		</div>
	)
}
