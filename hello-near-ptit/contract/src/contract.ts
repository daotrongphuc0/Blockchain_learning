import { NearBindgen, near, call, view } from 'near-sdk-js';


@NearBindgen({})
class HelloNear {
  greeting: string = "Hello";

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ message }: { message: string }): void {
    // Record a log permanently to the blockchain!
    near.log(`Saving greeting ${message}`);
    this.greeting = message;
  }
  @call({privateFunction: true})  //  chi danh cho nha paat trien(CONTRACT_NAME=dev-1668250225252-43879930462935)
  set_greating_private({message} :{message: string}): void{
    this.greeting = message;
    near.log(near.predecessorAccountId() + "called private function")
  }

  @call({payableFunction: true})   // cac ham lien quan den giao dich
  set_greating_payable({message} :{message:string}) : void{
    // lay so du 
    let  depositeAmount = near.attachedDeposit();   // tra ve doctor near = 10^24 near
    // lay danh sach ac dang ki fn
    let predeccesorId = near.predecessorAccountId();
    let signerId = near.signerAccountId()

    near.log(predeccesorId + "deposit " + depositeAmount);

    this.greeting = message;
  }
}