import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => toast.success("New user successfully created"),
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isSigningUp };
}
