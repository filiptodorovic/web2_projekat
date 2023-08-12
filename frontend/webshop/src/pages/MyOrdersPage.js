import React,  { useState, useEffect } from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';

const MyOrdersPage = () => {
  const orders = [
    {
        id: 1,
        timestamp: '2023-08-27 12:30 PM',
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          address: '123 Main St, City',
        },
        comment: 'Please deliver before 5 PM',
        items: [
          { name: 'Product 1', quantity: 2, price: 10.0 },
          { name: 'Product 2', quantity: 3, price: 15.0 },
        ],
        totalAmount: 55.0,
      },
      {
        id: 2,
        timestamp: '2023-08-28 2:45 PM',
        customer: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          address: '456 Elm St, Town',
        },
        comment: 'Handle with care',
        items: [
          { name: 'Product 3', quantity: 1, price: 20.0 },
          { name: 'Product 4', quantity: 2, price: 25.0 },
        ],
        totalAmount: 70.0,
      },
      {
        id: 3,
        timestamp: '2023-08-30 12:00 AM',
        customer: {
          name: 'Michael Johnson',
          email: 'michael@example.com',
          address: '789 Oak Ave, Village',
          
        },
        comment: '',
        items: [
          { name: 'Product 2', quantity: 5, price: 15.0 },
        ],
        totalAmount: 75.0,
      }
  ];

  return (
    <Container>
      <h2 className="page-heading text-center manage-products-heading">My Orders</h2>
      <Accordion>
        {orders.map((order,index) => (
            <Accordion.Item eventKey={index}>
            <Accordion.Header>Order id: {order.id}</Accordion.Header>
            <Accordion.Body>
            <Card key={order.id}>
              <Card.Body>
                <p>Customer Name: {order.customer.name}</p>
                <p>Customer Email: {order.customer.email}</p>
                <p>Delivery Address: {order.customer.address}</p>
                <p>Comment: {order.comment}</p>
                <h5>Ordered Items:</h5>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.name} - ${item.price.toFixed(2)} each
                    </li>
                  ))}
                </ul>
                <p>Total Amount Paid: ${order.totalAmount.toFixed(2)}</p>
                <p> Delivered</p>
              </Card.Body>
            </Card>
          </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default MyOrdersPage;
