import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const sidebarStyle = {
  width: '25%', // Adjust the width of the sidebar as needed
  height: '100%',
  overflowY: 'auto'
};

const MapComponent = ({ userLocation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  
const Block = () => {
  return (
    <div>
      <p>Content for Block goes here...</p>
    </div>
  );
}
  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <h2>Sidebar</h2>
        <Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/><Block/>
        <Block/>
        <Block/>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCCaE3R5a3E5V1Wcmh9UBsSbKzFFOxBB74">
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

function HomeScreen() {
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

export default HomeScreen;
