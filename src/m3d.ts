import { registerMediaType } from '@soda/soda-media-sdk'

const getCacheImage = async (source: string, attachInfo?: string) => {
  throw new Error('[media-3d] getCacheImage error: not supported')
}

const render = async (source: any, dom: HTMLDivElement, config?: any) => {
  if (config && config.replace) {
    throw new Error('[media-3d] render error: cannot render with replace')
  } else {
    let src = source.origin ? source.origin : source
    if (src.toLowerCase().startsWith('ipfs://')) src = src.substring(7)
    if (src.toLowerCase().endsWith('.gltf'))
      src = src.substring(0, src.length - 5)
    let folder = '',
      file = src,
      idx = 0
    if ((idx = src.lastIndexOf('/')) > 0) {
      folder = src.substring(0, idx)
      file = src.substring(idx + 1)
    }
    const iframe = document.createElement('iframe')
    iframe.scrolling = 'auto'
    iframe.src = `https://res.meta4d.me/nft/index.html?folder=m3d/${folder}/&file=${file}&scale=4`
    iframe.style.border = '0'
    if (config.css) iframe.style.cssText = config.css
    if (config && config.insertBefore) {
      dom.parentElement.insertBefore(iframe, dom)
    } else {
      dom.append(iframe)
    }
  }
  return true
}
const init = () => {
  registerMediaType({
    name: 'm3d',
    meta: {
      cacheImageFunc: getCacheImage,
      renderFunc: render
    }
  })
}

export default init
