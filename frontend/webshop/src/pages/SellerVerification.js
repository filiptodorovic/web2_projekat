import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import '../index.css';

const SellerVerificationPage = () => {
  const sellers = [
    {
      email: 'seller1@example.com',
      username: 'seller1',
      verificationStatus: 'Verified',
    },
    {
      email: 'seller2@example.com',
      username: 'seller2',
      verificationStatus: 'Denied',
    },
    {
        email: 'seller2@example.com',
        username: 'seller2',
        verificationStatus: 'Pending',
    }
  ];


  const handleApprove = (email) => {
  };

  const handleDeny = (email) => {
  };

  return (
    <Container className='seller-verification'>
        <div className='text-center'>
            <h2>Seller Verification</h2>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Approve/Deny</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.email}>
              <td>{seller.email}</td>
              <td>{seller.username}</td>
              <td>{seller.verificationStatus}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleApprove(seller.email)}
                  disabled={seller.verificationStatus === 'Verified'}
                >
                  Approve
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeny(seller.email)}
                  disabled={seller.verificationStatus === 'Denied'}
                >
                  Deny
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SellerVerificationPage;
