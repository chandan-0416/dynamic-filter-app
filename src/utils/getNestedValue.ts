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