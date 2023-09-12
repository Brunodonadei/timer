import './Button.css'

export default function Button({ name, func, style }){
  return (
    <button style={style} onClick={func} className="button">{name}</button>
  )
}