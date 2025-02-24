import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSmartMutation = (fn, key) => {
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: key,
      });
    },
  });

  return Mutation;
};

export default useSmartMutation;
