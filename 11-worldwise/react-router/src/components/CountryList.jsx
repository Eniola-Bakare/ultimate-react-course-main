import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";

function CountryList({ data, isLoading }) {
  console.log(data);
  if (isLoading) return <Spinner />;
  if (!data.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries = data.reduce((accArr, curData) => {
    return accArr.map((elem) => elem.country).includes(curData.country)
      ? [...accArr]
      : [...accArr, { country: curData.country }];
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
