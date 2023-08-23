import React,  { useState, useEffect } from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import {getAllOrders} from '../services/OrderService'

const AllOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getAllOrders();
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
      <h2 className="page-heading text-center manage-products-heading">All Orders</h2>
      <Accordion>
        {orders.map((order, index) => (
          <Accordion.Item key={order.orderId} eventKey={index}>
            <Accordion.Header>Order id: {order.orderId}</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <p><strong>User ID: </strong>{order.userId}</p>
                  <p><strong>Address: </strong>{order.address}</p>
                  <p><strong>Comment: </strong>{order.comment}</p>
                  <p><strong>Is Cancelled: </strong>{order.isCancelled ? 'Yes' : 'No'}</p>
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
                <p><strong>Total Amount Paid: </strong>${order.totalCost.toFixed(2)}</p>
                <p><strong>Time until delivery: </strong>{order.isCancelled ? "ORDER CANCELLED" : calculateRemainingTime(order.timeOrdered)}</p>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default AllOrdersPage;