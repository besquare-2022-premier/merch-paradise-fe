import "./error.css";
import NotFoundImage from "./assets/404.webp";
export default function NotFoundPage() {
  return (
    <div className="error-page-container">
      <img alt="Sad 404" src={NotFoundImage} />
      <h1>Page not found! Please check your URL and try again</h1>
    </div>
  );
}
