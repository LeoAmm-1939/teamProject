import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [selectedStyle, setSelectedStyle] = useState(''); // State to track selected style
  const [pastImages, setPastImages] = useState([]); // State to store past images
  const [showPastImages, setShowPastImages] = useState(false); // State to track visibility of past images

  const handleGenerateImage = async () => {
    setIsLoading(true); // Set loading state to true when image generation starts
    setError(null); // Reset error state
    try {
      const response = await axios.post('http://localhost:5050/image/create', { prompt, style: selectedStyle });
      setImage(response.data.image);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('An error occurred while generating the image. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading state to false when image generation completes
    }
  };

  const handleSeeMore = () => {
    const pastImages = Array.from({ length: 6 }, (_, index) => index + 1);
    setPastImages(pastImages);
    setShowPastImages(true);
  
    // Scroll to the top section
    document.querySelector('.app-header').scrollIntoView({ behavior: 'smooth' });
  };
  

  const handleHidePastImages = () => {
    setShowPastImages(false); // Hide past images
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Discover AI Creations</h1>
        <div className="input-container">
          <input
            className="prompt-input"
            type="text"
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="generate-button" onClick={handleGenerateImage} disabled={isLoading || !selectedStyle}>
            {isLoading ? 'Generating Image...' : 'Create Artwork'}
          </button>
        </div>
      </header>
      <div className="style-section">
        <h2>Choose a Style</h2>
        <div className="style-buttons">
          <button className={`style-button ${selectedStyle === 'Pixel' ? 'selected' : ''}`} onClick={() => setSelectedStyle('Pixel')}>Pixel Style</button>
          <button className={`style-button ${selectedStyle === 'Disney' ? 'selected' : ''}`} onClick={() => setSelectedStyle('Disney')}>Disney Style</button>
          <button className={`style-button ${selectedStyle === 'Space' ? 'selected' : ''}`} onClick={() => setSelectedStyle('Space')}>Space</button>
          <button className={`style-button ${selectedStyle === 'Abstract' ? 'selected' : ''}`} onClick={() => setSelectedStyle('Abstract')}>Abstract</button>
          <button className={`style-button ${selectedStyle === 'Dark' ? 'selected' : ''}`} onClick={() => setSelectedStyle('Dark')}>Dark Theme</button>
        </div>
      </div>
      <div className="gallery-section">
        <h2>Inspiration Gallery</h2>
        {showPastImages ? (
          <button className="see-more-button" onClick={handleHidePastImages}>Hide</button>
        ) : (
          <button className="see-more-button" onClick={handleSeeMore}>See more</button>
        )}
      </div>
      <div className="image-container">
        {error && <div className="error-message">{error}</div>}
        {image && <img className="generated-image" src={`data:image/png;base64,${image}`} alt="Generated Image" />}
        {showPastImages && (
          <div className="image-grid">
            {/* Render past images in a grid */}
            {pastImages.map((imageId) => (
              <div className="image-grid-item" key={imageId}>
                {/* Display past image or placeholder */}
                {/* For now, let's display placeholder text */}
                {`Past Image ${imageId}`}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
