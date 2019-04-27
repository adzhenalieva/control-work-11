import React from 'react';

import './CategoriesItem.css';

const CategoriesItem = props => {
    return (
        <button className="Btn" onClick={props.onClick}>{props.category}</button>

    );
};

export default CategoriesItem;