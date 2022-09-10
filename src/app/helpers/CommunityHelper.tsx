export const communityAccessType = (accessType: number) => {
  let text = ''
  let color = ''

  if (accessType === 1) {
    color = 'success'
    text = 'Public'
  } else if (accessType === 2) {
    color = 'danger'
    text = 'Private'
  } else {
    color = 'secondary'
    text = 'Unknown'
  }

  return {color, text}
}