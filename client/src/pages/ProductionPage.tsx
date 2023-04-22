import { Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import {  useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { BackendError } from '../types'
import {  GetProductionByDate } from '../services/ProductionServices'
import { IProduction } from '../types/production.type'
import NewProductionForm from '../components/forms/production/NewProductionForm'
import UpdateProductionPage from './production/UpdateProductionPage'

function ProductionPage() {
  const [date, setDate] = useState<string>()
  const [newProduction, setNewProduction] = useState(false)
  const [productions, setProductions] = useState<IProduction[]>([])
  //fetch production by date selected
  const { data, isSuccess, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["productionBydate", date], () => GetProductionByDate(date))

  //fetch production
  useEffect(() => {
    if (isSuccess && data.data.length > 0) {
      setNewProduction(false)
      setProductions(data.data)
    }
    if (isSuccess && data.data.length === 0) {
      setNewProduction(true)
    }
  }, [isSuccess, data, productions])

  useEffect(() => {
    if (date) {
      refetch()
    }
    else{
      let today = new Date();
      let dt= today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
      setDate(dt)
    }
    // eslint-disable-next-line
  }, [date])

  return (
    <>
      {/* date of production */}
      <Stack
        sx={{ p: 2 }}
        gap={2}
        alignItems="center"
        justifyContent={"center"}
      >
        <Typography variant="h6">Select Date Of Production</Typography>
        <input defaultValue={date} type="date" onChange={(e) => {
          setDate(e.currentTarget.value)
        }} />
      </Stack>
      {newProduction && date ? <NewProductionForm date={date} createProduction={newProduction} /> : null}

      {date && productions && productions.length > 0 && !newProduction ? <UpdateProductionPage date={date} data={productions} /> : null}
    </>
  )
}

export default ProductionPage