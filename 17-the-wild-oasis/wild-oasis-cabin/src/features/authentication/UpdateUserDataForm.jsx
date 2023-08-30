import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { styled } from "styled-components";
import { useUpdateUser } from "./useUpdateUser";
const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "70%",
      }}
      onSubmit={handleSubmit}
    >
      <StyledField>
        <label htmlFor="email">Email address</label>
        <Input value={email} disabled />
      </StyledField>
      <StyledField>
        <label htmlFor="fullName">Full name</label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </StyledField>
      <StyledField>
        <label htmlFor="avatar">Avatar image</label>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </StyledField>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
          width: "100%",
        }}
      >
        <Button
          type="reset"
          variation="secondary"
          onClick={handleCancel}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </div>
    </Form>
  );
}

export default UpdateUserDataForm;
