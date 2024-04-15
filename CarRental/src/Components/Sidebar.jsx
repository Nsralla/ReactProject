import './sidebar.scss';
import { motion } from 'framer-motion';
import { profile } from '../Constants/index.js';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const linkVariants = {
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 300,
            },
        },
        tap: {
            scale: 0.9,
        },
    };

    return (
        <section className='sidebar-section'>
            <div className='profile-img-div'>
                <img src={profile} alt="profile picture" />
            </div>
            <div className='links-div'>
                <Link
                    to="/allcars"
                    className='flink'
                >
                    Car
                </Link>
                <Link
                    to="/history"
                    className='slink'
                >
                    History
                </Link>
            </div>
        </section>
    );
}
