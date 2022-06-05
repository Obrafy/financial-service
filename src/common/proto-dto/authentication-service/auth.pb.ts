/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

/** Role Enum */
export enum Role {
  INVALID = 0,
  USER = 1,
  ADMIN = 2,
  SUDO = 3,
  EMPLOYEE = 4,
  UNRECOGNIZED = -1,
}

/** Status Enum */
export enum Status {
  ACTIVE = 0,
  INACTIVE = 1,
  DELETED = 2,
  UNRECOGNIZED = -1,
}

/** User Message */
export interface User {
  id: string;
  email: string;
  lastLogin?: number | undefined;
  roles: Role[];
  status: Status;
  createdAt: number;
  updatedAt: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: number;
  updatedAt: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  skillCategoryId?: string | undefined;
  status: Status;
  createdAt: number;
  updatedAt: number;
}

/**
 * Register
 * Request
 */
export interface RegisterRequest {
  email: string;
  password: string;
}

/** Response */
export interface RegisterResponseData {
  userId: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
  data: RegisterResponseData | undefined;
}

/**
 * Login
 * Request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Response */
export interface LoginResponseData {
  token: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  data: LoginResponseData | undefined;
}

/**
 * Validate
 * Request
 */
export interface ValidateRequest {
  token: string;
}

/** Response */
export interface ValidateResponseData {
  userId: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  data: ValidateResponseData | undefined;
}

/**
 * ActivateUser
 * Request
 */
export interface ActivateUserByIdRequest {
  userId: string;
}

/** Response */
export interface ActivateUserByIdResponseData {}

export interface ActivateUserByIdResponse {
  status: number;
  error: string[];
  data: ActivateUserByIdResponseData | undefined;
}

/**
 * DeativateUser
 * Request
 */
export interface DeactivateUserByIdRequest {
  userId: string;
}

/** Response */
export interface DeactivateUserByIdResponseData {}

export interface DeactivateUserByIdResponse {
  status: number;
  error: string[];
  data: DeactivateUserByIdResponseData | undefined;
}

/**
 * FindUserById
 * Request
 */
export interface FindUserByIdRequest {
  userId: string;
}

/** Response */
export interface FindUserByIdResponseData {
  user: User | undefined;
}

export interface FindUserByIdResponse {
  status: number;
  error: string[];
  data: FindUserByIdResponseData | undefined;
}

/**
 * RemoveUserById
 * Request
 */
export interface RemoveUserByIdRequest {
  userId: string;
}

/** Response */
export interface RemoveUserByIdResponseData {}

export interface RemoveUserByIdResponse {
  status: number;
  error: string[];
  data: RemoveUserByIdResponseData | undefined;
}

/**
 * FindUserByEmail
 * Request
 */
export interface FindUserByEmailRequest {
  email: string;
}

/** Response */
export interface FindUserByEmailResponseData {
  user: User | undefined;
}

export interface FindUserByEmailResponse {
  status: number;
  error: string[];
  data: FindUserByEmailResponseData | undefined;
}

/**
 * FindAllUsers
 * Request
 */
export interface FindAllUsersRequest {}

/** Response */
export interface FindAllUsersResponseData {
  users: User[];
}

export interface FindAllUsersResponse {
  status: number;
  error: string[];
  data: FindAllUsersResponseData | undefined;
}

/**
 * FindAllUsersForRoles
 * Request
 */
export interface FindAllUsersForRolesRequest {
  roles: Role[];
}

/** Response */
export interface FindAllUsersForRolesResponseData {
  users: User[];
}

export interface FindAllUsersForRolesResponse {
  status: number;
  error: string[];
  data: FindAllUsersForRolesResponseData | undefined;
}

/**
 * AddRoleToUser
 * Request
 */
export interface AddRoleToUserRequest {
  userId: string;
  role: Role;
}

/** Response */
export interface AddRoleToUserResponseData {}

export interface AddRoleToUserResponse {
  status: number;
  error: string[];
  data: AddRoleToUserResponseData | undefined;
}

/**
 * RemoveRoleFromUser
 * Request
 */
export interface RemoveRoleFromUserRequest {
  userId: string;
  role: Role;
}

/** Response */
export interface RemoveRoleFromUserResponseData {}

export interface RemoveRoleFromUserResponse {
  status: number;
  error: string[];
  data: RemoveRoleFromUserResponseData | undefined;
}

/**
 * AddSkillCategory
 * Request
 */
export interface AddSkillCategoryRequest {
  name: string;
  description: string;
}

/** Response */
export interface AddSkillCategoryResponseData {
  skillCategoryId: string;
}

export interface AddSkillCategoryResponse {
  status: number;
  error: string[];
  data: AddSkillCategoryResponseData | undefined;
}

/**
 * FindSkillCategoryById
 * Request
 */
export interface FindSkillCategoryByIdRequest {
  skillCategoryId: string;
}

/** Response */
export interface FindSkillCategoryByIdResponseData {
  skillCategory: SkillCategory | undefined;
}

