// Simple Form that illustrates compile errors when using react-hook-form >= 7.33

import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

import TextField from "./TextField";

type Values = {
    firstField: string | null;
    secondField: string | null;
}

const MyForm = () => {

    const onSubmit: SubmitHandler<Values> = (values) => {
        alert("Submitted Values: " + JSON.stringify(values, null,  2));
    }

    const validationSchema = Yup.object().shape({
        firstField: Yup.string()
            .nullable()
            .required("First field is required"),
        secondField: Yup.string()
            .nullable()
            .test("abc-value",
                "Not typing 'abc' is a validation violation",
                function (value) {
                    return (value === "abc");
                }),
    });

    const {formState: {errors}, handleSubmit, register} = useForm<Values>({
        defaultValues: {
            firstField: null,
            secondField: null,
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    return (
        <Container>
            <Row>
                <Col className="mb-3 text-center">Dummy Form</Col>
            </Row>
            <Form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <Row className="mb-3">
                    <TextField
                        autoFocus
                        error={errors.firstField}
                        label="First Field:"
                        name="firstField"
                        register={register}
                        valid="You MUST enter a value in this field"
                    />
                    <TextField
                        error={errors.secondField}
                        label="Second Field:"
                        name="secondField"
                        register={register}
                        valid="Enter abc to avoid the lame error message"
                    />
                </Row>
                <Row className="mb-3">
                    <Col className="text-center">
                        <Button
                            size="sm"
                            type="submit"
                            variant="primary"
                        >Submit</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )

}

export default MyForm;
