export enum AuthActionEnum {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
}

export type AuthAction =
  | {
      type: AuthActionEnum.LOG_IN;
      payload: {
        authToken: string;
        adminId: number;
        username: string;
        name: string;
      };
    }
  | {
      type: AuthActionEnum.LOG_OUT;
      payload: null;
    };
