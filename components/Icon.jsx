import { MaterialIcons } from '@expo/vector-icons';

const Icon = ({ name, size = 40, color = 'black' }) => {
  return (
    <MaterialIcons name={name} size={size} color={color} />
  )
}

export default Icon