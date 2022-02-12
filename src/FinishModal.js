import React from 'react';

import './Modal.scss'

function FinishModal(props) {
  const { result, reset } = props;

  return (
    <div className="finish-modal">
      <h1 className="text title">Success</h1>

      <div className="button-container">
        <button className="modal-button" onClick={reset}>Play again</button>
      </div>
    </div>
  )
}

export default FinishModal;