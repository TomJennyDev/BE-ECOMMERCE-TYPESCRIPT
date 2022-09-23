const verifyToken = {
  authorization: {
    custom: {
      options: (tokenString) => {
        if (!tokenString) {
          throw new AppError(
            StatusCodes.NON_AUTHORITATIVE_INFORMATION,
            "Missing access token",
            "Login Require Error"
          );
        }
        return true;
      },
    },
  },
};

module.exports = {
  verifyToken,
};
