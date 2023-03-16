export const defaultActivityFilterForm = {
  title: '',
}

export interface ActivityFilterForm {
  title?: string
  community_id?: number | string
  status?: number | string
}
