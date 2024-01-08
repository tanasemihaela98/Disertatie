import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";


import './AboutArtist.css';

export default function () {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        '../carusel1.jpg',
        '../carusel2.jpg',
        '../carusel3.jpg',
      ];
    
    useEffect(() => {
        const interval = setInterval(() => {
          // Calculate the index of the next image
          const nextIndex = (currentImageIndex + 1) % images.length;
          setCurrentImageIndex(nextIndex);
        }, 3000); // Change image every 1000 milliseconds (1 second)
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [currentImageIndex, images.length]);

    return <>
        <div class="hero-section">
            <img src={images[currentImageIndex]} />

            <h1>Galerie d'<b>ART</b></h1>
        </div>
        {/* <div class="paintings-container">
            <div class="paintings-list">
                <div class="painting-card">
                    <img src="../self-portrait.jpg" alt="Painting 1"/>
                </div>

            </div>
        </div> */}
    </>
}