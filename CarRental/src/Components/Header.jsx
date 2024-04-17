import "./header.scss";
import { logo } from "../Constants/index";
import { motion} from "framer-motion";
import { useState, useRef, useCallback } from "react";
import NewCar from "../designs/carInfo"; 
import Sidebar from "./Sidebar";


export default function Header() {

    const elementVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: {  duration: 0.8 } },
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef(null);

    const openDialog = useCallback(() => {
        setIsOpen(true);
        dialogRef.current.showModal();
    },[]);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
        dialogRef.current.close();
    },[]);



    return (
        <header className="header">
            <motion.div
            className="logo"
            initial="hidden"
            animate="visible"
            variants={elementVariants}
            onClick={()=>setIsSidebarOpen(true)}>
                <img src={logo} alt="logo" />
            </motion.div>

            <div>
                <h1>Friends Motors</h1>
            </div>

            <motion.div
            className="button-div"
            initial="hidden"
            animate="visible"
            variants={elementVariants}
            >
                <button onClick={openDialog}>
                <i className="fa-solid fa-plus"></i>
            </button>
            </motion.div>

            <dialog style={{backgroundColor:'#f39f5A'}} ref={dialogRef}>
                <NewCar closeDialog={closeDialog}/>
            </dialog>

            <Sidebar isOpen={isSidebarOpen} onClose={()=> setIsSidebarOpen(false)}/>
        </header>
    );
}
