import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";



export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    const orderModel = await OrderModel.findByPk(entity.id);

    orderModel.customer_id = entity.customerId;
    orderModel.total = entity.total();


    await OrderItemModel.destroy({ where: { order_id: entity.id } });

    const orderItems = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));

    await OrderItemModel.bulkCreate(orderItems);
    await orderModel.save();

  }
  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id }, include: [{ model: OrderItemModel }] });
    const items = orderModel.items.map(this.fromOrderItemModelToOrderItem);
    return new Order(orderModel.id, orderModel.customer_id, items);

  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });
    return orderModels.map((orderModel) =>
      new Order(orderModel.id, orderModel.customer_id, orderModel.items.map(this.fromOrderItemModelToOrderItem))
    );
  }
  fromOrderItemModelToOrderItem(orderItemModel: OrderItemModel): OrderItem {
    return new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.product_id, orderItemModel.quantity);

  }

}