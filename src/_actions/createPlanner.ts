// 'use server';

// import { redirect } from 'next/navigation';

// export async function createPlanner(prevState, formData) {
//   const title = formData.get('title');
//   const subject = formData.get('subject');
//   const detail_subject = formData.get('detail_subject');
//   const activity_type = formData.get('activity_type');
//   const activity_goal = formData.get('activity_goal');
//   const activity_tool = formData.get('activity_tool');
//   const nurri_curriculum = formData.get('nurri_curriculum');
//   const activity_content = formData.get('activity_content');
//   const precautions = formData.get('precautions');
//   const evaluation_criteria = formData.get('evaluation_criteria');
//   const activity_size = formData.get('activity_size');
//   const activity_age = formData.get('activity_age');
//   const file = formData.get('file');

//   let errors = [];

//   if (!title || title.trim().length === 0) {
//     errors.push('제목을 넣어주세요.');
//   }

//   if (!subject || subject.trim().length === 0) {
//     errors.push('주제를 넣어주세요.');
//   }

//   if (!activity_type || activity_type.trim().length === 0) {
//     errors.push('활동 유형을 선택해주세요.');
//   }

//   if (!activity_goal || activity_goal.trim().length === 0) {
//     errors.push('활동 목표를 넣어주세요.');
//   }

//   if (!nurri_curriculum || nurri_curriculum.trim().length === 0) {
//     errors.push('누리과정을 선택해주세요.');
//   }
//   if (!activity_content || activity_content.trim().length === 0) {
//     errors.push('활동내용을 다 채워주세요.');
//   }
//   if (!activity_size || activity_size.trim().length === 0) {
//     errors.push('집단 규모를 선택해주세요.');
//   }
//   if (!activity_age || activity_age.trim().length === 0) {
//     errors.push('연령을 선택해주세요.');
//   }
// }
