export const validation = (schmea, request) => {
  const result = schmea.validate(request, {
    abortEarly: false,
    allowUnknown: false
  });

  if (result.error) {
    throw result.error;
  } else {
    return result.value;
  }
}