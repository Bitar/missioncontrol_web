import * as Yup from "yup";

export const activityScheduleSchema = Yup.object().shape({
  schedule: Yup.object().shape({
    registration_dates: Yup.object().shape({
      start_date: Yup.string().required('Registration Start Date is required'),
      end_date: Yup.string().required('Registration End Date is required'),
    }),
    matchplay_dates: Yup.object().shape({
      start_date: Yup.string().required('GameDay Start Date is required'),
      end_date: Yup.string().required('GameDay End Date is required'),
    }),
    settings: Yup.object().shape({
      frequency: Yup.string().required('Match Frequency is required'),
      time: Yup.string().required('Time of Day is required'),
      day: Yup.string().when('schedule.settings.frequency', {
        is: 2 || '2',
        then: Yup.string().required('Day required'),
      }),
      timezone: Yup.string().required('Timezone is required'),
    }),
  }),
})

export const activityDetailsSchema = Yup.object().shape({
  title: Yup.string().required('Activity title is required')
})

export const activitySchema = Yup.object().shape({
  community_id: Yup.string().required('Community is required'),
  game_id: Yup.string().required('Game is required'),
  game_mode_id: Yup.string().required('Game Mode is required'),
  rounds: Yup.string().required('Rounds is required'),
  is_cross_play: Yup.boolean(),
  platform_ids: Yup.array()
    .ensure()
    .when('is_cross_play', {
      is: true,
      then: Yup.array().min(1).required('At least 1 platform is required'),
    }),
  platform_id: Yup.string()
    .ensure()
    .when('is_cross_play', {
      is: false,
      then: Yup.string().required('Platform is required'),
    }),
  schedule: Yup.object().shape({
    registration_dates: Yup.object().shape({
      start_date: Yup.string().required('Registration Start Date is required'),
      end_date: Yup.string().required('Registration End Date is required'),
    }),
    matchplay_dates: Yup.object().shape({
      start_date: Yup.string().required('GameDay Start Date is required'),
      end_date: Yup.string().required('GameDay End Date is required'),
    }),
    settings: Yup.object().shape({
      frequency: Yup.string().required('Match Frequency is required'),
      time: Yup.string().required('Time of Day is required'),
      day: Yup.string().when('schedule.settings.frequency', {
        is: 2 || '2',
        then: Yup.string().required('Day required'),
      }),
      timezone: Yup.string().required('Timezone is required'),
    }),
  }),
  location: Yup.object().shape({
    type: Yup.number().required('Entry Fee Type required'),
    locate: Yup.string().when('location.type', {
      is: 2,
      then: Yup.string().required('Location required'),
    }),
  }),
  team: Yup.object().shape({
    min: Yup.number().required('Minimum Players is required'),
    max: Yup.number().required('Maximum Players is required'),
    players: Yup.number().required('Players Per team is required'),
  }),
  entry_fee: Yup.object().shape({
    type: Yup.number().required('Entry Fee Type required'),
    amount: Yup.number().when('entry_fee.type', {
      is: 2,
      then: Yup.number().required('Amount required'),
    }),
  }),
  // prize: Yup.array().of(
  //   Yup.object().shape({
  //     type: Yup.string().required('Item type is required'),
  //   })
  // ),
})

export const activityCreateWizardSchema = [
  activityDetailsSchema,
]
