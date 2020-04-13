const conn = require('../database/connection');

module.exports = {
    async create(req,res){

        const {id} = req.body;

        const ong = await conn('ongs').where('id',id).select('name');

        if(!ong){
            return res.status(400).json({error:'ONG not found'});
        }

        return res.json({ong});
    },
}