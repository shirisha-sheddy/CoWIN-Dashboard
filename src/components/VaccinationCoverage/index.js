// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  const {vaccinationCoverageDetails} = props

  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <ResponsiveContainer width={900} height={400}>
        <BarChart
          data={vaccinationCoverageDetails}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0.5,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
              textAlign: 'center',
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#1f77b4"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#fd7f0e"
            barSize="20%"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
