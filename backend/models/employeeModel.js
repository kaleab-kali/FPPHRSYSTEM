const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    //! step 1
 title: {
        type: String,
        required: [true, 'Please enter a title'],
  },
 firstName: {
    type: String,
    required: [true, 'Please enter first name'],
  },
  middleName: {
    type: String,
    required: [true, 'Please enter middle name'],
  },
 lastName: {
    type: String,
    required: [true, 'Please enter last name'],
  },
  birthday: {
    type: Date,
    required: [true, 'Please enter birthday'],
  },
  gender: {
    type: String,
    required: [true, 'Please enter gender'],
  },
  position: {
    type: String,
    required: [true, 'Please enter position'],
  },
  department: {
    type: String,
    required: [true, 'Please enter department'],
  },
  photo: {
    type: String,
    required: [true, 'Please enter Photo'],
  },
  ethnicity: {
    type: String,
    required: [true, 'Please enter ethnicity'],
  },
  phone: {
    prefix: {
        type: String,
      },
    number: {
      type: String,
      required: [true, 'Please enter phone number'],
    },
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
  },
  region: {
    type: String,
    required: [true, 'Please enter Region'],
  },
  subcity: {
    type: String,
    required: [true, 'Please enter Sub city'],
  },

    wordea: {
        type: String,
        required: [true, 'Please enter Wordea'],
    },
    houseNumber: {
        type: String,
    },
    leyuBota: {
        type: String,
    },
    camp: {
        type: String,
        },
    
//   //todo step 2
  salary: {
    type: Number,
    required: [true, 'Please enter Employee salary'],
  },
  educationalLevel: {
    type: String,
    enum: ['10grade', 'twelfth', 'tvet', 'diploma', 'bachelor', 'master', 'phd'],
    required: true,
      degrees: {
        bachelor: [
      {
        degreeName: {
            type: String,
          },
        institution: {
            type: String,
          },
        fieldOfStudy: {
            type: String,
          },
      },
    ],
    master: [
      {
        degreeName: {
            type: String,
          },
        institution: {
            type: String,
          },
        fieldOfStudy: {
            type: String,
          },
      },
    ],
    phd: [
      {
        degreeName: {
            type: String,
          },
        institution: {
            type: String,
          },
        fieldOfStudy: {
            type: String,
          },
      },
    ],
  },
},
birthplaceInfo: {
    region: {
        type: String,
        required: [true, 'Please enter Region'],
      },
    subcity: {
        type: String,
      },
    wordea: {
        type: String,
      },
    houseNumber: {
        type: String,
      },
    leyuBota: {
        type: String,
      },
  },
  motherInformation: {
    motherFirstName: {
      type: String,
      required: [true, "Please enter your mother's first name"],
    },
    motherMiddleName: {
      type: String,
      required: [true, "Please enter your mother's middle name"],
    },
    motherLastName: {
      type: String,
      required: [true, "Please enter your mother's last name"],
    },
    motherPhoneNumber: {
      prefix: {
        type: String,
        default: '+251',
      },
      //TODO number
      number: {
        type: Number,
        required: [true, "Please enter your mother's phone number"],
      },
    },
  },
  emergencyContact: {
    firstName: {
        type: String,
        required: [true, 'Please enter first name'],
      },
      middleName: {
        type: String,
        required: [true, 'Please enter middle name'],
      }, 
          lastName: {
        type: String,
        required: [true, 'Please enter last name'],
      },
    phoneNumber: {
        prefix: {
            type: Number,
            default: '+251',
          },
          //TODO number
          number: {
            type: Number,
            required: [true, "Please enter your mother's phone number"],
          },
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
      },
    houseNumber: {
        type: String,
        required: [true, 'Please enter House Number']},
    relationship: {
        type: String,
        required: [true, 'Please enter relationship']},
    leyuBota: {
       
            type: String,
        
      },
  },
//  //! martial status 
        maritalStatus: {
        martialType: {
            type: String,
            required: [true, "Please enter your martial stuats last name"],
          },
          spouseInfo: {
            firstName: {
                type: String,
              },
            middleName: {
                type: String,
              },
            lastName: {
                type: String,
              },
            dob: {
                type: Date,
              },
            phoneNumber: {
                prefix: {
                    type: String,
                    default: '+251',
                  },
                  //TODO number
                  number: {
                    type: Number,
                    // required: [true, "Please enter your mother's phone number"],
                  },
              },
            address: {
              currentAddress: {
                region: {
                    type: String,
                  },
                subcity: {
                    type: String,
                  },
              },
            },
          },
          divorcedInfo: {
            divorceDate: {
                type: Date,
              },
          },

    },
  }
  ,{ timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
