import '../styles/ButtonsSection.scss';

function ButtonsSection(props) {
  const { onGuess, onBackspace } = props;
  
  return (
    <div id="button-section">
      <button className="button" onClick={onGuess}>
        <span>Guess</span>
      </button>

      <button className="button" onClick={onBackspace}>
        <span>Back</span>
      </button>
    </div>
  )
}

export default ButtonsSection;