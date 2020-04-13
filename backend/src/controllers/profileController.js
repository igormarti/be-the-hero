const conn = require('../database/connection');

module.exports = {
    async index(req,res){

        const {page = 1} = req.query;
        const ong_id = req.headers.authorization;

        const [count] = await conn('incidents').count();

        const incidents = await conn('incidents').where('ong_id',ong_id)
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(
        [
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        res.header('X-TOTAL-COUNT', count['count(*)']);
        return res.json(incidents);
    },
}