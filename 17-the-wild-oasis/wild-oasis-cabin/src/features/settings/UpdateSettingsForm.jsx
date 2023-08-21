import { styled } from "styled-components";
import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdate } from "./useUpdateSetting";
import { useQueryClient } from "@tanstack/react-query";

function UpdateSettingsForm() {
  const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
    }
  `;

  const Label = styled.label`
    font-weight: 500;
  `;

  const {
    isLoading,
    settings: {
      breakfastPrice,
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdate();
  const queryClient = useQueryClient()

  function handleUpdate(e, field) {
    const { value } = e.target;
    console.log(value, field);
    updateSetting({[field]: value})
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input
          type="number"
          id="min-nights"
          disabled={isLoading}
          // disabled
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-nights">Maximum nights/booking</Label>
        <Input
          type="number"
          id="max-nights"
          disabled={isLoading}
          // disabled
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-guests">Maximum guests/booking</Label>
        <Input
          type="number"
          id="max-guests"
          disabled={isLoading}
          // disabled
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfast-price">Breakfast price</Label>
        <Input
          type="number"
          id="breakfast-price"
          disabled={isLoading}
          // disabled
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
      {/* <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" />
      </FormRow> */}
      {/* <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" />
      </FormRow> */}
      {/* <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" />
      </FormRow> */}
      {/* <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" />
      </FormRow> */}
    </Form>
  );
}

export default UpdateSettingsForm;
