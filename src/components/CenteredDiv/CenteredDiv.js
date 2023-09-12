import './CenteredDiv.css'

export default function CenteredDiv({ children, style }) {
  return (
    <div style={style} className='centered-div'>
      {children}
    </div>
  )
}