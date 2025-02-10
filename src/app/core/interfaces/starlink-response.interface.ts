export interface StarlinkResponse {
  id: string;
  spaceTrack: {
    CREATION_DATE: string;
    OBJECT_NAME: string;
    COUNTRY_CODE: string;
  };
  height_km: number | null;
}
