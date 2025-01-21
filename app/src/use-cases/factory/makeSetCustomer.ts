import { CustomerRepository } from '../../repositories/customer.repository';
import { SetCustomerUseCase } from '../setCustomerUseCase';

export function makeSetCustomer(): SetCustomerUseCase {
  const tableName = process.env.CUSTOMER_TABLE_NAME as string;
  const customerRepository = new CustomerRepository(tableName);
  return new SetCustomerUseCase(customerRepository);
}
