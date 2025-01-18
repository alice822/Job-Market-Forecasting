from fastapi import HTTPException
from app.models.forecasSchema import JobRequest, JobForecast
from app.services.llama_service import LLMService
from app.services.db_service import DatabaseService
from typing import List

class JobController:
    def __init__(self):
        self.llm_service = LLMService()
        self.db_service = DatabaseService()

    async def create_forecast(self, request: JobRequest) -> JobForecast:
        try:
            # Generate forecast using LLM
            forecast_data = await self.llm_service.generate_forecast(
                request.industry,
                request.location,
                request.timeframe,
                request.skills
            )
            
            # Create forecast object
            forecast = JobForecast(
                industry=request.industry,
                location=request.location,
                **forecast_data
            )
            
            # Save to database
            return await self.db_service.create_forecast(forecast)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_forecasts(self) -> List[JobForecast]:
        try:
            return await self.db_service.get_forecasts()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_forecast(self, forecast_id: str) -> JobForecast:
        try:
            forecast = await self.db_service.get_forecast(forecast_id)
            if not forecast:
                raise HTTPException(status_code=404, detail="Forecast not found")
            return forecast
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def update_forecast(self, forecast_id: str, request: JobRequest) -> JobForecast:
        try:
            # Generate new forecast
            forecast_data = await self.llm_service.generate_forecast(
                request.industry,
                request.location,
                request.timeframe,
                request.skills
            )
            
            # Create updated forecast object
            forecast = JobForecast(
                industry=request.industry,
                location=request.location,
                **forecast_data
            )
            
            # Update in database
            updated_forecast = await self.db_service.update_forecast(forecast_id, forecast)
            if not updated_forecast:
                raise HTTPException(status_code=404, detail="Forecast not found")
            return updated_forecast
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def delete_forecast(self, forecast_id: str) -> bool:
        try:
            deleted = await self.db_service.delete_forecast(forecast_id)
            if not deleted:
                raise HTTPException(status_code=404, detail="Forecast not found")
            return True
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
