export class ImageQueryDTO {
    constructor(
    public numberOfImages: any,
    public page: number,
    public allImages: boolean,
    public anyDate:boolean,
    public date: any,
    public camera_id: string
    ) {}
  }
  