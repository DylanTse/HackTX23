import './App.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const center = {
  lat: -3.745,
  lng: -38.523
};

const containerStyle = {
  width: '100%', // This will make the map container take up 100% of its parent element's width.
  height: '90vh', // This will set the height to 50% of the viewport height.
};

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCCaE3R5a3E5V1Wcmh9UBsSbKzFFOxBB74">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      />
    </LoadScript>
  )
}

function App() {
  return (
    <div className="App">
      <h1>LAVISH LOO</h1>
      <MapComponent />
    </div>
  );
}

export default App;
