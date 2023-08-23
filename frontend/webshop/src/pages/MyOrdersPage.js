import React,  { useState, useEffect } from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import { getAllSellerOldOrders } from '../services/OrderService';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getAllSellerOldOrders();
        setOrders(response.data.$values);
        console.log(response.data.$values);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    getOrders();
  }, []);

  const calculateRemainingTime = (orderTimestamp) => {
    const deliveryTime = new Date(orderTimestamp);
    deliveryTime.setHours(deliveryTime.getHours() + 1); // Add 1 hour to order timestamp
    const now = new Date();
    
    if (now >= deliveryTime) {
      return 'Delivered';
    } else {
      const timeDiff = deliveryTime - now;
      const hours = Math.floor(timeDiff / 3600000);
      const minutes = Math.floor((timeDiff % 3600000) / 60000);
      const seconds = Math.floor((timeDiff % 60000) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  };

  return (
    <Container>
      <h2 className="page-heading text-center manage-products-heading">My Orders</h2>
      <Accordion>
        {orders.map((order,index) => (
            <Accordion.Item eventKey={index}>
            <Accordion.Header>Order id: {order.orderId}</Accordion.Header>
            <Accordion.Body>
            <Card key={order.orderId}>
              <Card.Body>
                {/* <p>Customer Name: {order.customer.name}</p>
                <p>Customer Email: {order.customer.email}</p>
                <p>Delivery Address: {order.customer.address}</p> */}
                <p>Comment: {order.comment}</p>
                <h5>Ordered Items:</h5>
                <ul>
                    {order.orderItems.$values.map((item) => (
                      <li key={item.$id}>
                        {item.product ? (
                          `${item.quantity}x ${item.product.name} - $${item.product.price.toFixed(2)} each`
                        ) : (
                          `Product information not available`
                        )}
                      </li>
                    ))}
                  </ul>
                  <p><strong>Delivery status: </strong>{order.isCancelled ? "ORDER CANCELLED" : "DELIVERED"}</p>
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
