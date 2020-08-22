export class TreeLastWatered {
    tree_id: string;
    time: Date;
    uuid: string;
    amount: number;
    timestamp: Date;
    username: string;

    constructor(input: any){
      Object.assign(this, input);
      this.amount = +input.amount;
    }
}
