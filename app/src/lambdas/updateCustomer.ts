import { Customer } from '../repositories/customer.interface';
import { makeUpdateCustomer } from '../use-cases/factory/makeUpdateCustomer';

const makeUseCase = makeUpdateCustomer();

type EventRequestType = {
  body: string;
  pathParameters: { id: string };
};

export async function handler(event: EventRequestType) {
  try {
    const body = JSON.parse(event.body) as Omit<Partial<Customer>, 'id'>;

    const customer = await makeUseCase.execute({
      body,
      id: event.pathParameters.id,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Customer successfully updated',
        customer,
      }),
    };
  } catch (err) {
    const message = 'Error while try to update a costumer';

    console.error(message, err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message,
        error: err,
      }),
    };
  }
}
