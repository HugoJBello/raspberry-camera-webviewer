import {DetailsHeatMapDTO} from './detailsHeatMapDTO'
export class HeatMapDTO {
  constructor(
  public date: Date,
  public total: number,
  public details: DetailsHeatMapDTO[]
  ) {}
}
