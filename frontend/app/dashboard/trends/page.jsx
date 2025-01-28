'use client'
import React, { useState, useEffect } from 'react'
import JobMarketDashboard from '@/components/JobMarketDashboard'
import { api } from '@/lib/axiosInstance'

function Page() {
    const [forecastData, setForecastData] = useState(null)
    
    const getForecast = async () => {
        try {
            const response = await api.get('/forecasts', {
                responseType: 'json',
                headers: {
                    'Accept': 'application/json',
                },
            });
            setForecastData(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getForecast()
    }, [])

    if (!forecastData) {
        return(
            <div className="flex items-center justify-center p-4">
            <div className="animate-pulse text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text animate-bounce">
              Loading...
            </div>
          </div>
        )}

    return (
        <div>
            <JobMarketDashboard data={forecastData[0]} />
        </div>
    )
}

export default Page