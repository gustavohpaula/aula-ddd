import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export default class AddressChangedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: { id: string, name: string, address: Address };

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}