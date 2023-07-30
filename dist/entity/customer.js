"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = true;
        this._rewardPoints = 0;
        this._id = id;
        this._name = name;
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }
    get name() {
        return this._name;
    }
    get rewardPoints() {
        return this._rewardPoints;
    }
    get id() {
        return this._id;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Adress is mandatory to activate a customer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    isActive() {
        return this._active;
    }
    addRewardPoints(points) {
        this._rewardPoints += points;
    }
    set Adress(address) {
        this._address = address;
    }
}
exports.default = Customer;
