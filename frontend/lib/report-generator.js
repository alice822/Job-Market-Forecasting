// generateReportWithGemini.js
const generateReportWithGemini = async (formData) => {

    // Gemini API configuration
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;


    if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }

    try {
        // Construct a detailed prompt for report generation
        const prompt = `Generate a detailed market analysis report based on the following details:
        - Industry: ${formData.industry}
        - Location: ${formData.country}, ${formData.region}, ${formData.city}
        - Time Period: ${formData.start_date} to ${formData.end_date}
        - Required Skills: ${formData.skills}
        - Experience Level: ${formData.experience_level}
        - Employment Type: ${formData.employment_type}
        
        Please provide the following sections exactly as described below:
        1. Market Overview
        2. Skill Demand Analysis
        3. Salary Ranges
        4. Industry Trends
        5. Regional Insights
        6. Future Outlook`;
        

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 4096,
                    topK: 40,
                    topP: 0.8,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error Response:', errorData);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Handle the specific Gemini API response structure
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Unexpected API response structure:', data);
            return "Unable to generate report. Please try again.";
        }

    } catch (error) {
        console.error("Report generation error:", error);
        throw new Error(error.message || "Failed to generate report");
    }
};

export default generateReportWithGemini;