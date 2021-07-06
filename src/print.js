import { join } from 'lodash-es'
export default function printMe (text) {
  console.log(join(['Another1', 'module1', 'loaded1', text]))
}
