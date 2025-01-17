from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from app.config import settings
from typing import List, Optional

class LLMService:
    def __init__(self):
        self.llm = Ollama(
            model=settings.MODEL_NAME,
            temperature=0.7,
            base_url=settings.OLLAMA_BASE_URL,
        )
        
        self.prompt = PromptTemplate(
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
        
        self.chain = LLMChain(llm=self.llm, prompt=self.prompt)

    async def generate_forecast(self, industry: str, location: str, timeframe: str, skills: Optional[List[str]]) -> dict:
        response = await self.chain.arun(
            industry=industry,
            location=location,
            timeframe=timeframe,
            skills=", ".join(skills) if skills else "not specified"
        )
        
        return self._parse_response(response)

    def _parse_response(self, response: str) -> dict:
        sections = response.split('\n')
        result = {
            "forecast": "",
            "demand_score": 7.5,
            "recommended_skills": ["Skill 1", "Skill 2", "Skill 3"]
        }
        
        for section in sections:
            if section.startswith('FORECAST:'):
                result["forecast"] = section.replace('FORECAST:', '').strip()
            elif section.startswith('DEMAND:'):
                try:
                    result["demand_score"] = float(section.replace('DEMAND:', '').strip())
                except ValueError:
                    pass
            elif section.startswith('SKILLS:'):
                skills_text = section.replace('SKILLS:', '').strip()
                result["recommended_skills"] = [s.strip() for s in skills_text.split(',')][:3]
        
        return result