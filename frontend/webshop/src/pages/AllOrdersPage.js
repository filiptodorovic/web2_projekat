import React,  { useState, useEffect } from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import {getAllOrders} from '../services/OrderService'

const AllOrdersPage = () => {
  // const orders = [
  //   {
  //       id: 1,
  //       timestamp: '2023-08-27 12:30 PM',
  //       customer: {
  //         name: 'John Doe',
  //         email: 'john@example.com',
  //         address: '123 Main St, City',
  //       },
  //       comment: 'Please deliver before 5 PM',
  //       items: [
  //         { name: 'Product 1', quantity: 2, price: 10.0 },
  //         { name: 'Product 2', quantity: 3, price: 15.0 },
  //       ],
  //       totalAmount: 55.0,
  //     },
  //     {
  //       id: 2,
  //       timestamp: '2023-08-28 2:45 PM',
  //       customer: {
  //         name: 'Jane Smith',
  //         email: 'jane@example.com',
  //         address: '456 Elm St, Town',
  //       },
  //       comment: 'Handle with care',
  //       items: [
  //         { name: 'Product 3', quantity: 1, price: 20.0 },
  //         { name: 'Product 4', quantity: 2, price: 25.0 },
  //       ],
  //       totalAmount: 70.0,
  //     },
  //     {
  //       id: 3,
  //       timestamp: '2023-07-30 12:00 AM',
  //       customer: {
  //         name: 'Michael Johnson',
  //         email: 'michael@example.com',
  //         address: '789 Oak Ave, Village',
          
  //       },
  //       comment: '',
  //       items: [
  //         { name: 'Product 2', quantity: 5, price: 15.0 },
  //       ],
  //       totalAmount: 75.0,
  //     },
  //     {
  //       id: 4,
  //       timestamp: '2023-07-24 12:00 AM',
  //       customer: {
  //         name: 'Michael Johnson',
  //         email: 'michael@example.com',
  //         address: '789 Oak Ave, Village',
          
  //       },
  //       comment: 'Some comment',
  //       items: [
  //         { name: 'Product 2', quantity: 5, price: 15.0 },
  //       ],
  //       totalAmount: 75.0,
  //     },
  //     {
  //       id: 5,
  //       timestamp: '2023-07-20 12:00 AM',
  //       customer: {
  //         name: 'Michael Korsnon',
  //         email: 'michael@example.com',
  //         address: '789 Oak Ave, Village',
          
  //       },
  //       comment: 'Korsnon',
  //       items: [
  //         { name: 'Product 2', quantity: 5, price: 15.0 },
  //       ],
  //       totalAmount: 75.0,
  //     }
  // ];


  const [orders, setOrders] = useState([]);
  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        console.log(response);
        setOrders(response.data.$values);
        //console.log("Orders: ",response.data.$values);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const interval = setInterval(() => {
      const now = new Date();
      const updatedRemainingTime = {};

      orders.forEach((order) => {
        const deliveryTime = new Date(order.timestamp);
        const timeDiff = deliveryTime - now;

        if (timeDiff <= 0) {
          updatedRemainingTime[order.id] = 'Delivered';
        } else {
          const hours = Math.floor(timeDiff / 3600000);
          const minutes = Math.floor((timeDiff % 3600000) / 60000);
          const seconds = Math.floor((timeDiff % 60000) / 1000);
          updatedRemainingTime[order.id] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });
      fetchOrders();
      setRemainingTime(updatedRemainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

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
                  <p>Address: {order.address}</p>
                  <p>Comment: {order.comment}</p>
                  <p>Is Cancelled: {order.isCancelled ? 'Yes' : 'No'}</p>
                  <p>Time Ordered: {order.timeOrdered}</p>
                  <p>Total Cost: ${order.totalCost.toFixed(2)}</p>
                  <p>User ID: {order.userId}</p>
                  <h5>Ordered Items:</h5>
                  {/* <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.productId}>
                        Product ID: {item.productId}, Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul> */}
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