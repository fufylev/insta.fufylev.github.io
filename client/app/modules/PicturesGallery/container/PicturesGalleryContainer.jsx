import './PicturesGalleryContainer.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearPicturesStoreHandler, picturesUploadHandler } from '~/actions/pictures';
import { Gallery } from '../components/Gallery/Gallery.jsx';
import Loader from '../../../components/Loader/Loader.js';
class PicturesGalleryContainer extends Component {
    state = {
        isModalVisible: false,
        lastVisible: null,
    };

    firstQuery = () => {
        const {lastVisible} = this.state;

        this.props.dispatch(picturesUploadHandler(lastVisible))
            .then(data => {this.setState({lastVisible: data.lastVisible})})
            .catch(error => console.log(error))
    };

    nextQuery = () => {
        const {lastVisible} = this.state;

        if (lastVisible !== null) {
            this.props.dispatch(picturesUploadHandler(lastVisible))
                .then(data => this.setState({lastVisible: data.lastVisible}))
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
        const { pictures, loading } = this.props;
        const numberOfPictures = Object.keys(pictures).length;

        return (
            <div className="wrapper">
                {numberOfPictures > 0 && <Gallery onScroll={this.handleScroll} pictures={pictures} />}
                {loading && numberOfPictures === 0 && <Loader/>}
                {loading && numberOfPictures !== 0 && <Loader/>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pictures };
}

export default connect(mapStateToProps)(PicturesGalleryContainer);