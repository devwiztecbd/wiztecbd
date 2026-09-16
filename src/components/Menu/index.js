import React from "react";

const Menu = ({ onMouseEnter, onMouseLeave, children }) => {
    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="absolute left-1/2 top-100 z-50 w-[calc(100%-3rem)] max-w-[1120px] -translate-x-1/2">
            <div className="mega-menu-enter overflow-hidden rounded-2xl bg-white shadow-mega">{children}</div>
        </div>
    );
};

export default Menu;
