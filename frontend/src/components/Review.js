import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, listAll } from 'firebase/storage';
import {v4} from 'uuid'; 


// Firebase creds + init
const firebaseConfig = {
    apiKey: "AIzaSyAXG6lMYjUOsRDKpY718P74PCGJ9Cg0ik4",
    authDomain: "dbhacktx23.firebaseapp.com",
    projectId: "dbhacktx23",
    storageBucket: "dbhacktx23.appspot.com",
    messagingSenderId: "429684702980",
    appId: "1:429684702980:web:9d2540488174701db19a51"
  };
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);


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

                <h2>TBD</h2>
                <h3>Quality: TBD</h3>
                <p>TBD</p>
            </div>        
            }
        </div>
    )

}