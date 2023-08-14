import React, { useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';

const ShoppingCart = ({cartItems,removeFromCart,updateQuantity,setCartItems}) => {
  // const [address, setAddress] = useState('');
  // const [comment, setComment] = useState('');

  // const removeFromCart = (product) => {
  //   // Implement the remove from cart logic here
  // };

  // const updateQuantity = (product, newQuantity) => {
  //   // Implement the update quantity logic here
  // };

  // const calculateTotalAmount = () => {
  //     //return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  //     return 0;
  // };

  // const handleCheckout = () => {
  //   // Implement the checkout logic here
  // };


const [address, setAddress] = useState('');
const [comment, setComment] = useState('');

const calculateTotalAmount = () => {
  
  return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

const handleCheckout = () => {
  // Implement checkout logic here (e.g., sending the order to the server)
  console.log('Checkout:', cartItems, address, comment);
  // Clear the cart and reset fields after checkout
  setCartItems([]);
  setAddress('');
  setComment('');
};

return (
  <Container className="auth-page-container">
    <h4>Shopping cart</h4>
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems && cartItems.map((item) => (
          <tr key={item.product.id}>
            <td>{item.product.name}</td>
            <td>${item.product.price.toFixed(2)}</td>
            <td>
              <Button variant="outline-primary" onClick={() => updateQuantity(item, item.quantity - 1)}>-</Button>
              <span className="mx-2">{item.quantity}</span>
              <Button variant="outline-primary" onClick={() => updateQuantity(item, item.quantity + 1)}>+</Button>
            </td>
            <td>${(item.product.price * item.quantity).toFixed(2)}</td>
            <td>
              <Button variant="danger" onClick={() => removeFromCart(item)}>Remove</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <h4 className="mt-4">Delivery Information</h4>
    <Form>
      <Form.Group controlId="deliveryAddress">
        <Form.Label>Delivery Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="deliveryComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter delivery comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
    </Form>

    <div className="total-amount">
     <h4>Total Amount: ${calculateTotalAmount().toFixed(2)}</h4>
    </div>

    <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
  </Container>
);
};

export default ShoppingCart;