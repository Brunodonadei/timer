import './GreyBoxContainer.css';

export default function GreyBoxContainer({children, style}){
  return (
    <div style={style} className="grey-box-container">
      {children}
    </div>
  )
}