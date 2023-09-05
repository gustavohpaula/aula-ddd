import  {Sequelize}  from "sequelize-typescript";


import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/entity/value-object/address";

import  CustomerModel  from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.repository";
import orderModel from "../db/sequelize/model/order.model";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

   
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", "1", [orderItem]);
    await orderRepository.create(order);

    const orderFound = await orderRepository.findById(order.id);
    expect(orderFound).toEqual(order);

    const product2 = new Product("2", "Product 2", 10);
    const product3 = new Product("3", "Product 3", 10);
    await productRepository.create(product2);
    await productRepository.create(product3);
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );
    const orderItem3 = new OrderItem(
      "3",
      product3.name,
      product3.price,
      product3.id,
      1
    );

    orderFound.changeItems([orderItem2, orderItem3]);
    await orderRepository.update(orderFound);
    orderFound.total();

    const updatedOrder = await orderRepository.findById(orderFound.id);
    expect(updatedOrder).toEqual(orderFound);
   
  });
  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", "1", [orderItem]);
    await orderRepository.create(order);

    const orderFound = await orderRepository.findById(order.id);

    expect(orderFound).toEqual(order);
    });

    it("should find all orders", async () => {
      const customerRepository = new CustomerRepository();
      const productRepository = new ProductRepository();
      const orderRepository = new OrderRepository();
  
      const customer = new Customer("1", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
      
      const product1 = new Product("1", "Product 1", 10);
      const product2 = new Product("2", "Product 2", 10);
      await productRepository.create(product1);
      await productRepository.create(product2);
  
      const orderItem1 = new OrderItem(
        "1",
        product1.name,
        product1.price,
        product1.id,
        2
      );
      const orderItem2 = new OrderItem(
        "2",
        product2.name,
        product2.price,
        product2.id,
        2
      );
  
      const order = new Order("1", "1", [orderItem1]);
      const order2 = new Order("2", "1", [orderItem2]);
      await orderRepository.create(order);
      await orderRepository.create(order2);
  
      const orders = await orderRepository.findAll();
  
      expect(orders.length).toBe(2);
      expect(orders).toEqual([order, order2]);
      });
});