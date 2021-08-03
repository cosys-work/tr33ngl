export interface ImgObjSkel8n {
  image: string;
  thumbImage: string;
  id: number;
  alt: string;
}

export interface ImgGridState {
  total: number;
  currentIndex: number;
  currentImages: ImgObjSkel8n[];
}

export class ImgDeckStateMachine implements ImgGridState {
  public get current() {
    return this.currentImages[this.currentIndex];
  }

  public get total() {
    return this.currentImages?.length;
  }

  constructor(
    public currentImages: ImgObjSkel8n[],
    public currentIndex: number = 0
  ) {}
}
