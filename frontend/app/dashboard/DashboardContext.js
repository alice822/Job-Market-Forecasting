'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getForecast } from '@/lib/forecastapi';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedIndustry1, setSelectedIndustry1] = useState('');
  const [selectedIndustry2, setSelectedIndustry2] = useState('');
  const [selectedIndustriesData, setSelectedIndustriesData] = useState([]);
 
  const getForecastData = async () => {
    const data = await getForecast();
    setForecastData(data);
    if (data.length > 0) {
      setSelectedIndustry1(data[0].industry);
      setSelectedIndustry2(data.length > 1 ? data[1].industry : data[0].industry);
    }
    };
  useEffect(() =>  {
    getForecastData();
  }, []);

  useEffect(() => {
    const filteredData = forecastData.filter(
      industry => industry.industry === selectedIndustry1 || industry.industry === selectedIndustry2
    );
    setSelectedIndustriesData(filteredData);
  }, [selectedIndustry1, selectedIndustry2, forecastData]);

  const value = {
    forecastData,
    selectedIndustry1,
    setSelectedIndustry1,
    selectedIndustry2,
    setSelectedIndustry2,
    selectedIndustriesData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};