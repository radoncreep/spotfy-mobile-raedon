import { QueryFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";


export const useSingleQuery = (key: string, fn: QueryFunction, options: UseQueryOptions) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [key],
        queryFn: fn,
        ...options
    })

    return { data, isLoading, error };
}