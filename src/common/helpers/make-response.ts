import { HttpStatus } from '@nestjs/common';

interface GenericResponse<T extends Record<string, any>> {
  status: HttpStatus;
  error: string[] | null;
  data: T['data'];
}

type MakeResponseType = <T extends Record<string, any>>(
  data: T['data'] | null,
  options?: {
    httpStatus?: HttpStatus;
    error?: string[];
  },
) => GenericResponse<T>;

const makeResponse: MakeResponseType = (data, options) => {
  const status = (options && options.httpStatus) ?? HttpStatus.OK;
  const error = (options && options.error) ?? null;

  return { status, error, data };
};

export { makeResponse };