export interface FindSkillCategoryByIdResponse {
  status: number;
  error: string[];
  data: FindSkillCategoryByIdResponseData | undefined;
}

/**
 * FindSkillCategoryByName
 * Request
 */
export interface FindSkillCategoryByNameRequest {
  skillCategoryName: string;
}

/** Response */
export interface FindSkillCategoryByNameResponseData {
  skillCategory: SkillCategory | undefined;
}

export interface FindSkillCategoryByNameResponse {
  status: number;
  error: string[];
  data: FindSkillCategoryByNameResponseData | undefined;
}

/**
 * FindAllSkillCategories
 * Request
 */
export interface FindAllSkillCategoriesRequest {}

/** Response */
export interface FindAllSkillCategoriesResponseData {
  skillCategories: SkillCategory[];
}

export interface FindAllSkillCategoriesResponse {
  status: number;
  error: string[];
  data: FindAllSkillCategoriesResponseData | undefined;
}

/**
 * AddSkill
 * Request
 */
export interface AddSkillRequest {
  name: string;
  description: string;
  category?: string | undefined;
}

/** Response */
export interface AddSkillResponseData {
  skillId: string;
}

export interface AddSkillResponse {
  status: number;
  error: string[];
  data: AddSkillResponseData | undefined;
}

/**
 * FindSkillById
 * Request
 */
export interface FindSkillByIdRequest {
  skillId: string;
}

/** Response */
export interface FindSkillByIdResponseData {
  skill: Skill | undefined;
}

export interface FindSkillByIdResponse {
  status: number;
  error: string[];
  data: FindSkillByIdResponseData | undefined;
}

/**
 * FindSkillByName
 * Request
 */
export interface FindSkillByNameRequest {
  skillName: string;
}

/** Response */
export interface FindSkillByNameResponseData {
  skill: Skill | undefined;
}

export interface FindSkillByNameResponse {
  status: number;
  error: string[];
  data: FindSkillByNameResponseData | undefined;
}

/**
 * FindAllSkills
 * Request
 */
export interface FindAllSkillsRequest {}

/** Response */
export interface FindAllSkillsResponseData {
  skills: Skill[];
}

export interface FindAllSkillsResponse {
  status: number;
  error: string[];
  data: FindAllSkillsResponseData | undefined;
}

/**
 * FindAllSkillsForCategories
 * Request
 */
export interface FindAllSkillsForCategoriesRequest {
  categoriesIds: string[];
}

/** Response */
export interface FindAllSkillsForCategoriesResponseData {
  skills: Skill[];
}

export interface FindAllSkillsForCategoriesResponse {
  status: number;
  error: string[];
  data: FindAllSkillsForCategoriesResponseData | undefined;
}

export const AUTH_PACKAGE_NAME = 'auth';

/** Authentication Service */

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

