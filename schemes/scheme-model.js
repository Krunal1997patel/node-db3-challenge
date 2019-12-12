const databass = require('../data/da-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
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

function add(data) {

    return databass('schemes').insert(data, 'id')
    .then( ids => {
        const [id] = ids;

        return findById(id);
    })
}

function addStep(data){
    return databass('steps').insert(data, 'id')
    .then(ids => ({ id: ids[0] }))
}

function update(change, id){
    return databass('schemes').where('id', Number(id)).update(change)
}

function remove(id){
    return databass('schemes').where('id', Number(id)).del()
}