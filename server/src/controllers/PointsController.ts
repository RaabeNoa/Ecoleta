import { Request, Response, response } from 'express';
import knex from '../database/connection';

class PointsController{ 
    async index(request: Request, response: Response){
        const { city, uf, items } = request.query; // .query pq essa listagem possui filtros

       const parsedItems = String(items).split(',').map(item => Number(item.trim()));

       const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json({ points });
    }

    async show(request: Request, response: Response){
        const { id } = request.params; //desestruturação. é o mesmo que usar const id = request.params.id

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point not found' });
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');
        
        return response.json({ point, items });
    }

    async create(request: Request, response: Response) {
    //recurso de desestruturação js. É o mesmo que const name = request.body.name
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction();

    const point = {
        image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.maceio.al.gov.br%2Fwp-content%2Fuploads%2F2018%2F01%2Fpng%2F2018%2F01%2FPEVs.png&imgrefurl=http%3A%2F%2Fwww.maceio.al.gov.br%2F2018%2F01%2Fsaiba-onde-estao-os-pontos-de-entrega-de-reciclaveis-da-prefeitura%2F&tbnid=EmbXN6pZpbfLvM&vet=12ahUKEwj60OKl--vpAhUnK7kGHaXBCG0QMygBegUIARClAQ..i&docid=QcL70wU3rkkQbM&w=1000&h=667&q=ponto%20de%20coleta&client=firefox-b-d&ved=2ahUKEwj60OKl--vpAhUnK7kGHaXBCG0QMygBegUIARClAQ',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    }

    //recurso short sintax-> Quando o nome é igual a variavel basta escrever uma x. É o mesmo que name:name
    const insertedIds = await trx('points').insert(point);
    
    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id: point_id,
        };
    })

    await trx('point_items').insert(pointItems);

    await trx.commit(); // sempre que usar transaction lembrar de dar commit(efetua a o insert) antes de retornar a resposta

    return response.json({ 
        id: point_id,
     ...point, //spread operator ... retorna tudo de um obj em outro objeto
     });
    }

}

export default PointsController;