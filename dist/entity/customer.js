"use strict";
class Customer {
    constructor(id, name, address) {
        this._active = true;
        this._id = id;
        this._name = name;
        this._address = address;
    }
    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address.length === 0) {
            throw new Error("Adress is mandatory to activate a customer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
}
