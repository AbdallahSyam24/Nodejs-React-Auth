import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom'
import { editProductByIDAPI, getProductByIDAPI } from '../network';

export default function EditProduct() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");


    useEffect(() => {
        getProductByIDAPI(id)
            .then((res) => setInputs(res[0]))
            .catch((e) => console.log(e));
    }, [id]);

    const handelChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handelCheckBox = (e) => {
        setInputs({ ...inputs, instock: !inputs.instock });
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        editProductByIDAPI(id, inputs)
            .then((res) => navigate('/'))
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
                            <Form.Check type="checkbox" name='instock' label="Instock?" checked={inputs.instock} onChange={handelCheckBox} />
                        </Form.Group>

                        <hr />

                        <Button variant="success" type="submit">
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
