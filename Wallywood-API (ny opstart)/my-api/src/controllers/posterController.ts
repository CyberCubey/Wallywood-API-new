

import { Request, Response } from 'express';
import { prisma } from '../prisma';


export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.poster.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        price: true,
        stock: true,

        genres: {
          select: {
            genre: {
              select: {
                id: true,
                title: true,
                slug: true,
              },},},},}, });

    const result = data.map((p) => ({
      ...p,
      genres: p.genres.map((rel) => rel.genre),
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch posters' });
  }

};


export const getRecord = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  if (!slug) {
    return res.status(400).json({ error: 'Slug is missing' });
  }

  try {
    const data = await prisma.poster.findFirst({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        price: true,
        stock: true,

        genres: {
          select: {
            genre: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },

    });



    if (!data) {
      return res.status(404).json({ error: 'Poster not found' });
    }

    const result = {
      ...data,
      genres: data.genres.map((rel) => rel.genre),
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch poster' });
  }
};

export default {
  getRecords,
  getRecord,
};

