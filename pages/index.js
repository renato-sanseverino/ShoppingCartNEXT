import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { Button, Drawer, Dialog } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { ProductForm } from '../componentes/ProductForm';
import { CartItemList } from '../componentes/CartItemList';
import ProductCatalog from '../componentes/ProductCatalog';


export default function Home() {
  const [dadosProdutos, setDadosProdutos] = useState();
  const [carrinho, setCarrinho] = useState();

  const getDadosProdutos = async () => {
    const response = await fetch("api/produtos")
    .then((response) => response.json());

    setDadosProdutos(response);
  }

  const getCarrinho = async () => {
    const response = await fetch("api/carrinho")
    .then((response) => response.json());

    setCarrinho(response);
  }

  useEffect(() => {
    getDadosProdutos();
    getCarrinho();
  }, []);

  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  const [open, setOpen] = useState(false);
  function openForm() { setOpen(true) }
  function closeForm() { setOpen(false) }

  return (
    <div className={styles.container}>
        <header>
          <div id="container"></div>
          <ShoppingCart style={{color: 'blue'}} onClick={toggle}></ShoppingCart>
          <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={openForm} >Don´t</Button>
          <Dialog open={open} onClose={closeForm} >
                <ProductForm dialogRef={{ closeForm }} />
          </Dialog>
          <Drawer open={show} anchor={'right'} onClose={toggle}>
            <h4 className='p-8 text-2xl font-bold' >Carrinho { carrinho && carrinho.cliente }</h4>
            <CartItemList carrinho={carrinho}></CartItemList>
          </Drawer>
        </header>
        <main className={styles.main}>
            <div className={styles.grid}>{
                dadosProdutos &&
                dadosProdutos.map((produto) => (<div className={styles.card} key={produto.id}>
                    <ProductCatalog produto={produto} shoppingCart={carrinho}></ProductCatalog>
                </div>))
            }</div>
        </main>
        <footer className={styles.footer}>
            <h5 className='text-lg font-bold' >Projeto desenvolvido utilizando NEXT.js</h5>
        </footer>
    </div>
  )
}
