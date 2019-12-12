const databass = require('../data/da-config.js')

module.exports = {
    find,
    findById,
    findSteps
}

function find(){
    return databass('schemes');
}

function findById(id){
    return databass('schemes').where({id})
}

function findSteps(id){
    return databass('steps')
        .select('steps.id', 'steps.step_number', 'steps.instructions', 'schemes.scheme_name')
        .join('schemes', 'steps.scheme_id', 'schemes.id')
        .where('schemes.id', id)

}