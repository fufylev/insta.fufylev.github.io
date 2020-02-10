import React, { Component } from 'react';
import './PicturesModal.scss';
import Loader from '~/components/Loader/Loader';
import { Modal } from '~/components/Modal/Modal.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export class PicturesModal extends Component {
    handleClose = () => {
        const { history } = this.props;
        history.replace('/pictures');
    };

    goToUser = (id) => {
        console.log(id);
    };

    renderItemDefault = (picture) => {
        const numberOfComments = picture.comments.length;

        return (
            <div className="picture-card">
                <img src={picture.image} alt={picture.id} className="picture-card-img"/>
                <div className="picture-card-desc">
                    <div className='picture-card-user'>
                        <div
                            onClick={() => this.goToUser(picture.owner.uid)}
                            className='picture-card-user_link'
                        > {picture.owner.username} </div>
                    </div>
                    <div className='picture-card-comments'>
                        {numberOfComments > 0 && picture.comments.map((comment, index) => {
                            return (
                                <div key={index}
                                    className='picture-card-comments-container'>
                                    <span
                                        onClick={() => this.goToUser(comment.user.uid)}
                                        className='picture-card-user_link'
                                    >
                                        {comment.user.username}
                                    </span>
                                    <span>{comment.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const id = this.props.match.params.id;
        const picture = this.props.pictures.filter(picture => picture.id === id)[0];
        if (picture === undefined) {
            const { history } = this.props;
            history.replace('/page404');
            location.reload();
        }
        const { loading } = this.props;
        return (
            <div className='container'>
                <Modal onClose={this.handleClose}>
                    {loading && <Loader/>}
                    {!loading && this.renderItemDefault(picture)}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pictures };
}

export default withRouter(connect(mapStateToProps)(PicturesModal));