
class Mock{
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

export default new Mock()