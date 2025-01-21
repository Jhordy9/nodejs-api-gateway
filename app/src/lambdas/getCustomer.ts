import { makeGetCustomer } from '../use-cases/factory/makeGetCustomer';

const makeUseCase = makeGetCustomer();

type EventRequestType = {
  pathParameters: {
    id: string;
  };
};

export async function handler(event: EventRequestType) {
  try {
    const { id } = event.pathParameters;

    const customer = await makeUseCase.execute(id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Get customer successfully',
        customer,
      }),
    };
  } catch (err) {
    const message = 'Error while try to get a costumer';

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
