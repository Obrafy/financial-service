/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'taskPrice';

export interface Empty {}

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

export interface DeleteResponse {
  status: number;
  error: string;
  isDeleted: boolean;
}

export const TASK_PRICE_PACKAGE_NAME = 'taskPrice';

export interface TaskPriceClient {
  create(request: CreateRequest): Observable<WithObjectResponse>;

  find(request: Empty): Observable<FindResponse>;

  findOne(request: FindByIdRequest): Observable<WithObjectResponse>;

  update(request: UpdateRequest): Observable<WithObjectResponse>;

  delete(request: FindByIdRequest): Observable<DeleteResponse>;
}

export interface TaskPriceController {
  create(request: CreateRequest): Promise<WithObjectResponse> | Observable<WithObjectResponse> | WithObjectResponse;

  find(request: Empty): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  findOne(request: FindByIdRequest): Promise<WithObjectResponse> | Observable<WithObjectResponse> | WithObjectResponse;

  update(request: UpdateRequest): Promise<WithObjectResponse> | Observable<WithObjectResponse> | WithObjectResponse;

  delete(request: FindByIdRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
