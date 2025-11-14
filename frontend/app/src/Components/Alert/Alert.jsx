import './Alert.css'

export const Alert = ({ children, variant = '' }) => {
  const className = `Alert Alert-${variant}`

  return <div className={className}>{children}</div>
}
