import messageToDB from './messageToDB';

const mappers: Record<
  string,
  { onStart: () => Promise<void>; onEnd: () => Promise<void>; map: (doc: any) => Promise<void> }
> = {
  messageToDB,
};
export default mappers;
