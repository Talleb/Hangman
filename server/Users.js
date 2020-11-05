const Users = []

function addUser (id, userName){
  const User = {id, userName}
  if(Users.length < 2) Users.push(User)
  return User
}


function FindUser(id){
  const user = Users.find(user => user.id === id)
  return user
}
module.exports = {addUser, FindUser, Users}