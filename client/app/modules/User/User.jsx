import './User.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import Gallery from '~/components/Gallery/Gallery.jsx';
import { clearPicturesStoreHandler } from '~/actions/pictures';
import PicturesModal from '~/components/PictureModal/PicturesModal.jsx';
import { savePicturesToState } from '~/actions/pictures';

class UserComponent extends Component {
    state = {
        start: -11,
        end: 0,
    };

    handleScroll = () => {
        const { currentUser } = this.props.users;
        const numberOfPictures = currentUser.pictures.length;
        if (numberOfPictures === this.state.end) {
            return
        }
        this.setState((prevState) => ({
            start: prevState.start + 12 <= numberOfPictures ? prevState.start + 12 : prevState.start,
            end: prevState.end + 12 <= numberOfPictures ? prevState.end + 12 : numberOfPictures,
        }), () => {
            const { start, end } = this.state;
            let pictures = [];
            for (let i = start; i <= end; i++) {
                pictures = [...pictures, currentUser.pictures[i - 1]];
            }
            this.props.dispatch(savePicturesToState(pictures))
        });

    };

    settingsHandler = () => {
        console.log('settings btn pressed')
    };

    componentDidMount() {
        const numberOfPictures = this.props.users.currentUser.pictures.length;

        this.props.dispatch(clearPicturesStoreHandler()).then(() => {
            if (numberOfPictures > 0) {
                this.handleScroll()
            }
        });
    }

    render() {
        const { currentUser } = this.props.users;
        const { pictures } = this.props.pictures;
        const { isLoggedIn } = this.props.authentication;
        const numberOfPictures = currentUser.pictures.length;

        return (
            <div className="container">
                {!localStorage.getItem('uid') && isLoggedIn !== true && <Redirect to="/"/>}
                {currentUser && (
                    <div className='user-page-header'>
                        <div className='user-page-avatar'>
                            <img
                                src={currentUser.avatar.large}
                                alt={`Picture of${currentUser.username}`}
                                className='user-page-photo'
                            />
                        </div>
                        <div>
                            <div className='user-page-flex'>
                                <p className='user-page-username'>{currentUser.username}</p>
                                <Link to='/user/edit'>
                                    <button className='user-page-btn'>Edit Profile</button>
                                </Link>
                                <FiSettings
                                    size='1.8rem'
                                    className='user-page-settings-btn'
                                    onClick={this.settingsHandler}
                                />
                            </div>
                            <div className='user-page-statistic'>
                                <span className='user-page-counts'>{currentUser.pictures.length}</span>
                                <span className='user-page-text'>posts</span>
                                <span className='user-page-counts'>{currentUser.followers ? currentUser.followers.length : 0}</span>
                                <span className='user-page-text'>followers</span>
                                <span className='user-page-counts'>{currentUser.followings ? currentUser.followings.length : 0}</span>
                                <span className='user-page-text'>following</span>
                            </div>
                            <h3>{currentUser.name.first} {currentUser.name.last}</h3>
                        </div>
                    </div>
                )}
                {numberOfPictures > 0 && <Gallery onScroll={this.handleScroll} pictures={pictures}/>}
                <Route path={'/user/:id'}>
                    <PicturesModal/>
                </Route>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        authentication: state.authentication,
        pictures: state.pictures,
    };
}
export const User = connect(mapStateToProps)(UserComponent);