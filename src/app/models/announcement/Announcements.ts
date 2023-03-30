import * as Yup from 'yup'
import {User} from '../iam/User'

export const announcementSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
})

export type Announcement = {
  id?: number
  title: string
  body: string
  created_at?: number
  user?: User
}

export const defaultAnnouncement = {
  title: '',
  body: '',
}
