import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import { useAuth } from '../Auth/useAuth';
import { useNavigate } from 'react-router';

export default function Menu() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <Container>
            <Row>
                <Col>
                    <Button variant="danger" onClick={logout}>Logout</Button>
                    {" "}
                    <Button variant="success" onClick={() => navigate('/')}>Home</Button>
                    {" "}
                    <Button variant="info" onClick={() => navigate('/openAI')}>Open AI</Button>
                </Col>
            </Row>
        </Container>
    )
}
