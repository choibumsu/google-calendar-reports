export const getTimeSize = ({ start, end }) => {
  return new Date(end.dateTime) - new Date(start.dateTime)
}
