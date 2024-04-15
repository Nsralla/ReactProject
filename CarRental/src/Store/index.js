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
        editCar: (state, action) => {
        const { id, name } = action.payload;
        const carIndex = state.findIndex((car) => car.id === id);
        if (carIndex !== -1) {
            state[carIndex] = { ...state[carIndex], ...action.payload };
        }
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
    export const { setCars, addCar, removeCar, editCar } = carsSlice.actions;

    const store = configureStore({
    reducer: {
        cars: carsSlice.reducer,
        rentedCars: rentedCarsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    export default store;
