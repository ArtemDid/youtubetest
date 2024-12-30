import Joi from 'joi';

export const youTubeSchema = Joi.object({
  q: Joi.string().required().trim().max(255),
  pageToken: Joi.string().optional().trim(),
  maxResults: Joi.number().optional(),
});
