import { action } from 'mobx';
import { addUser } from '../database/handler/User'

class SignUp {

  @action addUser = (userDetails) => {
    addUser(userDetails);
  };

}
export default SignUp;