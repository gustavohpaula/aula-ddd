
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1WhenCustomerCreatedHandler from "./handler/send-console-log-1-when-customer-created.handler";
import SendConsoleLog2WhenCustomerCreatedHandler from "./handler/send-console-log-2-when-customer-created.handler";

describe("Customer created event tests", () => {
    it("should notify when created a customer", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1WhenCustomerCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerCreatedHandler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        const event = {
            customer: {
                id: "1",
                name: "Gustavo",
                active: true
            }
        };

        const customerCreatedEvent = new CustomerCreatedEvent(event);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })
})