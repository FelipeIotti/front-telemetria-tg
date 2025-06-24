export interface RasterDataDTO {
  id: string;
  velocity: boolean;
  temperature: boolean;
  fuel: boolean;
  rpm: boolean;
  tpms_fr: boolean;
  tpms_fl: boolean;
  tpms_br: boolean;
  tpms_bl: boolean;
  created_at: Date;
}
