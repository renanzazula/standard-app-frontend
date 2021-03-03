import {GalleryModule} from "./gallery.module";
import {ImageModule} from "./image.module";

export class ProjectModule {
  id: string;
  name: string;
  location: string;
  image: ImageModule;
  explain: string;
  status: string;
  gallery: GalleryModule;
  createBy: string;
  createOn: string;
  updateBy: string;
  updateOn: string;

  constructor() {
  }
}
