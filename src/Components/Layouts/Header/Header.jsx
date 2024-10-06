import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import Searchbar from './Searchbar';

const Header = () => {
    const { isAuthenticated, user = {} } = useSelector((state) => state.user); // Default user to an empty object
    const { cartItems } = useSelector((state) => state.cart);
    const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
    const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

    return (
        <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10">
            <div className="w-full sm:w-9/12 px-4 m-auto flex flex-wrap justify-between items-center relative">
                <div className="flex items-center flex-1">
                    <Link className="h-7 mr-2 sm:mr-4" to="/">
                        <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Logo" />
                    </Link>
                    <Searchbar />
                </div>

                <div className="flex items-center justify-between ml-1 sm:ml-0 gap-1 sm:gap-7 relative">
                    {isAuthenticated === false ? (
                        <Link to="/login" className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer">Login</Link>
                    ) : (
                        <span className="userDropDown flex items-center text-white font-medium gap-1 cursor-pointer" onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>
                            {user?.name ? user.name.split(" ", 1) : 'User'}
                            <span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
                        </span>
                    )}

                    {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}
                    <span className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer" onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}>
                        More
                        <span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
                    </span>

                    {toggleSecondaryDropDown && <SecondaryDropDownMenu />}

                    <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
                        <span><ShoppingCartIcon /></span>
                        {cartItems.length > 0 && (
                            <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                                {cartItems.length}
                            </div>
                        )}
                        Cart
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
