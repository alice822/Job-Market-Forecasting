
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
 

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Industries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">10</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Average Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">26%</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Highest Demand</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">AI & ML</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹30L</p>
        </CardContent>
      </Card>
    </div>
  );
}