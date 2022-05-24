import { status } from '@grpc/grpc-js';

export function makeResponse(data, statusCode = status.OK, error = null) {
  if (!data.length) {
    return {
      status: statusCode,
      error: error,
      data: {
        id: data.id,
        taskId: data.taskId,
        price: data.price,
        createdAt: data.createdAt.getTime(),
        updatedAt: data.updatedAt?.getTime(),
      },
    };
  }

  const arrayDataTransformed = _buildArrayResponse(data);

  return {
    status: statusCode,
    error: error,
    data: arrayDataTransformed,
  };
}

function _buildArrayResponse(arrayData) {
  const returned = arrayData.map((taskPrice) => {
    return {
      id: taskPrice.id,
      taskId: taskPrice.taskId,
      price: taskPrice.price,
      createdAt: taskPrice.createdAt.getTime(),
      updatedAt: taskPrice.updatedAt?.getTime(),
    };
  });

  return returned;
}
