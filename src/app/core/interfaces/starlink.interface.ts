export interface Starlink {
  id: string;
  spaceTrack: {
    OBJECT_NAME: string;
    COUNTRY_CODE: string;
    CREATION_DATE: string;
  };
  height_km: number;
  launch: string | null;
}
