import { useQuery } from '@tanstack/react-query';
import { api_url } from './Apiurl';
const useCampagin = () => {
    const {data,isLoading,isError,refetch} = useQuery({
        queryKey:["campaigns"],
        queryFn:async ()=>{
        const res = await api_url.get('/api/campaigns')
        return res?.data
        }
    })
    return {data,isLoading,isError,refetch}
};

export default useCampagin;