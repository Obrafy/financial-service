import { HttpStatus } from '@nestjs/common';

export function makeResponseProjectPrice(data, statusCode = HttpStatus.OK, error = null) {
  if (!data.length) {
    return {
      status: statusCode,
      error: error,
      data: {
        id: data.id,
        projectId: data.projectId,
        price: data.price,
        createdAt: data.createdAt.getTime(),
        updatedAt: data.updatedAt?.getTime(),
      },
    };
  }

  const arrayDataTransformed = _buildArrayResponseForProjectPrice(data);

  return {
    status: statusCode,
    error: error,
    data: arrayDataTransformed,
  };
}

function _buildArrayResponseForProjectPrice(arrayData) {
  const returned = arrayData.map((projectPrice) => {
    return {
      id: projectPrice.id,
      projectId: projectPrice.projectId,
      price: projectPrice.price,
      createdAt: projectPrice.createdAt.getTime(),
      updatedAt: projectPrice.updatedAt?.getTime(),
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
