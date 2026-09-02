import { useQuery } from '@tanstack/react-query';

import { api_url } from './Apiurl';

const useContact = (page = 1, limit = 6) => {
    const {data: response,isLoading,isError} = useQuery({
        queryKey:["contacts", page, limit],
        queryFn:async ()=>{
        const res = await api_url.get(`/api/contacts?page=${page}&limit=${limit}`)
        return res.data.data
        }
    })
    const data = Array.isArray(response) ? response : response?.data ?? [];
    return {
        data,
        total: Array.isArray(response) ? data.length : response?.total ?? 0,
        totalPages: Array.isArray(response) ? 1 : response?.pages ?? 1,
        isLoading,
        isError,
    }
};

export default useContact;
