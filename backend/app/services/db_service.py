from pymongo import MongoClient
from pymongo.collection import Collection
from app.config import settings
import certifi
from app.models.forecastSchema import JobForecast
from bson import ObjectId
from typing import List, Optional
from app.database import MongoManager

class DatabaseService:
    def __init__(self, collection_name: str = "forecasts"):
        self.db_manager = MongoManager()
        self.collection: Collection = self.db_manager.db[collection_name]
    
    async def create_forecast(self, forecast: JobForecast) -> JobForecast:
        forecast_dict = forecast.model_dump(exclude={"id"})
        result = self.collection.insert_one(forecast_dict)
        forecast.id = result.inserted_id
        return forecast

    async def get_forecasts(self) -> List[JobForecast]:
        forecasts = []
        cursor = self.collection.find()
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            forecasts.append(JobForecast(**doc))
        return forecasts

    async def get_forecast(self, forecast_id: str) -> Optional[JobForecast]:
        doc = self.collection.find_one({"_id": ObjectId(forecast_id)})
        if doc:
            doc["_id"] = str(doc["_id"])
            return JobForecast(**doc)
        return None

    async def update_forecast(self, forecast_id: str, forecast: JobForecast) -> Optional[JobForecast]:
        forecast_dict = forecast.model_dump(exclude={"id"})
        result = self.collection.update_one(
            {"_id": ObjectId(forecast_id)},
            {"$set": forecast_dict}
        )
        if result.modified_count:
            return await self.get_forecast(forecast_id)
        return None

    async def delete_forecast(self, forecast_id: str) -> bool:
        result = self.collection.delete_one({"_id": ObjectId(forecast_id)})
        return result.deleted_count > 0
    