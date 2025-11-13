import { generateInitialDataset } from '@/lib/dataGenerator';
import Dashboard from '@/components/Dashboard';

export default async function DashboardPage() {
  // Server Component: Generate initial data on the server
  const initialData = generateInitialDataset(1000);

  return <Dashboard initialData={initialData} />;
}

