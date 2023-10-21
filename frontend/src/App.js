import React, { useEffect, useState } from 'react';
import './App.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const sidebarStyle = {
  width: '25%', // Adjust the width of the sidebar as needed
  height: '100vh',
  overflowY: 'scroll',
};

const MapComponent = ({ userLocation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        {/* Sidebar content goes here */}
        <h2>Sidebar</h2>
        <p>Content goes here...</p>
      </div>
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={20}
        >
          <Marker
            position={userLocation}
            onClick={() => onMarkerClick(userLocation)}
          />

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>Marker Info</h3>
                <p>Additional information about the marker.</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

function App() {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
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

  return (
    <div className="App">
      <h1>LAVISH LOO</h1>
      <MapComponent userLocation={userLocation} />
    </div>
  );
}

export default App;
