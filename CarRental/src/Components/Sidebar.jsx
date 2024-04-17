import './sidebar.scss';
import { profile } from '../Constants/index.js';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { stiffness: 120 } },
};

export default function Sidebar({isOpen, onClose}) {

    const navigate = useNavigate();
    function handleFirstLink(){
        navigate("/allcars"); // navigate to the all cars page after deletion
        onClose();
    }
    function handleSecondLink(){
            navigate("/history");
            onClose();
    }


    return (
        <motion.section
        className='sidebar-section'
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen? "visible": "hidden"}>
        <button onClick={onClose}>Close</button>
            <div className='profile-img-div'>
                {/* <img src={profile} alt="profile picture" /> */}
            </div>
            <div className='links-div'>
                <button
                onClick={()=>{
                    handleFirstLink()
                }}
                className='flink'
                >
                    Car
                </button>
                <button
                onClick={handleSecondLink}
                className='slink'>
                    History
                </button>
            </div>
        </motion.section>
    );
}
