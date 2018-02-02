import {DetailsHeatMapDTO} from './detailsHeatMapDTO'
export class HeatMapDataDTO {
  constructor(
  public date: Date,
  public total: number,
  public details: DetailsHeatMapDTO[]
  ) {}
}
