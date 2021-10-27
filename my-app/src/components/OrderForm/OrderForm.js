import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { TextField, Typography, Button } from '@mui/material';
import NumberFormat from 'react-number-format';
import { formValues } from './OrderFormData';
import { orderFormSchema } from "./OrderFormSchema"
import "./OrderForm.scss"

const OrderForm = () => {
    const OrderPhoneInput = ({ name, label }) => {
        const [field] = useField(name)
        return <NumberFormat {...field}
            format="(###) ###-####"
            allowEmptyFormatting mask="_"
            customInput={TextField}
            label={label} variant="standard" />
    }

    const handleFormSubmit = (values) => {
        const { firstName, lastName, age, address, tel } = values
        console.log(firstName, lastName, age, address, tel);
    }

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                age: "",
                address: "",
                tel: ""
            }}
            validationSchema={orderFormSchema}
            onSubmit={handleFormSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="cart-form">
                    <Typography className="cart-title" variant="h5" component="div"> Add order:</Typography>
                    {formValues.map(({ id, name, label, type, isPhone }) => <div key={id}>
                        {isPhone
                            ? <OrderPhoneInput name={name} type={type} label={label} />
                            : <Field name={name} as={TextField} label={label} type={type} variant="standard" />
                        }
                        <ErrorMessage component="div" name={name} className="cart-error-msg" />
                    </div>)}
                    <Button type="submit" disabled={isSubmitting} color="success" variant="contained"> Checkout</Button >
                </Form>
            )}
        </Formik>
    )

}

export default OrderForm