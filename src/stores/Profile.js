import { action, observable } from 'mobx';
import { updateUser, getUser } from '../database/handler/User'

class Profile {

  @observable userDetails = [];

  @action getUser = (emailId) => {
    getUser(emailId).then((res) => {
      this.userDetails = res;
    }).catch((error) => {
      console.log(error);
    });
  };
  @action updateUser = (userDetails) => {
    updateUser(userDetails);
  };

}
export default Profile;