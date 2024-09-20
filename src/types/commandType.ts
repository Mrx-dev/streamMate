export interface Command {
  data: {
    name: string;
    toJSON: () => any;
  };
  execute: Function;
}
