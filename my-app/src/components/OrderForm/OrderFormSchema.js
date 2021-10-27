import * as Yup from 'yup';

export const orderFormSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    age: Yup.number().min(18, 'Your age must be more than 18').required('Required'),
    address: Yup.string().required('Required'),
    tel: Yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, "Enter correct number").required('Required')
})