/** Authentication Service */

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'validate'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('AuthService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('AuthService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';

/** User Management Service */

export interface UserManagementServiceClient {
  /** User Management */

  findUserById(request: FindUserByIdRequest): Observable<FindUserByIdResponse>;

  removeUserById(request: RemoveUserByIdRequest): Observable<RemoveUserByIdResponse>;

  findUserByEmail(request: FindUserByEmailRequest): Observable<FindUserByEmailResponse>;

  findAllUsers(request: FindAllUsersRequest): Observable<FindAllUsersResponse>;

  findAllUsersForRoles(request: FindAllUsersForRolesRequest): Observable<FindAllUsersForRolesResponse>;

  /** User Status Mangement */

  activateUserById(request: ActivateUserByIdRequest): Observable<ActivateUserByIdResponse>;

  deactivateUserById(request: DeactivateUserByIdRequest): Observable<DeactivateUserByIdResponse>;

  /** User Role Management */

  addRoleToUser(request: AddRoleToUserRequest): Observable<AddRoleToUserResponse>;

  removeRoleFromUser(request: RemoveRoleFromUserRequest): Observable<RemoveRoleFromUserResponse>;
}

/** User Management Service */

export interface UserManagementServiceController {
  /** User Management */

  findUserById(
    request: FindUserByIdRequest,
  ): Promise<FindUserByIdResponse> | Observable<FindUserByIdResponse> | FindUserByIdResponse;

  removeUserById(
    request: RemoveUserByIdRequest,
  ): Promise<RemoveUserByIdResponse> | Observable<RemoveUserByIdResponse> | RemoveUserByIdResponse;

  findUserByEmail(
    request: FindUserByEmailRequest,
  ): Promise<FindUserByEmailResponse> | Observable<FindUserByEmailResponse> | FindUserByEmailResponse;

  findAllUsers(
    request: FindAllUsersRequest,
  ): Promise<FindAllUsersResponse> | Observable<FindAllUsersResponse> | FindAllUsersResponse;

  findAllUsersForRoles(
    request: FindAllUsersForRolesRequest,
  ): Promise<FindAllUsersForRolesResponse> | Observable<FindAllUsersForRolesResponse> | FindAllUsersForRolesResponse;

  /** User Status Mangement */

  activateUserById(
    request: ActivateUserByIdRequest,
  ): Promise<ActivateUserByIdResponse> | Observable<ActivateUserByIdResponse> | ActivateUserByIdResponse;

  deactivateUserById(
    request: DeactivateUserByIdRequest,
  ): Promise<DeactivateUserByIdResponse> | Observable<DeactivateUserByIdResponse> | DeactivateUserByIdResponse;

  /** User Role Management */

  addRoleToUser(
    request: AddRoleToUserRequest,
  ): Promise<AddRoleToUserResponse> | Observable<AddRoleToUserResponse> | AddRoleToUserResponse;

  removeRoleFromUser(
    request: RemoveRoleFromUserRequest,
  ): Promise<RemoveRoleFromUserResponse> | Observable<RemoveRoleFromUserResponse> | RemoveRoleFromUserResponse;
}

export function UserManagementServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'findUserById',
      'removeUserById',
      'findUserByEmail',
      'findAllUsers',
      'findAllUsersForRoles',
      'activateUserById',
      'deactivateUserById',
      'addRoleToUser',
      'removeRoleFromUser',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('UserManagementService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('UserManagementService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_MANAGEMENT_SERVICE_NAME = 'UserManagementService';

/** Skill Management Service */

export interface SkillManagementServiceClient {
  /** Skill Category Management */

  addSkillCategory(request: AddSkillCategoryRequest): Observable<AddSkillCategoryResponse>;

  findSkillCategoryById(request: FindSkillCategoryByIdRequest): Observable<FindSkillCategoryByIdResponse>;

  findSkillCategoryByName(request: FindSkillCategoryByNameRequest): Observable<FindSkillCategoryByNameResponse>;

  findAllSkillCategories(request: FindAllSkillCategoriesRequest): Observable<FindAllSkillCategoriesResponse>;

  /** Skill Management */

  addSkill(request: AddSkillRequest): Observable<AddSkillResponse>;

  findSkillById(request: FindSkillByIdRequest): Observable<FindSkillByIdResponse>;

  findSkillByName(request: FindSkillByNameRequest): Observable<FindSkillByNameResponse>;

  findAllSkills(request: FindAllSkillsRequest): Observable<FindAllSkillsResponse>;

  findAllSkillsForCategories(
    request: FindAllSkillsForCategoriesRequest,
  ): Observable<FindAllSkillsForCategoriesResponse>;
}

/** Skill Management Service */

export interface SkillManagementServiceController {
  /** Skill Category Management */

  addSkillCategory(
    request: AddSkillCategoryRequest,
  ): Promise<AddSkillCategoryResponse> | Observable<AddSkillCategoryResponse> | AddSkillCategoryResponse;

  findSkillCategoryById(
    request: FindSkillCategoryByIdRequest,
  ): Promise<FindSkillCategoryByIdResponse> | Observable<FindSkillCategoryByIdResponse> | FindSkillCategoryByIdResponse;

  findSkillCategoryByName(
    request: FindSkillCategoryByNameRequest,
  ):
    | Promise<FindSkillCategoryByNameResponse>
    | Observable<FindSkillCategoryByNameResponse>
    | FindSkillCategoryByNameResponse;

  findAllSkillCategories(
    request: FindAllSkillCategoriesRequest,
  ):
    | Promise<FindAllSkillCategoriesResponse>
    | Observable<FindAllSkillCategoriesResponse>
    | FindAllSkillCategoriesResponse;

  /** Skill Management */

  addSkill(request: AddSkillRequest): Promise<AddSkillResponse> | Observable<AddSkillResponse> | AddSkillResponse;

  findSkillById(
    request: FindSkillByIdRequest,
  ): Promise<FindSkillByIdResponse> | Observable<FindSkillByIdResponse> | FindSkillByIdResponse;

  findSkillByName(
    request: FindSkillByNameRequest,
  ): Promise<FindSkillByNameResponse> | Observable<FindSkillByNameResponse> | FindSkillByNameResponse;

  findAllSkills(
    request: FindAllSkillsRequest,
  ): Promise<FindAllSkillsResponse> | Observable<FindAllSkillsResponse> | FindAllSkillsResponse;

  findAllSkillsForCategories(
    request: FindAllSkillsForCategoriesRequest,
  ):
    | Promise<FindAllSkillsForCategoriesResponse>
    | Observable<FindAllSkillsForCategoriesResponse>
    | FindAllSkillsForCategoriesResponse;
}

export function SkillManagementServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'addSkillCategory',
      'findSkillCategoryById',
      'findSkillCategoryByName',
      'findAllSkillCategories',
      'addSkill',
      'findSkillById',
      'findSkillByName',
      'findAllSkills',
      'findAllSkillsForCategories',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('SkillManagementService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('SkillManagementService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SKILL_MANAGEMENT_SERVICE_NAME = 'SkillManagementService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
