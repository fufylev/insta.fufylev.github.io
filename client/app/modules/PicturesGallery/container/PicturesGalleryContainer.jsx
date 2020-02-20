import './PicturesGalleryContainer.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { clearPicturesStoreHandler, picturesUploadHandler } from '~/actions/pictures';
import Gallery from '~/components/Gallery/Gallery.jsx';
import Loader from '~/components/Loader/Loader';
import PicturesModal from '~/components/PictureModal/PicturesModal.jsx';

class PicturesGalleryContainer extends Component {
    state = {
        isModalVisible: false,
        lastVisible: null,
    };

    firstQuery = () => {
        const { lastVisible } = this.state;
        const { uid, username } = this.props.users.currentUser;
        const user = { uid, username };

        this.props.dispatch(picturesUploadHandler(lastVisible, user))
            .then(data => {
                this.setState({ lastVisible: data.lastVisible });
            })
            .catch(error => console.log(error));
    };

    nextQuery = () => {
        const { lastVisible } = this.state;

        if (lastVisible !== null) {
            this.props.dispatch(picturesUploadHandler(lastVisible))
                .then(data => this.setState({ lastVisible: data.lastVisible }));
        } else {
            this.firstQuery();
        }
    };

    handleScroll = () => {
        const { loading } = this.props;
        if (!loading) {
            this.nextQuery();
        }
    };

    componentDidMount() {
        this.props.dispatch(clearPicturesStoreHandler()).then(() => {
            this.firstQuery();
        });

    }

    render() {
        const { pictures, loading } = this.props.pictures;
        const { isLoggedIn } = this.props.authentication;
        const numberOfPictures = Object.keys(pictures).length;

        return (
            <article className="container">
                {!isLoggedIn === true && !localStorage.getItem('uid') && <Redirect to="/auth"/>}
                <h2 className="">Explore</h2>
                {numberOfPictures > 0 && <Gallery onScroll={this.handleScroll} pictures={pictures}/>}
                <Route exact path={'/pictures/:id'}>
                    <PicturesModal/>
                </Route>
                {loading && <Loader/>}
            </article>
        );
    }
}

function mapStateToProps(state) {
    return {
        pictures: state.pictures,
        users: state.users,
        authentication: state.authentication,
    };
}

export default connect(mapStateToProps)(PicturesGalleryContainer);