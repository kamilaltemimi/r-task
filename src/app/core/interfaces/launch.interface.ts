export interface Launch {
  auto_update: boolean;
  capsules: any[];
  cores: any[];
  crew: any[];
  date_local: string;
  date_precision: string;
  date_unix: number;
  date_utc: string;
  details: string;
  failures: any[];
  fairings: any[];
  flight_number: number;
  id: string;
  launch_library_id: string | null;
  launchpad: string;
  links: any[];
  name: string;
  net: boolean;
  payloads: string[];
  rocket: string;
  ships: string[];
  static_fire_date_unix: number;
  static_fire_date_utc: string;
  success: boolean;
  tbd: boolean;
  upcoming: boolean;
  window: number;
}
