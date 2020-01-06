import React from 'react';

import phone from '~/assets/img/instagram-mockup-iphone.jpg';

export default function PhonePicture() {
    return (
        <div className="picture">
            <img src={phone} alt="phone-pic"/>
        </div>
    );
};