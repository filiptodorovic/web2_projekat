import React,{useState} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import ShoppingCart from './ShoppingCart';

const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 10.0,
      description: 'Description for Product 1',
      seller: 'Seller A',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/NWA_DC-9_%28278668845%29.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 15.0,
      description: 'Description for Product 2',
      seller: 'Seller B',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Continental_Airlines_DC-10.jpg',
    },
    {
        id: 3,
        name: 'Product 2',
        price: 15.0,
        description: 'Description for Product 2',
        seller: 'Seller B',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Douglas_DC-8_NASA_%28cropped%29.jpg',
    },
    {
        id: 4,
        name: 'Product 1',
        price: 10.0,
        description: 'Description for Product 1',
        seller: 'Seller A',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Delta_Air_Lines_Boeing_737-832%3B_N3747D%40LAX%3B10.10.2011_622in_%286482376485%29.jpg',
      },
      {
        id: 5,
        name: 'Product 2',
        price: 15.0,
        description: 'Description for Product 2',
        seller: 'Seller B',
        photoUrl: 'https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2022/02/N727US_Boeing_727-223_Advanced_of_USAJet.jpeg',
      },
      {
          id: 6,
          name: 'Product 2',
          price: 15.0,
          description: 'Description for Product 2',
          seller: 'Seller B',
          photoUrl: 'https://cdn.airlines-inform.ru/upload/iblock/fa3/Boeing-717.JPG',
      },
      {
        id: 7,
        name: 'Product 1',
        price: 10.0,
        description: 'Description for Product 1',
        seller: 'Seller A',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Icelandair_Boeing_757-200_Wedelstaedt.jpg',
      },
      {
        id: 8,
        name: 'Product 2',
        price: 15.0,
        description: 'Description for Product 2',
        seller: 'Seller B',
        photoUrl: 'https://i.insider.com/62e54262205f7500187a11bc?width=1000&format=jpeg&auto=webp',
      },
      {
          id: 9,
          name: 'Product 2',
          price: 15.0,
          description: 'Description for Product 2',
          seller: 'Seller B',
          photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Emirates_B777-300ER_%28A6-ECU%29_%40_FCO%2C_July_2011.jpg',
      },
  ];

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    // Check if the product is already in the cart
    const existingProduct = cartItems.find((item) => item.product.id === product.id);
  
    if (existingProduct) {
      // If the product exists, increase the quantity
      const updatedCart = cartItems.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
    const updatedCart = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCart);
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      const updatedCart = cartItems.map(item => (
        item.id === product.id ? { ...item, quantity: newQuantity } : item
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