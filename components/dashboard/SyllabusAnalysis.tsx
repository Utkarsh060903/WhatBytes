import { Progress } from "@/components/ui/progress"

interface SyllabusAnalysisProps {
  data: Array<{ name: string; score: number }>
}

export function SyllabusAnalysis({ data }: SyllabusAnalysisProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Syllabus Wise Analysis</h3>
      {data.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm font-medium">{item.score}%</span>
          </div>
          <Progress value={item.score} className="h-2" />
        </div>
      ))}
    </div>
  )
}