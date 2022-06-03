import { HttpStatus } from '@nestjs/common';

export function makeResponseTaskPrice(data, statusCode = HttpStatus.OK, error = null) {
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

  const arrayDataTransformed = _buildArrayResponseForTaskPrice(data);

  return {
    status: statusCode,
    error: error,
    data: arrayDataTransformed,
  };
}

function _buildArrayResponseForTaskPrice(arrayData) {
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

export function makeResponseEmployee(data, statusCode = HttpStatus.OK, error = null) {
  if (!data.length) {
    return {
      status: statusCode,
      error: error,
      data: {
        id: data.id,
        employeeId: data.employeeId,
        projectHistory: data.projectHistory,
        createdAt: data.createdAt.getTime(),
        updatedAt: data.updatedAt?.getTime(),
      },
    };
  }

  const arrayDataTransformed = _buildArrayResponseForEmployee(data);

  return {
    status: statusCode,
    error: error,
    data: arrayDataTransformed,
  };
}

function _buildArrayResponseForEmployee(arrayData) {
  const returned = arrayData.map((employee) => {
    return {
      id: employee.id,
      employeeId: employee.employeeId,
      projectHistory: employee.projectHistory,
      createdAt: employee.createdAt.getTime(),
      updatedAt: employee.updatedAt?.getTime(),
    };
  });

  return returned;
}
