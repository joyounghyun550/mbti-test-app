import { useQuery } from "@tanstack/react-query";

const useGetInfo = (key, fn) => {
  const { data, isPending, isError } = useQuery({
    queryKey: key,
    queryFn: fn,
  });

  return { data, isPending, isError };
};

export default useGetInfo;
