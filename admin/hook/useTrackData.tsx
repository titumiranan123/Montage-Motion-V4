
import { useQuery } from '@tanstack/react-query';
import { api_url } from './Apiurl';

const useTrackData = () => {
    const {data,isLoading,refetch} = useQuery({
        queryKey:['track-access'],
        queryFn:async()=>{
            const response = await api_url.get('/api/website/visitors')
           return response.data?.data
        }
    })
    return {data,isLoading,refetch}
};

export default useTrackData;