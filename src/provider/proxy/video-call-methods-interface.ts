export interface IVideoCall {
  setup(): void;
  create(): void;
  join(): void;
  hangup(): void;
  cleanUp(): void;
  
}
