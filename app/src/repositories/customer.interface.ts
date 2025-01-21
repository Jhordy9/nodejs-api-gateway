type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type Contact = {
  email: string;
  phone: string;
  isPrimary: boolean;
};

export type Customer = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  isActive: boolean;
  addresses: Address[];
  contacts: Contact[];
};

export interface ICustomerRepository {
  setCustomer(customer: Customer): Promise<void>;
  getCustomer(id: string): Promise<Customer | null>;
  updateCustomer(id: string, updates: Partial<Customer>): Promise<void>;
  deleteCustomer(id: string): Promise<void>;
}
