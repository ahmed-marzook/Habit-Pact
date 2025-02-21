/**
 * Request payload for changing user password
 */
export interface ChangePasswordRequest {
  /**
   * Current password
   * @minLength 8
   * @example "currentPass123"
   */
  currentPassword: string;

  /**
   * New password
   * @minLength 8
   * @example "newPass123"
   */
  newPassword: string;
}
