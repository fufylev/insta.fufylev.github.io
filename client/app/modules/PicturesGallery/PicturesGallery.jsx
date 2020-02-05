import './PicturesGallery.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFirstSetOfPictures, loadNextSetOfPictures } from '~/libs/api/API';
import { loadStartHandler, picturesUploadHandler, clearStoreHandler } from '~/actions/pictures';

class PicturesGallery extends Component {
    state = {
        isModalVisible: false,
        lastVisible: null,
    };

    firsQuery = () => {
        this.props.dispatch(loadStartHandler()).then(() => {
            loadFirstSetOfPictures().then(data => {
                this.setState((prevState) => ({
                    ...prevState,
                    lastVisible: data.lastVisible,
                }));
                this.props.dispatch(picturesUploadHandler(data.pictures));
            });
        });
    };

    nextQuery = () => {
        this.props.dispatch(loadStartHandler()).then(() => {
            if (this.state.lastVisible !==null) {
                loadNextSetOfPictures(this.state.lastVisible).then(data => {
                    this.setState((prevState) => ({
                        ...prevState,
                        lastVisible: data.lastVisible,
                    }));
                    this.props.dispatch(picturesUploadHandler(data.pictures));
                });
            } else {
                this.firsQuery();
            }
        });
    };

    componentDidMount() {
        this.props.dispatch(clearStoreHandler()).then(() => {
            this.firsQuery();
        });
    }

    render() {
        const { pictures, loading } = this.props;
        const numberOfPictures = Object.keys(pictures).length;

        return (
            <div className="wrapper">
                {Object.keys(pictures).map(key => <img key={key} src={pictures[key].image} alt=""/>)}
                <button onClick={this.nextQuery}>
                    next
                </button>
                {loading && numberOfPictures ===0 && <div className='loading-top'> Loading .......</div>}
                {loading && numberOfPictures !==0 && <div className='loading-bottom'>Loading .......</div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pictures };
}

export default connect(mapStateToProps)(PicturesGallery);