import React, { useContext, useEffect, useState } from 'react';
import './NavBar.css';
import logo1 from '../../assets/Logo1.png';
import arrow from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

function NavBar() {
    const { setCurrency } = useContext(CoinContext);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const currencyHandler = (e) => {
        switch (e.target.value) {
            case "usd":
                setCurrency({ name: "usd", symbol: "$" });
                break;
            case "eur":
                setCurrency({ name: "eur", symbol: "€" });
                break;
            case "inr":
                setCurrency({ name: "inr", symbol: "₹" });
                break;
            default:
                setCurrency({ name: "usd", symbol: "$" });
                break;
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleNavClick = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <div className='navbar'>
            <Link to={'/'}>
                <img src={logo1} alt="CryptoArena logo" className='logo' />
            </Link>
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <li onClick={() => handleNavClick('Coming Soon: Features')}>Features</li>
                <li onClick={() => handleNavClick('Coming Soon: Pricing')}>Pricing</li>
                <li onClick={() => handleNavClick('Coming Soon: Blog')}>Blog</li>
            </ul>
            <div className='nav-right'>
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                </select>
                <button onClick={toggleTheme}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    <img src={arrow} alt="Toggle theme" />
                </button>
            </div>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>{modalContent}</h2>
                        <p>This section is currently under development. Stay tuned!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;
