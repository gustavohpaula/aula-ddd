import Customer from "./customer";
import Address from "./value-object/address";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    })

    it("should change name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "1330-250", "São Paulo");

        customer.Address = address;

       expect(customer.isActive()).toBe(true);
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
      
        customer.deactivate();

       expect(customer.isActive()).toBe(false);
    })

    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();

        }).toThrowError("Address is mandatory to activate a customer");    
       
    })
})