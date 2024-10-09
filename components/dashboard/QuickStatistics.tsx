interface QuickStatisticsProps {
    data: {
      rank: number;
      percentile: number;
      correctAnswers: number;
      totalQuestions: number;
    }
  }
  
  export function QuickStatistics({ data }: QuickStatisticsProps) {
    return (
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold">{data.rank}</p>
          <p className="text-sm text-gray-600">YOUR RANK</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{data.percentile}%</p>
          <p className="text-sm text-gray-600">PERCENTILE</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{data.correctAnswers} / {data.totalQuestions}</p>
          <p className="text-sm text-gray-600">CORRECT ANSWERS</p>
        </div>
      </div>
    )
}