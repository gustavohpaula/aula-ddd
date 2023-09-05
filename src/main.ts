import Customer from './domain/customer/entity/customer';

import Address from './domain/customer/entity/value-object/address';

let customer = new Customer("123", "Gustavo");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();

//const item1 = new OrderItem("1", "item 1", 10);
//const item2 = new OrderItem("2", "item 2", 15);

//const order = new Order("1", "123", [item1, item2]);