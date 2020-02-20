import React, { Component } from 'react';
import './PicturesModal.scss';
import { Modal } from '~/components/Modal/Modal.jsx';
import ModalContent from './ModalContent.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPicture } from '../../libs/api/API_gallery';
import Loader from '../Loader/Loader';

class PicturesModal extends Component {
    state = {
        picture: null,
    };

    handleClose = () => {
        const { history } = this.props;
        history.goBack();
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        getPicture(id).then(picture => this.setState({ picture }));
    }

    render() {
        const { picture } = this.state;
        if (picture === undefined) {
            const { history } = this.props;
            history.replace('/page404');
            location.reload();
        }
        return (
            <div className='container'>
                <Modal onClose={this.handleClose}>
                    {picture === null && <Loader/>}
                    {picture !== null && <ModalContent picture={picture}/>}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pictures: state.pictures,
    };
}

export default withRouter(connect(mapStateToProps)(PicturesModal));