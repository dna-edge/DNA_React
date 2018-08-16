import { REGISTER_USER, LOGIN } from './../../actions/users/UserAction';

const INITIAL_STATE = {
  all: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, all: action.payload.data.result }

    case LOGIN:
      // 로그인이 완료되었다면
      const result = action.payload.data.result;

      // 먼저 토큰을 저장하고,
      localStorage.setItem("accessToken", result.token.accessToken);
      localStorage.setItem("refreshToken", result.token.refreshToken);
      localStorage.setItem("radius", 50);

      // 다음으로 프로필을 저장한다.
      localStorage.setItem("profile", JSON.stringify(result.profile));

      return { ...state, all: result }

    default:
      return state;
  }
}
