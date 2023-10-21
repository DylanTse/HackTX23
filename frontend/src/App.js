import { useEffect, useState } from 'react';
import './App.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '100%', // This will make the map container take up 100% of its parent element's width.
  height: '90vh', // This will set the height to 50% of the viewport height.
};

const MapComponent = ({userLocation}) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCCaE3R5a3E5V1Wcmh9UBsSbKzFFOxBB74">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={15}
      />
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
      <MapComponent userLocation={userLocation}/>
    </div>
  );
}

export default App;