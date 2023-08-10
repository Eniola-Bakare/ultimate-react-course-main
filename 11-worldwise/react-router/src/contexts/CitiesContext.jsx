import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  data: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducerFunc(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        data: action.payLoad,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payLoad,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payLoad],
        currentCity: action.payLoad,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((city) => city.id !== action.payLoad),
      };
    case "rejected":
      return {
        ...state,
        error: action.payLoad,
        isLoading: false,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ data, isLoading, currentCity }, dispatch] = useReducer(
    reducerFunc,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({
          type: "rejected",
          payLoad: "There was an error loading the cities...",
        });
      }
    }
    fetchData();
  }, []);

  async function getCityDetails(id) {
    if (+id === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "Error loading cities, please try again.",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // setData((prevCities) => [...prevCities, data]);
      dispatch({ type: "city/created", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "Error creating cities, please try again.",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // setData((prevCities) => prevCities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payLoad: id });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "Error deleting cities, please try again.",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        data,
        isLoading,
        currentCity,
        getCityDetails,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const values = useContext(CitiesContext);
  if (!values)
    throw new Error(
      "The Context is used outside of the CitiesContext Provider"
    );
  return values;
}

export { CitiesProvider, useCities };
