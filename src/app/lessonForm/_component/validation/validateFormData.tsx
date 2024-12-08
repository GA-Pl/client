import { toast } from 'react-toastify';

interface Goal {
  id: string;
  text: string;
}

interface Tool {
  id: string;
  value: string;
}

interface Precaution {
  id: string;
  text: string;
}

interface Evaluation {
  id: string;
  text: string;
}

interface ContentItem {
  subtitle: string;
  contents: { text: string }[];
}

interface CurriculumComponent {
  selectedNurri: string;
  selectedSubNurri: string;
  selectedCurriculum: string;
}

export const validateFormData = (
  title: string,
  subject: string,
  detailSubject: string,
  age: number,
  groupSize: string,
  activityType: string,
  goals: Goal[] = [],
  tools: Tool[] = [],
  precautions: Precaution[] = [],
  evaluations: Evaluation[] = [],
  contents: ContentItem[] = [],
  curriculumComponents: CurriculumComponent[] = [],
): boolean => {
  if (!title) {
    toast.error('활동명을 입력하세요.');
    return false;
  }
  if (!subject) {
    toast.error('주제를 입력하세요.');
    return false;
  }
  if (!detailSubject) {
    toast.error('세부 주제를 입력하세요.');
    return false;
  }
  if (goals.length === 0 || !goals[0].text) {
    toast.error('활동 목표를 입력하세요.');
    return false;
  }
  if (tools.length === 0 || !tools[0].value) {
    toast.error('활동 도구를 입력하세요.');
    return false;
  }
  if (precautions.length === 0 || !precautions[0].text) {
    toast.error('유의 사항을 입력하세요.');
    return false;
  }
  if (evaluations.length === 0 || !evaluations[0].text) {
    toast.error('평가 기준을 입력하세요.');
    return false;
  }
  if (
    contents.length === 0 ||
    !contents.some((content) => content.subtitle && content.contents.length > 0) // 유효한 데이터가 없는 경우
  ) {
    toast.error('활동 내용을 입력하세요.');
    return false;
  }
  if (
    curriculumComponents.length === 0 ||
    curriculumComponents.some(
      (component) =>
        !component.selectedNurri ||
        !component.selectedSubNurri ||
        !component.selectedCurriculum,
    )
  ) {
    toast.error('누리과정을 입력하세요.');
    return false;
  }
  if (!activityType) {
    toast.error('활동 유형을 선택하세요.');
    return false;
  }

  return true;
};
