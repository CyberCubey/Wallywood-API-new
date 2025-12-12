
import { Request, Response } from 'express';
import { prisma } from '../prisma';


/**
 * @param req
 * @param Response
 * @returns Array
*/


export const getRecords = async (req: Request, res: Response) => {
    try {
        const data = await prisma.genre.findMany();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch genrelist' });
    }
};


/**
 * Method Get Record
 * @param req
 * @param res
 * @returns Object
 */

export const getRecord = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    
    if (!slug) {
        return res.status(400).json({ error: 'Slug is missing'})
    }


    try {
        const data = await prisma.genre.findFirst({
            where: { slug },
            select: {
                title: true,
                slug: true,
                posters: {
                    select: {
                        poster: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                image: true,
                                price: true,
                                stock: true
                            }
                        }
                    },

                }
            }
        })

        if (!data) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        const result = {
            ...data,
            posters: data.posters.map(rel => rel.poster)
        };

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch genre' });


