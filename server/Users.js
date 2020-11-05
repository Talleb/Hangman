const Users = []

function addUser (id, userName){
  const User = {id, userName}
  Users.push(User)
  
  return User
}


function FindUser(id){
  const user = Users.find(user => user.id === id)
  return user
}


function removeUsers() {
  Users.splice(0)
}


module.exports = {addUser, FindUser, removeUsers, Users}