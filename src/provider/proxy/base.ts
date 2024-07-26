import { IVideoCall } from "./video-call-methods-interface";

export class Base implements IVideoCall {
  constructor(parameters: any) {}
  setup(): void {
    throw new Error("Method not implemented.");
  }
  create(): void {
    throw new Error("Method not implemented.");
  }
  join(): void {
    throw new Error("Method not implemented.");
  }
  hangup(): void {
    throw new Error("Method not implemented.");
  }
  cleanUp(): void {
    throw new Error("Method not implemented.");
  }
}
