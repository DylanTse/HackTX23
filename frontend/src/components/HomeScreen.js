import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '83vh',
};

const coverStyle = {
  display: 'flex',
  justifyContent: 'center', // Center horizontally
  alignItems: 'center',     // Center vertically
  width: '100%',
  height: '100vh',
  background: 'purple',
  backgroundImage: `url("https://images.prestigeonline.com/wp-content/uploads/sites/6/2023/07/13134104/taylor-swift-jewellery-e1688735010934.jpeg")`,
  backgroundSize: 'cover',
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
        <h2>Sidebar</h2>
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

  const scrollToHeader = () => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div class="App">
      <div class="navbar">
      <div style={coverStyle}>
        <div class="header-container">
        <h1 style={{ fontSize: '5rem', color: 'white' }}>ROYAL FLUSH</h1>
          <button class='ScrollBtn' onClick={scrollToHeader}>Look at loos</button>
        </div>
      </div>
        <div id="header"><h1>ROYAL FLUSH</h1></div>
        
        <button class='ReviewBtn' onClick={handleReviewClick}>New Loo Review</button>  
      </div>
      <MapComponent userLocation={userLocation} handleReviewClick={handleReviewClick} showReviewWindow={showReviewWindow}/>
    </div>
  );
}

export default HomeScreen;
