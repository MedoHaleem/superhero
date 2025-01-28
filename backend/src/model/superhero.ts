import Joi from "joi";

interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

export class SuperheroValidator {
  static schema = Joi.object({
    name: Joi.string().required().label("Name"),
    superpower: Joi.string().required().label("Superpower"),
    humilityScore: Joi.number()
      .required()
      .min(1)
      .max(10)
      .precision(0) // if user sent 1.2 it gonna be rounded down
      .label("Humility Score"),
  });

  static validate(superhero: Superhero): Joi.ValidationResult {
    return this.schema.validate(superhero);
  }
}

export { Superhero };