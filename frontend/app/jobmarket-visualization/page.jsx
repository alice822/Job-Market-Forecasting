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
            console.log(response.data)
            setForecastData(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getForecast()
    }, [])

    if (!forecastData) return <div>Loading...</div>

    return (
        <div>
            <JobMarketDashboard data={forecastData[0]} />
        </div>
    )
}

export default Page