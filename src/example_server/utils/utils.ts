/**
 * Get an env var, throw if undefined
 *
 * @returns string
 */
export const getEnvVar = (varName: string): string => {
  const v = process.env[varName];
  if (v === undefined) {
    throw new Error(`Environment variable ${varName} is not defined`);
  }
  return v;
};


/**
 * Function to replace BigInt with string when using JSON.stringify
 *
 * @param key - The key of the property being serialized.
 * @param value - The value of the property being serialized.
 * @return The serialized value.
 */
export const replacer = (key, value) => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

/**
 * Serializes an object into a JSON string
 *
 * @param jsonObject - The object to be serialized.
 * @return string.
 */
export const stringifyJson = (jsonObject: any) => {
  return JSON.stringify(jsonObject, replacer);
};