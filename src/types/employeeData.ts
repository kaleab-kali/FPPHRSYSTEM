interface CurrentAddress {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
  camp?: string;
}

interface Phone {
  prefix: string;
  number: string;
}

interface Education {
  graduationYear: string;
  fieldOfStudy: string;
  universityName: string;
}

interface BirthplaceInfo {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
}

interface MotherInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: {
    prefix: string;
    number: string;
  };
}
interface Address {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
}

interface ContactInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
}

interface EmergencyContact {
  info: ContactInfo;
  address: Address;
}

interface SpouseInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob?: Date;
  phoneNumber?: string;
  address: Address;
}

interface DivorcedInfo {
  divorceDate: Date;
  // Add other divorced fields as needed
}

export interface EmployeeData {
  _id: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: Date;
  gender: string;
  position: string;
  department: string;
  photo: string;
  ethnicity: string;
  phoneNumber: Phone;
  email: string;
  currentAddress: CurrentAddress;
  salary: string;
  educationLevel: string;
  education: {
    bachelor?: Education[];
    master?: Education[];
    phd?: Education[];
  };
  birthplaceInfo: BirthplaceInfo;
  motherInformation: MotherInformation;
  emergencyContact: EmergencyContact;
  maritalStatus: string;
  spouseInfo?: SpouseInfo;
  divorcedInfo?: DivorcedInfo;
}
