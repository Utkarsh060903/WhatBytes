import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { SkillTestDashboard } from "@/components/dashboard/SkillTestDashboard"
import { useSkillTestData } from "@/hooks/use-skill-test-data"

export default function Home() {
  const { data, loading } = useSkillTestData();

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <SkillTestDashboard data={data} />
    </DashboardLayout>
  )
}