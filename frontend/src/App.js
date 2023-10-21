import { useEffect, useState } from 'react';
import './App.css';
import { GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";

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
        zoom={20}
      >
        <MarkerF position={userLocation} />
      </GoogleMap>
    </LoadScript>
  )
}

function App() {
  const [userLocation, setUserLocation] = useState({lat: 0, lng: 0});
  const navigate = useNavigate();
  const router = createBrowserRouter([
    {path: "/", element: <Home />}
  ])

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
      <button className='addBtn'>Add</button>
      <MapComponent userLocation={userLocation}/>
    </div>
  );
}

export default App;