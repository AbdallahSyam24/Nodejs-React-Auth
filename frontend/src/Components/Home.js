import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { deleteProductByIDAPI, getProductsAPI } from './network';
import Swal from 'sweetalert2';

function CustmModal({ show, setShow, product }) {
  if (product) {
    return (
      <Container>
        <Row>
          <Col>
            <Modal show={show} onHide={() => setShow(!show)}>
              <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Price: </strong> {product.price} </p>
                <p><strong>Origin: </strong> {product.origin} </p>
                <p><strong>In-stock: </strong> <span style={{
                  color: (product.instock) ? "green" : "red"
                }}> {product.instock ? "Yes" : "No"} </span> </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(!show)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default function Home() {

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    getProductsAPI()
      .then((res) => setProducts(res))
      .then(() => setLoader(false))
      .catch((e) => console.log(e));
  }, [loader]);

  const createCstmModal = (product) => {
    setShow(!show);
    setModalData(product);
  };

  const handelDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(true);
        deleteProductByIDAPI(id)
          .then(() => setLoader(false))
          .then(() => Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ))
          .catch((e) => console.log(e));

      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button
            variant="success"
            onClick={() => navigate('/addnewproduct')}>
            Add new product
          </Button>
        </Col>
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(product => product.deleted === 0)
              .map((product) =>
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => createCstmModal(product)}>
                      Details
                    </Button>
                    {" "}
                    <Button
                      variant="warning"
                      onClick={() => navigate('/editproduct?id=' + product.id)}>
                      Edit
                    </Button>
                    {" "}
                    <Button
                      variant="danger"
                      onClick={() => handelDelete(product.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              )}
          </tbody>
        </Table>
        <CustmModal show={show} setShow={setShow} product={modalData} />
      </Row>
    </Container>
  );
}
