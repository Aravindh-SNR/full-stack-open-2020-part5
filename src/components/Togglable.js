import React, { forwardRef, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });
    
    return (
        visibility ?
            <div>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
            :
            <div>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

export default Togglable;