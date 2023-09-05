
import EventDispatcher from "../../@shared/event/event-dispatcher";
import AddressChangedEvent from "./address-changed.event";
import sendConsoleLogWhenAddressChange from "./handler/send-console-log-when-address-change.handler";

describe("Customer address changed tests", () => {
    it("should notify the change of address", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new sendConsoleLogWhenAddressChange();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(1);
    
        const customer = {

                id: "1",
                name:"Gustavo",
                address:{
                    street:"street 2",
                    number: "2",
					city: "New City",
					zip: "1234"
                }
            
        }
        console.log(customer);
        const addressChangedevent = new AddressChangedEvent(customer);

		eventDispatcher.notify(addressChangedevent);

		expect(spyEventHandler).toHaveBeenCalled();
    
    })
})