export type ActivityType = {
  id?: number
  name: string
}

export const initialActivityType = (activityType?: ActivityType) => {
  return {
    name: activityType?.name || '',
  }
}
