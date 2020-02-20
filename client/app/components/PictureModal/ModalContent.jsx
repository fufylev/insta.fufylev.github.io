import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Likes from './Likes.jsx';
import Comments from './Comments.jsx';
import {getUserAvatar} from '../../libs/api/API_user';

function ModalContent (props) {
    const [pictureUserAvatar, setPictureUserAvatar] = useState('');
    const goToUser = (id) => {
        console.log(id);
        // TODO
    };

    const follow = (id) => {
        console.log(id);
        // TODO
    };

    const { picture } = props;
    const { currentUser } = props.users;

    useEffect(() => {
        getUserAvatar(picture.owner.uid).then(url => {
            setPictureUserAvatar(url);
        })
    });

    return (
        <div className="picture-card">
            <img src={picture.image} alt={picture.id} className="picture-card-img"/>
            <div className="picture-card-desc">
                <div className='picture-card-user'>
                    <div className='picture-card-user-header'>
                        {pictureUserAvatar && <img src={pictureUserAvatar} alt="avatar" className='picture-card-user-avatar'/>}
                        <span
                            onClick={() => goToUser(picture.owner.uid)}
                            className='picture-card-user_link'
                        >
                            {picture.owner.username} &bull;
                        </span>
                        <span
                            onClick={() => follow(picture.owner.uid)}
                            className='picture-card-follow'>
                            Follow
                        </span>
                    </div>
                </div>
                <Likes picture={picture} picID={picture.id}/>
                <Comments comments={picture.comments} goToUser={goToUser} picID={picture.id} user={currentUser}/>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        users: state.users,
    };
}

export default withRouter(connect(mapStateToProps)(ModalContent));