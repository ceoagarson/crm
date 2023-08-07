import { Alert, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { NewLead } from '../../../services/LeadsServices';
import { Countries } from '../../../utils/countries';
import { Source } from '../../../utils/Source';
import { States } from '../../../utils/states';
import { Cities } from '../../../utils/cities';
import { BackendError, Target } from '../../../types';
import { ILead } from '../../../types/leads/lead.type';
import { queryClient } from '../../../main';
import { IUser } from '../../../types/users/user.type';

export type TformData = {
  name: string,
  customer_name: string,
  customer_designation: string,
  mobile: string,
  email: string
  city: string,
  state: string,
  country: string,
  address: string,
  remark: string,
  work_description: string,
  turnover: string,
  lead_type: string,
  stage: string,
  alternate_mobile1: string,
  alternate_mobile2: string,
  alternate_email: string,
  lead_owners: string[],
  lead_source: string,
  is_customer: boolean,
  visiting_card: string | Blob | File
}

function NewLeadForm({ users }: { users: IUser[] }) {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<ILead>, BackendError, FormData>
    (NewLead, {
      onSuccess: () => queryClient.invalidateQueries('leads')
    })
  const { setChoice } = useContext(ChoiceContext)
  const formik = useFormik<TformData>({
    initialValues: {
      name: "",
      customer_name: "",
      customer_designation: "",
      mobile: "",
      email: "",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      address: "",
      remark: "",
      work_description: "delaer of safety items",
      turnover: " 5 lakhs",
      lead_type: "wholesale",
      stage: "open",
      alternate_mobile1: "",
      alternate_mobile2: "",
      alternate_email: "",
      lead_source: "internet",
      lead_owners: [""],
      is_customer: false,
      visiting_card: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      lead_owners: Yup.array()
        .required('field'),
      email: Yup.string()
        .email('provide a valid email id'),
      alternate_email: Yup.string()
        .email('provide a valid email id'),
      customer_name: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      customer_designation: Yup.string(),
      city: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 30 characters or less'),
      state: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 30 characters or less'),
      lead_type: Yup.string(),
      turnover: Yup.string(),
      stage: Yup.string(),
      lead_source: Yup.string(),
      country: Yup.string(),
      work_description: Yup.string()
        .min(20, 'Must be 20 characters or more')
        .max(1000, 'Must be 1000 characters or less'),
      address: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(300, 'Must be 300 characters or less'),
      remark: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(500, 'Must be 500 characters or less'),
      mobile: Yup.string().required("required mobile number")
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits'),
      alternate_mobile1: Yup.string()
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits'),
      alternate_mobile2: Yup.string()
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits'),
      is_customer: Yup.boolean(),
      visiting_card: Yup.mixed<File>()
        .test("size", "size is allowed only less than 10mb",
          file => {
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(file.size <= 10 * 1024 * 1024)
            return true
          }
        )
        .test("type", " allowed only .jpg, .jpeg, .png, .gif .pdf",
          file => {
            const Allowed = ["image/png", "image/jpg", "image/jpeg", "image/png", "image/gif", "application/pdf"]
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(Allowed.includes(file.type))
            return true
          }
        )
    }),
    onSubmit: (values: TformData) => {
      let leadData = {
        customer_name: values.customer_name,
        customer_designation: values.customer_designation,
        mobile: values.mobile,
        email: values.email,
        city: values.city,
        state: values.state,
        country: values.country,
        address: values.address,
        remark: values.remark,
        work_description: values.work_description,
        turnover: values.turnover,
        lead_type: values.lead_type,
        stage: values.stage,
        alternate_mobile1: values.alternate_mobile1,
        alternate_mobile2: values.alternate_mobile2,
        alternate_email: values.alternate_email,
        lead_source: values.lead_source,
        name: values.name,
        lead_owners: values.lead_owners,
        is_customer: values.is_customer
      }
      let formdata = new FormData()
      formdata.append("body", JSON.stringify(leadData))
      if (values.visiting_card)
        formdata.append("visiting_card", values.visiting_card)
      mutate(formdata)
    }
  });
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setChoice({ type: LeadChoiceActions.close })
      }, 1000)
    }
  }, [isSuccess, setChoice])
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        gap={2}
        py={2}
      >
        {/* name */}

        <TextField
          autoFocus
          variant='standard'
          fullWidth


          error={
            formik.touched.name && formik.errors.name ? true : false
          }
          id="name"
          label="Lead Name"
          helperText={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          {...formik.getFieldProps('name')}
        />


        {/* customer name */}

        < TextField
          variant='standard'
          fullWidth

          error={
            formik.touched.customer_name && formik.errors.customer_name ? true : false
          }
          id="customer_name"
          label="Customer Name"
          helperText={
            formik.touched.customer_name && formik.errors.customer_name ? formik.errors.customer_name : ""
          }
          {...formik.getFieldProps('customer_name')}
        />


        {/* customer designiation */}


        < TextField
          variant='standard'
          fullWidth


          error={
            formik.touched.customer_designation && formik.errors.customer_designation ? true : false
          }
          id="customer_designation"
          label="Customer Designation"
          helperText={
            formik.touched.customer_designation && formik.errors.customer_designation ? formik.errors.customer_designation : ""
          }
          {...formik.getFieldProps('customer_designation')}
        />

        {/* mobile */}


        < TextField
          variant='standard'
          type="number"

          error={
            formik.touched.mobile && formik.errors.mobile ? true : false
          }
          id="mobile"
          label="Mobile"
          fullWidth
          helperText={
            formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : ""
          }
          {...formik.getFieldProps('mobile')}
        />

        {/* email */}


        < TextField
          variant='standard'

          fullWidth
          error={
            formik.touched.email && formik.errors.email ? true : false
          }
          id="email"
          label="Email"
          helperText={
            formik.touched.email && formik.errors.email ? formik.errors.email : ""
          }
          {...formik.getFieldProps('email')}
        />

        {/* alternate mobile */}



        < TextField
          variant='standard'
          fullWidth

          type="number"
          error={
            formik.touched.alternate_mobile1 && formik.errors.alternate_mobile1 ? true : false
          }
          id="alternate_mobile1"
          label="Alternate Mobile1"
          helperText={
            formik.touched.alternate_mobile1 && formik.errors.alternate_mobile1 ? formik.errors.alternate_mobile1 : ""
          }
          {...formik.getFieldProps('alternate_mobile1')}
        />

        {/* alternate mobile */}



        < TextField
          variant='standard'
          fullWidth
          type="number"
          error={
            formik.touched.alternate_mobile2 && formik.errors.alternate_mobile2 ? true : false
          }
          id="alternate_mobile2"
          label="Alternate Mobile2"
          helperText={
            formik.touched.alternate_mobile2 && formik.errors.alternate_mobile2 ? formik.errors.alternate_mobile2 : ""
          }
          {...formik.getFieldProps('alternate_mobile2')}
        />

        {/* turnover */}

        <TextField
          variant='standard'
          fullWidth
          error={
            formik.touched.turnover && formik.errors.turnover ? true : false
          }

          id="turnover"
          label="TurnOver"
          helperText={
            formik.touched.turnover && formik.errors.turnover ? formik.errors.turnover : ""
          }
          {...formik.getFieldProps('turnover')}
        />

        {/* alternate_email */}



        < TextField
          variant='standard'
          fullWidth
          error={
            formik.touched.alternate_email && formik.errors.alternate_email ? true : false
          }
          id="alternate_email"
          label="Alternate Email"
          helperText={
            formik.touched.alternate_email && formik.errors.alternate_email ? formik.errors.alternate_email : ""
          }
          {...formik.getFieldProps('alternate_email')}
        />

        {/* city */}


        < TextField
          variant='standard'
          select

          SelectProps={{
            native: true
          }}
          focused

          error={
            formik.touched.city && formik.errors.city ? true : false
          }
          id="city"
          label="City"
          fullWidth
          helperText={
            formik.touched.city && formik.errors.city ? formik.errors.city : ""
          }
          {...formik.getFieldProps('city')}
        >
          <option value="">
          </option>
          {
            Cities.map((city, index: number) => {
              return (<option key={index} value={city}>
                {city}
              </option>)
            })
          }
        </TextField>

        {/* state */}


        < TextField
          variant='standard'
          select


          SelectProps={{
            native: true
          }}
          focused

          error={
            formik.touched.state && formik.errors.state ? true : false
          }
          id="state"
          label="State"
          fullWidth
          helperText={
            formik.touched.state && formik.errors.state ? formik.errors.state : ""
          }
          {...formik.getFieldProps('state')}
        >
          <option value="">

          </option>
          {
            States.map(state => {
              return (<option key={state.code} value={state.state}>
                {state.state}
              </option>)
            })
          }
        </TextField>

        {/* stage */}


        < TextField
          variant='standard'

          select
          SelectProps={{
            native: true
          }}
          focused

          error={
            formik.touched.stage && formik.errors.stage ? true : false
          }
          id="stage"
          label="Stage"
          fullWidth
          helperText={
            formik.touched.stage && formik.errors.stage ? formik.errors.stage : ""
          }
          {...formik.getFieldProps('stage')}
        >
          <option value="">

          </option>
          <option value="open">
            open
          </option>
          <option value="won">
            won
          </option>
          <option value="won dealer">
            won dealer
          </option>
          <option value="lost">
            lost
          </option>
          <option value="useless">
            useless
          </option>
          <option value="potential">
            potential
          </option>
        </TextField>

        {/* lead type */}



        < TextField
          variant='standard'


          select
          SelectProps={{
            native: true
          }}
          focused

          error={
            formik.touched.lead_type && formik.errors.lead_type ? true : false
          }

          id="lead_type"
          label="Lead Type"
          fullWidth
          helperText={
            formik.touched.lead_type && formik.errors.lead_type ? formik.errors.lead_type : ""
          }
          {...formik.getFieldProps('lead_type')}
        >
          <option value="">

          </option>
          <option value="wholesale">
            wholesale
          </option>
          <option value="retail">
            retail
          </option>
          <option value="company">
            company
          </option>
          <option value="mixed">
            Wholesale + Retail
          </option>
        </TextField>


        {/* lead_source */}


        < TextField
          variant='standard'
          select


          SelectProps={{
            native: true
          }}
          focused

          error={
            formik.touched.lead_source && formik.errors.lead_source ? true : false
          }
          id="lead_source"
          label="Lead Source"
          fullWidth
          helperText={
            formik.touched.lead_source && formik.errors.lead_source ? formik.errors.lead_source : ""
          }
          {...formik.getFieldProps('lead_source')}
        >
          <option value="">
          </option>
          {

            Source.map(source => {
              return (
                <option key={source} value={source}>
                  {source}
                </option>)
            })
          }
        </TextField>

        {/* country */}



        < TextField
          variant='standard'

          select
          SelectProps={{
            native: true
          }}
          focused

          error={
            formik.touched.country && formik.errors.country ? true : false
          }
          id="country"
          label="country"
          fullWidth
          helperText={
            formik.touched.country && formik.errors.country ? formik.errors.country : ""
          }
          {...formik.getFieldProps('country')}
        >
          {
            Countries.map(country => {
              return (<option key={country.unicode} value={country.name}>
                {country.name}
              </option>)
            })
          }
        </TextField>

        {/* address */}

        < TextField


          variant='standard'
          multiline
          minRows={2}

          error={
            formik.touched.address && formik.errors.address ? true : false
          }
          id="address"
          label="Address"
          fullWidth
          helperText={
            formik.touched.address && formik.errors.address ? formik.errors.address : ""
          }
          {...formik.getFieldProps('address')}
        />

        {/* work_description */}



        < TextField
          variant='standard'
          multiline
          minRows={2}



          error={
            formik.touched.work_description && formik.errors.work_description ? true : false
          }
          id="work_description"
          label="Work Description"
          fullWidth
          helperText={
            formik.touched.work_description && formik.errors.work_description ? formik.errors.work_description : ""
          }
          {...formik.getFieldProps('work_description')}
        />


        {/* lead owners */}



        < TextField
          variant='standard'
          select
          SelectProps={{
            native: true,
            multiple: true
          }}
          focused

          error={
            formik.touched.lead_owners && formik.errors.lead_owners ? true : false
          }
          id="lead_owners"
          label="Lead Owners"
          fullWidth
          required
          helperText={
            formik.touched.lead_owners && formik.errors.lead_owners ? formik.errors.lead_owners : ""
          }
          {...formik.getFieldProps('lead_owners')}
        >
          {
            users.map(user => {
              return (<option key={user._id} value={user._id}>
                {user.username}
              </option>)
            })
          }
        </TextField>

        {/* remark */}


        < TextField
          variant='standard'
          multiline
          minRows={2}
          error={
            formik.touched.remark && formik.errors.remark ? true : false
          }
          id="remark"
          label="Remark"
          fullWidth
          helperText={
            formik.touched.remark && formik.errors.remark ? formik.errors.remark : ""
          }
          {...formik.getFieldProps('remark')}
        />

        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked={Boolean(formik.values.is_customer)}
            {...formik.getFieldProps('is_customer')}
          />} label="Is A Customer" />
          <p>
            {formik.touched.is_customer && formik.errors.is_customer ? formik.errors.is_customer : ""}
          </p>
        </FormGroup>

        <TextField
          fullWidth
          error={
            formik.touched.visiting_card && formik.errors.visiting_card ? true : false
          }
          helperText={
            formik.touched.visiting_card && formik.errors.visiting_card ? (formik.errors.visiting_card) : ""
          }
          label="Visting Card"
          focused
          variant='standard'
          type="file"
          name="visiting_card"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            e.preventDefault()
            const target: Target = e.currentTarget
            let files = target.files
            if (files) {
              let file = files[0]
              formik.setFieldValue("visiting_card", file)
            }
          }}
        />

      </Stack>
      {
        isError ? (
          <Alert color="error">
            {error?.response.data.message}
          </Alert>
        ) : null
      }
      {
        isSuccess ? (
          <Alert color="success">
            new lead created
          </Alert>
        ) : null
      }
      <Button variant="contained" color="primary" type="submit"

        fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Create Lead"}
      </Button>
    </form>
  )
}

export default NewLeadForm
