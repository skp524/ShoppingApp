import { UserSchema } from '../schema/User';
const Realm = require('realm');

export const addUser = async (userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      realm.write(() => {
        realm.create('Users', userDetails);
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});
export const getUser = async (emailId) => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      realm.write(() => {
        let user = realm.objectForPrimaryKey('Users', emailId);
        resolve(user);
      });
    })
    .catch(error => {
      reject(error);
    });;
});
export const updateUser = async (userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      realm.write(() => {
        realm.create('Users', {
          emailId: userDetails.emailId,
          name: userDetails.name,
        }, 'modified');
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});

export const getAllUsers = async () => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      let allUsers = realm.objects('Users');
      resolve(allUsers);
    })
    .catch(error => {
      reject(error);
    });;
});