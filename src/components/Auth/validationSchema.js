const schema = {
  name: "required|min:3|max:100|alphaSpaces",
  email: "required|min:3|max:100|email",
  age: "required|numeric|minVal:18|maxVal:100",
  password: "required|min:9|max:100|notOneOf:password",
  confirm_password: "confirmed:@password|required|min:6|max:100",
  country: "required|countryExcluded:Iran",
  tos: "tos",
};

export default schema;
