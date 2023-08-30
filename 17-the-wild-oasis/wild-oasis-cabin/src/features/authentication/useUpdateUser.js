import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success("User account successfully uploaded");
      queryClient.invalidateQueries("user");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
