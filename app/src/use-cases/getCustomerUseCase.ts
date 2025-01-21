import {
  ICustomerRepository,
  Customer,
} from '../repositories/customer.interface';

export class GetCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: string): Promise<Customer | null> {
    return await this.customerRepository.getCustomer(id);
  }
}
