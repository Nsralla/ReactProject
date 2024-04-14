import { logo } from "../Constants/index";
import "./header.scss";
import { motion} from "framer-motion";
import { useState } from "react";
import NewCar from "../designs/carInfo"; 

import { useRef } from "react";

export default function Header() {

    // Variants for other elements
    const elementVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: {  duration: 0.8 } },
    };

    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef(null);

    const openDialog = () => {
        setIsOpen(true);
        dialogRef.current.showModal(); // Use showModal() to make it modal
    };

    const closeDialog = () => {
        setIsOpen(false);
        dialogRef.current.close();
    };



    return (
        <header className="header">
            <motion.div
            className="logo"
            initial="hidden"
            animate="visible"
            variants={elementVariants}
            >
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
        </header>
    );
}
