import { useEffect, useState } from 'react';
import './App.css';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const MapComponent = ({ userLocation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCCaE3R5a3E5V1Wcmh9UBsSbKzFFOxBB74">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={20}
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
  )
}

function App() {
  const [userLocation, setUserLocation] = useState({lat: 0, lng: 0});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      setUserLocation({lat: latitude, lng: longitude});
    }, (error) => {
      console.error("Error getting user location:", error);
    });
  }, []);


  return (
    <div className="App">
      <h1>LAVISH LOO</h1>
      <MapComponent userLocation={userLocation} />
    </div>
  );
}

export default App;
