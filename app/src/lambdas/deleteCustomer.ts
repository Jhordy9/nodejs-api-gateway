import { makeDeleteCustomer } from '../use-cases/factory/makeDeleteCustomer';

const makeUseCase = makeDeleteCustomer();

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
        message: 'Customer deleted successfully',
        customer,
      }),
    };
  } catch (err) {
    const message = 'Error deleting customer';

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
