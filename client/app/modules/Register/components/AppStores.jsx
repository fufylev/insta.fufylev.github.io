import React from 'react';

import appleStore from '~/assets/img/apple-store.png';
import googlePlay from '~/assets/img/google-play.png';

export default function AppStores() {
    return (
        <div className="apps">
            <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.signupPage.badge&mt=8&vt=lo">
                <img src={appleStore} alt="apple-store" className="apple-store"/>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DC611DDCA-CBE1-4999-ADD3-FD4383E615F9%26utm_content%3Dlo%26utm_medium%3Dbadge">
                <img src={googlePlay} alt="google-play" className="google-play"/>
            </a>
        </div>
    );
};