class User {
    constructor(
      email,
      username,
      name,
      lastName,
      dateOfBirth,
      address,
      userType,
      verificationStatus,
      pictureUrl
    ) {
      this.email = email;
      this.username = username;
      this.name = name;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.address = address;
      this.userType = userType;
      this.verificationStatus = verificationStatus;
      this.pictureUrl = pictureUrl;
    }
  }
  
  export default User;