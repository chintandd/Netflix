const HandleError = (firstname = "noValue", email, password) => {
  const firstnameREGEX = /^[a-zA-Z ]{2,30}$/.test(firstname);
  const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const passwordREGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password,
    );
  const errObject = {};

  if (!firstnameREGEX) {
    errObject.firstname = "Name Not Valid";
  } else {
    errObject.firstname = null;
  }
  if (!emailREGEX) {
    errObject.email = "Email Not Valid";
  } else {
    errObject.email = null;
  }
  if (!passwordREGEX) {
    errObject.password = "Password Not Valid";
  } else {
    errObject.password = null;
  }

  return errObject;
};

export default HandleError;
