export interface IStrategyUser {
  id: string;
  email: string;
  name: string;
  provider: string;

  accessToken: string;
  refreshToken: string;
}
