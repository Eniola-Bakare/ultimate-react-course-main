import { useCheckOut } from "./useCheckOut";

import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingout}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
