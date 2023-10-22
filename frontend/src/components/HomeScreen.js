import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { getFirestore, collection } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import Review from './Review';

const firebaseConfig = {
  apiKey: "AIzaSyAXG6lMYjUOsRDKpY718P74PCGJ9Cg0ik4",
  authDomain: "dbhacktx23.firebaseapp.com",
  projectId: "dbhacktx23",
  storageBucket: "dbhacktx23.appspot.com",
  messagingSenderId: "429684702980",
  appId: "1:429684702980:web:9d2540488174701db19a51"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '83vh',
};

const markerStyle = {
  width: "45vh",
  height: "70vh"
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
          zoom={19}
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
              {/* DISPLAY COMPONENT REVIEW --> UPLOAD STATUS = false --> DISPLAY DATA ABOUT EXISTING RESTROOM ( we are using conditional rendering with props) */}
              < Review mode={false} coords={{userLocation}}/>
            </div>
            </InfoWindowF>
          )}
          {showReviewWindow && (
            <InfoWindowF
              position={userLocation}
              onCloseClick={() => handleReviewClick()}
            >
              <div style={markerStyle}>
                {/* DISPLAY COMPONENT REVIEW --> UPLOAD STATUS = true --> FORM TO SEND DATA TO FIREBASE + STORAGE */}
                < Review mode={true} coords={{userLocation}}/> 
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
