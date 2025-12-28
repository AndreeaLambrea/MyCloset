import React from 'react';
import './ButonDesign';

function Buton({ onClick, children , style })  {
    return(
        <button
            className="buton-chic"
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
}

export default Buton