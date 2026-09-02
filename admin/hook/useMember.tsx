import { useQuery } from '@tanstack/react-query';
import { api_url } from './Apiurl';
const useMembers = () => {
    const {data,isLoading,isError,refetch} = useQuery({
        queryKey:["members"],
        queryFn:async ()=>{
        const res = await api_url.get('/api/members')
        return Array.isArray(res.data?.data) ? res.data.data : []
        }
    })
    return {data,isLoading,isError,refetch}
};

export default useMembers;
