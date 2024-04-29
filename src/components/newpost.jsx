import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from "face-api.js";
import Spinner from './spinner';
//import './apps.css'; // Import CSS file for styling

function Newpost({ image }) {
  const { url } = image;
  console.log(url)
  const imgRef = useRef();
  const canvasRef = useRef();
  const [expressions, setExpressions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [detectingExpressions, setDetectingExpressions] = useState(true); // State to track if expressions are being detected

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const canvas = canvasRef.current;
    canvas.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvas, { width: 500, height: 500 });
    const resized = faceapi.resizeResults(detections, { width: 500, height: 500 });

    if (resized.length === 0) {
      setIsLoading(false); // Set loading state to false
      setDetectingExpressions(false); // Set detectingExpressions to false
      return; // Exit the function if no faces are detected
    }

    faceapi.draw.drawDetections(canvas, resized);
    faceapi.draw.drawFaceExpressions(canvas, resized);

    setExpressions(resized[0].expressions);
    setDetectingExpressions(false); // Set detectingExpressions to false when expressions are detected
    setIsLoading(false); // Set loading state to false after handling image
    console.log(detections)
    
  };

  // Function to get emoji for each expression
  const getEmoji = (expression) => {
    switch (expression) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'angry':
        return '😠';
      case 'neutral':
        return '😑';
      case 'fearful':
        return '😨';
      case 'disgusted':
        return '😵‍💫';
      case 'surprised':
        return '🤩';
      // Add more cases for other expressions as needed
      default:
        return '';
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]);
        handleImage();
      } catch (error) {
        console.log("Error loading models:", error);
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };

    imgRef.current && loadModels();
  }, []);

  const goBack = () => {
    window.location.reload();
  };

  return (
    <div className='bg'>
      <div className='container'>
        <div className='left'>
          <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" className="image" width={500} height={300} />
          &nbsp;&nbsp;&nbsp;{isLoading && <p>{detectingExpressions ? 'Detecting expressions...' : 'No face detection available'}</p>}
          {isLoading ? <Spinner /> : null}
          <canvas ref={canvasRef} width={500} height={500} className="canvas" />
        </div>
        <div className='right'>
          <h2>{detectingExpressions ? 'Detecting Expressions' : 'Detected Expressions'}</h2>
          {detectingExpressions ? (
            <p>wait...</p>
          ) : (
            <ul>
              {!isLoading && expressions.length === 0 ? (
                <li>No expressions detected</li>
              ) : (
                Object.entries(expressions).map(([expression, probability]) => (
                  <li key={expression}>
                    {/* Emoji for each expression */}
                    {getEmoji(expression)}
                    {/* Expression text */}
                    <span className="expression-text">{`${expression}: ${Math.round(probability * 100)}%`}</span>
                  </li>
                ))
              )}
            </ul>
          )}
          <button onClick={goBack}>Go back</button>
        </div>
      </div>
    </div>
  );
}

export default Newpost;
