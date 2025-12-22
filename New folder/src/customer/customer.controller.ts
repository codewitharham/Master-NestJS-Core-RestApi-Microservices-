import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
    private readonly customerService: CustomerService;

    constructor(customerService: CustomerService) {
        this.customerService = customerService;
    }

    @Get()
    getAllCustomers() {
        return this.customerService.getAllCustomers();
    }

    @Get(':id')
    getCustomerById(@Param('id') id: string) {
        return this.customerService.getCustomerById(id);
    }

    @Post()
    createCustomer(@Body() body: CreateCustomerDto) {

        const newCustomer: CreateCustomerDto = {
            
            ...body
        };

        return this.customerService.createCustomer(newCustomer);
    }

    @Put(':id')
    updateCustomer(@Body() body: Partial<CreateCustomerDto>, @Param('id')id: string) {
        return this.customerService.updateCustomer(id, body);
    }

    
    @Delete(':id')
    deleteCustomer(@Param('id') id: string) {
        return this.customerService.deleteCustomer(id);
    }

}
