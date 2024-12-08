import UpdatePlan from './_component/UpdatePlan';

export default function updatePlanPage({ params }: { params: { id: string } }) {
  return <UpdatePlan params={params} />;
}
