const fs = require('fs')

const User = {
    filename :'./database/users.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));

    },
    generateId: function () {
         let allUsers = this.findAll();
         let lastUser = allUsers.pop();
         return lastUser.id + 1
    },
    findAll: function (){
        return this.getData();
    },
    findByPk: function (id){
      let allUsers = this.findAll();
      let userFound = allUsers.find(oneUser => oneUser.id === id);
      return userFound
    },
    findByField: function (field, text){
      let allUsers = this.findAll();
      let userFound = allUsers.find(oneUser => oneUser[field ]=== text);
      return userFound
    },

    create: function (userData) {
        let allUsers = this.findAll();
        allUsers.push(userData);
        fs.writeFileSync(this.filename, JSON.stringify(allUsers,null, ' '))
        return true;
    }
}

console.log(User.create({name:'Rocio', lastname:'Ferrua', email: 'nicoferrua@gmail.com', password: 'crossfityani'}));