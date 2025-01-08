export class Domain {
  id: number;
  name: string;
  description: string;
  checked: boolean;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;

  }
}
