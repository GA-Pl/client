export interface CurriculumItem {
  selectedNurri: string;
  selectedSubNurri: string;
  selectedCurriculum: string;
}

export function transformNuriCurriculumToInitialState(
  nuriCurriculum: Record<string, Record<string, string[]>>,
): CurriculumItem[] {
  return Object.entries(nuriCurriculum).flatMap(
    ([nurriCategory, subCategories]) =>
      Object.entries(subCategories as Record<string, string[]>).flatMap(
        ([subCategory, details]) =>
          (details as string[]).map((detail) => ({
            selectedNurri: nurriCategory,
            selectedSubNurri: subCategory,
            selectedCurriculum: detail,
          })),
      ),
  );
}

export function buildNuriCurriculum(
  curriculumComponents: CurriculumItem[],
): { main_category: string; sub_category: string; content: string }[] {
  return curriculumComponents.map(
    ({ selectedNurri, selectedSubNurri, selectedCurriculum }) => ({
      main_category: selectedNurri,
      sub_category: selectedSubNurri,
      content: selectedCurriculum,
    }),
  );
}
