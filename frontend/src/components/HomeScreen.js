import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';
import toiletImage from './toilet.jpg';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '83vh',
};

const markerStyle = {
  width: "40vh",
  height: "60vh",
  textAlign: "center", // This centers the text horizontally
};

const ScoreComponent = ({ score, text, imgSrc }) => (
  <div style={{ display: 'flex', marginBottom: '20px', textAlign: 'left' }}>
    <div style={{ flexShrink: 0, marginRight: '10px' }}>
      <img src={imgSrc} alt={`Score ${score}`} style={{ width: '100px', height: 'auto' }} />
    </div>
    <div>
      <h3>Score: {score}/5</h3>
      <p>{text}</p>
    </div>
  </div>
);


const InfoWindowContent = (
  <div style={markerStyle}>
    <h2 style={{ fontSize: '1.4em', fontWeight: 'normal', margin: '0', paddingTop: 30, paddingBottom: 30 }}>WCP Bathroom - First Floor</h2>
    <h1 style={{ fontSize: '5em', margin: '0' }}>5/5</h1>

    <img
                src={toiletImage}
                alt="WCP bathroom baby"
                style={{ width: '80%', height: 'auto', paddingTop:30, paddingBottom:20 }} // Adjust width and height as needed
    />

    {/* Scrollable container */}
    <div style={{ height: '200px'}}>
      {/* Score Components */}
      <ScoreComponent score={4} text="Lorem ipsum dolor sit amet." imgSrc={toiletImage} />
      <ScoreComponent score={3} text="Consectetur adipiscing elit." imgSrc={toiletImage} />
      <ScoreComponent score={5} text="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." imgSrc={toiletImage} />
      {/* Add more ScoreComponents as needed */}
    </div>
  </div>
);


const MapComponent = ({ userLocation, handleReviewClick, showReviewWindow }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const centerMapOnMarker = (position) => {
    if (map) {
      map.panTo(position);
    }
  };

  const Block = ({ onClick, userLocation }) => {
    const handleClick = () => {
      // Assuming you have a specific position for this block
      const blockPosition = { lat: 30.2850, lng: -97.7335 };
      onClick(userLocation);
    };

    return (
      <button type="button" onClick={handleClick}>
      this location
    </button>
    );
  }
  
  return (
    <div style={{ display: 'flex' }}>
      <div class = "sidebarStyle">
        <h2>Nearby Bathrooms</h2>
        <Block onClick={centerMapOnMarker} userLocation={userLocation}/>

      </div>
      <LoadScript googleMapsApiKey="AIzaSyCCaE3R5a3E5V1Wcmh9UBsSbKzFFOxBB74">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={20}
          onLoad={(map) => setMap(map)}
        >
          <MarkerF
            position={userLocation}
            onClick={() => onMarkerClick(userLocation)}
          />

          {selectedMarker && (
            <InfoWindowF
              position={selectedMarker}
              onCloseClick={() => setSelectedMarker(null)}
            >
            {/* <div style={markerStyle}>
            </div> */}
        
            {InfoWindowContent}
            </InfoWindowF>
          )}
          {showReviewWindow && (
            <InfoWindowF
              position={userLocation}
              onCloseClick={() => handleReviewClick()}
            >
              <div style={markerStyle}>
                <h2>New Loo</h2>
                <input className="input" type="text"
                  placeholder="Location"
                />

              </div>
            </InfoWindowF>
          )}

        </GoogleMap>
      </LoadScript>
    </div>
  );
};

function HomeScreen() {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [showReviewWindow, setShowReviewWindow] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const handleReviewClick = () => {
    setShowReviewWindow(!showReviewWindow);
  };

  return (
    <div class="App">
      <div class="navbar">
        <h1>ROYAL FLUSH</h1>
        <button class='ReviewBtn' onClick={handleReviewClick} style={{ position: 'absolute', right: '0' }}>New Loo Review</button>  
      </div>
      <MapComponent userLocation={userLocation} handleReviewClick={handleReviewClick} showReviewWindow={showReviewWindow}/>
    </div>
  );
}

export default HomeScreen;
