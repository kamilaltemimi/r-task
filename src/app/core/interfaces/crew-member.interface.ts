import { Agency } from '../enums/agency.enum';
import { Status } from '../enums/status.enum';

export interface CrewMember {
  name: string;
  agency: Agency;
  image: string;
  wikipedia: string;
  launches: string[];
  status: Status;
  id: string;
}
