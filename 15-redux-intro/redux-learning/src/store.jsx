import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// const store = createStore(accountReducer);
// const store = createStore(customerReducer);

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1500, loanPurpose: "Buy food!" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan"});

// store.dispatch(deposit(300));
// store.dispatch(withdraw(150));
// store.dispatch(requestLoan(2000, "Buy food!"));
// store.dispatch(payLoan());

console.log(store.getState());
export default store
