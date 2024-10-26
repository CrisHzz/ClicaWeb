// src/types/station.ts

export interface Station {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}
