export default {
  lastSite: state => {
    if (!state.lastSiteUrl) return null

    const splittedUrl = state.lastSiteUrl.split('://')

    return splittedUrl[1] || splittedUrl[0]
  },
}
