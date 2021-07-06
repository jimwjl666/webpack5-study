import { join } from 'lodash-es'
export default function printMe (text) {
  console.log(join(['Another2', 'module2', 'loaded2', text]))
}
