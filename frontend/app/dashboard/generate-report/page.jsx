import ReportGenerator from "@/components/reportGen"

function Page(){
    return(
        <div className="flex flex-col items-center justify-center h-auto bg-gray-100 px-2">
            <div className="shadow-lg rounded-lg p-4 bg-white">
                <ReportGenerator />
            </div>
        </div>
    )
}


export default Page;