import { Resident } from "./resident.interface";
import { Space } from "./space.interface";

export interface Reservation {
id?: number;
date: string;
resident: string; // puxar resident.login
space: string; // puxar space.type

}