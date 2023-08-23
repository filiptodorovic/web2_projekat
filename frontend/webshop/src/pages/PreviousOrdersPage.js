import React,  { useState, useEffect } from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import {getAllUserOrders,cancelOrder} from '../services/OrderService';
import Order from '../models/Order'

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getAllUserOrders();
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
  
  const handleCancelOrder = async (orderId) => {
    console.log(`Canceling order with ID: ${orderId}`);
    try {
      const order = new Order(
        orderId,
        new Date(),
        "",
        "",
        0,
        0,
        null
      );
  
      const response = await cancelOrder(order);
      console.log('Login response:', response.data.$values);
      setOrders(response.data.$values);
    } catch (error) {
      if(error.response.data)
        alert(`[Error]: ${JSON.stringify(error.response.data.message)}`);
      else
        alert("[ERROR]");
      console.log(error);
    }
  };

  return (
    <Container>
      <h2 className="page-heading text-center manage-products-heading">Previous Orders</h2>
      <Accordion>
        {orders.map((order) => (
            <Accordion.Item eventKey={order.orderId}>
            <Accordion.Header>Order id: {order.orderId}</Accordion.Header>
            <Accordion.Body>
            <Card key={order.orderId}>
              <Card.Body>
                <p>Delivery Address: {order.address}</p>
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
                <p><strong>Total Amount Paid: </strong>${order.totalCost.toFixed(2)}</p>
                <p><strong>Time until delivery: </strong>{calculateRemainingTime(order.timeOrdered)}</p>
                <Button
                  variant={calculateRemainingTime(order.timeOrdered)==='Delivered' ? "primary" : "danger"}
                  onClick={() => handleCancelOrder(order.orderId)}
                  disabled={calculateRemainingTime(order.timeOrdered)==='Delivered'} // Disable the button if the order is delivered
                  >
                  {calculateRemainingTime(order.timeOrdered)==='Delivered' ? 'Order Delivered' : 'Cancel Order'}
                </Button>
              </Card.Body>
            </Card>
          </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default PreviousOrdersPage;
