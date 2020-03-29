import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Component to display a notification using the given message (and type, for stylistic purposes)

const Notification = ({ message, type, setMessage, setType }) => {

    // Display notification message for 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
                setType('');
            }, 5000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line
    }, [message]);

    return (
        message ?
            <div className={type}>
                {message}
            </div>
            :
            null
    );
};

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired
};

export default Notification;