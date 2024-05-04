import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [distractionMessage, setDistractionMessage] = useState(''); // State to display distraction message

  const handleGenerateImage = async () => {
    setIsLoading(true); // Set loading state to true when image generation starts
    setError(null); // Reset error state
    setDistractionMessage('Generating something awesome...'); // Display distraction message
    try {
      const response = await axios.post('http://localhost:5050/image/create', { prompt });
      setImage(response.data.image);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('An error occurred while generating the image. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading state to false when image generation completes
      setDistractionMessage(''); // Clear distraction message
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Discover AI Creations</h1>
        <div>
          <input
            id="promptInput"
            type="text"
            placeholder="Try 'Astronaut riding a dragon'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        {/* Disable button during loading and show loading indicator if isLoading is true */}
        <button onClick={handleGenerateImage} disabled={isLoading}>
          {isLoading ? 'Generating Image...' : 'Create Artwork'}
        </button>
        {/* Display distraction message while loading */}
        {isLoading && <p className="distraction-message">{distractionMessage}</p>}
      </header>
      <div className="Style-section">
        <h2>Choose a Style</h2>
        {/* Add your style images here */}
      </div>
      <div className="Gallery-section">
        <h2>Inspiration Gallery</h2>
        {/* Add your gallery images here */}
      </div>
      <button>See more</button>
      <div className="Image-container">
        {error && <div className="error-message">{error}</div>}
        {image && <img src={`data:image/png;base64,${image}`} alt="Generated Image" />}
      </div>
    </div>
  );
}

export default App;
