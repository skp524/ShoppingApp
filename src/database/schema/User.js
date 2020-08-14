export const UserSchema = {
  name: 'Users',
  primaryKey: 'emailId',
  properties: {
    imageURI: 'string?',
    name: 'string',
    mobileNo: 'string?',
    emailId: 'string',
    password: 'string?',
    signUpMethod: 'int',
  }
}
