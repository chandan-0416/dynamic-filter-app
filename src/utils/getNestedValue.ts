/**
 * Returns the value of a nested property using a dot-separated path.
 *
 * Example:
 * getNestedValue(employee, "address.city")
 * => "San Francisco"
 */
export function getNestedValue(
  object: Record<string, unknown>,
  path: string
): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (
      current !== null &&
      current !== undefined &&
      typeof current === "object"
    ) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, object);
}