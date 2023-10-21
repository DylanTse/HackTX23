import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '83vh',
};

const markerStyle = {
  width: "40vh",
  height: "60vh"
};


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

  const Block = ({ onClick }) => {
    const handleClick = () => {
      // Assuming you have a specific position for this block
      const blockPosition = { lat: 30.2850, lng: -97.7335 };
      onClick(blockPosition);
    };

    return (
      <div class ="blockStyle">
        <p>Content for Block goes here...</p>
      </div>
    );
  

  }
  
  return (
    <div style={{ display: 'flex' }}>
      <div class = "sidebarStyle">
        <h2>Sidebar</h2>
        <Block onClick={centerMapOnMarker} />
        <Block/>
        <Block/>
        <Block/>
        <Block/>
        <Block/>
        <Block/>       
        <Block/>
        <Block/>
        <Block/>
        <Block/>        
        <Block/>
        <Block/>
        <Block/>
        <Block/>

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
            <div style={markerStyle}>
              <h3>Marker Info</h3>
              <p>Additional information about the marker.</p>
            </div>
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
        <button class='ReviewBtn' onClick={handleReviewClick}>New Loo Review</button>  
      </div>
      <MapComponent userLocation={userLocation} handleReviewClick={handleReviewClick} showReviewWindow={showReviewWindow}/>
    </div>
  );
}

export default HomeScreen;
