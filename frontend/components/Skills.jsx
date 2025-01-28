import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TrendingUp, AlertTriangle } from 'lucide-react'

function Skills({ data }) {
  return (
    <div className="space-y-8">
      {/* Industry Title */}
      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        {data.industry} - {data.location.city}
      </h2>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="space-y-2">
                {data.skills_analysis.required_skills.map((skill) => (
                  <div key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Emerging Skills</h3>
              <div className="space-y-2">
                {data.skills_analysis.emerging_skills.map((skill) => (
                  <div key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Complementary Skills</h3>
              <div className="space-y-2">
                {data.skills_analysis.complementary_skills.map((skill) => (
                  <div key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Factors Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Positive Drivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.market_factors.positive_drivers.map((driver) => (
                <li key={driver} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-700">{driver}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.market_factors.risk_factors.map((risk) => (
                <li key={risk} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-gray-700">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Skills