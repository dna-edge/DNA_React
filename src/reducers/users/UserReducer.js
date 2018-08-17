import { REGISTER_USER, LOGIN } from './../../actions/users/UserAction';

const INITIAL_STATE = {
  dataObj: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      // 로그인이 완료되었다면
      const result = action.payload.data;

      // 먼저 토큰을 저장하고,
      console.log(result);
      localStorage.setItem("accessToken", result.token.accessToken);
      localStorage.setItem("refreshToken", result.token.refreshToken);
      localStorage.setItem("radius", 1000);

      // 다음으로 프로필을 저장한다.
      localStorage.setItem("profile", JSON.stringify(result.profile));

      return { ...state, dataObj: result }

    default:
      return state;
  }
}
