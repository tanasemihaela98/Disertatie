import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './AboutArtist.css';

export default function () {

    return <>
        <div class="hero-section">
            <h1>Paintings Index</h1>
        </div>
        <div class="paintings-container">
            <div class="paintings-list">
                <div class="painting-card">
                    <img src="../self-portrait.jpg" alt="Painting 1"/>
                </div>

                <div class="painting-card">
                    <img src="../self-portrait.jpg" alt="Painting 2"/>
                </div>

                <div class="painting-card">
                    <img src="../self-portrait.jpg" alt="Painting 3"/>
                </div>

                <div class="painting-card">
                    <img src="../self-portrait.jpg" alt="Painting 3"/>
                </div>

                <div class="painting-card">
                    <img src="../self-portrait.jpg" alt="Painting 3"/>
                </div>

                <div class="painting-card">
                    <img src="../self-portrait.jpg" alt="Painting 3"/>
                </div>

            </div>
        </div>
    </>
}