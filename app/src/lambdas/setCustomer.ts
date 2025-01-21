import { Customer } from '../repositories/customer.interface';
import { makeSetCustomer } from '../use-cases/factory/makeSetCustomer';

const makeUseCase = makeSetCustomer();

type EventRequestType = {
  body: string;
};

export async function handler(event: EventRequestType) {
  try {
    const body = JSON.parse(event.body) as Customer;

    const customer = await makeUseCase.execute({ ...body, id: generateUUID() });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'New customer successfully created',
        customer,
      }),
    };
  } catch (err) {
    const message = 'Error while try to create a costumer';

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
