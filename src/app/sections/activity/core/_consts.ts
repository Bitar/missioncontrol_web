const ACTIVITY_STATUS = {
  ACTIVITY_STATUS_REGISTRATION: 1,
  ACTIVITY_STATUS_REGISTRATION_TEXT: 'registration',
  ACTIVITY_STATUS_ACTIVE: 2,
  ACTIVITY_STATUS_ACTIVE_TEXT: 'active',
  ACTIVITY_STATUS_PENDING: 3,
  ACTIVITY_STATUS_PENDING_TEXT: 'pending',
  ACTIVITY_STATUS_CLOSED: 4,
  ACTIVITY_STATUS_CLOSED_TEXT: 'closed',
}

export const ACTIVITY_DAY_OF_WEEK = [
  {
    value: 1,
    label: 'Monday',
  },
  {
    value: 2,
    label: 'Tuesday',
  },
  {
    value: 3,
    label: 'Wednesday',
  },
  {
    value: 4,
    label: 'Thursday',
  },
  {
    value: 5,
    label: 'Friday',
  },
  {
    value: 6,
    label: 'Saturday',
  },
  {
    value: 7,
    label: 'Sunday',
  },
]

export const ACTIVITY_MATCH_FREQUENCY = [
  {
    value: 1,
    label: 'Daily',
  },
  {
    value: 2,
    label: 'Weekly',
  },
]

const ACTIVITY_PRIZETYPE = [
  {value: 1, label: 'Single'},
  {value: 2, label: 'Bundle'},
]

const ACTIVITY_ITEMTYPE = [
  {value: 1, label: 'Cash'},
  {value: 2, label: 'Gift Card'},
  {value: 3, label: 'Collectible'},
  {value: 4, label: 'Voucher'},
]

const ACTIVITY_ITEM_VALUETYPE = [
  {value: 1, label: 'Cash'},
  {value: 2, label: 'Gift Card'},
]

const ACTIVITY_ROUNDS = [
  // {value:"DEFAULT",label:'pick an option'},
  {value: 1, label: 1},
  {value: 3, label: 3},
  {value: 5, label: 5},
  {value: 7, label: 7},
]

const ACTIVITY_LOCATION = [
  // {value:"DEFAULT",label:'pick an option'},
  {value: 1, label: 'Online'},
  {value: 2, label: 'In person'},
]

const ACTIVITY_FEE = [
  // {value:"DEFAULT",label:'pick an option'},
  {value: 1, label: 'Free'},
  {value: 2, label: 'Paid'},
]

const ACTIVITY_TIMEZONES = [
  // {value:"DEFAULT",label:'pick an option'},
  {value: 'Eastern', label: 'American/New_York'},
  {value: 'Central', label: 'American/Chicago'},
  {value: 'Mountain', label: 'American/Denver'},
  {value: 'Mountain no DST', label: 'American/Phoenix'},
  {value: 'Pacific', label: 'American/Los Angeles'},
  {value: 'Alaska', label: 'American/Anchorage'},
  {value: 'Hawaii', label: 'American/Adak'},
  {value: 'Hawaii no DST', label: 'Pacific/Honolulu'},
]

const selectCustomStyles = {
  option: (styles: any) => ({
    ...styles,
    cursor: 'pointer',
  }),
}

export {
  ACTIVITY_STATUS,
  ACTIVITY_ROUNDS,
  ACTIVITY_LOCATION,
  ACTIVITY_FEE,
  ACTIVITY_TIMEZONES,
  ACTIVITY_PRIZETYPE,
  ACTIVITY_ITEMTYPE,
  ACTIVITY_ITEM_VALUETYPE,
  selectCustomStyles,
}

export const ACTIVITY_CREATE_STEPPER_NAV = [
  {
    title: 'Basic Details',
    icon: 'fa-duotone fa-file',
    has_next: true,
  },
  {
    title: 'Game',
    icon: 'fa-duotone fa-gamepad',
    has_next: true,
  },
  {
    title: 'Schedule',
    icon: 'fa-duotone fa-calendar-range',
    has_next: true,
  },
  {
    title: 'Team',
    icon: 'fa-duotone fa-people-group',
    has_next: true,
  },
  {
    title: 'Entry',
    icon: 'fa-duotone fa-ticket',
    has_next: true,
  },
  {
    title: 'Location',
    icon: 'fa-duotone fa-location-dot',
    has_next: false,
  },
]
