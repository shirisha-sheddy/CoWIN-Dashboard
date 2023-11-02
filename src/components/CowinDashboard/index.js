// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  succuss: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'In_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiConstants.inProgress,
    })

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDate => ({
            vaccineDate: eachDate.vaccine_date,
            dose1: eachDate.dose_1,
            dose2: eachDate.dose_1,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          eachGender => ({
            count: eachGender.count,
            gender: eachGender.gender,
          }),
        ),
      }

      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiConstants.succuss,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderVaccinationStatus = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBaseOnAPIStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.succuss:
        return this.renderVaccinationStatus()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1>Co-WiIN</h1>
          </div>
          <h1>CoWIN Vaccination in India</h1>
          {this.renderViewBaseOnAPIStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
