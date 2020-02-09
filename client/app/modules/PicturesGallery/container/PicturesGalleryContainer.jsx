import './PicturesGalleryContainer.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { clearPicturesStoreHandler, picturesUploadHandler } from '~/actions/pictures';
import Gallery from '~/modules/PicturesGallery/components/Gallery/Gallery.jsx';
import Loader from '~/components/Loader/Loader';
import PicturesModal from '~/modules/PicturesGallery/components/PictureModal/PicturesModal.jsx';

class PicturesGallery extends Component {
    state = {
        isModalVisible: false,
        lastVisible: null,
    };

    firstQuery = () => {
        const { lastVisible } = this.state;

        this.props.dispatch(picturesUploadHandler(lastVisible))
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
                {!isLoggedIn === true && !localStorage.getItem('uid') && <Redirect to="/auth" />}
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
        authentication: state.authentication
    };
}

export const PicturesGalleryContainer = connect(mapStateToProps)(PicturesGallery);