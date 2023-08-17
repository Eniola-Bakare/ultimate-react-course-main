import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utilities/helpers";
import DeleteBtn from "./DeleteBtn";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="item-center flex justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteBtn pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
