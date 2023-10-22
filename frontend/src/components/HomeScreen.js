import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { getFirestore, collection,  doc, getDoc, getDocs} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import Review from './Review';
import { firebaseConfig, app, db } from "./firebaseConfig";


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const coverStyle = {
  display: 'flex',
  justifyContent: 'center', // Center horizontally
  alignItems: 'center',     // Center vertically
  width: '100%',
  height: '100vh',
  background: 'purple',
  backgroundImage: `url(${require('./public-toilet-2.jpg')})`,
  backgroundSize: 'cover',
};


const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '88vh',
};

const markerStyle = {
  width: "45vh",
  height: "70vh"
};



const MapComponent = ({ userLocation, handleReviewClick, showReviewWindow }) => {

  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    const fetchToiletData = async () => {
          // Retrieve a list of documents
          const querySnapshot = await getDocs(collection(db, 'reviews'));
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, data: doc.data() });
          });
          setDocumentList(documents);
        };
    fetchToiletData();
  }, []);
  
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

      </div>
      <LoadScript googleMapsApiKey="api key goes here">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={19}
          onLoad={(map) => setMap(map)}
        >
          {/* <MarkerF
            position={userLocation}
            onClick={() => onMarkerClick(userLocation)}
          /> */}

      {documentList.map((document) => {
        const documentData = document.data;
        return (
          <MarkerF
            key={document.id} // Make sure to include a unique key for each element in the list
            position={documentData.coords.userLocation}
            onClick={() => onMarkerClick(documentData.coords.userLocation)}
          />
        );
      })}

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


  const scrollToHeader = () => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div class="App">
      <div>
      <div style={coverStyle}>
        <div>
        <h1 style={{ fontSize: '5rem', color: 'white',  textShadow: '4px 4px 8px rgba(0,0,0,0.8)' }}>ROYAL FLUSH</h1>
          <button 
            style={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            width: '130px',
            margin: 'auto',
            borderRadius: '12px',
            padding: '12px',
            fontSize: 'medium',
            backgroundColor: "white",
            borderColor: 'white',
            color: '#f08df0',
            transitionDuration:'0.4s',
            fontWeight: 'bold'
          }} 
          onClick={scrollToHeader}>Look at Loos</button>
        </div>
      </div>
      <div class="navbar">
      <h1 id="header" style={{ display: 'inline-block', marginRight: '10px' }}>ROYAL FLUSH</h1>
       <button class='ReviewBtn' onClick={handleReviewClick} style={{ position: 'absolute', right: '0', marginTop:'1.5%', marginRight:'2%' }}>New Loo Review</button>  
      </div>
      </div>
      <MapComponent userLocation={userLocation} handleReviewClick={handleReviewClick} showReviewWindow={showReviewWindow}/>
    </div>
  );

}

export default HomeScreen;
