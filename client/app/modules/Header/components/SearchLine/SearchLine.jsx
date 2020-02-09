import React, { Component } from 'react';
import './SearchLine.scss';
import { IoMdSearch } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';

class SearchLine extends Component {
    state = {
        searchQuery: '',
    };

    handleSearch = (event) => {
        const {value} = event.target;
        this.setState({searchQuery: value})


    };

    handleSubmit = () => {
        // TODO
        // create Search action/reducer once DashBoard has finished
    };

    handleClear = () => {
        this.setState({searchQuery: ''})
    };

    render() {
        const {searchQuery} = this.state;
        return (
            <div className='header-search'>
                <input
                    className='header-search-input'
                    type="text"
                    maxLength="50"
                    value={searchQuery}
                    onChange={this.handleSearch}
                    placeholder='Search'
                    autoCapitalize='none'
                />
                <span
                    className="header-search-icon_search"
                    onClick={this.handleSubmit}
                >
                    <IoMdSearch/>
                </span>
                <span
                    style={{display: searchQuery ? 'block' : 'none'}}
                    className="header-search-icon_clear"
                    onClick={this.handleClear}
                >
                    <IoMdCloseCircle/>
                </span>
            </div>
        );
    }
}

export default SearchLine;