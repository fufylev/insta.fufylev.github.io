import './PicturesGallary.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFirstSetOfPictures, loadNextSetOfPictures } from '~/libs/api/API';
import {picturesUploadHandler} from '../../actions/pictures';

class PicturesGallary extends Component {
    state = {
        token: '',
        isModalVisible: false,
        lastVisible: null,
    };

    nextQuery = () => {
        loadNextSetOfPictures(this.state.lastVisible).then(data => {
            this.setState((prevState) => ({
                ...prevState,
                lastVisible: data.lastVisible,
            }));
            // console.log(data.pictures);
            this.props.dispatch(picturesUploadHandler(data.pictures))
        });

    };

    componentDidMount() {
        loadFirstSetOfPictures().then(data => {
            this.setState((prevState) => ({
                ...prevState,
                lastVisible: data.lastVisible,
            }));
            // console.log(data.pictures);
            this.props.dispatch(picturesUploadHandler(data.pictures))
        });
    }

    render() {
        const {pictures} = this.props;
        console.log(this.props);
        return (
            <div className="wrapper">
                {Object.keys(pictures).map(key => <img key={key} src={pictures[key].image} alt=""/>)}
                <button onClick={this.nextQuery}>
                    next
                </button>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return { ...state.pictures };
}

export default connect(mapStateToProps)(PicturesGallary);