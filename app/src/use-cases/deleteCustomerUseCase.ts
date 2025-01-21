import { ICustomerRepository } from '../repositories/customer.interface';

export class DeleteCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: string): Promise<void> {
    await this.customerRepository.deleteCustomer(id);
  }
}
