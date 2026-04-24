export const apiResponse = {
  success: (data: unknown, message = 'Success') => ({
    success: true,
    message,
    data,
  }),
  error: (message = 'Something went wrong') => ({
    success: false,
    message,
  }),
}