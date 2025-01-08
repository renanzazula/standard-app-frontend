export class Brand {
  id: number;
  name: string;
  description: string;
  status: string;

  constructor(id: number, name: string,
              description: string, status: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }

}
