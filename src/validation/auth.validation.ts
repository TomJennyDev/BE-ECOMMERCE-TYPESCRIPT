const login = {
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true,
  },
  password: {
    notEmpty: true,
    trim: true,
    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    matches: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$",
  },
};

const resetPassword = {
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true,
  },
};

module.exports = {
  login,
  resetPassword,
};
