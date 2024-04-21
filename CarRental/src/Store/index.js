import { configureStore, createSlice } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; /// Corre[[ct import of redux-thunk
import { cars } from "../Constants/cars.js";
// Define the initial state of the cars
const initialState = cars;

    const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setCars: (state, action) => {
        return [...action.payload];
        },
        addCar: (state, action) => {
        state.push(action.payload);
        },
        removeCar: (state, action) => {
        return state.filter((car) => car.name !== action.payload);
        },
        editCarPrice: (state, action) => {
        const {id, price} = action.payload;
        console.log("redux, id = ",id);
        console.log("redux, price= ",price);
        return state.map((car)=>{
            if(car.id === id){
                return {...car, price};
            }
            return car;
        });
        
        },
        editCarDetails: (state, action) => {
        const {id, details} = action.payload;
        console.log(id);
        console.log(details);

        
        },
    },
    });


    const rentedCarsSlice = createSlice(  {
        name:"rentedCars",
        initialState:[],
        reducers:{
            setRentedCars: (state, action)=>{
                return [...action.payload];
            },
            addRentedCar:(state, action)=>{
                state.push(action.payload);
            },
            returnCar: (state, action) => {
            return state.filter((car) => car.name !== action.payload);
            },
            listRentedCars: (state) => {
            return state;
            }
        },
        });
    


    export const {setRentedCars, addRentedCar, returnCar, listRentedCars} = rentedCarsSlice.actions;
    export const { setCars, addCar, removeCar, editCarPrice, editCarDetails } = carsSlice.actions;

    const store = configureStore({
    reducer: {
        cars: carsSlice.reducer,
        rentedCars: rentedCarsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    export default store;
