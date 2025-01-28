'use client'
import Skills from '@/components/Skills'
import { useDashboard } from '../DashboardContext';

function page() {
    const { selectedIndustriesData } = useDashboard()
    
    if (!selectedIndustriesData || selectedIndustriesData.length === 0) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-pulse text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text animate-bounce">
                    Loading...
                </div>
            </div>
        )
    }

    return (
        <div>
            {selectedIndustriesData.map((industryData, index) => (
                <Skills key={industryData.industry} data={industryData} />
            ))}
        </div>
    )
}

export default page