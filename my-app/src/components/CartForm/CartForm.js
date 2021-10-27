import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Typography, Button } from '@mui/material';
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';
import "./CartForm.scss"

const formValues = [
    { id: 1, name: "firstName", label: "First name:", type: "text" },
    { id: 2, name: "lastName", label: "Last name:", type: "text" },
    { id: 3, name: "age", label: "Age:", type: "number" },
    { id: 4, name: "address", label: "Address:", type: "text" },
    { id: 5, name: "tel", label: "Phone:", type: "tel", isPhone: true },
]

const FormSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    age: Yup.number().min(18, 'Your age must be more than 18').required('Required'),
    address: Yup.string().required('Required'),
    tel: Yup.number().min(11, 'Your number must contains 11 symbols').required('Required')
})


const CartForm = () => {
    const PhoneInput = () => { return <NumberFormat customInput={TextField} label="Phone:" variant="standard" format="+3 (###) ###-####" allowEmptyFormatting mask="_" /> }
    const handleFormSubmit = (values) => {
        const { firstName, lastName, age, address, tel } = values
        console.log(firstName, lastName, age, address, tel);
        console.log("clicked");
    }


    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    age: "",
                    address: "",
                    tel: ""
                }}
                validationSchema={FormSchema}
                onSubmit={handleFormSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="cart-form">
                        <Typography className="cart-title" variant="h5" component="div"> Add order:</Typography>
                        {formValues.map(({ id, name, label, type, isPhone }) => <div key={id}>
                            <Field name={name} as={isPhone ? PhoneInput : TextField} label={label} variant="standard" type={type} />
                            <ErrorMessage component="div" name={name} style={{ color: 'red' }} />
                        </div>)}
                        <Button type="submit" disabled={isSubmitting} color="success" variant="contained"> Checkout</Button >
                    </Form>
                )}
            </Formik>
        </>
    )

}

export default CartForm