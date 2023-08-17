import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import LinkButton from "../../ui/LinkButton";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            className="input grow"
            defaultValue={userName}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" className="input w-full" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">Address</label>
          <div className="grow ">
            <input type="text" className="input w-full" required />
          </div>
          <span className="absolute right-[3px] z-50">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Address
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus-outline-none h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-1"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
          <LinkButton to="/cart">&larr; Back to cart</LinkButton>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  // if (!isValidPhone(order.phone))
  // if (!order.phone)
  // if (!order.phone)
  //   errors.phone = "Please give a valid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
