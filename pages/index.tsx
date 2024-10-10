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
  const { data, loading } = useSkillTestData();

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <SkillTestDashboard initialData={data as SkillTestData} />
    </DashboardLayout>
  );
};

export default Home;