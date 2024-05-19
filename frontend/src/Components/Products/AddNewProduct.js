import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { addnewproductAPI } from '../network';
import { useNavigate } from 'react-router';

export default function AddNewProduct() {

    const [inputs, setInputs] = useState({ instock: false });
    const navigate = useNavigate();

    const handelChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handelCheckBox = (e) => {
        setInputs({ ...inputs, instock: !inputs.instock });
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        addnewproductAPI(inputs)
            .then((res) => res ? navigate('/') : console.log(res))
            .catch((e) => console.log(e));
    };


    return (
        <Container>
            <Row>
                <Col className='col-lg-6'>
                    <Form onSubmit={handelSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name='name' value={inputs.name} onChange={handelChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name='price' value={inputs.price} onChange={handelChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control type="text" name='origin' value={inputs.origin} onChange={handelChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" name='instock' label="Instock?" value={inputs.instock} onChange={handelCheckBox} />
                        </Form.Group>

                        <hr />

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
