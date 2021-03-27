import EfficiencyService from '../../services/efficiency.service'
import DateService from '../../services/date.service'


class AllTeamService{

  getPercent(num1, num2){
    const value = num2 == 0 ? 0 : Math.floor(Math.abs(num1 - num2)/num2)
    const profit = num1 > num2
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
    for (const [key, value] of Object.entries(efficiencyForAllTeam)){
      // console.log("VALUE", value.current.EFFECTIVE.reduce((a,b) => a + b))
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

     mockTeamDay = {
        bigStat: [
          {
            category: "Effective",
            total: {
              value: 181,
              percent: { value: 3.7, profit: true }
            },
            percentage: {
              value: 32,
              percent: {value: 9, profit: false}
            } 
          },
          {
            category: "Neutral",
            total: {
              value: 92,
              percent: { value: 2.5, profit: true }
            },
            percentage: {
              value: 14,
              percent: {value: 4, profit: true}
            } 
          },
          {
            category: "Ineffective",
            total: {
              value: 54,
              percent: { value: 3.1, profit: true }
            },
            percentage: {
              value: 21,
              percent: {value: 11, profit: false}
            } 
          },
          {
            category: "Without",
            total: {
              value: 171,
              percent: { value: 10, profit: true }
            },
            percentage: {
              value: 35,
              percent: {value: 4.7, profit: true}
            } 
          }
        ],
      };
      
      mockMemberDay = {
        bigStat: [
          {
            category: "Effective",
            total: {
              value: 123,
              percent: { value: 4.7, profit: false }
            },
            percentage: {
              value: 32,
              percent: {value: 5, profit: true}
            } 
          },
          {
            category: "Neutral",
            total: {
              value: 54,
              percent: { value: 3.5, profit: true }
            },
            percentage: {
              value: 26,
              percent: {value: 2, profit: false}
            } 
          },
          {
            category: "Ineffective",
            total: {
              value: 40,
              percent: { value: 3.1, profit: true }
            },
            percentage: {
              value: 21,
              percent: {value: 11, profit: false}
            } 
          },
          {
            category: "Without",
            total: {
              value: 139,
              percent: { value: 10, profit: false }
            },
            percentage: {
              value: 41,
              percent: {value: 2.7, profit: true}
            } 
          }
        ],
      };

      mockMemberWeek = {
        bigStat: [
          {
            category: "Effective",
            total: {
              value: 142,
              percent: { value: 3.7, profit: false }
            },
            percentage: {
              value: 31,
              percent: {value: 4, profit: true}
            } 
          },
          {
            category: "Neutral",
            total: {
              value: 66,
              percent: { value: 3.5, profit: true }
            },
            percentage: {
              value: 26,
              percent: {value: 2, profit: false}
            } 
          },
          {
            category: "Ineffective",
            total: {
              value: 55,
              percent: { value: 3.1, profit: true }
            },
            percentage: {
              value: 21,
              percent: {value: 11, profit: false}
            } 
          },
          {
            category: "Without",
            total: {
              value: 121,
              percent: {value: 1, profit: true}
            },
            percentage: {
              value: 51,
              percent: {value: 2.1, profit: false}
            } 
          }
        ],
      };



      mockTeamWeek = {
        bigStat: [
          {
            category: "Effective",
            total: {
              value: 121,
              percent: { value: 3.2, profit: true }
            },
            percentage: {
              value: 42,
              percent: {value: 4.4, profit: true}
            } 
          },
          {
            category: "Neutral",
            total: {
              value: 50,
              percent: { value: 3.5, profit: false }
            },
            percentage: {
              value: 16,
              percent: {value: 2, profit: false}
            } 
          },
          {
            category: "Ineffective",
            total: {
              value: 34,
              percent: { value: 3.2, profit: true }
            },
            percentage: {
              value: 24,
              percent: {value: 6, profit: false}
            } 
          },
          {
            category: "Without",
            total: {
              value: 121,
              percent: {value: 1, profit: true}
            },
            percentage: {
              value: 51,
              percent: {value: 2.1, profit: false}
            } 
          }
        ],
      };
}  

export default new AllTeamService()