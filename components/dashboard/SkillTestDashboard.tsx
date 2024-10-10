import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Percent, CheckCircle2} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import UpdateScoresModal from "@/components/dashboard/UpdatedScoreModal";

interface QuickStatisticsProps {
  rank: string;
  percentile: string;
  correctAnswers: string;
}

interface ComparisonGraphProps {
  percentile: number;
  averagePercentile: number;
}

interface SyllabusAnalysisProps {
  syllabusData: Array<{
    name: string;
    percentage: number;
  }>;
}

interface QuestionAnalysisProps {
  correctAnswers: string;
}

interface SkillTestDashboardProps {
  initialData?: {
    rank?: string;
    percentile?: string;
    correctAnswers?: string;
  };
}

interface DashboardData {
  rank: string;
  percentile: string;
  correctAnswers: string;
  currentScore: number;
}
const QuickStatistics: React.FC<QuickStatisticsProps> = ({
  rank,
  percentile,
  correctAnswers,
}) =>(
  <Card className="mb-6">
    <CardContent className="p-4">
      <h3 className="font-bold mb-4">Quick Statistics</h3>
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <Trophy className="text-yellow-500 mr-2" />
          <div>
            <div className="font-bold text-xl">{rank || "-"}</div>
            <div className="text-xs text-gray-500">YOUR RANK</div>
          </div>
        </div>
        <div className="flex items-center">
          <Percent className="text-blue-500 mr-2" />
          <div>
            <div className="font-bold text-xl">{percentile || "-"}%</div>
            <div className="text-xs text-gray-500">PERCENTILE</div>
          </div>
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="text-green-500 mr-2" />
          <div>
            <div className="font-bold text-xl">{correctAnswers || "-"}</div>
            <div className="text-xs text-gray-500">CORRECT ANSWERS</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
const ComparisonGraph: React.FC<ComparisonGraphProps> = ({
  percentile,
  averagePercentile,
}) => {
  const data = [
    { percentile: 0, students: 2 },
    { percentile: 10, students: 5 },
    { percentile: 20, students: 8 },
    { percentile: 30, students: 15 },
    { percentile: 40, students: 20 },
    { percentile: 50, students: 25 },
    { percentile: 60, students: 20 },
    { percentile: 70, students: 15 },
    { percentile: 80, students: 10 },
    { percentile: 90, students: 5 },
    { percentile: 100, students: 2 },
  ];

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }

   const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold">{`${label}`}</p>
          <p>{`numberOfStudents: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <Card className="mb-6 h-[443px]">
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">Comparison Graph</h3>
        <p className="text-sm text-gray-600 mb-4">
          You scored {percentile}% percentile which is{" "}
          {percentile < averagePercentile ? "lower" : "higher"} than the average
          percentile {averagePercentile}% of all the engineers who took this
          assessment
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="percentile" type="number" domain={[0, 100]} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="percentile" stroke="transparent" />
              {/* Marker for user's percentile */}
              <Line
                type="monotone"
                data={[
                  {
                    percentile: percentile,
                    students:
                      data.find((d) => d.percentile >= percentile)?.students ||
                      0,
                  },
                ]}
                stroke="#ff0000"
                strokeWidth={2}
                dot={{ r: 6, fill: "#ff0000" }}
              />
              {/* Marker for average percentile */}
              <Line
                type="monotone"
                data={[
                  {
                    percentile: averagePercentile,
                    students:
                      data.find((d) => d.percentile >= averagePercentile)
                        ?.students || 0,
                  },
                ]}
                stroke="#00ff00"
                strokeWidth={2}
                dot={{ r: 6, fill: "#00ff00" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
const SyllabusAnalysis: React.FC<SyllabusAnalysisProps> = ({ syllabusData }) =>  (
  <Card className="mb-6 h-[350px]">
    <CardContent className="p-4">
      <h3 className="font-bold mb-4">Syllabus Wise Analysis</h3>
      {syllabusData.map((item, index) => (
        <div key={index} className="mb-3 flex flex-col gap-5">
          <div className="flex justify-between text-sm mb-1">
            <span>{item.name}</span>
            <span
              className="font-bold"
              style={{
                color:
                  item.percentage >= 80
                    ? "#22c55e"
                    : item.percentage >= 60
                    ? "#f97316"
                    : "#ef4444",
              }}
            >
              {item.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${item.percentage}%`,
                backgroundColor:
                  item.percentage >= 80
                    ? "#22c55e"
                    : item.percentage >= 60
                    ? "#f97316"
                    : "#ef4444",
              }}
            ></div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
const QuestionAnalysis: React.FC<QuestionAnalysisProps> = ({ correctAnswers }) =>{
  const [correctCount, totalCount] = correctAnswers.split("/").map(Number);
  const percentage = (correctCount / totalCount) * 100;
  const data = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: totalCount - correctCount },
  ];
  const COLORS = ["#3b82f6", "#e5e7eb"];
  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Question Analysis</h3>
          <span className="text-blue-600 font-bold">{correctAnswers}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          You scored {correctCount} question{correctCount !== 1 ? "s" : ""}{" "}
          correct out of {totalCount}.
          {percentage < 80
            ? " However it still needs some improvements"
            : " Great job!"}
        </p>
        <div className="w-full h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {correctCount}/{totalCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const SkillTestDashboard: React.FC<SkillTestDashboardProps> = ({ initialData = {} }) => {
  const [data, setData] = useState({
    rank: initialData.rank || "1",
    percentile: initialData.percentile || "30",
    correctAnswers: initialData.correctAnswers || "10 / 15",
  });
  const handleUpdate = (newData:  Partial<DashboardData>) => {
    setData((prevData) => ({
      ...prevData,
      rank: newData.rank || prevData.rank,
      percentile: newData.percentile || prevData.percentile,
      correctAnswers: `${newData.currentScore || "10"} / 15`,
    }));
  };
  const syllabusData = [
    { name: "HTML Tools, Forms, History", percentage: 80 },
    { name: "Tags & References in HTML", percentage: 60 },
    { name: "Tables & References in HTML", percentage: 24 },
    { name: "Tables & CSS Basics", percentage: 96 },
  ];
  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto flex md:flex-row  flex-col overflow-y">
      <div className="flex-grow">
        <Card className="mb-6 w-[710px]">
          <CardHeader className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <img
                  src="/html5-logo.png"
                  alt="HTML5 Logo"
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <CardTitle>Hyper Text Markup Language</CardTitle>
                  <p className="text-sm text-gray-600">
                    Questions: 15 | Duration: 15 mins | Submitted on 5 June 2021
                  </p>
                </div>
              </div>
              <UpdateScoresModal onUpdate={handleUpdate} />
            </div>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 w-[710px]">
            <QuickStatistics
              rank={data.rank}
              percentile={data.percentile}
              correctAnswers={data.correctAnswers}
            />
            <ComparisonGraph
              percentile={Number(data.percentile)}
              averagePercentile={72}
            />
          </div>
        </div>
        </div>
        <div>
          <div className="space-y-6">
            <SyllabusAnalysis syllabusData={syllabusData} />
            <QuestionAnalysis
              correctAnswers={data.correctAnswers}
            />
          </div>
        </div>
      </div>
  );
};
export default SkillTestDashboard;