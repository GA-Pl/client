interface BasicInfoProps {
  subject: string;
  detailSubject: string;
  activityType: string;
}

const BasicInfo = ({
  subject,
  detailSubject,
  activityType,
}: BasicInfoProps) => {
  const groupType = '중집단';
  const ageGroup = '만 4세';
  return (
    <table className={'min-w-full divide-y divide-slate-200 text-sm'}>
      <tbody className={'bg-white divide-y divide-slate-200'}>
        <tr>
          <td
            className={
              'px-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
            }
          >
            {'집단 유형'}
          </td>
          <td className={'py-3 whitespace-nowrap text-slate-500'}>
            {groupType}
          </td>
          <td
            className={
              'px-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
            }
          >
            {'연령'}
          </td>
          <td className={'py-3 whitespace-nowrap text-slate-500'}>
            {ageGroup}
          </td>
        </tr>
        <tr>
          <td
            className={
              'pl-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
            }
          >
            {'활동 주제'}
          </td>
          <td className={'py-3 whitespace-nowrap text-slate-500'}>{subject}</td>
        </tr>
        <tr>
          <td
            className={
              'pl-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
            }
          >
            {'세부 주제'}
          </td>
          <td className={'py-3 whitespace-nowrap text-slate-500'}>
            {detailSubject}
          </td>
        </tr>
        <tr>
          <td
            className={
              'pl-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
            }
          >
            {'활동 유형'}
          </td>
          <td className={'py-3 whitespace-nowrap text-slate-500'}>
            {activityType}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BasicInfo;
