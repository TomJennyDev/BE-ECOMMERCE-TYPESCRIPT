import config from "../config/config";

const createUser = {
  email: {
    trim: true,
    isEmail: true,
    notEmpty: true,
  },
  password: {
    notEmpty: true,
    trim: true,
    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    matches: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$",
  },
  name: {
    notEmpty: true,
    isString: true,
    trim: true,
  },
  address: {
    optional: true,
    isString: true,
    trim: true,
  },
  phone: {
    optional: true,
    isInt: true,
    trim: true,
  },
  avatarUrl: {
    optional: true,
    isString: true,
    trim: true,
  },
};

const getUsers = {
  limit: {
    optional: true,
    toInt: true,
    trim: true,
  },
  page: {
    optional: true,
    toInt: true,
    trim: true,
  },
  name: {
    optional: true,
    isString: true,
    trim: true,
  },
};

const updateUser = {
  password: {
    optional: true,
    trim: true,
    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    matches: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$",
  },
  name: {
    optional: true,
    isString: true,
    trim: true,
  },
  address: {
    optional: true,
    isString: true,
    trim: true,
  },
  phone: {
    optional: true,
    isInt: true,
    trim: true,
  },
  avatarUrl: {
    optional: true,
    isString: true,
    trim: true,
  },
};

const updateUserWithAdmin = {
  ...updateUser,
  role: {
    optional: true,
    isIn: {
      options: [Object.keys(config.role)],
    },
  },
  isEmailVerified: {
    optional: true,
    isBoolean: true,
  },
  isDeleted: {
    optional: true,
    isBoolean: true,
  },
};

const createUserWithAdmin = {
  email: {
    trim: true,
    isEmail: true,
    notEmpty: true,
  },
  password: {
    notEmpty: true,
    trim: true,
    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    matches: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$",
  },
  name: {
    notEmpty: true,
    isString: true,
    trim: true,
  },
  address: {
    notEmpty: true,
    isString: true,
    trim: true,
  },
  phone: {
    optional: true,
    isInt: true,
    trim: true,
  },
  avatar: {
    optional: true,
    isString: true,
    trim: true,
  },
  role: {
    optional: true,
    isIn: {
      options: [Object.keys(config.role)],
    },
  },
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  updateUserWithAdmin,
  createUserWithAdmin,
};
