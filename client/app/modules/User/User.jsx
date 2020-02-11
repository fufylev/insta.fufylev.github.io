import React, { Component } from 'react';
import './User.scss';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import Gallery from '../PicturesGallery/components/Gallery/Gallery.jsx';
import { FiSettings } from 'react-icons/fi';

class User extends Component {
    state = {
        start: 1,
        end: 12,
    };

    handleScroll = () => {
        const { currentUser } = this.props.users;
        const numberOfPictures = currentUser.pictures.length;
        this.setState((prevState) => ({
            start: prevState.start + 1 <= numberOfPictures ? prevState.start + 1 : prevState.start,
            end: prevState.end + 12 <= numberOfPictures ? prevState.end + 12 : numberOfPictures,
        }));
    };

    settingsHandler = () => {
        console.log('settings btn pressed')
    };

    render() {
        const { start, end } = this.state;
        const { currentUser } = this.props.users;
        const { isLoggedIn } = this.props.authentication;
        const numberOfPictures = currentUser.pictures.length;
        let pictures = [];
        for (let i = start; i <= end; i++) {
            pictures = [...pictures, currentUser.pictures[i - 1]];
        }
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

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        authentication: state.authentication,
    };
}

export default connect(mapStateToProps)(User);