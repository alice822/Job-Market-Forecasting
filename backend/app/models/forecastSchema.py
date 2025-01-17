from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, PlainSerializer
from typing import List, Optional, Annotated
from datetime import datetime
from bson import ObjectId
import typing

# Custom type for ObjectId handling
PyObjectId = Annotated[
    str,
    BeforeValidator(lambda x: str(x) if isinstance(x, ObjectId) else x),
    PlainSerializer(lambda x: str(x), return_type=str),
]

class JobRequest(BaseModel):
    industry: str
    location: str
    timeframe: str
    skills: Optional[List[str]] = None
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )

class JobForecast(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    industry: str
    location: str
    forecast: str
    demand_score: float
    recommended_skills: List[str]
    timestamp: datetime = Field(default_factory=datetime.now)
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        alias_generator=None
    )

    def to_mongo(self) -> dict:
        """Convert the model to MongoDB format"""
        data = self.model_dump(by_alias=True, exclude_none=True)
        if data.get("_id") is not None:
            data["_id"] = ObjectId(data["_id"])
        return data