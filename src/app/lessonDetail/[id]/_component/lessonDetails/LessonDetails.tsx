import { DUMMY_LESSON } from '../../../../../../public/data/dummy_lesson';
import ActivityContent from './ActivityContent';
import ActivityTool from './ActivityTools';
import BasicInfo from './BasicInfo';
import Evaluation from './Evaluation';
import GoalTable from './GoalTable';
import Precaution from './Precaution';
import FileList from './FileList';

const LessonDetails = () => {
  return (
    <div>
      <div className={'my-4'}>
        <h1 className={'text-xl font-bold'}>
          {DUMMY_LESSON.activity_plan.title}
        </h1>
      </div>

      <div className={'my-4'}>
        <h2 className={'text-lg font-semibold'}>{'기본 정보'}</h2>
        <BasicInfo
          subject={DUMMY_LESSON.activity_plan.subject}
          detailSubject={DUMMY_LESSON.activity_plan.detail_subject}
          activityType={DUMMY_LESSON.activity_plan.activity_type}
        />
      </div>
      <GoalTable title={'활동 목표'}>
        {DUMMY_LESSON.activity_plan.acitivty_goal.map((goal: string) => (
          <tr key={goal}>
            <td>{goal}</td>
          </tr>
        ))}
      </GoalTable>
      <div className={'flex justify-between'}>
        <ActivityTool tools={DUMMY_LESSON.activity_plan.activity_tool} />
        <FileList files={DUMMY_LESSON.activity_plan.file} />
      </div>
      <ActivityContent contents={DUMMY_LESSON.activity_plan.activity_content} />

      <Precaution precautions={DUMMY_LESSON.activity_plan.precautions} />
      <Evaluation
        evaluations={DUMMY_LESSON.activity_plan.evaluation_criteria}
      />
    </div>
  );
};

export default LessonDetails;
