import * as Yup from 'yup'

export interface ICreateAccount {
    activityType: string
    activityTitle: string
    accountPlan: string
    businessName: string
    businessDescriptor: string
    businessType: string
    businessDescription: string
    businessEmail: string
    nameOnCard: string
    cardNumber: string
    cardExpiryMonth: string
    cardExpiryYear: string
    cardCvv: string
    saveCard: string
}

const createAccountSchemas = [
    Yup.object({
        activityType: Yup.string().required().label('Activity Type'),
    }),
    Yup.object({
        activityTitle: Yup.string().required().label('Activity Title'),
    }),
    Yup.object({
        businessName: Yup.string().required().label('Business Name'),
        businessDescriptor: Yup.string().required().label('Shortened Descriptor'),
        businessType: Yup.string().required().label('Corporation Type'),
        businessEmail: Yup.string().required().label('Contact Email'),
    }),
    Yup.object({
        nameOnCard: Yup.string().required().label('Name On Card'),
        cardNumber: Yup.string().required().label('Card Number'),
        cardExpiryMonth: Yup.string().required().label('Expiration Month'),
        cardExpiryYear: Yup.string().required().label('Expiration Year'),
        cardCvv: Yup.string().required().label('CVV'),
    }),
]

const inits: ICreateAccount = {
    activityType: '',
    activityTitle: '',
    accountPlan: '1',
    businessName: 'Keenthemes Inc.',
    businessDescriptor: 'KEENTHEMES',
    businessType: '1',
    businessDescription: '',
    businessEmail: 'corp@support.com',
    nameOnCard: 'Max Doe',
    cardNumber: '4111 1111 1111 1111',
    cardExpiryMonth: '1',
    cardExpiryYear: '2025',
    cardCvv: '123',
    saveCard: '1',
}

export {createAccountSchemas, inits}