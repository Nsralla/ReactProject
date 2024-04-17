// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, deleteDoc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { setCars, setRentedCars } from "../Store/index";

const firebaseConfig = {
    apiKey: "AIzaSyDwoz06Zni2VzDSqJ3OIW0j0LNvZopXmA4",
    authDomain: "carrental-10bea.firebaseapp.com",
    projectId: "carrental-10bea",
    storageBucket: "carrental-10bea.appspot.com",
    messagingSenderId: "955121347539",
    appId: "1:955121347539:web:e8aa1aef898e78ac9b9d26",
    measurementId: "G-CPTFB34CTZ",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export {app, db, analytics};


// fetch the cars from the fire store
export const fetchCars = () => async (dispatch) =>{
    try{
        const query = await getDocs(collection(db,"cars"));
        const cars = query.docs.map(doc => ({
            id:doc.id, ...doc.data()
        }));
        dispatch(setCars(cars))
    }catch(error){
        console.error("Error fetching cars from firestore", error);
    }
};


//  useEffect(()=>{
//     async function uploadCarsToFirestore(){
//     // get the collection
//     const carsCollection = collection(db,"cars");
//     // loop through the cars and add each to the firebase
//     for(const car of cars){
//       try{
//         const docRef = await addDoc(carsCollection, car);// addDoc will add the car to the firebase
//           console.log("Document written with ID: ", docRef.id);
//       }catch(error){
//         console.error("Error adding document to firebase", error)
//       }
//     }
//   }
//   uploadCarsToFirestore();
//   },[]); 