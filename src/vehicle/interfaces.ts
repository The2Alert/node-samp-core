export interface VehicleRotationQuat {
    w: number;
    x: number;
    y: number;
    z: number;
}

export interface VehicleParams {
    engine: boolean;
    lights: boolean;
    alarm: boolean;
    doors: boolean;
    bonnet: boolean; 
    boot: boolean; 
    objective: boolean;
}

export interface VehicleDoors {
    driver: boolean;
    passenger: boolean;
    backLeft: boolean;
    backRight: boolean;
}

export interface VehicleWindows {
    driver: boolean;
    passenger: boolean;
    backLeft: boolean;
    backRight: boolean;
}

export interface VehicleDamageStatus {
    panels: number;
    doors: number;
    lights: number;
    tires: number;
}