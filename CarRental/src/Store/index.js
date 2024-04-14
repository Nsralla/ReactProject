import { configureStore, createSlice } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Correct import of redux-thunk

// Define the initial state of the cars
const initialState = [];

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
        return state.filter((car) => car.id !== action.payload);
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

    export const { setCars, addCar, removeCar, editCar } = carsSlice.actions;

    const store = configureStore({
    reducer: {
        cars: carsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

    export default store;
