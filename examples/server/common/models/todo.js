'use strict';

module.exports = function (Todo) {
  Todo.deleteTodos = function(where, cb) {
    Todo.destroyAll(where).then(result => cb(null, result.count))
  }
}


  // Todo.remoteMethod(
  //   'deleteAll',
  //   {
  //     //accepts: { arg: 'id', type: 'number', required: true },
  //     http: { path: '/deleteAll', verb: 'post' },
  //     returns: { arg: 'count', type: 'number' }
  //   });

