export interface Payload {
  id: string;
  name: string;
  type: string;
  mass_kg: number;
  orbit: string;
  launch: string;
  manufacturer?: string;
  nationality?: string;
  reused?: boolean;
  reference_system?: string;
  reference_system_legacy?: string;
  position_in_payload?: string;
  mass_lbs?: number;
}
