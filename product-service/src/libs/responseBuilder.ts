import {HttpStatus} from "@libs/httpError";

const defaultHeaders = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*'
};

export const successResponse = (body, statusCode: HttpStatus = HttpStatus.SUCCESS) => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders
    },
    body: JSON.stringify(body, null, 2)
  }
}

export const failResponse = (err, statusCode: HttpStatus = HttpStatus.SERVER_ERROR) => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders
    },
    body: JSON.stringify({ message: err || 'Something goes wrong...'})
  }
}