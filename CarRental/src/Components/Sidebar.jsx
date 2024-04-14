import './sidebar.scss';
import { motion } from 'framer-motion';
import { profile } from '../Constants/index.js';

export default function Sidebar(){
    // Define your animation variants
    const linkVariants = {
        hover: {
            scale: 1.1, // scale the link to 110% of its size on hover
            transition: {
                type: "spring",
                stiffness: 300,
            },
        },
        tap: {
            scale: 0.9, // scale the link to 90% of its size on tap/click
        },
    };

    return (
        <section className='sidebar-section'>
            <div className='profile-img-div'>
                <img src={profile} alt="profile picture" />
            </div>
            <div className='links-div'>
                <motion.a
                    className='flink'
                    href="#"
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    Car
                </motion.a>
                <motion.a
                    className='slink'
                    href="#"
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    History
                </motion.a>
            </div>
        </section>
    );
}
