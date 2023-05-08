import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function () {

    return <>
        <Container fluid="md">
            <Row>
                <Col md={12}>
                    <h1>Contact us</h1>
                    <Form>
                        <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="Write your email"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"/>
                            <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>Your message</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="With textarea" />
                        </InputGroup>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>

}