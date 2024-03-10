import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * 一致するか(デコレータ)
 * @param property 
 * @param validationOptions 
 * @returns 
 */
export function IsMatch(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} and ${args.constraints[0]} don't match`;
        },
      },
    });
  };
}
