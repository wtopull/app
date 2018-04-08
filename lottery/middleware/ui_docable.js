export default function({ app, store, error }) {
  return app.$axios.$get(
    '/ui_doc_auth',
    {params: { pw: store.state.ui_docable }}
  )
}
