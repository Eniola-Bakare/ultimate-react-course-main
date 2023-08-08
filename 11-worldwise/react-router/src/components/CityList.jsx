import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ data, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!data.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {data.map((each) => (
        <CityItem key={each.id} each={each} />
      ))}
    </ul>
  );
}

export default CityList;
