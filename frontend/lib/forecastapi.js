import {api} from './axiosInstance';

export const getForecast = async () => {
    try{
        const response  = await api.get('/forecasts', {
            responseType: 'json',
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    }catch(error){
        console.error(error)
    }
}