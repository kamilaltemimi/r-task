import { Payload } from './payload.interface';

export interface StarlinkDetailsResponse {
  starlink: {
    id: string;
    objectName: string;
    countryCode: string;
    creationDate: string;
    heightKm: number | string;
  };
  launch: {
    success: boolean;
    details: string;
    date: string;
    payloadMass: number;
    coreMessage: string;
  };
  payloads: Payload[];
}
