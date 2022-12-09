// Write your code here
/* import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    buttonChange: false,
    minutes: 25,
    seconds: 0,
    newMinute: 25,
  }

  changeButton1 = () => {
    this.setState({buttonChange: true})
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {newMinute, seconds} = this.state
    if (newMinute === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      const second = newMinute * 60 - 1 + seconds
      const m = Math.floor(second / 60)
      const s = second % 60
      this.setState({seconds: s, newMinute: m})
    }
  }

  changeButton2 = () => {
    this.setState({buttonChange: false})
    clearInterval(this.timerId)
  }

  decrement = () => {
    const {buttonChange, minutes} = this.state
    if (!buttonChange) {
      if (minutes > 1) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          newMinute:
            prevState.seconds === 0
              ? prevState.newMinute - 1
              : prevState.newMinute,
        }))
      }
    }
  }

  increment = () => {
    const {buttonChange} = this.state
    if (!buttonChange) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        newMinute:
          prevState.seconds === 0
            ? prevState.newMinute + 1
            : prevState.newMinute,
      }))
    }
  }

  timerReset = () => {
    clearInterval(this.timerId)
    this.setState({buttonChange: false, seconds: 0, newMinute: 25, minutes: 25})
  }

  render() {
    const {buttonChange, seconds, minutes} = this.state
    let {newMinute} = this.state
    if (!buttonChange && seconds === 0) {
      newMinute = minutes
    }
    const result =
      seconds > 9 ? `${newMinute}:${seconds}` : `${newMinute}:0${seconds}`
    const status = buttonChange ? 'Running' : 'Paused'
    return (
      <div className="main-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="round-div">
            <div className="content-div">
              <h1 className="color-text">{result}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="side-div">
            <div className="start-reset">
              {!buttonChange && (
                <div className="start">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.changeButton1}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="icon"
                      alt="play icon"
                    />
                    Start
                  </button>
                </div>
              )}
              {buttonChange && (
                <div className="start">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.changeButton2}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="icon"
                      alt="pause icon"
                    />
                    Pause
                  </button>
                </div>
              )}

              <div className="start">
                <button type="button" className="btn" onClick={this.timerReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="set-limit">Set Timer limit</p>
            <div className="limit-setter">
              <button
                type="button"
                className="set-button"
                onClick={this.decrement}
              >
                -
              </button>
              <p className="time-set">{minutes}</p>
              <button
                type="button"
                className="set-button"
                onClick={this.increment}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer */

import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
