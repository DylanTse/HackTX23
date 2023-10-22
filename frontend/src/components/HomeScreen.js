import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { getFirestore, collection,  doc, getDoc, getDocs} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import Review from './Review';
import { firebaseConfig, app, db } from "./firebaseConfig";


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


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

  const [toiletData, setToiletData] = useState(null);
  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    const fetchToiletData = async () => {
      // const db = getFirestore();
      // const toiletDocRef = doc(db, "reviews", "5qGBqJ0hoH1HxWyesWmN");

      // try {
      //   const docSnapshot = await getDoc(toiletDocRef);
      //   if (docSnapshot.exists()) {
      //     setToiletData(docSnapshot.data());
      //   } else {
      //     console.log("No such document!");
      //   }
      // } catch (e) {
      //   console.error("Error getting document:", e);
      // }
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
      {/* <div class = "sidebarStyle">
        <h2>Sidebar</h2>
        <Block onClick={centerMapOnMarker} userLocation={userLocation}/>

      </div> */}
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

  return (
    <div class="App">
      <div class="navbar">
        <h1 style={{ display: 'inline-block', marginRight: '10px' }}>ROYAL FLUSH</h1>
        <button class='ReviewBtn' onClick={handleReviewClick} style={{ position: 'absolute', right: '0', marginTop:'1.8%', marginRight:'1.8%' }}>New Loo Review</button>  
      </div>
      <MapComponent userLocation={userLocation} handleReviewClick={handleReviewClick} showReviewWindow={showReviewWindow}/>
    </div>
  );
}

export default HomeScreen;
