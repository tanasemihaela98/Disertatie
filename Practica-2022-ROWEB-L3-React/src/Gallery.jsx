import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Gallery.css';

export default function () {

    return <>
        <div className='paint'>
            <img src='/self-portrait.jpg' width="300px"/>
            <div className='title'>Self portrait</div>
            <div className='author'>Van gogh</div>
            <div className='price'>22M</div>
            <button className='buy'>Buy</button>
        </div>
        <div className='paint'>
            <img src='/self-portrait.jpg' width="300px"/>
            <div className='title'>Self portrait</div>
            <div className='author'>Van gogh</div>
            <div className='price'>22M</div>
            <button className='buy'>Buy</button>
        </div>
        <div className='paint'>
            <img src='/self-portrait.jpg' width="300px"/>
            <div className='title'>Self portrait</div>
            <div className='author'>Van gogh</div>
            <div className='price'>22M</div>
            <button className='buy'>Buy</button>
        </div>
        <div className='paint'>
            <img src='/self-portrait.jpg' width="300px"/>
            <div className='title'>Self portrait</div>
            <div className='author'>Van gogh</div>
            <div className='price'>22M</div>
            <button className='buy'>Buy</button>
        </div>
    </>

}