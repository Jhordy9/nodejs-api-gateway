import { CustomerRepository } from '../../repositories/customer.repository';
import { DeleteCustomerUseCase } from '../deleteCustomerUseCase';

export function makeDeleteCustomer(): DeleteCustomerUseCase {
  const tableName = process.env.CUSTOMER_TABLE_NAME as string;
  const customerRepository = new CustomerRepository(tableName);
  return new DeleteCustomerUseCase(customerRepository);
}
