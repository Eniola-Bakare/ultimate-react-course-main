import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isSigningUp } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signUp(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        <label htmlFor="fullName">Full name</label>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isSigningUp}
        />
        <p style={{ color: "red" }}> {errors?.fullName?.message}</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        <label htmlFor="email">Email address</label>
        <Input
          disabled={isSigningUp}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        <p style={{ color: "red" }}> {errors?.email?.message}</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        <label htmlFor="password">Password</label>
        <Input
          disabled={isSigningUp}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        <p style={{ color: "red" }}> {errors?.password?.message}</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        <label htmlFor="passwordConfirm">Repeat password</label>
        <Input
          disabled={isSigningUp}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "The passwords need to match",
          })}
        />
        <p style={{ color: "red" }}> {errors?.passwordConfirm?.message}</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
          width: "100%",
        }}
      >
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isSigningUp}
        >
          Cancel
        </Button>
        <Button>Create new user</Button>
      </div>
    </Form>
  );
}

export default SignupForm;
