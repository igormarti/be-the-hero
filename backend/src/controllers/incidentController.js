const conn = require('../database/connection');

module.exports = {
    async index(req,res){
        const incidents = await conn('incidents').select('*');

        return res.json(incidents);
    },
    async create(req,res){
        const {title,description,value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({id});
    },
    async delete(req,res){
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const incident = await conn('incidents').where('id',id).select('ong_id').first();
      
        if(incident.ong_id!==ong_id){
            return res.status(401).json({error:'Operation not permited'})
        }

        await conn('incidents').where('id',id).delete();

        return res.status(204).send();
    }
}