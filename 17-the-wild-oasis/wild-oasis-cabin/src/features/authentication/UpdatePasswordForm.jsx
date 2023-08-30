import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { styled } from "styled-components";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "70%",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledField>
        <label htmlFor="password">Password (min 8 charaters)</label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        <p style={{color: 'red'}}>{errors?.password?.message}</p>
      </StyledField>

      <StyledField>
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
         <p style={{color: 'red'}}>{errors?.passwordConfirm?.message}</p>
      </StyledField>
      <div>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </div>
    </Form>
  );
}

export default UpdatePasswordForm;
