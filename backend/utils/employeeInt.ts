// employee.ts
export interface Employee {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthday: string;
    gender: string;
    position: string;
    department: string;
    photo: string;
    ethnicity: string;
    phone: {
      prefix: string;
      number: string;
    };
    email: string;
    region: string;
    subcity: string;
    wordea: string;
    houseNumber: string;
    leyuBota: string;
    camp: string;
    salary: number;
    educationalLevel: string;
    birthplaceInfo: {
      region: string;
      subcity: string;
      wordea: string;
      houseNumber: string;
      leyuBota: string;
    };
    motherInformation: {
      motherFirstName: string;
      motherMiddleName: string;
      motherLastName: string;
      motherPhoneNumber: {
        prefix: string;
        number: number;
      };
    };
    emergencyContact: {
      firstName: string;
      middleName: string;
      lastName: string;
      phoneNumber: {
        prefix: number;
        number: number;
      };
      email: string;
      houseNumber: string;
      relationship: string;
      leyuBota: string;
    };
    maritalStatus: {
      martialType: string;
      spouseInfo: {
        firstName: string;
        middleName: string;
        lastName: string;
        dob: string;
        phoneNumber: {
          prefix: string;
          number: number;
        };
        address: {
          currentAddress: {
            region: string;
            subcity: string;
          };
        };
      };
      divorcedInfo: {
        divorceDate: string;
      };
    };
  }
  