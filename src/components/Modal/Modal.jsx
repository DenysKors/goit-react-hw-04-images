import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, ModalOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal(props) {
  const { onClose, children } = props;

  useEffect(() => {
    function handleCloseEsc(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleCloseEsc);
    return () => {
      window.removeEventListener('keydown', handleCloseEsc);
    };
  }, [onClose]);

  const backdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={backdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
