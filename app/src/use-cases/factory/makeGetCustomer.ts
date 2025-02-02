import { CustomerRepository } from '../../repositories/customer.repository';
import { GetCustomerUseCase } from '../getCustomerUseCase';

export function makeGetCustomer(): GetCustomerUseCase {
  const tableName = process.env.CUSTOMER_TABLE_NAME as string;
  const customerRepository = new CustomerRepository(tableName);
  return new GetCustomerUseCase(customerRepository);
}
