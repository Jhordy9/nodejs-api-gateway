import { ICustomerRepository } from '../repositories/customer.interface';

export class UpdateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(event: any) {
    await this.customerRepository.updateCustomer(event.id, { ...event });
  }
}
