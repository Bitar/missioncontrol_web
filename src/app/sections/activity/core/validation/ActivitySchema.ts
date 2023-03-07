import * as Yup from 'yup'

export const activityDetailsSchema = Yup.object().shape({
  type_id: Yup.string().required('Type is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})

export const activityGameSchema = Yup.object().shape({
  game_id: Yup.string().required('Game is required'),
  game_mode_id: Yup.string().required('Game Mode is required'),
  rounds: Yup.string().required('Rounds is required'),
  is_cross_play: Yup.string().required('Is Cross play enabled?'),
  platform_ids: Yup.array().min(1, 'Platforms is required').required('Platforms is required'),
})

export const activityPlayoffSchema = Yup.object().shape({
  playoff: Yup.object().shape({
    is_enabled: Yup.boolean(),
    playoff_dates: Yup.object().when('is_enabled', {
      is: true,
      then: Yup.object().shape({
        start_date: Yup.number()
          .moreThan(0, 'Playoff Start Date is required')
          .required('Playoff Start Date is required'),
        end_date: Yup.number()
          .moreThan(0, 'Playoff End Date is required')
          .required('Playoff End Date is required'),
      }),
    }),
    teams: Yup.number().when('is_enabled', {
      is: true,
      then: Yup.number()
        .typeError('Teams is required')
        .min(2, 'At least 2 teams are needed')
        .required('Teams is required'),
    }),
    is_valid: Yup.boolean().when('is_enabled', {
      is: true,
      then: Yup.boolean()
        .required('Playoff settings are Invalid')
        .oneOf([true], 'Playoff settings are Invalid'),
    }),
  }),
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
      time: Yup.number().moreThan(0, 'Time is required').required('Time is required'),
      day: Yup.string().when('frequency', {
        is: '2',
        then: Yup.string().required('Day required'),
      }),
      timezone: Yup.string().required('Timezone is required'),
    }),
  }),
})

export const activitySchedulePlayoffSchema = Yup.object().shape({
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
      time: Yup.number().moreThan(0, 'Time is required').required('Time is required'),
      day: Yup.string().when('frequency', {
        is: '2',
        then: Yup.string().required('Day required'),
      }),
      timezone: Yup.string().required('Timezone is required'),
    }),
  }),
  playoff: Yup.object().shape({
    is_enabled: Yup.boolean(),
    playoff_dates: Yup.object().when('is_enabled', {
      is: true,
      then: Yup.object().shape({
        start_date: Yup.number()
          .moreThan(0, 'Playoff Start Date is required')
          .required('Playoff Start Date is required'),
        end_date: Yup.number()
          .moreThan(0, 'Playoff End Date is required')
          .required('Playoff End Date is required'),
      }),
    }),
    teams: Yup.number().when('is_enabled', {
      is: true,
      then: Yup.number()
        .typeError('Teams is required')
        .min(2, 'At least 2 teams are needed')
        .required('Teams is required'),
    }),
    is_valid: Yup.boolean().when('is_enabled', {
      is: true,
      then: Yup.boolean()
        .required('Playoff settings are Invalid')
        .oneOf([true], 'Playoff settings are Invalid'),
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
  activityTeamSchema,
  activitySchedulePlayoffSchema,
  activityEntryFeeSchema,
  activityLocationSchema,
  activityLocationSchema,
]
