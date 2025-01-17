# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from langchain_community.llms import Ollama  # Updated import
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Job Market Forecasting API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Ollama
try:
    llm = Ollama(
        model="llama2",
        temperature=0.7,
        base_url="http://localhost:11434",
    )
except Exception as e:
    print(f"Error initializing Ollama: {e}")
    # We'll continue without failing here, but the API will return errors if Ollama isn't running

# Pydantic models
class JobRequest(BaseModel):
    industry: str
    location: str
    timeframe: str
    skills: Optional[List[str]] = None

class JobForecast(BaseModel):
    industry: str
    location: str
    forecast: str
    demand_score: float
    recommended_skills: List[str]
    timestamp: datetime

# Prompt template
job_forecast_prompt = PromptTemplate(
    input_variables=["industry", "location", "timeframe", "skills"],
    template="""
    You are a job market analysis expert. Please analyze the job market forecast for the following parameters:
    Industry: {industry}
    Location: {location}
    Timeframe: {timeframe}
    Skills: {skills}
    
    Format your response exactly as follows:
    FORECAST: [Write a one-sentence market outlook]
    DEMAND: [Provide a number between 0-10]
    SKILLS: [List exactly three recommended skills, separated by commas]
    """
)

# Create LLMChain
forecast_chain = LLMChain(llm=llm, prompt=job_forecast_prompt)

@app.get("/")
async def root():
    return {"message": "Job Market Forecasting API"}

@app.get("/health")
async def health_check():
    """Check if Ollama is responding"""
    try:
        # Simple test prompt to check if Ollama is working
        llm("test")
        return {"status": "healthy", "message": "Ollama is responding"}
    except Exception as e:
        return {"status": "unhealthy", "message": str(e)}

@app.post("/forecast", response_model=JobForecast)
async def get_job_forecast(request: JobRequest):
    try:
        # Get forecast from LangChain
        response = forecast_chain.run(
            industry=request.industry,
            location=request.location,
            timeframe=request.timeframe,
            skills=", ".join(request.skills) if request.skills else "not specified"
        )
        
        # Parse response
        sections = response.split('\n')
        forecast = ""
        demand_score = 7.5
        recommended_skills = ["Skill 1", "Skill 2", "Skill 3"]
        
        for section in sections:
            if section.startswith('FORECAST:'):
                forecast = section.replace('FORECAST:', '').strip()
            elif section.startswith('DEMAND:'):
                try:
                    demand_score = float(section.replace('DEMAND:', '').strip())
                except ValueError:
                    pass
            elif section.startswith('SKILLS:'):
                skills_text = section.replace('SKILLS:', '').strip()
                recommended_skills = [s.strip() for s in skills_text.split(',')][:3]
        
        return JobForecast(
            industry=request.industry,
            location=request.location,
            forecast=forecast,
            demand_score=demand_score,
            recommended_skills=recommended_skills,
            timestamp=datetime.now()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)