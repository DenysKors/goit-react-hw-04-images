import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, ModalOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseEsc);
  }

  handleCloseEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  backdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.backdropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
