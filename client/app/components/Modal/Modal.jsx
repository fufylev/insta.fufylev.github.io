import './Modal.scss';

import React, { Component } from 'react';
import ReactDom from 'react-dom';

const modalRoot = document.getElementById('modal');

export class Modal extends Component {
    constructor(props) {
        super(props);

        this.element = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.element);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.element);
    }

    onClose = (event) => {
        const { onClose } = this.props;

        if (event.target.classList.contains('overlay')) {
            onClose();
        }
    };

    onCloseBtn = () => {
        const { onClose } = this.props;
        onClose();
    };

    renderView = () => {
        const { children } = this.props;
        return (
            <>
                <div className="overlay" onClick={this.onClose}>
                    <div className="modal">
                        {children}
                    </div>
                    <span className='modal-close' onClick={this.onCloseBtn}>X</span>
                </div>
            </>

        );
    };

    render() {
        return ReactDom.createPortal(
            this.renderView(),
            this.element,
        );
    }
}