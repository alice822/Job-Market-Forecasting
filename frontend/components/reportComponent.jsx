import React from 'react';

const ReportSection = ({ title, content }) => {
  const parseContent = (content) => {
    if (!content || !Array.isArray(content)) return [];
    
    return content.map(item => {
      // Remove markdown bullets, numbers, and other symbols
      const cleanItem = item
        .replace(/^\*\s*/, '') 
        .replace(/^\d+\.\s*/, '') 
        .replace(/\*\*/g, '') 
        .replace(/^[-•]\s*/, '') 
        .trim();

      // Check if the item contains a range (like salary ranges)
      const isSalaryRange = cleanItem.includes(':');
      
      if (isSalaryRange) {
        const [role, range] = cleanItem.split(':').map(part => part.trim());
        return { role, range, type: 'range' };
      }
      
      return { content: cleanItem, type: 'text' };
    });
  };

  const parsedContent = parseContent(content);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      
      {parsedContent.map((item, index) => (
        item.type === 'range' ? (
          <div 
            key={index}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-2 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-700">{item.role}</span>
            <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
              {item.range}
            </span>
          </div>
        ) : (
          <div 
            key={index}
            className="flex items-start mb-3"
          >
            <div className="mt-2 mr-3 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </div>
        )
      ))}
    </div>
  );
};

const EnhancedReportDisplay = ({ report, formData }) => {
  if (!report) return null;

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold">Market Analysis Report</h2>
        <p className="mt-2 text-blue-100">
          Analysis for {formData.industry} in {[formData.city, formData.region, formData.country].filter(Boolean).join(', ')}
        </p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-b-lg shadow-lg">
        {Object.entries(report).map(([sectionId, sectionData]) => (
          <ReportSection
            key={sectionId}
            title={sectionData.title}
            content={sectionData.content}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedReportDisplay;