import React, { useState,useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import '../index.css';
import Product from "../models/Product";
import { addProduct,getAllSellersProducts, removeProduct,updateProduct } from '../services/ProductService';

const ManageProductsPage = () => {

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [emptyProduct, setEmptyProduct] = useState(new Product(null, '', 0.0, 0, '', ''));
  const [editedProduct, setEditedProduct] = useState(new Product(null, '', 0.0, 0, '', ''));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllSellersProducts();
        setProducts(response.data.$values);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  
  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);


  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedProduct({ ...editedProduct, photoFile: file, photoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    try {
      // Create product data to send
      const productData = {
        name: editedProduct.name,
        price: editedProduct.price,
        amount: editedProduct.amount,
        description: editedProduct.description,
        picture: editedProduct.photoFile ? await convertToBase64(editedProduct.photoFile) : null,
      };


      console.log("Product data:",productData);

      // Add product via API call
      const receivedData = await addProduct(productData);

      console.log("Products:",receivedData);

      // Update UI state
      setProducts(receivedData.data.$values);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error or update UI accordingly
    }
  };

  const handleShowModal = () => setShowModal(true);

  const handleOpenAddProductModal = () => {
    setEditedProduct(emptyProduct); // Reset editedProduct state
    setShowModal(true);
  };
  
  const handleEditProduct = (id) => {
    const productToEdit = products.find(product => product.productId === id);
    if (productToEdit) {
      setEditedProduct({
        ...productToEdit,
        photoFile: null, // Reset the photoFile property when editing
      });
      setShowModal(true);
    }

  };

  

  const handleSendEditedProduct = async () => {
    try {
      // Prepare updated product data
      const updatedProductData = {
        productId: editedProduct.productId,
        name: editedProduct.name,
        price: editedProduct.price,
        amount: editedProduct.amount,
        description: editedProduct.description,
        picture: editedProduct.photoFile ? await convertToBase64(editedProduct.photoFile) : null,
      };
  
      // Call the API to update the product
      console.log("Sending updated product data:",updatedProductData);
      const response = await updateProduct(updatedProductData);
      console.log("Response:",response);
      setProducts(response.data.$values);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating product:', error);
      // Handle error (e.g., show error message)
    }
  };
  
  const handleCloseModal = () => {
    setEditedProduct(emptyProduct); // Reset editedProduct state
    setShowModal(false);
  };


  const handleRemoveProduct = async (productId) => {
    try{
      const productData = {
        productId: productId,
      };
    const products = await removeProduct(productData);

    console.log("Products:",products);

    // Update UI state
    setProducts(products.data.$values);
    }
    catch (error) {
      console.error('Error removing product:', error);
    }

  };



  return (
    <Container>
      <h2 className="page-heading text-center manage-products-heading">Manage Products</h2>
      <Button variant="primary" onClick={handleOpenAddProductModal}>
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
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>${product.price} Million</td>
              <td>{product.amount}</td>
              <td>{product.description}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleEditProduct(product.productId)}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleRemoveProduct(product.productId)}
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
    <Modal.Title>{editedProduct.productId ? 'Edit Product' : 'Add Product'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
    <Form.Group controlId="productPhoto">
      {/* Display a small image preview */}
      {(editedProduct.photoFile || editedProduct.pictureUrl) && (
        <div className="image-preview">
          <img
            src={editedProduct.photoFile
              ? URL.createObjectURL(editedProduct.photoFile)
              : editedProduct.pictureUrl}
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
          value={editedProduct.amount}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, amount: e.target.value })
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
        required 
        />
      </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={editedProduct.productId ? handleSendEditedProduct : handleAddProduct}>
          {editedProduct.productId ? 'Save Changes' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>

    </Container>
  );
};

export default ManageProductsPage;
