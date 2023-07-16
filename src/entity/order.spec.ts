import Order from "./order"
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
       
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    })

    it("should throw error when customerId is empty", () => {
       
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    })

    it("should throw error when item quantity is empty", () => {
       
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required");
    })

    it("should calculate total", () => {
       
        const item1 = new OrderItem("11", "item 1", 100, "p1", 2);
        const order = new Order("o1", "c1", [item1]);
        const total1 = order.total();

        expect(total1).toBe(200);

        const item2 = new OrderItem("12", "item 2", 200, "p2", 2);
        const order2 = new Order("o1", "c1", [item1, item2]);
        const total2 = order2.total();

        expect(total2).toBe(600);

    })

    it("should throw if the item quantity is greater than zero", () => {
       
        expect(()=>{
            const item1 = new OrderItem("11", "item 1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item1]);
        }).toThrowError("Quantity must be greater than zero")
       

    })
})