export class Portfolio {
  private id: number;
  private name: string;
  private clientName: string;
  private currency: string;
  private value: number;

  constructor(data?) {
    this.id = (data && data.id) ? data.id : null;
    this.name = (data && data.name) ? data.name : '';
    this.clientName = (data && data.clientName) ? data.clientName : '';
    this.currency = (data && data.currency) ? data.currency : '';
    this.value = (data && data.value) ? data.value : null;
  }

  get getId(): number {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getClientName(): string {
    return this.clientName;
  }

  set setClientName(clientName: string) {
    this.clientName = clientName;
  }

  get getCurrency(): string {
    return this.currency;
  }

  set setCurrency(currency: string) {
    this.currency = currency;
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(value: number) {
    this.value = value;
  }
}
