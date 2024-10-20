interface BasicInfoProps {
  subject: string;
  detailSubject: string;
  activityType: string[];
}

const BasicInfo = ({
  subject,
  detailSubject,
  activityType,
}: BasicInfoProps) => {
  return (
    <table className={'min-w-full divide-y divide-gray-200 text-sm'}>
      <tbody className={'bg-white divide-y divide-gray-300'}>
        <tr>
          <td
            className={'px-6 py-4 whitespace-nowrap font-medium text-gray-900'}
          >
            {'활동 주제'}
          </td>
          <td className={'px-6 py-4 whitespace-nowrap text-gray-500'}>
            {subject}
          </td>
        </tr>
        <tr>
          <td
            className={'px-6 py-4 whitespace-nowrap font-medium text-gray-900'}
          >
            {'세부 주제'}
          </td>
          <td className={'px-6 py-4 whitespace-nowrap text-gray-500'}>
            {detailSubject}
          </td>
        </tr>
        <tr>
          <td
            className={'px-6 py-4 whitespace-nowrap font-medium text-gray-900'}
          >
            {'활동 유형'}
          </td>
          <td className={'px-6 py-4 whitespace-nowrap text-gray-500'}>
            {activityType?.join(', ')}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BasicInfo;
