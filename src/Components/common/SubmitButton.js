import './SubmitButton.css'
export default function SubmitButton({ disabled }) {
  return (
    <button className="submit-button" disabled={disabled}>
      <span className="submit-icon"></span>
    </button>
  );
}
