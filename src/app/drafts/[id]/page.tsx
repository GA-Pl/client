import UpdatePlan from '@/app/updatePlan/[id]/_component/UpdatePlan';

function Page({ params }: { params: { id: string } }) {
  return <UpdatePlan params={params} />;
}

export default Page;
