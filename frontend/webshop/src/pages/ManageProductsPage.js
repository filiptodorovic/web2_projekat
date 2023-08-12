import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import '../index.css';

const ManageProductsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'DC-9',
      price: 23.0,
      quantity: 50,
      description: 'Description for Product 1',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/NWA_DC-9_%28278668845%29.jpg',
    },
    {
      id: 2,
      name: 'DC-10',
      price: 50.0,
      quantity: 20,
      description: 'Description for Product 1',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Continental_Airlines_DC-10.jpg',
    },
    {
      id: 3,
      name: 'DC-8',
      price: 40.0,
      quantity: 60,
      description: 'Description for Product 1',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Douglas_DC-8_NASA_%28cropped%29.jpg',
    },

    // Add more dummy products...
  ]);

  const [emptyProduct, setEmptyProduct] = useState({
    id: null,
    name: '',
    price: 0.0,
    quantity: 0,
    description: '',
    photoUrl: '',
  });

  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: '',
    price: 0.0,
    quantity: 0,
    description: '',
    photoUrl: '',
  });

  const handleShowModal = () => setShowModal(true);

  const handleAddProduct = () => {
    setEditedProduct(emptyProduct); // Reset editedProduct state
    setShowModal(true);
  };
  
  const handleEditProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      setEditedProduct({
        ...productToEdit,
        photoFile: null, // Reset the photoFile property when editing
      });
      setShowModal(true);
    }
  };
  
  const handleCloseModal = () => {
    setEditedProduct(emptyProduct); // Reset editedProduct state
    setShowModal(false);
  };

  const handlePhotoUpload = () => {
    // Implement add product logic here
  };

  const handleRemoveProduct = (id) => {
    // Implement remove product logic here
  };

  return (
    <Container>
      <h2 className="page-heading text-center manage-products-heading">Manage Products</h2>
      <Button variant="primary" onClick={handleAddProduct}>
        Add Product
      </Button>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleEditProduct(product.id)}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>{editedProduct.id ? 'Edit Product' : 'Add Product'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
    <Form.Group controlId="productPhoto">
      {/* Display a small image preview */}
      {(editedProduct.photoFile || editedProduct.photoUrl) && (
        <div className="image-preview">
          <img
            src={editedProduct.photoFile
              ? URL.createObjectURL(editedProduct.photoFile)
              : editedProduct.photoUrl}
            alt="Product Preview"
            className="small-image-preview"
          />
        </div>
      )}
      </Form.Group>
      <Form.Group controlId="productName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={editedProduct.name}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, name: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="productPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          placeholder="Enter product price"
          value={editedProduct.price}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, price: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="productQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product quantity"
          value={editedProduct.quantity}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, quantity: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="productDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter product description"
          value={editedProduct.description}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, description: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="productDescription">
        <Form.Label>Change Photo</Form.Label>
        <Form.Control
        type="file"
        accept=".jpg, .jpeg, .png" // Allow only image file types
        onChange={handlePhotoUpload}
        />
      </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddProduct}>
          {editedProduct.id ? 'Save Changes' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>

    </Container>
  );
};

export default ManageProductsPage;
