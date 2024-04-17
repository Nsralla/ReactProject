import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";

import "./App.scss";

export default function MainPage() {
    return (
        <div className="app">
        <Header />
        <div className="content">
            {/* <Sidebar /> */}
            <section>
            <Outlet/>
            </section>
        </div>
        </div>
    );
}
