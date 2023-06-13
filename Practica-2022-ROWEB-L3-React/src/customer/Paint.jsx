import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function() {

    const { productId } = this.props.match.params

    return <>
        <h2>{productId}</h2>
    </>

}