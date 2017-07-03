


module.exports = function (app) {
  //d   `1ata sources
  var ds = app.dataSources['db'];

  const createRoles = (cb) => {
    cb(null, [])
  }

  const createUsers = (roles, cb) => {
    ds.automigrate('User', function (err) {
      if (err) return cb(err);
      var User = app.models.User;
      User.create([
        { username: 'John', email: 'john@doe.com', password: 'gotthemilk' },
        { username: 'Jane', email: 'jane@doe.com', password: 'gotthemilk' },
      ], cb);
    });
  }
  // {"email": "john@doe.com", "password": "gotthemilk" }
  const createTodos = (users, cb) => {
    ds.automigrate('Todo', function (err) {
      if (err) return cb(err);
      var Todo = app.models.Todo;
      Todo.create([
        { text: 'Remember the milk', completed: false },
        { text: 'Reminder to remember the milk', completed: false },
        { text: 'Visualize milk as beer', completed: true },
        { text: 'Don\'t forget the milk at the store', completed: false },
      ], cb);
    });
  }

  createRoles((err, roles) => 
    createUsers(roles, (err,users) =>
      createTodos(roles, (err,todos) => console.log('SEED DATA INIT DONE'))
    )
  )
}
  