import { useQuery } from '@tanstack/react-query';
import { api_url } from './Apiurl';

const useWorks = (type:string) => {
    const {data,isLoading,refetch} = useQuery({
        queryKey:['works'],
        queryFn:async()=>{
            const response = await api_url.get(`/api/works/website?type=${type}`)
           return response.data
        },
        select:data=>data.data
    })
    return {data,isLoading,refetch}
};

export default useWorks;