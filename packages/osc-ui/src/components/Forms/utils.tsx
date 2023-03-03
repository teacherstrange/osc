import { I18nProvider } from '@react-aria/i18n';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import type { ZodObject, ZodRawShape } from 'zod';
import { Checkbox } from '../Checkbox/Checkbox';
import { DatePicker } from '../DatePicker/DatePicker/DatePicker';
import { Select, SelectItem } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';
import { TextInput } from '../TextInput/TextInput';
import { datePickerSchema } from './formSchemas';
import type {
    SelectType,
    CheckboxType,
    DatePickerType,
    TextAreaType,
    TextInputType,
    TwoXColType,
} from './types';

export function getFormInput<ValidationErrors>(
    // TODO - "data" needs to be typed better
    data: any,
    index: number,
    schema: ZodObject<ZodRawShape>,
    setValidationErrors: Dispatch<SetStateAction<any>>,
    validationErrors: ValidationErrors
) {
    let input;
    if (data.layout === '2X_COL') {
        const inputData = data as TwoXColType;
        input = (
            <div className={inputData.classes} key={index}>
                {inputData.description}
                <div className="c-form__2x-col">
                    {inputData.nestedData?.map((mappedData, index) => {
                        return getInputType<ValidationErrors>(
                            mappedData,
                            index,
                            schema,
                            setValidationErrors,
                            validationErrors
                        );
                    })}
                </div>
            </div>
        );
    } else {
        input = getInputType(data, index, schema, setValidationErrors, validationErrors);
    }

    return input;
}

function getInputType<ValidationErrors>(
    // TODO - "data" needs to be typed better
    data: any,
    index: number,
    schema: ZodObject<ZodRawShape>,
    setValidationErrors: Dispatch<SetStateAction<any>>,
    validationErrors: ValidationErrors
) {
    let formInput;

    switch (data.inputType) {
        case 'CHECKBOX':
            const checkboxData = data as CheckboxType;
            formInput = (
                <Checkbox
                    description={checkboxData.description}
                    id={checkboxData.id}
                    key={index}
                    name={checkboxData.name}
                    value={checkboxData.value}
                />
            );
            break;
        case 'DATE_PICKER':
            const datePickerData = data as DatePickerType;
            formInput = (
                <I18nProvider locale="en-GB" key={index}>
                    <DatePicker
                        errors={validationErrors && validationErrors[datePickerData.name]}
                        label={datePickerData.label}
                        // Datepicker Schema imported directly as it is otherwise an ZodObject inside a ZodObject and running schema.pick on two levels doesn't seem to work. Plus it's unlikely to need to customise the datepicker schema on a form by form level.
                        schema={datePickerSchema.date}
                        setErrors={setValidationErrors}
                    />
                </I18nProvider>
            );
            break;
        case 'SELECT':
            const selectData = data as SelectType;
            formInput = (
                <Select
                    description={{ label: selectData.description?.label }}
                    errors={validationErrors && validationErrors[selectData.name]}
                    key={index}
                    placeholder={selectData.placeholder}
                    name={selectData.name}
                    schema={schema.pick({ [selectData.name]: true })}
                    setErrors={setValidationErrors}
                >
                    {selectData.selectItems?.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                            {item.name}
                        </SelectItem>
                    ))}
                </Select>
            );
            break;
        case 'TEXT_AREA':
            const textareaData = data as TextAreaType;
            formInput = (
                <TextArea
                    errors={validationErrors && validationErrors[textareaData.id]}
                    id={textareaData.id}
                    key={index}
                    name={textareaData.name}
                    required={textareaData.required}
                    schema={schema.pick({ [textareaData.id]: true })}
                    setErrors={setValidationErrors}
                />
            );
            break;
        case 'TEXT_INPUT':
            const textInputData = data as TextInputType;
            formInput = (
                <TextInput
                    errors={validationErrors && validationErrors[textInputData.id]}
                    key={index}
                    id={textInputData.id}
                    name={textInputData.name}
                    placeholder={textInputData.placeholder}
                    required={textInputData.required}
                    schema={schema.pick({ [textInputData.id]: true })}
                    setErrors={setValidationErrors}
                    type={textInputData.type}
                    variants={textInputData.variants}
                />
            );
            break;
        default:
            return null;
    }
    return formInput;
}
