'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import generateReportWithGemini from '@/lib/report-generator';

// Constants for form options
const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'];
const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Remote'];

// Report sections configuration
const REPORT_SECTIONS = [
  { id: 'market_overview', title: 'Market Overview' },
  { id: 'skill_demand', title: 'Skill Demand Analysis' },
  { id: 'salary_ranges', title: 'Salary Ranges' },
  { id: 'industry_trends', title: 'Industry Trends' },
  { id: 'regional_insights', title: 'Regional Insights' },
  { id: 'future_outlook', title: 'Future Outlook' }
];

const ReportGenerator = () => {
  const [formData, setFormData] = useState({
    industry: '',
    country: '',
    region: '',
    city: '',
    start_date: '',
    end_date: '',
    skills: '',
    experience_level: '',
    employment_type: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [parsedReport, setParsedReport] = useState(null);

  const cleanReportContent = (content) => {
    return content.replace(/[*]+/g, '').replace(/[\n\r]+/g, '\n').trim();
  };
  
  const parseReportContent = (content) => {
    if (!content) return null;
  
    const sections = {};
    let currentSection = null;
    let currentTitle = '';
    
    // Split content into lines and process
    const lines = content.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
      const cleanedLine = cleanReportContent(line);
      
      // Check for section headers (numbered or unnumbered)
      const sectionMatch = cleanedLine.match(/(?:\d+\.\s*)?(.*?):/);
      
      if (sectionMatch) {
        const potentialTitle = sectionMatch[1].trim();
        
        // Find if this section corresponds to any of our predefined sections
        const matchedSection = REPORT_SECTIONS.find(
          section => potentialTitle.toLowerCase().includes(section.title.toLowerCase())
        );
  
        if (matchedSection) {
          currentSection = matchedSection.id;
          currentTitle = potentialTitle; 
          sections[currentSection] = {
            title: currentTitle,
            content: []
          };
        } else if (currentSection) {
          // If we have a current section, treat this as content
          sections[currentSection].content.push(cleanedLine);
        }
      } else if (currentSection) {
        // If inside a section, add content
        sections[currentSection].content.push(cleanedLine.trim());
      }
    });
  
    return sections;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateReport = async () => {
    try {
      setIsLoading(true);
      const report = await generateReportWithGemini(formData);
      const parsed = parseReportContent(report);
      setParsedReport(parsed);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSection = (sectionData, sectionId) => {
    if (!sectionData?.content?.length) return null;
  
    return (
      <div key={sectionId} className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">{sectionData.title}</h3>
        <div className="space-y-2">
          {sectionData.content.map((paragraph, idx) => (
            <p key={`${sectionId}-p-${idx}`} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Generate Personalized Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form fields remain the same */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Input
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="Enter industry"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Input
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Enter country"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Region</label>
            <Input
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              placeholder="Enter region"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <Input
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Enter skills (comma-separated)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <Select 
              value={formData.experience_level}
              onValueChange={(value) => handleSelectChange(value, 'experience_level')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map(level => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Employment Type</label>
            <Select
              value={formData.employment_type}
              onValueChange={(value) => handleSelectChange(value, 'employment_type')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPES.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={generateReport}
          disabled={isLoading}
        >
          {isLoading ? 'Generating Report...' : 'Generate Report'}
        </Button>

        {parsedReport && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Market Analysis Report</h2>
              <p className="text-sm text-gray-600 mt-1">
                Analysis for {formData.industry} in {[formData.city, formData.region, formData.country].filter(Boolean).join(', ')}
              </p>
            </div>
            <div className="space-y-6">
              {REPORT_SECTIONS.map(section => 
                parsedReport[section.id] && renderSection(parsedReport[section.id], section.id)
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
