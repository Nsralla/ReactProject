import { logo } from '../Constants/index';
import './header.scss';
export default function Header(){
return (
    <header className="header">
        <div className="logo"><img src={logo} alt="" /></div>
        <div className='buttton-div'><button></button></div>
    </header>
);
}