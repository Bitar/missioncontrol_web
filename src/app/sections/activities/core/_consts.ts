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

const ACTIVITY_ROUNDS = [
    {value: 1, label: 1},
    {value: 3, label: 3},
    {value: 5, label: 5},
    {value: 7, label: 7}
]

const selectCustomStyles = {
    option: (styles: any) => ({
        ...styles,
        cursor: 'pointer',
    })
}

export {ACTIVITY_STATUS, ACTIVITY_ROUNDS, selectCustomStyles}
