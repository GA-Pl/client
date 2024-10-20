import CommentSection from './_component/commentSection/CommentSection';
import LessonDetails from './_component/lessonDetails/LessonDetails';

const LessonPage = () => {
  return (
    <div className={'container mx-auto px-4'}>
      <LessonDetails />
      <CommentSection />
    </div>
  );
};

export default LessonPage;
