import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css'; // Make sure to create a corresponding CSS module

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;
    return (
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <button type="button" className={styles.closeButton} onClick={this.props.onClose}>
            &times;
          </button>
          <img src={image} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
