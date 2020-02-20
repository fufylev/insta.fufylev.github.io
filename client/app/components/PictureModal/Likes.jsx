import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { togglePictureLikesInGallery } from '~/libs/api/API_likes';

class Likes extends Component {
    state = {
        ifLiked: false,
    };

    likesToggleHandler = () => {
        const { uid, username } = this.props.users.currentUser;
        const picID = this.props.picture.id;

        // use optimistic update in state
        this.setState((prevState) => ({
            ifLiked: !prevState.ifLiked,
        }));

        // toggle like in Cloud FireSore
        togglePictureLikesInGallery(uid, username, picID).then(response => {
            // console.log(response);
            if (response !== true) {
                alert('Something wrong occurred - try again later');

                // return previous state
                this.setState((prevState) => ({
                    ifLiked: !prevState.ifLiked,
                }));
            }
        });
    };

    ifLikedByCurrentUser = (likes) => {
        const { currentUser } = this.props.users;
        let result = false;
        likes.forEach(like => {
            if (like.user.uid === currentUser.uid) {
                result = true;
            }
        });
        return result;
    };

    componentDidMount() {
        const { likes } = this.props.picture;
        this.setState({ ifLiked: this.ifLikedByCurrentUser(likes) });
    }

    render() {
        const { likes } = this.props.picture;
        const { ifLiked } = this.state;

        return (
            <div className="picture-card-likes">
                <div style={{ cursor: 'pointer' }}>
                    {ifLiked && <span onClick={this.likesToggleHandler}><FaHeart size="2em" color='red'/></span>}
                    {!ifLiked && <span onClick={this.likesToggleHandler}><FaRegHeart size="2em" color='black'/></span>}
                </div>
                <div>
                    <span>Liked by </span>
                    <strong
                        onClick={() => this.goToUser(likes[0].user.uid)}
                        className='picture-card-user_link'>
                        {likes[0].user.username} </strong>
                    <span>and</span><strong> others</strong>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
    };
}

export default connect(mapStateToProps)(Likes);