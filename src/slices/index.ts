import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import DashboardReducer from "./dashboard/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Dashboard: DashboardReducer,
});

export default rootReducer;
