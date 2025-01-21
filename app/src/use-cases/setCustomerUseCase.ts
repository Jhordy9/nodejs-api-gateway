import {
  Customer,
  ICustomerRepository,
} from '../repositories/customer.interface';

export class SetCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(event: Customer): Promise<void> {
    await this.customerRepository.setCustomer(event);
  }
}
