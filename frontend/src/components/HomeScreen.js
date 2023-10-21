import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '89vh',
};

const sidebarStyle = {
  width: '25%', // Adjust the width of the sidebar as needed
  height: '89vh',
  overflowY: 'auto', // Enable vertical scrolling
  background: '#f0f0f0', // Added for better visibility
};

const blockStyle = {
  height: '10vh',
};

const MapComponent = ({ userLocation }) => {
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
      <div style={blockStyle}>
        <p>Content for Block goes here...</p>
      </div>
    );
  

  }
  
  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <h2>Sidebar</h2>
        <Block onClick={centerMapOnMarker} />
        {/* <Block/>
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
        <Block/> */}

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
              <div>
                <h3>Marker Info</h3>
                <p>Additional information about the marker.</p>
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
    <div class="App">
      <div class="navbar">
        <h1>ROYAL FLUSH</h1>
        <button class='ReviewBtn'>Review a Loo</button>  
      </div>
      <MapComponent userLocation={userLocation} />
    </div>
  );
}

export default HomeScreen;
