// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderDetails} = props

  return (
    <div>
      <h1>Vaccination by gender</h1>
      <ResponsiveContainer width={1000} height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="60%"
            data={vaccinationByGenderDetails}
            outerRadius="60%"
            dataKey="count"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
