import * as url from "../url_helper";

import accessToken from "../jwt-token-access/accessToken";

import { calenderDefaultCategories, events, defaultevent } from "Common/data";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
};

export default fakeBackend;
