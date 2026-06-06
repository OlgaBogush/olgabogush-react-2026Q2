import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
) => {
  let errorMessage: string = 'Something went wrong. Please try again later.';
  if ('status' in error) {
    if (error.status === 404) {
      errorMessage = 'Not Found. Please check the search parameters.';
    } else if (error.status === 'FETCH_ERROR') {
      errorMessage = 'Network error. Please try again later.';
    } else
      errorMessage = `Server error. Code: ${error.status}. Please try again later.`;
  } else if (error.message) {
    errorMessage = `Critical application error. ${error.message}`;
  }
  return errorMessage;
};
