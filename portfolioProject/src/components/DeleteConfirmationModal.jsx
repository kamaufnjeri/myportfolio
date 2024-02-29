import React from 'react';
import Modal from 'react-modal';

const DeleteConfirmationModal = ({ isOpen, onDelete, onCancel }) => {

    // style for buttons
    const closeButtonstyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        margin: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '50px',
    }

    const deleteButtonStyle = {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        margin: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '50px',
    }

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onCancel}
        contentLabel="Delete Confirmation Modal"
        style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
              backgroundColor: '#fff',
              border: 'none',
              padding: '20px',
              maxWidth: '400px',
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '200px',
              flexDirection: 'column',
            }
        }}
      >
        <h2>Are you sure you want to delete this item?</h2>
        <div>
            <button onClick={onDelete} style={deleteButtonStyle}>Yes</button>
            <button onClick={onCancel} style={closeButtonstyle}>No</button>
        </div>
      </Modal>
    );
};

export default DeleteConfirmationModal;