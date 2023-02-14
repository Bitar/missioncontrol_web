import * as Yup from 'yup'

export const activityDetailsSchema = Yup.object().shape({
  title: Yup.string().required('Activity title is required'),
})

export const activityGameSchema = Yup.object().shape({
  game_id: Yup.string().required('Game is required'),
  game_mode_id: Yup.string().required('Game Mode is required'),
  rounds: Yup.string().required('Rounds is required'),
  is_cross_play: Yup.string().required('Is Cross play enabled?'),
  platform_ids: Yup.array().min(1, 'Platforms is required').required('Platforms is required'),
})

export const activityScheduleSchema = Yup.object().shape({
  schedule: Yup.object().shape({
    registration_dates: Yup.object().shape({
      start_date: Yup.number()
        .moreThan(0, 'Registration Start Date is required')
        .required('Registration Start Date is required'),
      end_date: Yup.number()
        .moreThan(0, 'Registration End Date is required')
        .required('Registration End Date is required'),
    }),
    matchplay_dates: Yup.object().shape({
      start_date: Yup.number()
        .moreThan(0, 'GameDay Start Date is required')
        .required('Match Play Start Date is required'),
      end_date: Yup.number()
        .moreThan(0, 'GameDay End Date is required')
        .required('Match Play End Date is required'),
    }),

    settings: Yup.object().shape({
      frequency: Yup.string().required('Match Frequency is required'),
      time: Yup.string().required('Time of Day is required'),
      day: Yup.string().when('frequency', {
        is: '2',
        then: Yup.string().required('Day required'),
      }),
      timezone: Yup.string().required('Timezone is required'),
    }),
  }),
})

export const activityTeamSchema = Yup.object().shape({
  team: Yup.object().shape({
    min: Yup.number().required('Minimum Players is required'),
    players: Yup.number().required('Players Per team is required'),
  }),
})

export const activityEntryFeeSchema = Yup.object().shape({
  entry_fee: Yup.object().shape({
    type: Yup.number().required('Entry Fee Type required'),
    amount: Yup.number().when('type', {
      is: 2,
      then: Yup.number().moreThan(0, 'Amount must be greater than 0').required('Amount required'),
    }),
  }),
})

export const activityLocationSchema = Yup.object().shape({
  location: Yup.object().shape({
    type: Yup.number().required('Location Type required'),
    locate: Yup.string().when('type', {
      is: 2,
      then: Yup.string().required('Location required'),
    }),
  }),
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
      day: Yup.mixed().when('schedule.settings.frequency', {
        is: 2,
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
  activityGameSchema,
  activityScheduleSchema,
  activityTeamSchema,
  activityEntryFeeSchema,
  activityLocationSchema,
  activityLocationSchema,
]
