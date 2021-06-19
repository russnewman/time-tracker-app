import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/employees/controls/Controls";
import { useForm, Form } from '../../components/employees/useForm';
import * as employeeService from "../../services/employeeService";
import AuthService from "../../services/auth.service";



const genderItems = [
    { id: 'MALE', title: 'Мужской' },
    { id: 'FEMALE', title: 'Женский' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    department: '',
    position: '',
    gender: 'male',
    hireDate: new Date(),
}

export default function EmployeeForm(props) {
    const { updateEmployee, recordForEdit } = props
    // const [userInfo, setUserInfo] = useState(Auth)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    // console.log(initialFValues)

    // console.log(values)

    const handleSubmit = e => {
        e.preventDefault()
        updateEmployee(values)
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.OutlinedInput
                        disabled
                        name="fullName"
                        label="Полное имя"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.OutlinedInput
                        disabled
                        label="Email"
                        name="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.OutlinedInput
                        label="Департамент"
                        name="department"
                        value={values.department}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.OutlinedInput
                        label="Позиция"
                        name="position"
                        value={values.position}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Пол"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    {/* <Controls.OutlinedInput
                        name="mobile"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        // options={employeeService.getDepartmentCollection()}
                        error={errors.mobile}
                    /> */}
                    {/* <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    /> */}
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Обновить" 
                            color="secondary"/>
                        {/* <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} /> */}
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
