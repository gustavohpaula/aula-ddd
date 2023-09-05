import EventInterface from "../../@shared/event/event.interface";
import Address from "../entity/value-object/address";

export default class AddressChangedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: { id: string, name: string, address: Address };

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}