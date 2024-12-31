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

const getHistory = async (): Promise<Array<IHistoryDB>> => {
  return db.select('*').from('history').orderBy('created_at', 'desc').limit(10).returning('*');
};

export const youtubeRepository = {
  insertYouTube,
  insertHistory,
  insertAnalytics,
  updateAnalytics,
  getCountHistory,
  getHistory,
};
