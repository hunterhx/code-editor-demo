// https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
import { remark } from 'remark';

// Doesn't work here. Needs to be used in Renderer
export const testRemark = async () => {
  const string = '1) Hello, _Jupiter_ and *Neptune*!';
  const file = remark().process(string);

  console.log(file);
};

export * as remark from './remark';
