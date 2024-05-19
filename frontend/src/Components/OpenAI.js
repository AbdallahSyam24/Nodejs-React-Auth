import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { getOpenAIAPI } from './network';

export default function OpenAI() {
    const [inputs, setInputs] = useState({});
    const [res, setRes] = useState(null);

    const handelChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        getOpenAIAPI(inputs)
            .then(r => setRes(r))
            .catch(e => console.log(e));
    };

    return (
        <Container>
            <Row>
                <Col className='col-lg-6'>
                    <Form onSubmit={handelSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <textarea className='form-control' name='prompt' value={inputs.prompt} onChange={handelChange} required />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <textarea className='form-control' rows="7" value={res} disabled />
                        </Form.Group>

                        <hr />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
