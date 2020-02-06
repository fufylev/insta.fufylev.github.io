import './Gallery.scss';
import ImageBox from '../ImageBox/ImageBox.jsx';
import React, { Component } from 'react';

class Gallery extends Component {

    handleScroll = () => {
        const { onScroll } = this.props;
        if ((window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight) {
            return;
        }

        if (typeof onScroll === 'function') {
            onScroll();
        }
    };

    renderItemDefault = (picture) => {
        return (
            <ImageBox key={picture.id} {...picture} />
        );
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const { pictures, renderItem } = this.props;

        return (
            <>
                <h2 className="yQ0j1">Explore</h2>
                <div className="gallery">
                    {pictures.map(renderItem ? renderItem : this.renderItemDefault)}
                </div>
            </>
        );
    }
}

export default Gallery;