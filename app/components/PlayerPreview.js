import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerPreview ({avatar, username, children}) {
    return (
        <div>
            <div className='column'>
                <img className='avatar' src={avatar} alt={'Avatar for ' + username}/>
                <h2 className='username'>@{username}</h2>
                {children}
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
    // id: PropTypes.string.isRequired,
    // onReset: PropTypes.func.isRequired
}

// module.exports = PlayerPreview;
