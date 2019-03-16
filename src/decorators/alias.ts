export function alias(name: string) {
  return function(
    target: any,
    _property: string,
    descriptor: PropertyDescriptor
  ) {
    target[name] = descriptor.value;
    return descriptor;
  };
}
