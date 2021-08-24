import { createEvent, fireEvent, render, screen } from "utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { Formik } from "formik";
import FormikInput, { FormikInputProps } from "./";

const formikProps = {
    values: { textInput: "Some text" },
    errors: { textInput: "Error text" },
    touched: { textInput: false },
    isSubmitting: false,
    submitForm: jest.fn()
};

const props = {
    name: "textInput",
    label: "Input label",
    ...formikProps
};

const mock = jest.fn();

const renderComponent = (props: FormikInputProps) =>
    render(
        <Formik initialValues={props.values} onSubmit={mock}>
            {(formProps) => {
                formProps.isSubmitting = props.isSubmitting;
                formProps.submitForm = props.submitForm;
                formProps.errors = props.errors;
                formProps.touched = props.touched;

                return <FormikInput label={props.label} name={props.name} />;
            }}
        </Formik>
    );

describe("FormikInput component with connect", () => {
    test("matches snapshot", () => {
        expect(renderComponent(props)).toMatchSnapshot();
    });

    test("should render whit value and label", () => {
        renderComponent(props);
        const { getByRole, getByLabelText } = screen;
        expect(getByRole("textbox")).toBeInTheDocument();
        expect(getByRole("textbox")).toHaveValue("Some text");
        expect(getByLabelText(props.label)).toBeInTheDocument();
    });

    test("should display error text", () => {
        const propsWithError = {
            ...props,
            touched: { textInput: true }
        };
        renderComponent(propsWithError);
        const { getByText } = screen;
        expect(getByText(propsWithError.errors.textInput)).toBeInTheDocument();
    });

    test("should call submitForm() when isSubmitting is false", () => {
        renderComponent(props);
        const { getByRole } = screen;
        const input = getByRole("textbox");
        const pressEventEnter = createEvent.keyPress(input, {
            key: "Enter",
            charCode: 13
        });
        fireEvent(input, pressEventEnter);
        expect(props.submitForm).toHaveBeenCalled();
    });

    test("should not call submitForm() when isSubmitting is true", () => {
        const propsWithSubmitting = {
            ...props,
            isSubmitting: true
        };
        renderComponent(propsWithSubmitting);
        const { getByRole } = screen;
        const input = getByRole("textbox");
        const pressEventEnter = createEvent.keyPress(input, {
            key: "Enter",
            charCode: 13
        });
        fireEvent(input, pressEventEnter);
        expect(propsWithSubmitting.submitForm).not.toHaveBeenCalled();
    });
});
