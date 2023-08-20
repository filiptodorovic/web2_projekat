import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={product.pictureUrl} />
      <Card.Body className="card-body-product">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Seller: {product.seller}</Card.Text>
        <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
