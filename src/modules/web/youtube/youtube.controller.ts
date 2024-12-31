import { ExpressRequest, ExpressResponse } from '../../../common/types';
import axios from 'axios';
import { youtubeRepository } from './youtube.repository';
import { ISearchDB } from './youtube.types';

const YOUTUBE_SEARCH_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEOS_API_URL = 'https://www.googleapis.com/youtube/v3/videos';

const getVideoYouTube = async (req: ExpressRequest, res: ExpressResponse) => {
  const { id } = req.params;

  try {
    const response = await axios.get(YOUTUBE_VIDEOS_API_URL, {
      params: {
        part: 'snippet, statistics',
        id,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    if (!response.data.items.length) {
      return res.status(404).json({ error: 'Video not found.' });
    }
    const video = response.data.items[0];

    const result = {
      videoId: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.default.url,
      publishedAt: video.snippet.publishedAt,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      commentCount: video.statistics.commentCount,
    };

    return res.json({
      status: 200,
      result,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data from YouTube API.' });
  }
};

const getHistoryYouTube = async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const result = await youtubeRepository.getHistory();
    return res.json({ history: result });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};

const getSearchYouTube = async (req: ExpressRequest, res: ExpressResponse) => {
  const { q, pageToken, maxResults = 10 } = req.query;

  try {
    const response = await axios.get(YOUTUBE_SEARCH_API_URL, {
      params: {
        part: 'snippet',
        q,
        pageToken,
        maxResults,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    const results: Array<ISearchDB> = response.data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      published_at: item.snippet.publishedAt,
    }));

    await youtubeRepository.insertYouTube(results);

    await youtubeRepository.insertHistory({ query: q.toString() });

    const count = await youtubeRepository.getCountHistory(q.toString());

    count
      ? await youtubeRepository.updateAnalytics({ count: count + 1, query: q.toString() })
      : await youtubeRepository.insertAnalytics({ count: 1, query: q.toString() });

    return res.json({
      status: 200,
      results,
      totalResults: response.data.pageInfo.totalResults,
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data from YouTube API.' });
  }
};

export const YoutubeController = {
  getVideoYouTube,
  getSearchYouTube,
  getHistoryYouTube,
};
