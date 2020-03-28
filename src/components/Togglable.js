import React, { forwardRef, useState, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
    const [visibility, setVisibility] = useState(false);

    const enable = { display: visibility ? 'none' : '' };
    const disable = { display: visibility ? '' : 'none' };

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });
    
    return (
        <div>
            <div style={enable}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>

            <div style={disable}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    );
});

export default Togglable;