import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const SOMETHING_WRONG = 'Something went wrong. Please try again later.';
const NOT_FOUND = 'Not Found. Please check the search parameters.';
const NETWORK_ERROR = 'Network error. Please try again later.';
const SERVER_ERROR = 'Server error. Please try again later.';
const CRITICAL_ERROR = 'Critical application error.';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
) => {
  if ('status' in error) {
    switch (error.status) {
      case 404:
        return NOT_FOUND;
      case 'FETCH_ERROR':
        return NETWORK_ERROR;
      default:
        return SERVER_ERROR;
    }
  }
  if (error.message) {
    return `${CRITICAL_ERROR} ${error.message}`;
  }
  return SOMETHING_WRONG;
};
