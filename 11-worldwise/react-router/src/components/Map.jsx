import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParam] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const emojii = searchParams.get("emojii");

  return (
    <div
      className={styles.mapContainer}
      onClick={(e) => {
        e.preventDefault;
        navigate("form");
      }}
    >
      <p>Mapppppp</p>
      <h1>
        Poition:{lat} {lng}
      </h1>
      {emojii}
      <button onClick={() => setSearchParam({ lat: 20, lng: 900 })}>
        Change position
      </button>
    </div>
  );
}

export default Map;
