log("[VehicleManager]");

class VehicleManager {
    constructor(bucket = 0) {
        this.vehicles = []
        this.bucket = bucket
    }
    create(model, x, y, z, h) {
        /*
            modelHash: The model of vehicle to spawn.
            type: The appropriate vehicle type for the model info. Can be one of automobile, bike, boat, heli, plane, submarine, trailer, and (potentially), train. This should be the same type as the type field in vehicles.meta.
            x: Spawn coordinate X component.
            y: Spawn coordinate Y component.
            z: Spawn coordinate Z component.
            heading: Heading to face towards, in degrees.
        */
        let veh = CreateVehicleServerSetter(model, 'automobile', x, y, z, h)
        this.vehicles.push(veh)
    }
    get(vehicleHandle) {
        let netID = NetworkGetNetworkIdFromEntity(vehicleHandle)
        return {
            netID,
            entity: NetworkGetEntityFromNetworkId(netID)
        }
    }
    clearAll() {
        console.log("Cleaning " + this.vehicles.length)
        for (let index = 0; index < this.vehicles.length; index++) {
            let vehicle = this.get(this.vehicles[index])
            DeleteEntity(vehicle.entity)
            delete this.vehicles[index]
        }
    }
}

// $lib.Vehicles = new VehicleManager();
$loadClass("Vehicles", VehicleManager);

