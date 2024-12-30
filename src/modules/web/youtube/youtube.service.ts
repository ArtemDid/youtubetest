// import { youtubeRepository } from './youtube.repository';
// import { IYouTubeDB } from './youtube.types';
//
// const insertComment = async (text: string, parent_id: any, limit: number, offset: number, users_id: number) => {
//   await youtubeRepository.insertYouTube({ text, parent_id, users_id });
//   const comments = getComments(limit, offset);
//   return comments;
// };
//
// const getComments = async (limit: number, offset: number) => {
//   const LIMIT: number = parseInt(limit?.toString()) || 25,
//     OFFSET: number = parseInt(offset?.toString()) || 0;
//
//   const comments = await youtubeRepository.getComments(LIMIT, OFFSET);
//
//   comments.comments = getParsedComments(comments.comments);
//
//   return comments;
// };
//
// const getParsedComments = (comments: Array<ICommentDB>) => {
//   const newArray: any = [];
//   const allChildrens: any = [];
//
//   for (const item of comments) {
//     const childrens = [];
//
//     for (const item1 of comments) {
//       if (+item1.parent_id === item.id) {
//         childrens.push(item1);
//         !allChildrens.includes(item1) && allChildrens.push(item1);
//       }
//     }
//     item.childrens = childrens;
//     !allChildrens.includes(item) && newArray.push(item);
//   }
//   return newArray;
// };
//
// export const youtubeService = {
//   insertComment,
//   getComments,
// };
