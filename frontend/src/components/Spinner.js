import spinner from '../images/Spinner.svg';
import '../styles/Spinner.css';

function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
      <div className="Spinner"><img src={spinner} /></div>
    </div>
  )
};

export default Spinner;