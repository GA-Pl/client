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
    <div className={'min-w-full'}>
      <div className={'hidden laptop:block'}>
        <table className={'divide-y divide-slate-200 text-sm bg-white w-full'}>
          <tbody className={'divide-y divide-slate-200'}>
            <tr>
              <td
                className={
                  'pl-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
                }
              >
                {'집단 유형'}
              </td>
              <td className={'py-3 whitespace-nowrap text-slate-500'}>
                {groupType}
              </td>
              <td
                className={
                  'pl-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
                }
              >
                {'연령'}
              </td>
              <td className={'py-3 whitespace-nowrap text-slate-500'}>
                {ageGroup}
              </td>
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
            <tr>
              <td
                className={
                  'pl-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
                }
              >
                {'활동 주제'}
              </td>
              <td className={'py-3 whitespace-nowrap text-slate-500'}>
                {subject}
              </td>
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
          </tbody>
        </table>
      </div>
      <div className={'laptop:hidden'}>
        <div
          className={'flex flex-wrap justify-start space-x-2 items-center pb-3'}
        >
          <span
            className={
              'bg-slate-200 text-slate-800 text-sm font-medium px-3 py-1 rounded'
            }
          >
            {ageGroup}
          </span>
          <span
            className={
              'bg-slate-200 text-slate-800 text-sm font-medium px-3 py-1 rounded'
            }
          >
            {groupType}
          </span>
          <span
            className={
              'bg-slate-200 text-slate-800 text-sm font-medium px-3 py-1 rounded'
            }
          >
            {activityType}
          </span>
        </div>
        <table className={'divide-y divide-slate-200 text-sm bg-white w-full'}>
          <tbody className={'divide-y divide-slate-200'}>
            <tr>
              <td
                className={
                  'pl-3 py-3 whitespace-nowrap text-base font-medium text-slate-800'
                }
              >
                {'활동 주제'}
              </td>
              <td className={'py-3 whitespace-nowrap text-slate-500'}>
                {subject}
              </td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BasicInfo;
