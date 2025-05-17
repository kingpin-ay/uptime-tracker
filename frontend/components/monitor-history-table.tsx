import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export function MonitorHistoryTable() {
  // Mock data for the history table
  const history = [
    {
      id: "1",
      timestamp: "2025-05-17 10:30:45",
      status: "success",
      statusCode: 200,
      responseTime: "187ms",
    },
    {
      id: "2",
      timestamp: "2025-05-17 10:15:45",
      status: "success",
      statusCode: 200,
      responseTime: "192ms",
    },
    {
      id: "3",
      timestamp: "2025-05-17 10:00:45",
      status: "success",
      statusCode: 200,
      responseTime: "178ms",
    },
    {
      id: "4",
      timestamp: "2025-05-17 09:45:45",
      status: "success",
      statusCode: 200,
      responseTime: "201ms",
    },
    {
      id: "5",
      timestamp: "2025-05-17 09:30:45",
      status: "error",
      statusCode: 503,
      responseTime: "2103ms",
    },
    {
      id: "6",
      timestamp: "2025-05-17 09:15:45",
      status: "success",
      statusCode: 200,
      responseTime: "189ms",
    },
    {
      id: "7",
      timestamp: "2025-05-17 09:00:45",
      status: "success",
      statusCode: 200,
      responseTime: "195ms",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Response Code</TableHead>
          <TableHead className="text-right">Response Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.timestamp}</TableCell>
            <TableCell>
              {item.status === "success" ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" /> Success
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" /> Error
                </Badge>
              )}
            </TableCell>
            <TableCell>{item.statusCode}</TableCell>
            <TableCell className="text-right">{item.responseTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
