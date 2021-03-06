import EfficiencyService from '../../services/efficiency.service'
import DateService from '../../services/date.service'


class AllTeamService{

  getPercent(num1, num2){
    let value = 0
    let profit = false


    // if (num2 === 0 && num1 === 0){
    //   return {
    //     value : -1,
    //     profit: false
    //   }
    // }
    // else if (num1 === 0){
    //   return {
    //     value : 0,
    //     profit: true
    //   }
    // }
    // else if (num2 === 0){
    //   return {
    //     value : 0,
    //     profit: false
    //   }
    // }
    value = Math.floor(Math.abs(num1 - num2)/num2) * 100
    profit = num1 > num2
    return {
      value : value,
      profit: profit
    }
  }

  computeEfficiency(employeeIdOrAllTeam){
    if (employeeIdOrAllTeam != "all"){ 

        const currentEfficiencyList = EfficiencyService.getEfficiencyFromSessionStorage(employeeIdOrAllTeam).current
        const currentEfficiency = EfficiencyService.computeEfficiencyForPeriodOfTime(currentEfficiencyList)
        const currentEfficiencyRate = EfficiencyService.getEfficiencyRate(currentEfficiency)

        const previousEfficiencyList = EfficiencyService.getEfficiencyFromSessionStorage(employeeIdOrAllTeam).previous
        const previousEfficiency = EfficiencyService.computeEfficiencyForPeriodOfTime(previousEfficiencyList)
        const previousEfficiencyRate = EfficiencyService.getEfficiencyRate(previousEfficiency)

        return {
          bigStat: [
            {
              category: "Effective",
              total: {
                value: currentEfficiency.effective,
                percent: this.getPercent(currentEfficiency.effective, previousEfficiency.effective)
              },
              percentage: {
                value: currentEfficiencyRate.effective,
                percent: this.getPercent(currentEfficiencyRate.effective, previousEfficiencyRate.effective)
              } 
            },
            {
              category: "Neutral",
              total: {
                value: currentEfficiency.neutral,
                percent: this.getPercent(currentEfficiency.neutral, previousEfficiency.neutral)
              },
              percentage: {
                value: currentEfficiencyRate.neutral,
                percent: this.getPercent(currentEfficiencyRate.neutral, previousEfficiencyRate.neutral)
              } 
            },
            {
              category: "Ineffective",
              total: {
                value: currentEfficiency.ineffective,
                percent: this.getPercent(currentEfficiency.ineffective, previousEfficiency.ineffective)
              },
              percentage: {
                value: currentEfficiencyRate.ineffective,
                percent: this.getPercent(currentEfficiencyRate.ineffective, previousEfficiencyRate.ineffective)
              } 
            },
            {
              category: "Without",
              total: {
                value: currentEfficiency.without,
                percent: this.getPercent(currentEfficiency.without, previousEfficiency.without)
              },
              percentage: {
                value: currentEfficiencyRate.without,
                percent: this.getPercent(currentEfficiencyRate.without, previousEfficiencyRate.without)
              } 
            }
          ],
        };    
    }

    const efficiencyForAllTeam = EfficiencyService.getEfficiencyFromSSAllTeam();
    let effectiveCurrentTotal = 0
    let effectivePreviousTotal = 0
    let neutralCurrentTotal = 0
    let neutralPreviousTotal = 0
    let ineffectiveCurrentTotal = 0
    let ineffectivePreviousTotal = 0
    let withoutCurrentTotal = 0
    let withoutPreviousTotal = 0

    let counter = 0
    let numOfWorkingDays = 1;
    if (efficiencyForAllTeam){
      for (const [key, value] of Object.entries(efficiencyForAllTeam)){
          if (counter == 0) {
            if (value.current.EFFECTIVE.length == 24) numOfWorkingDays = 1
            else if (value.current.EFFECTIVE.length == 7) numOfWorkingDays = 5
          }
          effectiveCurrentTotal += value.current.EFFECTIVE.reduce((a,b) => a + b)
          neutralCurrentTotal += value.current.NEUTRAL.reduce((a,b) => a + b)
          ineffectiveCurrentTotal += value.current.INEFFECTIVE.reduce((a,b) => a + b)
          withoutCurrentTotal += value.current.WITHOUT.reduce((a,b) => a + b)

          effectivePreviousTotal += value.previous.EFFECTIVE.reduce((a,b) => a + b)
          neutralPreviousTotal += value.previous.NEUTRAL.reduce((a,b) => a + b)
          ineffectivePreviousTotal += value.previous.INEFFECTIVE.reduce((a,b) => a + b)
          withoutPreviousTotal += value.previous.WITHOUT.reduce((a,b) => a + b)

          counter++
      }
    }

    let effectiveCurrent = 0
    let neutralCurrent = 0
    let ineffectiveCurrent = 0
    let withoutCurrent = 0
    let effectivePrevious = 0
    let neutralPrevious = 0
    let ineffectivePrevious = 0
    let withoutPrevious = 0

    let currentEfficiencyRate  = 0
    let previousEfficiencyRate = 0

    if (counter !== 0){
      // console.log("Curr", effectiveCurrentTotal)
      effectiveCurrent = Math.floor(effectiveCurrentTotal/(counter * numOfWorkingDays))
      neutralCurrent = Math.floor(neutralCurrentTotal/(counter * numOfWorkingDays))
      ineffectiveCurrent = Math.floor(ineffectiveCurrentTotal/(counter * numOfWorkingDays))
      withoutCurrent =  Math.floor(withoutCurrentTotal/(counter * numOfWorkingDays))
    
      effectivePrevious = Math.floor(effectivePreviousTotal/(counter * numOfWorkingDays))
      neutralPrevious = Math.floor(neutralPreviousTotal/(counter * numOfWorkingDays))
      ineffectivePrevious = Math.floor(ineffectivePreviousTotal/(counter * numOfWorkingDays))
      withoutPrevious =  Math.floor(withoutPreviousTotal/(counter * numOfWorkingDays))

      currentEfficiencyRate = EfficiencyService.getEfficiencyRateWithCategories(effectiveCurrent, neutralCurrent, ineffectiveCurrent, withoutCurrent)
      previousEfficiencyRate = EfficiencyService.getEfficiencyRateWithCategories(effectivePrevious, neutralPrevious, ineffectivePrevious, withoutPrevious)
    }
      return {
        bigStat: [
          {
            category: "Effective",
            total: {
              value: effectiveCurrent,
              percent: this.getPercent(effectiveCurrent, effectivePrevious)
            },
            percentage: {
              value: currentEfficiencyRate.effective,
              percent: this.getPercent(currentEfficiencyRate.effective, previousEfficiencyRate.effective)
            } 
          },
          {
            category: "Neutral",
            total: {
              value: neutralCurrent,
              percent: this.getPercent(neutralCurrent, neutralPrevious)
            },
            percentage: {
              value: currentEfficiencyRate.neutral,
              percent: this.getPercent(currentEfficiencyRate.neutral, previousEfficiencyRate.neutral)
            } 
          },
          {
            category: "Ineffective",
            total: {
              value: ineffectiveCurrent,
              percent: this.getPercent(ineffectiveCurrent, ineffectivePrevious)
            },
            percentage: {
              value: currentEfficiencyRate.ineffective,
              percent: this.getPercent(currentEfficiencyRate.ineffective, previousEfficiencyRate.ineffective)
            } 
          },
          {
            category: "Without",
            total: {
              value: withoutCurrent,
              percent: this.getPercent(withoutCurrent, withoutPrevious)
            },
            percentage: {
              value: currentEfficiencyRate.without,
              percent: this.getPercent(currentEfficiencyRate.without, previousEfficiencyRate.without)
            } 
          }
        ],
      }; 
    }
}

export default new AllTeamService()