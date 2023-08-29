import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FUllPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // 3. if there is NO authenticated user, redirect to the log/in
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);
  // 2. while loading, show a spinner
  if (isLoading)
    return (
      <FUllPage>
        <Spinner />
      </FUllPage>
    );

  // 4. if there is a user, render the app
  return children;
}

export default ProtectedRoute;
