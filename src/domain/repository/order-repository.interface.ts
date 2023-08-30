import Customer from "../entity/order";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Customer> {}