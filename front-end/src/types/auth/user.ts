export default interface AuthResponse {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  refreshToken?: string;
}
