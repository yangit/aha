import messageToDB from './messageToDB';

const mappers: Record<string, { onEnd: () => Promise<void>; map: (doc: any) => Promise<void> }> = {
  messageToDB,
};
export default mappers;
