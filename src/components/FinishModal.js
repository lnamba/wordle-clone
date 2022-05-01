import React from 'react';

import '../styles/Modal.scss';

function FinishModal(props) {
  const { reset, result } = props;

  return (
    <div className="finish-modal">
      <h1 className="title">{result === 'won' ? 'Success' : 'Good try'}</h1>

      <div className="button-container">
        <button className="modal-button" onClick={reset}>Play again</button>
      </div>
    </div>
  )
}

export default FinishModal;