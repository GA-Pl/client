export interface CurriculumItem {
  [key: string]: string[];
}

export interface CurriculumCategory {
  [key: string]: CurriculumItem[];
}

export interface NurriCurriculum {
  nurri_curriculum: CurriculumCategory[];
}
