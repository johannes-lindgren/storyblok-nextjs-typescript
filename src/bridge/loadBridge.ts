export function loadUmdGlobal<T>(src: string, name: string): Promise<T> {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  return new Promise<T>((resolve, reject) => {
    script.onload = () => {
      // @ts-expect-error -- TypeScript does not know about the global variable
      resolve(window[name])
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
    .catch((e) => {
      throw new Error(`Failed to load UMD global "${name}" from "${src}":`, e)
    })
    .then((module) => {
      document.head.removeChild(script)
      // @ts-expect-error -- TypeScript does not know about the global variable
      delete window[name]
      return module
    })
}
