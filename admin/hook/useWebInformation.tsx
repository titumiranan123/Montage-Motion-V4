import { useQuery } from '@tanstack/react-query';
import { api_url } from './Apiurl';

const useWebOverview = () => {
    const {data,isLoading,refetch} = useQuery({
        queryKey:['web overview'],
        queryFn:async()=>{
            const response = await api_url.get('/api/dashboard/overview')
           return response.data
        },
        select:data=>data.data
    })
    return {data,isLoading,refetch}
};

export default useWebOverview;