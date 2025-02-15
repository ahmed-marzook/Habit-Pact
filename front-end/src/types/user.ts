export default interface User {
  id?: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
