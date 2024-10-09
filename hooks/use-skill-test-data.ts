import { useState, useEffect } from 'react';

interface SkillTestData {
  quickStats: {
    rank: number;
    percentile: number;
    correctAnswers: number;
    totalQuestions: number;
  };
  comparisonData: Array<{ name: string; score: number }>;
  syllabusData: Array<{ name: string; score: number }>;
}

export function useSkillTestData() {
  const [data, setData] = useState<SkillTestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const dummyData: SkillTestData = {
      quickStats: {
        rank: 1,
        percentile: 30,
        correctAnswers: 10,
        totalQuestions: 15
      },
      comparisonData: [
        { name: 'You', score: 30 },
        { name: 'Average', score: 72 }
      ],
      syllabusData: [
        { name: 'HTML Tools, Forms, History', score: 80 },
        { name: 'Tags & References in HTML', score: 60 },
        { name: 'Tables & References in HTML', score: 24 },
        { name: 'Tables & CSS Basics', score: 96 }
      ]
    };

    // Simulate API call
    setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  return { data, loading };
}