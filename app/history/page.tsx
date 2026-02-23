"use client";

import { useHistory } from "@/hooks/use-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip // Added in the last step
} from "recharts";

// Ensure the function name matches your export
export default function HistoryPage() { 
  const { history } = useHistory("tank_01"); 

  // If you are missing a return statement, this error will also trigger
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Water Quality History</h1>
      <Card>
        <CardHeader>
          <CardTitle>pH & Turbidity Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="time" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip /> 
              <Line type="monotone" dataKey="ph" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="turbidity" stroke="#0891b2" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}