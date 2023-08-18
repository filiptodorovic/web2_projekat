import React, { useEffect,useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import '../index.css';
import {getAllSellers,approveSeller,denySeller} from '../services/UserService'

const SellerVerificationPage = () => {
  // const sellers = [
  //   {
  //     email: 'seller1@example.com',
  //     username: 'seller1',
  //     verificationStatus: 'Verified',
  //   },
  //   {
  //     email: 'seller2@example.com',
  //     username: 'seller2',
  //     verificationStatus: 'Denied',
  //   },
  //   {
  //       email: 'seller2@example.com',
  //       username: 'seller2',
  //       verificationStatus: 'Pending',
  //   }
  // ];
  const [sellers, setSellers] = useState([]);

  const handleApprove = async (email) => {
    try {
      // Fetch the seller data based on email or another identifier
      const sellerToApprove = sellers.find((seller) => seller.email === email);
      if (!sellerToApprove) {
        console.error(`Seller with email ${email} not found.`);
        return;
      }

      const dataToSend = {
        Email: sellerToApprove.email,
        Username: sellerToApprove.username,
        VerificationStatus: sellerToApprove.verificationStatus,
      };

      // Perform the seller approval logic
      const response = await approveSeller(dataToSend);
      // Handle success or update UI accordingly
      setSellers(response.data.$values);
    } catch (error) {
      console.error('Error approving seller:', error.response.data.message);
      alert("[ERROR]:" + error.response.data.message);

      // Handle error or update UI accordingly
    }
  };

  const handleDeny = async (email) => {
    try {
      // Fetch the seller data based on email or another identifier
      const sellerToDeny = sellers.find((seller) => seller.email === email);
      if (!sellerToDeny) {
        console.error(`Seller with email ${email} not found.`);
        return;
      }

      const dataToSend = {
        Email: sellerToDeny.email,
        Username: sellerToDeny.username,
        VerificationStatus: sellerToDeny.verificationStatus,
      };

      // Perform the seller denial logic
      const response = await denySeller(dataToSend);
      // Handle success or update UI accordingly
      setSellers(response.data.$values);
    } catch (error) {
      console.error('Error denying seller:', error.response.data.message);
      alert("[ERROR]:" + error.response.data.message);
      // Handle error or update UI accordingly
    }
  };

  const getVerificationStatus = (param) => {
    switch(param) {
      case 0:
        return 'Approved';
      case 1:
        return 'Denied';
      case 2:
        return 'Pending';
      default:
        return 'Buyer';
    }
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await getAllSellers();
        console.log(response);
        console.log(response.data.$values);

        setSellers(response.data.$values);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

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
              <td>{getVerificationStatus(seller.verificationStatus)}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleApprove(seller.email)}
                  disabled={seller.verificationStatus === 0}
                >
                  Approve
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeny(seller.email)}
                  disabled={seller.verificationStatus === 1}
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
