export function setupHtmlPlugin(buildTime, version) {
  console.log('%c [ buildTime ]-2', 'font-size:13px; background:pink; color:#bf2c9f;', buildTime, version)
  const plugin = {
    name: 'html-plugin',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace('<head>', `<head>\n    <meta name="buildTime" content="${buildTime}">\n    <meta name="version" content="${version}">`)
    },
  }

  return plugin
}
