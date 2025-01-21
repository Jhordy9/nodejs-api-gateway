import { CustomerRepository } from '../../repositories/customer.repository';
import { UpdateCustomerUseCase } from '../updateCustomerUseCase';

export function makeUpdateCustomer(): UpdateCustomerUseCase {
  const tableName = process.env.CUSTOMER_TABLE_NAME as string;
  const customerRepository = new CustomerRepository(tableName);
  return new UpdateCustomerUseCase(customerRepository);
}
