import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { TextField, Typography, Button } from '@mui/material';
import NumberFormat from 'react-number-format';
import { formValues } from './OrderFormData';
import { orderFormSchema } from "./OrderFormSchema";
import { clearCartThunk as clearCart } from "../../store/products/operations"
import "./OrderForm.scss"

const OrderForm = ({ itemsInCart }) => {
    const dispatch = useDispatch()
    const OrderPhoneInput = ({ name, label }) => {
        const [field] = useField(name)
        return <NumberFormat {...field}
            format="(###) ###-####"
            allowEmptyFormatting mask="_"
            customInput={TextField}
            label={label} variant="standard" />
    }

    const handleFormSubmit = (values, { setSubmitting }) => {
        //console data
        console.group("This is info from order form");
        console.table(values);
        console.groupEnd();
        console.group("This is product(s) from cart");
        console.table(itemsInCart);
        console.groupEnd();
        //--------------
        dispatch(clearCart())
        setSubmitting(false)
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


OrderForm.propTypes = {
    product: PropTypes.array
}

OrderForm.defaultProps = {
    itemsInCart: [],
}
export default OrderForm