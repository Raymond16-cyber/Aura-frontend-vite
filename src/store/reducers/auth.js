const authState = {
  myInfo: {},
  loading: false,
  isAuthenticated: false,
  error: "",
  successMessage: "",
};

export const authReducer = (state = authState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};
