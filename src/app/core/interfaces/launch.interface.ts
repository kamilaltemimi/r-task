interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ships: string[];
}

interface Links {
  patch: {
    small: string;
    large: string;
  };
  reddit: string;
  flickr: string;
  presskit: string;
  webcast: string;
  [key: string]: string | { [key: string]: string };
}

interface Core {
  core_serial: string;
  flight: number;
  gridfins: boolean;
  legless: boolean;
  reused: boolean;
  land_success: boolean;
  landing_intent: boolean;
  landing_type: string;
  landing_vehicle: string;
}

export interface Launch {
  auto_update: boolean;
  capsules: any[];
  cores: Core[];
  crew: any[];
  date_local: string;
  date_precision: string;
  date_unix: number;
  date_utc: string;
  details: string;
  failures: any[];
  fairings: Fairings;
  flight_number: number;
  id: string;
  launch_library_id: string | null;
  launchpad: string;
  links: Links;
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
