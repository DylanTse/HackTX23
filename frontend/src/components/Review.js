import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { firebaseConfig, db, app } from "./firebaseConfig";
import { getFirestore, collection, addDoc, doc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, listAll } from 'firebase/storage';
import {v4} from 'uuid'; 
import toiletImage from './toilet.jpg';


// Firebase creds + init
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
const storage = getStorage(app);

const markerStyle = {
    width: "40vh",
    height: "60vh",
    textAlign: "center", // This centers the text horizontally
    paddingLeft: '7%'
};

const ScoreComponent = ({ score, text, imgSrc }) => (
<div style={{ display: 'flex', marginBottom: '20px', textAlign: 'left' }}>
    <div style={{ flexShrink: 0, marginRight: '10px', paddingTop: '4%' }}>
    <img src={imgSrc} alt={`Score ${score}`} style={{ width: '100px', height: 'auto' }} />
    </div>
    <div>
    <h3>Score: {score}/5</h3>
    <p>{text}</p>
    </div>
</div>
);

const InfoWindowContent = (
<div style={markerStyle}>
    <h2 style={{ fontSize: '1.4em', fontWeight: 'normal', margin: '0', paddingTop: 30, paddingBottom: 30 }}>WCP Bathroom - First Floor</h2>
    <h1 style={{ fontSize: '5em', margin: '0' }}>5/5</h1>

    <img
                src={toiletImage}
                alt="WCP bathroom baby"
                style={{ width: '80%', height: 'auto', paddingTop:30, paddingBottom:20 }} // Adjust width and height as needed
    />

    {/* Scrollable container */}
    <div style={{ height: '200px'}}>
    {/* Score Components */}
    <ScoreComponent score={4} text="Lorem ipsum dolor sit amet." imgSrc={toiletImage} />
    <ScoreComponent score={3} text="Consectetur adipiscing elit." imgSrc={toiletImage} />
    <ScoreComponent score={5} text="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." imgSrc={toiletImage} />
    {/* Add more ScoreComponents as needed */}
    </div>
</div>
);



export default function Review({mode, coords}) {

    // FORM FIELDS
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [imageUpload, setImageUpload] = useState(null);

    const uploadImage = () => {
        if (imageUpload == null) return;

        // ref is useful for doing folders and filepath org in storage!  
        // images / [location] / [imageName + unique char sequence]
        const imageRef = ref(storage, `images/${location}/${imageUpload.name + v4()}`);       
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image uploaded!");
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();

        uploadImage(); // on form submission, call upload Image

        try {
            addDoc(collection(db, "reviews"), {
                location: location,
                coords: coords, // very valuable record for determining what to return when review is on DISPLAY mode
                rating: rating,
                review: review,
            });
        }
        catch (e) {
            console.error("Error: ", e);
        }
        setLocation("");
        setRating("");
        setReview("");
    }

    // DISPLAY true functions
    // findRecord should have coord match up exactly because in HomeScreen -> DISPLAY = true only run when we click on existing review
    const findRecord = () => {
        const coordList = db.collection('reviews').get();
        
    }
    

const [toiletData, setToiletData] = useState(null);

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




    return (
        <div>
            {/* RENDER UPLOAD REVIEW IF MODE = true, RENDER DISPLAY IF MODE = false */}
            {mode ? 
            (
            <div className='reviewForm'>
                <h2>New Loo</h2>
                <form id="form">
                    <label htmlFor='image'>Photo</label>
                    <input className="input" type="file" accept='image/*' width="50" height="50"
                    onChange={(e) => {setImageUpload(e.target.files[0])}} // could upload multiple pics but limit it to 1 with [0]
                    />  

                    <label htmlFor='location'>Location</label>
                    <input className="input" type="text" placeholder="Bldg. X Floor 5"
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    />

                    <label htmlFor='rating'>Rating (1-5)</label>
                    <input className="input" type="number" placeholder="-" min="1" max="5"
                    value={rating} onChange={(e) => setRating(e.target.value)}
                    />

                    <label htmlFor='review'>Review</label>
                    <textarea className="input" placeholder="i felt this way about the restroom" rows="10" cols="30" spellCheck="true"
                    value={review} onChange={(e) => setReview(e.target.value)}
                    />

                    <button className='ReviewBtn' onClick={formSubmit}>SUBMIT</button>
                </form>
            </div>
            )

            :

            // if display mode (mode = true) --> will end up using the prop 'coords' to match up data in firestore
            // knowing which info to pass as props to this component? need to match location coords within certain radius
            <div className='currReviews'>
                {/* {documentList.map((document) => {
                const documentData = document.data;
                if (documentData.coords.userLocation == coords) {
                    return;
                }  
                })}
                <h1>{documentData.review}</h1> */}
                {InfoWindowContent}

            </div>        
            }
        </div>
    )

}