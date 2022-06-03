/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'financialProject';

export interface Empty {}

/** <-------------- TaskPrice ---------------> */
export interface TaskPriceObject {
  id: string;
  taskId: string;
  price: number;
  createdAt: number;
  updatedAt?: number | undefined;
}

export interface WithObjectResponse {
  status: number;
  error: string;
  data: TaskPriceObject | undefined;
}

export interface FindByIdRequest {
  id: string;
}

export interface CreateRequest {
  taskId: string;
  price: number;
}

export interface FindResponse {
  status: number;
  error: string;
  data: TaskPriceObject[];
}

export interface UpdateRequest {
  id: string;
  taskId?: string | undefined;
  price?: number | undefined;
}

/** <-------------- Employee ---------------> */
export interface EmployeeObject {
  id: string;
  employeeId: string;
  projectHistory: string[];
  createdAt: number;
  updatedAt?: number | undefined;
}

export interface pResponseWithObject {
  status: number;
  error: string;
  data: EmployeeObject | undefined;
}

export interface pCreateRequest {
  employeeId: string;
  projectHistory: string[];
}

export interface pFindByIdRequest {
  id: string;
}

export interface pUpdateRequest {
  id: string;
  employeeId?: string | undefined;
  projectHistory?: string | undefined;
}

export interface pResponseArrayObject {
  status: number;
  error: string;
  data: EmployeeObject[];
}

export const FINANCIAL_PROJECT_PACKAGE_NAME = 'financialProject';

export interface TaskPriceClient {
  create(request: CreateRequest): Observable<WithObjectResponse>;

  find(request: Empty): Observable<FindResponse>;

  findOne(request: FindByIdRequest): Observable<WithObjectResponse>;

  update(request: UpdateRequest): Observable<WithObjectResponse>;

  delete(request: FindByIdRequest): Observable<WithObjectResponse>;
}

export interface TaskPriceController {
  create(request: CreateRequest): Promise<WithObjectResponse> | Observable<WithObjectResponse> | WithObjectResponse;

  find(request: Empty): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  findOne(request: FindByIdRequest): Promise<WithObjectResponse> | Observable<WithObjectResponse> | WithObjectResponse;

  update(request: UpdateRequest): Promise<WithObjectResponse> | Observable<WithObjectResponse> | WithObjectResponse;

  delete(request: FindByIdRequest): Promise<WithObjectResponse> | Observable<WithObjectResponse> | WithObjectResponse;
}

export function TaskPriceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'find', 'findOne', 'update', 'delete'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('TaskPrice', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('TaskPrice', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASK_PRICE_SERVICE_NAME = 'TaskPrice';

export interface EmployeeClient {
  create(request: pCreateRequest): Observable<pResponseWithObject>;

  find(request: Empty): Observable<pResponseArrayObject>;

  findOne(request: pFindByIdRequest): Observable<pResponseWithObject>;

  update(request: pUpdateRequest): Observable<pResponseWithObject>;

  delete(request: pFindByIdRequest): Observable<pResponseWithObject>;
}

export interface EmployeeController {
  create(request: pCreateRequest): Promise<pResponseWithObject> | Observable<pResponseWithObject> | pResponseWithObject;

  find(request: Empty): Promise<pResponseArrayObject> | Observable<pResponseArrayObject> | pResponseArrayObject;

  findOne(
    request: pFindByIdRequest,
  ): Promise<pResponseWithObject> | Observable<pResponseWithObject> | pResponseWithObject;

  update(request: pUpdateRequest): Promise<pResponseWithObject> | Observable<pResponseWithObject> | pResponseWithObject;

  delete(
    request: pFindByIdRequest,
  ): Promise<pResponseWithObject> | Observable<pResponseWithObject> | pResponseWithObject;
}

export function EmployeeControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'find', 'findOne', 'update', 'delete'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('Employee', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('Employee', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EMPLOYEE_SERVICE_NAME = 'Employee';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}