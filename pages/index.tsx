import { FC } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SkillTestDashboard } from "@/components/dashboard/SkillTestDashboard";
import { useSkillTestData } from "@/hooks/use-skill-test-data";

interface SkillTestData {
  rank?: string;
  percentile?: string;
  correctAnswers?: string;
}

const Home: FC = () => {
  const { data, loading, error } = useSkillTestData();

  // Error handling if fetching data fails
  if (error) return <div>Error loading data. Please try again later.</div>;

  // Show a loading message while the data is being fetched
  if (loading) return <div>Loading...</div>;

  // Render dashboard once the data is loaded
  return (
    <DashboardLayout>
      {/* Ensure data is passed safely to the SkillTestDashboard */}
      <SkillTestDashboard initialData={data as SkillTestData} />
    </DashboardLayout>
  );
};

export default Home;
