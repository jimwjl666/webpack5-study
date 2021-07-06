
import '@/styles.css'
import vue from 'vue'
console.log('vue',vue)

import(
  /* webpackChunkName:'prefetch1' */ 
  /* webpackPrefetch:true */ 
  './prefetch.js'
)
import(
  /* webpackPreload: true */ 
  /* webpackChunkName:'preload1' */ 
  './preload.js');
async function getLodash(){
  const { default: _ } = await import ('lodash')
  console.log(_.join(['1','2','6']))
}


async function component(){
  let ele = document.createElement('div')
  let btn = document.createElement('button')
  ele.innerHTML = 'hello webpack1'
  btn.innerHTML = 'Click me'
  console.log('vendor hash不应该因为他而改变2')

  btn.onclick = async ()=>{
    const printMe = (await import('./print')).default
    printMe('wjl')
    const printMe2 = (await import('./print2')).default
    printMe2('wjl2')
  }
  ele.appendChild(btn)
  return ele
}

let com = await component()
document.body.appendChild(com)


/* if ('serviceWorker' in navigator) {
  console.log('即将注册serviceWorker')
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
} */

/* if(module.hot){
  module.hot.accept('./print.js',function(){
    console.log('Aceeptting the updated printMe module')
    printMe()
  })
} */