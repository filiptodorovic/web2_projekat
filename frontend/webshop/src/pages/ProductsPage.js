import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import {getAllProducts} from '../services/ProductService'

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data.$values);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    // Check if the product is already in the cart
    const existingProduct = cartItems.find((item) => item.product.productId === product.productId);
  
    if (existingProduct) {
      // If the product exists, increase the quantity
      const updatedCart = cartItems.map((item) =>
        item.product.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // If the product is new, add it to the cart
      setCartItems([...cartItems, { product: product, quantity: 1 }]);
      setCartItems([...cartItems, { product: product, quantity: 1 }]);

    }
    console.log('Cart items:', cartItems);
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter(item => item.productId !== product.productId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      const updatedCart = cartItems.map(item => (
        item.product.id === product.productId ? { ...item, quantity: newQuantity } : item
      ));
      setCartItems(updatedCart);
    }
  };

  return (
    <Container>
      <h2 className="page-heading text-center manage-products-heading">Product Page</h2>
      <Row>
        {products.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard key={product.id} product={product} addToCart={() => addToCart(product)} />
        </Col>
        ))}
      </Row>
      <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>
    </Container>
  );
};

export default ProductPage;