// model ogólny do zalogowanego usera
export interface User {
  id: number;
  email: string;
  token: string;
  isOwner: boolean;
  isEmployee: boolean;
  isCustomer: boolean;
  isActive: boolean;
  isSuperAdmin: boolean;
  emailConfirmed: boolean;
}

// model do wykrycia zalogowanego użytkownika
export interface UserConfirm {
  id: string;
  token: string;
}

// model do prezentacji użytkownika z posiadanymi rolami
export interface UserRolesManage {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userRolesDTO?: UserRolesDto[];
}

// model ról użytkownika
export interface UserRolesDto {
  id: number;
  name: string;
}

export interface UserRoleParams {
  pageNumber: number;
  pageSize: number;
}

export class UserRoleFormValues {
  id?: number;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  userRolesDTO: UserRolesDto[] = [];

  constructor(userRole?: UserRoleFormValues) {
    if (userRole) {
      this.id = userRole.id;
      this.firstName = userRole.firstName;
      this.lastName = userRole.lastName;
      this.email = userRole.email;
      this.userRolesDTO = userRole.userRolesDTO;
    }
  }
}

// model do przypisywania nowej roli użytkownikowi
export interface UserRoleCreate {
  userId: number;
  roleId: number;
  name: string;
}

// dla ról usera przy dodawaniu roli
export class RoleForUserFormValues {
  userId: number = 0;
  roleId: number = 0;

  constructor(role?: RoleForUserFormValues) {
    if (role) {
      this.userId = role.userId;
      this.roleId = role.roleId;
    }
  }
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export class ChangePasswordFormValues {
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(password?: ChangePasswordFormValues) {
    if (password) {
      this.oldPassword = password.oldPassword;
      this.newPassword = password.newPassword;
    }
  }
}
