import React from 'react';

import './Spinner.css';

const spinner = ({show}) => (
    <div id="overlayLoader" style={{ display: show === true ? "block" : "none"}}>
        <div className="Loader">Loading...</div>
    </div>
);


export default spinner;
