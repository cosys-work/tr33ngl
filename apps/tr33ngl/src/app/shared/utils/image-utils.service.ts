import { Injectable } from "@angular/core";
import { ImgObjSkel8n } from "../models/image.model";

export const urlFactory: (index: number) => string = (index) =>
  encodeURI(`assets/img/Large Scale Projects in CS_${index}.jpg`);

export const imageObject: (index: number) => ImgObjSkel8n = (index) => ({
  image: urlFactory(index),
  id: index,
  alt: `${index}`,
  thumbImage: urlFactory(index),
});

export const imageObjects: (size: number) => ImgObjSkel8n[] = (size) =>
  new Array(size).fill(imageObject(1)).map((_, index) => imageObject(index));

@Injectable({
  providedIn: "root",
})
export class ImageUtilsService {
  imageObjects = (size: number) => imageObjects(size);
  imageObject = (index: number) => imageObject(index);
  urlFactory = (index: number) => urlFactory(index);
}
