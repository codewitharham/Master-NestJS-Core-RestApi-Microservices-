import { Injectable } from '@nestjs/common';
import { Customer } from './interface/customer.interface';
import { CreateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {

    private customers: Customer[] = [];
    private nextId: number = 1;

    getAllCustomers(): Customer[] {
        return this.customers;
    }

    getCustomerById(id: string): Customer | undefined {
        let customer = this.customers.find(customer => customer.id === id);
        if (!customer) {
            throw new Error('Customer not found');  
        }
        return customer;
    }

    createCustomer(customer: CreateCustomerDto): Customer {
        const newCustomer: Customer = {
            id: (this.nextId++).toString(),
            ...customer,
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    // Additional methods for updating and deleting customers can be added here

    updateCustomer(id: string, updatedCustomer: Partial<CreateCustomerDto>): Customer {
        const customerIndex = this.customers.findIndex(customer => customer.id === id); 
        if (customerIndex === -1) {
            throw new Error('Customer not found');  
        }
        const customer = this.customers[customerIndex];
            // how it is working: merge existing customer data with updated data
         
        const updated = { ...customer, ...updatedCustomer };
    
        this.customers[customerIndex] = updated;
        return updated;
    }

    deleteCustomer(id: string): void {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        if (customerIndex === -1) {
            throw new Error('Customer not found');  
        }
        this.customers.splice(customerIndex, 1);
    }


}
