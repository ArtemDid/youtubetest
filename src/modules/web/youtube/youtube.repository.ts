import { IAnalyticsDB, IHistoryDB, ISearchDB } from './youtube.types';
import { db } from '../../../common/db/knex';

const insertYouTube = async (data: Array<ISearchDB>) => {
  return db('search').insert(data);
};

const insertHistory = async (data: IHistoryDB) => {
  return db('history').insert(data);
};

const insertAnalytics = async (data: IAnalyticsDB) => {
  return db('analytics').insert(data);
};

const updateAnalytics = async (data: IAnalyticsDB) => {
  return db('analytics').update({ count: data.count }).where({ query: data.query });
};

const getCountHistory = async (query: string): Promise<number> => {
  const count = await db('history').count('*').where({ query });
  return +count[0].count;
};

const getComments = async (
  limit: number,
  offset: number,
): Promise<{ totalCount: number; comments: Array<ISearchDB> }> => {
  const totalCount: number = ((await db('comments').clone().count('*', { as: 'count' }).first()) as { count: number })
    .count;

  const comments: Array<ISearchDB> = await db('comments')
    .select(
      'comments.id',
      'comments.parent_id',
      'comments.text',
      'comments.created_at',
      'comments.updated_at',
      'users.user_name',
      'users.email',
    )
    .innerJoin('users', 'users.id', 'comments.users_id')
    .limit(limit)
    .offset(offset);

  return { totalCount, comments };
};

export const youtubeRepository = {
  insertYouTube,
  insertHistory,
  insertAnalytics,
  updateAnalytics,
  getCountHistory,
};
