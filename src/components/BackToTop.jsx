export default function BackToTop({ visible }) {
  return (
    <button
      id="btt"
      className={visible ? 'show' : ''}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  )
}
