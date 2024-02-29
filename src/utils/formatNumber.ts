export const formatNumberTok = (num:number | undefined) => {
  if(num! >= 1000000000)
  return (num! / 1000000000).toFixed(1).replace(/\.0$/,'') + ' G'

  if(num! >= 1000000)
  return (num! / 1000000).toFixed(1).replace(/\.0$/,'') + ' млн'

  if(num! >= 1000) return (num! / 1000).toFixed(1).replace(/\.0$/,'') + 'тысяч'
  
  return num
}