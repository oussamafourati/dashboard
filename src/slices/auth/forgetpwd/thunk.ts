import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";

export const userForgetPassword =
  (user: any, history: any) => async (dispatch: any) => {
    try {
      let response;
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      }

      const data = await response;

      if (data) {
        dispatch(
          userForgetPasswordSuccess(
            "Reset link are sended to your mailbox, check there first"
          )
        );
      }
    } catch (forgetError) {
      dispatch(userForgetPasswordError(forgetError));
    }
  };
