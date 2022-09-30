import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IContext } from '../interfaces/context.interface';
import { ReadStream } from 'fs';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream( options?:{ encoding?: string, highWaterMark?: number } ): ReadStream;
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number */
  AccountNumber: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: bigint;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: Buffer | string;
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: string;
  /** A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down */
  Cuid: string;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: string;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: string;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date | string;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: string;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: string;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: string;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: string;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: string;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: string;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: string;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: string;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: string;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, any>;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: string;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: string;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: string;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: string;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: string;
  /** The locale in the format of a BCP 47 (RFC 5646) standard string */
  Locale: string;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: bigint;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: string | number;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: string;
  /** Floats that will have a value less than 0. */
  NegativeFloat: number;
  /** Integers that will have a value less than 0. */
  NegativeInt: number;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: number;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: number;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: number;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: string;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: string;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: string | number;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: number;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: string;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: string;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: string;
  /** In the US, an ABA routing transit number (`ABA RTN`) is a nine-digit code to identify the financial institution. */
  RoutingNumber: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: number;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: Date | string;
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: Date | string | number;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** A currency string, such as $21.25 */
  USCurrency: string;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: string;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: number;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: Promise<GraphQLFileUpload>;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: string;
  /** Represents NULL values */
  Void: void;
};

export type Admin = {
  __typename?: 'Admin';
  avatar?: Maybe<Scalars['URL']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AdminInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type AvatarInput = {
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['ID'];
};

export type Blog = {
  __typename?: 'Blog';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['URL']>;
  title?: Maybe<Scalars['String']>;
};

export type BlogPostInput = {
  content: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type ChangePswInput = {
  con_password: Scalars['String'];
  id: Scalars['ID'];
  new_password: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePswResponse = {
  __typename?: 'ChangePswResponse';
  message: Scalars['String'];
  status: Scalars['Int'];
};

export type Coordinator = {
  __typename?: 'Coordinator';
  avatar?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  students?: Maybe<Array<Maybe<Student>>>;
  supervisors?: Maybe<Array<Maybe<Supervisor>>>;
  user: User;
};

export type CoordinatorInput = {
  avatar?: InputMaybe<Scalars['String']>;
  department: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  institute: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  staffID: Scalars['String'];
};

export type DeleteCoordinatorInput = {
  email: Scalars['String'];
};

export type DeleteOrganisationInput = {
  email: Scalars['String'];
};

export type DeleteStudentInput = {
  email: Scalars['String'];
};

export type DeleteSupervisorInput = {
  email: Scalars['String'];
};

export type DeletedCoordinator = {
  __typename?: 'DeletedCoordinator';
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type DeletedOrganisation = {
  __typename?: 'DeletedOrganisation';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sector?: Maybe<Sector>;
  status?: Maybe<Scalars['Int']>;
};

export type DeletedStudent = {
  __typename?: 'DeletedStudent';
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  matricNo?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type DeletedSupervisor = {
  __typename?: 'DeletedSupervisor';
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type Eligibility = {
  __typename?: 'Eligibility';
  createdAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
  matricNo?: Maybe<Scalars['String']>;
  supervisor?: Maybe<Scalars['String']>;
};

export type EligibleInput = {
  department: Scalars['String'];
  institute: Scalars['String'];
  level: Level;
  matricNo: Scalars['String'];
  supervisor: Scalars['String'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export enum Level {
  L3 = 'L3',
  L4 = 'L4',
  Nc2 = 'NC2',
  Nd1 = 'ND1'
}

export type Logbook = {
  __typename?: 'Logbook';
  approved?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  day?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  diagram?: Maybe<Scalars['URL']>;
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  student?: Maybe<Student>;
  title?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  admin?: Maybe<ReturnRegisteredAdmin>;
  blogPost?: Maybe<ReturnRegisteredBlogPost>;
  changePassword?: Maybe<ChangePswResponse>;
  coordinator?: Maybe<ReturnRegisteredCoordinator>;
  deleteAvatar?: Maybe<UploadResponse>;
  deleteCoordinator?: Maybe<DeletedCoordinator>;
  deleteOrganisation?: Maybe<DeletedOrganisation>;
  deleteStudent?: Maybe<DeletedStudent>;
  deleteSupervisor?: Maybe<DeletedSupervisor>;
  eligible?: Maybe<ReturnRegisteredEligible>;
  organisation?: Maybe<ReturnRegisteredOrganisation>;
  student?: Maybe<ReturnRegisteredStudent>;
  supervisor?: Maybe<ReturnRegisteredSupervisor>;
  updateAvatar?: Maybe<UploadResponse>;
  updateCoordinator?: Maybe<ReturnRegisteredCoordinator>;
  updateOrganisation?: Maybe<ReturnRegisteredOrganisation>;
  updateStudent?: Maybe<ReturnRegisteredStudent>;
  updateSupervisor?: Maybe<ReturnRegisteredSupervisor>;
  uploadAvatar?: Maybe<UploadResponse>;
  uploadDiagram?: Maybe<UploadResponse>;
};


export type MutationAdminArgs = {
  registerInput: AdminInput;
};


export type MutationBlogPostArgs = {
  registerInput: BlogPostInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePswInput;
};


export type MutationCoordinatorArgs = {
  registerInput: CoordinatorInput;
};


export type MutationDeleteAvatarArgs = {
  deleteInput: Scalars['ID'];
};


export type MutationDeleteCoordinatorArgs = {
  emailInput: DeleteCoordinatorInput;
};


export type MutationDeleteOrganisationArgs = {
  emailInput: DeleteOrganisationInput;
};


export type MutationDeleteStudentArgs = {
  emailInput: DeleteStudentInput;
};


export type MutationDeleteSupervisorArgs = {
  emailInput: DeleteSupervisorInput;
};


export type MutationEligibleArgs = {
  registerInput: EligibleInput;
};


export type MutationOrganisationArgs = {
  registerInput: OrganisationInput;
};


export type MutationStudentArgs = {
  registerInput: StudentInput;
};


export type MutationSupervisorArgs = {
  registerInput: SupervisorInput;
};


export type MutationUpdateAvatarArgs = {
  updateInput: AvatarInput;
};


export type MutationUpdateCoordinatorArgs = {
  updateInput: UpdateCoordinatorInput;
};


export type MutationUpdateOrganisationArgs = {
  updateInput: UpdateOrganisationInput;
};


export type MutationUpdateStudentArgs = {
  updateInput: UpdateStudentInput;
};


export type MutationUpdateSupervisorArgs = {
  updateInput: UpdateSupervisorInput;
};


export type MutationUploadAvatarArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadDiagramArgs = {
  file?: InputMaybe<Scalars['Upload']>;
};

export type Organisation = {
  __typename?: 'Organisation';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  employees?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  joinedDate?: Maybe<Scalars['DateTime']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  sector?: Maybe<Sector>;
  students?: Maybe<Array<Maybe<Student>>>;
  user?: Maybe<User>;
};

export type OrganisationInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  employees: Scalars['Int'];
  logo: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  sector: Sector;
};

export type Query = {
  __typename?: 'Query';
  blog?: Maybe<Blog>;
  blogs?: Maybe<Array<Maybe<Blog>>>;
  coordinator?: Maybe<Coordinator>;
  coordinators?: Maybe<Array<Maybe<Coordinator>>>;
  eligible?: Maybe<Eligibility>;
  eligibles?: Maybe<Array<Maybe<Eligibility>>>;
  logbook?: Maybe<Logbook>;
  logbooks?: Maybe<Array<Maybe<Logbook>>>;
  loginAdmin?: Maybe<ReturnRegisteredAdmin>;
  loginCoordinator?: Maybe<ReturnRegisteredCoordinator>;
  loginOrganisation?: Maybe<ReturnRegisteredOrganisation>;
  loginStudent?: Maybe<ReturnRegisteredStudent>;
  loginSupervisor?: Maybe<ReturnRegisteredSupervisor>;
  organisation?: Maybe<Organisation>;
  organisations?: Maybe<Array<Maybe<Organisation>>>;
  student?: Maybe<Student>;
  students?: Maybe<Array<Maybe<Student>>>;
  supervisor?: Maybe<Supervisor>;
  supervisors?: Maybe<Array<Maybe<Supervisor>>>;
};


export type QueryBlogArgs = {
  id: Scalars['ID'];
};


export type QueryCoordinatorArgs = {
  id: Scalars['ID'];
};


export type QueryEligibleArgs = {
  id: Scalars['ID'];
};


export type QueryLogbookArgs = {
  id: Scalars['ID'];
};


export type QueryLoginAdminArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type QueryLoginCoordinatorArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type QueryLoginOrganisationArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type QueryLoginStudentArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type QueryLoginSupervisorArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type QueryOrganisationArgs = {
  id: Scalars['ID'];
};


export type QueryStudentArgs = {
  id: Scalars['ID'];
};


export type QuerySupervisorArgs = {
  id: Scalars['ID'];
};

export type RegisteredAdmin = {
  __typename?: 'RegisteredAdmin';
  avatar?: Maybe<Scalars['URL']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type RegisteredCoordinator = {
  __typename?: 'RegisteredCoordinator';
  avatar?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type RegisteredOrganisation = {
  __typename?: 'RegisteredOrganisation';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  employees?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  sector?: Maybe<Sector>;
  user?: Maybe<User>;
};

export type RegisteredStudent = {
  __typename?: 'RegisteredStudent';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
  matricNo?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type RegisteredSupervisor = {
  __typename?: 'RegisteredSupervisor';
  avatar?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ReturnRegisteredAdmin = Token & {
  __typename?: 'ReturnRegisteredAdmin';
  accessToken: Scalars['JWT'];
  admin: RegisteredAdmin;
  refreshToken: Scalars['JWT'];
};

export type ReturnRegisteredBlogPost = {
  __typename?: 'ReturnRegisteredBlogPost';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['URL']>;
  title?: Maybe<Scalars['String']>;
};

export type ReturnRegisteredCoordinator = Token & {
  __typename?: 'ReturnRegisteredCoordinator';
  accessToken: Scalars['JWT'];
  coordinator: RegisteredCoordinator;
  message: Scalars['String'];
  refreshToken: Scalars['JWT'];
  status: Scalars['Int'];
};

export type ReturnRegisteredEligible = {
  __typename?: 'ReturnRegisteredEligible';
  message?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
};

export type ReturnRegisteredOrganisation = Token & {
  __typename?: 'ReturnRegisteredOrganisation';
  accessToken: Scalars['JWT'];
  message: Scalars['String'];
  organisation: RegisteredOrganisation;
  refreshToken: Scalars['JWT'];
  status: Scalars['Int'];
};

export type ReturnRegisteredStudent = Token & {
  __typename?: 'ReturnRegisteredStudent';
  accessToken: Scalars['JWT'];
  message: Scalars['String'];
  refreshToken: Scalars['JWT'];
  status: Scalars['Int'];
  student: RegisteredStudent;
};

export type ReturnRegisteredSupervisor = Token & {
  __typename?: 'ReturnRegisteredSupervisor';
  accessToken: Scalars['JWT'];
  message: Scalars['String'];
  refreshToken: Scalars['JWT'];
  status: Scalars['Int'];
  supervisor: RegisteredSupervisor;
};

export enum Sector {
  Agriculture = 'Agriculture',
  Aviation = 'Aviation',
  Commercial = 'Commercial',
  Construction = 'Construction',
  Consultancy = 'Consultancy',
  Education = 'Education',
  Energy = 'Energy',
  Entertainment = 'Entertainment',
  Fashion = 'Fashion',
  Financial = 'Financial',
  Healthcare = 'Healthcare',
  Ict = 'ICT',
  Legal = 'Legal',
  Logistics = 'Logistics',
  Manufacturing = 'Manufacturing',
  Oil = 'Oil',
  Others = 'Others',
  Religion = 'Religion',
  Telecommunication = 'Telecommunication',
  Tourism = 'Tourism',
  Transportation = 'Transportation'
}

export type Student = {
  __typename?: 'Student';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  coordinator?: Maybe<Coordinator>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
  logbooks?: Maybe<Array<Maybe<Logbook>>>;
  matricNo?: Maybe<Scalars['String']>;
  organisation?: Maybe<Organisation>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  supervisor?: Maybe<Supervisor>;
  user: User;
};

export type StudentInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar: Scalars['String'];
  department: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  institute: Scalars['String'];
  lastName: Scalars['String'];
  level?: InputMaybe<Level>;
  matricNo: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  place: Scalars['String'];
};

export type Supervisor = {
  __typename?: 'Supervisor';
  avatar?: Maybe<Scalars['String']>;
  coordinator?: Maybe<Coordinator>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  students?: Maybe<Array<Maybe<Student>>>;
  user?: Maybe<User>;
};

export type SupervisorInput = {
  avatar?: InputMaybe<Scalars['String']>;
  department: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  institute: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  staffID: Scalars['String'];
};

export type Token = {
  accessToken: Scalars['JWT'];
  refreshToken: Scalars['JWT'];
};

export type UpdateCoordinatorInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateOrganisationInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  employees: Scalars['Int'];
  logo: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  sector: Sector;
};

export type UpdateStudentInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  lastName: Scalars['String'];
  level?: InputMaybe<Level>;
  phone: Scalars['String'];
};

export type UpdateSupervisorInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  imageUrl: Scalars['String'];
  message: Scalars['String'];
  status: Scalars['Int'];
};

export enum User {
  Admin = 'Admin',
  Coordinator = 'Coordinator',
  Organisation = 'Organisation',
  Student = 'Student',
  Supervisor = 'Supervisor'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']>;
  Admin: ResolverTypeWrapper<Admin>;
  AdminInput: AdminInput;
  AvatarInput: AvatarInput;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Blog: ResolverTypeWrapper<Blog>;
  BlogPostInput: BlogPostInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  ChangePswInput: ChangePswInput;
  ChangePswResponse: ResolverTypeWrapper<ChangePswResponse>;
  Coordinator: ResolverTypeWrapper<Coordinator>;
  CoordinatorInput: CoordinatorInput;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteCoordinatorInput: DeleteCoordinatorInput;
  DeleteOrganisationInput: DeleteOrganisationInput;
  DeleteStudentInput: DeleteStudentInput;
  DeleteSupervisorInput: DeleteSupervisorInput;
  DeletedCoordinator: ResolverTypeWrapper<DeletedCoordinator>;
  DeletedOrganisation: ResolverTypeWrapper<DeletedOrganisation>;
  DeletedStudent: ResolverTypeWrapper<DeletedStudent>;
  DeletedSupervisor: ResolverTypeWrapper<DeletedSupervisor>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  Eligibility: ResolverTypeWrapper<Eligibility>;
  EligibleInput: EligibleInput;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  Gender: Gender;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  Level: Level;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']>;
  Logbook: ResolverTypeWrapper<Logbook>;
  LoginInput: LoginInput;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  Organisation: ResolverTypeWrapper<Organisation>;
  OrganisationInput: OrganisationInput;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  RegisteredAdmin: ResolverTypeWrapper<RegisteredAdmin>;
  RegisteredCoordinator: ResolverTypeWrapper<RegisteredCoordinator>;
  RegisteredOrganisation: ResolverTypeWrapper<RegisteredOrganisation>;
  RegisteredStudent: ResolverTypeWrapper<RegisteredStudent>;
  RegisteredSupervisor: ResolverTypeWrapper<RegisteredSupervisor>;
  ReturnRegisteredAdmin: ResolverTypeWrapper<ReturnRegisteredAdmin>;
  ReturnRegisteredBlogPost: ResolverTypeWrapper<ReturnRegisteredBlogPost>;
  ReturnRegisteredCoordinator: ResolverTypeWrapper<ReturnRegisteredCoordinator>;
  ReturnRegisteredEligible: ResolverTypeWrapper<ReturnRegisteredEligible>;
  ReturnRegisteredOrganisation: ResolverTypeWrapper<ReturnRegisteredOrganisation>;
  ReturnRegisteredStudent: ResolverTypeWrapper<ReturnRegisteredStudent>;
  ReturnRegisteredSupervisor: ResolverTypeWrapper<ReturnRegisteredSupervisor>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  Sector: Sector;
  String: ResolverTypeWrapper<Scalars['String']>;
  Student: ResolverTypeWrapper<Student>;
  StudentInput: StudentInput;
  Supervisor: ResolverTypeWrapper<Supervisor>;
  SupervisorInput: SupervisorInput;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  Token: ResolversTypes['ReturnRegisteredAdmin'] | ResolversTypes['ReturnRegisteredCoordinator'] | ResolversTypes['ReturnRegisteredOrganisation'] | ResolversTypes['ReturnRegisteredStudent'] | ResolversTypes['ReturnRegisteredSupervisor'];
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  UpdateCoordinatorInput: UpdateCoordinatorInput;
  UpdateOrganisationInput: UpdateOrganisationInput;
  UpdateStudentInput: UpdateStudentInput;
  UpdateSupervisorInput: UpdateSupervisorInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UploadResponse: ResolverTypeWrapper<UploadResponse>;
  User: User;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountNumber: Scalars['AccountNumber'];
  Admin: Admin;
  AdminInput: AdminInput;
  AvatarInput: AvatarInput;
  BigInt: Scalars['BigInt'];
  Blog: Blog;
  BlogPostInput: BlogPostInput;
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  ChangePswInput: ChangePswInput;
  ChangePswResponse: ChangePswResponse;
  Coordinator: Coordinator;
  CoordinatorInput: CoordinatorInput;
  CountryCode: Scalars['CountryCode'];
  Cuid: Scalars['Cuid'];
  Currency: Scalars['Currency'];
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  DeleteCoordinatorInput: DeleteCoordinatorInput;
  DeleteOrganisationInput: DeleteOrganisationInput;
  DeleteStudentInput: DeleteStudentInput;
  DeleteSupervisorInput: DeleteSupervisorInput;
  DeletedCoordinator: DeletedCoordinator;
  DeletedOrganisation: DeletedOrganisation;
  DeletedStudent: DeletedStudent;
  DeletedSupervisor: DeletedSupervisor;
  Duration: Scalars['Duration'];
  Eligibility: Eligibility;
  EligibleInput: EligibleInput;
  EmailAddress: Scalars['EmailAddress'];
  GUID: Scalars['GUID'];
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  HexColorCode: Scalars['HexColorCode'];
  Hexadecimal: Scalars['Hexadecimal'];
  IBAN: Scalars['IBAN'];
  ID: Scalars['ID'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  Latitude: Scalars['Latitude'];
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Locale: Scalars['Locale'];
  Logbook: Logbook;
  LoginInput: LoginInput;
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  ObjectID: Scalars['ObjectID'];
  Organisation: Organisation;
  OrganisationInput: OrganisationInput;
  PhoneNumber: Scalars['PhoneNumber'];
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  RegisteredAdmin: RegisteredAdmin;
  RegisteredCoordinator: RegisteredCoordinator;
  RegisteredOrganisation: RegisteredOrganisation;
  RegisteredStudent: RegisteredStudent;
  RegisteredSupervisor: RegisteredSupervisor;
  ReturnRegisteredAdmin: ReturnRegisteredAdmin;
  ReturnRegisteredBlogPost: ReturnRegisteredBlogPost;
  ReturnRegisteredCoordinator: ReturnRegisteredCoordinator;
  ReturnRegisteredEligible: ReturnRegisteredEligible;
  ReturnRegisteredOrganisation: ReturnRegisteredOrganisation;
  ReturnRegisteredStudent: ReturnRegisteredStudent;
  ReturnRegisteredSupervisor: ReturnRegisteredSupervisor;
  RoutingNumber: Scalars['RoutingNumber'];
  SafeInt: Scalars['SafeInt'];
  String: Scalars['String'];
  Student: Student;
  StudentInput: StudentInput;
  Supervisor: Supervisor;
  SupervisorInput: SupervisorInput;
  Time: Scalars['Time'];
  TimeZone: Scalars['TimeZone'];
  Timestamp: Scalars['Timestamp'];
  Token: ResolversParentTypes['ReturnRegisteredAdmin'] | ResolversParentTypes['ReturnRegisteredCoordinator'] | ResolversParentTypes['ReturnRegisteredOrganisation'] | ResolversParentTypes['ReturnRegisteredStudent'] | ResolversParentTypes['ReturnRegisteredSupervisor'];
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  UpdateCoordinatorInput: UpdateCoordinatorInput;
  UpdateOrganisationInput: UpdateOrganisationInput;
  UpdateStudentInput: UpdateStudentInput;
  UpdateSupervisorInput: UpdateSupervisorInput;
  Upload: Scalars['Upload'];
  UploadResponse: UploadResponse;
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
};

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type AdminResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlogResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type ChangePswResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ChangePswResponse'] = ResolversParentTypes['ChangePswResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Coordinator'] = ResolversParentTypes['Coordinator']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  students?: Resolver<Maybe<Array<Maybe<ResolversTypes['Student']>>>, ParentType, ContextType>;
  supervisors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Supervisor']>>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeletedCoordinatorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeletedCoordinator'] = ResolversParentTypes['DeletedCoordinator']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletedOrganisationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeletedOrganisation'] = ResolversParentTypes['DeletedOrganisation']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sector?: Resolver<Maybe<ResolversTypes['Sector']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletedStudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeletedStudent'] = ResolversParentTypes['DeletedStudent']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletedSupervisorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeletedSupervisor'] = ResolversParentTypes['DeletedSupervisor']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export type EligibilityResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Eligibility'] = ResolversParentTypes['Eligibility']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supervisor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export type LogbookResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Logbook'] = ResolversParentTypes['Logbook']> = {
  approved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  day?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  diagram?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  admin?: Resolver<Maybe<ResolversTypes['ReturnRegisteredAdmin']>, ParentType, ContextType, RequireFields<MutationAdminArgs, 'registerInput'>>;
  blogPost?: Resolver<Maybe<ResolversTypes['ReturnRegisteredBlogPost']>, ParentType, ContextType, RequireFields<MutationBlogPostArgs, 'registerInput'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['ChangePswResponse']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  coordinator?: Resolver<Maybe<ResolversTypes['ReturnRegisteredCoordinator']>, ParentType, ContextType, RequireFields<MutationCoordinatorArgs, 'registerInput'>>;
  deleteAvatar?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, RequireFields<MutationDeleteAvatarArgs, 'deleteInput'>>;
  deleteCoordinator?: Resolver<Maybe<ResolversTypes['DeletedCoordinator']>, ParentType, ContextType, RequireFields<MutationDeleteCoordinatorArgs, 'emailInput'>>;
  deleteOrganisation?: Resolver<Maybe<ResolversTypes['DeletedOrganisation']>, ParentType, ContextType, RequireFields<MutationDeleteOrganisationArgs, 'emailInput'>>;
  deleteStudent?: Resolver<Maybe<ResolversTypes['DeletedStudent']>, ParentType, ContextType, RequireFields<MutationDeleteStudentArgs, 'emailInput'>>;
  deleteSupervisor?: Resolver<Maybe<ResolversTypes['DeletedSupervisor']>, ParentType, ContextType, RequireFields<MutationDeleteSupervisorArgs, 'emailInput'>>;
  eligible?: Resolver<Maybe<ResolversTypes['ReturnRegisteredEligible']>, ParentType, ContextType, RequireFields<MutationEligibleArgs, 'registerInput'>>;
  organisation?: Resolver<Maybe<ResolversTypes['ReturnRegisteredOrganisation']>, ParentType, ContextType, RequireFields<MutationOrganisationArgs, 'registerInput'>>;
  student?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStudent']>, ParentType, ContextType, RequireFields<MutationStudentArgs, 'registerInput'>>;
  supervisor?: Resolver<Maybe<ResolversTypes['ReturnRegisteredSupervisor']>, ParentType, ContextType, RequireFields<MutationSupervisorArgs, 'registerInput'>>;
  updateAvatar?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, RequireFields<MutationUpdateAvatarArgs, 'updateInput'>>;
  updateCoordinator?: Resolver<Maybe<ResolversTypes['ReturnRegisteredCoordinator']>, ParentType, ContextType, RequireFields<MutationUpdateCoordinatorArgs, 'updateInput'>>;
  updateOrganisation?: Resolver<Maybe<ResolversTypes['ReturnRegisteredOrganisation']>, ParentType, ContextType, RequireFields<MutationUpdateOrganisationArgs, 'updateInput'>>;
  updateStudent?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStudent']>, ParentType, ContextType, RequireFields<MutationUpdateStudentArgs, 'updateInput'>>;
  updateSupervisor?: Resolver<Maybe<ResolversTypes['ReturnRegisteredSupervisor']>, ParentType, ContextType, RequireFields<MutationUpdateSupervisorArgs, 'updateInput'>>;
  uploadAvatar?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, RequireFields<MutationUploadAvatarArgs, 'file'>>;
  uploadDiagram?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, Partial<MutationUploadDiagramArgs>>;
};

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type OrganisationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employees?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sector?: Resolver<Maybe<ResolversTypes['Sector']>, ParentType, ContextType>;
  students?: Resolver<Maybe<Array<Maybe<ResolversTypes['Student']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  blog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<QueryBlogArgs, 'id'>>;
  blogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Blog']>>>, ParentType, ContextType>;
  coordinator?: Resolver<Maybe<ResolversTypes['Coordinator']>, ParentType, ContextType, RequireFields<QueryCoordinatorArgs, 'id'>>;
  coordinators?: Resolver<Maybe<Array<Maybe<ResolversTypes['Coordinator']>>>, ParentType, ContextType>;
  eligible?: Resolver<Maybe<ResolversTypes['Eligibility']>, ParentType, ContextType, RequireFields<QueryEligibleArgs, 'id'>>;
  eligibles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Eligibility']>>>, ParentType, ContextType>;
  logbook?: Resolver<Maybe<ResolversTypes['Logbook']>, ParentType, ContextType, RequireFields<QueryLogbookArgs, 'id'>>;
  logbooks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Logbook']>>>, ParentType, ContextType>;
  loginAdmin?: Resolver<Maybe<ResolversTypes['ReturnRegisteredAdmin']>, ParentType, ContextType, Partial<QueryLoginAdminArgs>>;
  loginCoordinator?: Resolver<Maybe<ResolversTypes['ReturnRegisteredCoordinator']>, ParentType, ContextType, Partial<QueryLoginCoordinatorArgs>>;
  loginOrganisation?: Resolver<Maybe<ResolversTypes['ReturnRegisteredOrganisation']>, ParentType, ContextType, Partial<QueryLoginOrganisationArgs>>;
  loginStudent?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStudent']>, ParentType, ContextType, Partial<QueryLoginStudentArgs>>;
  loginSupervisor?: Resolver<Maybe<ResolversTypes['ReturnRegisteredSupervisor']>, ParentType, ContextType, Partial<QueryLoginSupervisorArgs>>;
  organisation?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationArgs, 'id'>>;
  organisations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organisation']>>>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentArgs, 'id'>>;
  students?: Resolver<Maybe<Array<Maybe<ResolversTypes['Student']>>>, ParentType, ContextType>;
  supervisor?: Resolver<Maybe<ResolversTypes['Supervisor']>, ParentType, ContextType, RequireFields<QuerySupervisorArgs, 'id'>>;
  supervisors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Supervisor']>>>, ParentType, ContextType>;
};

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export type RegisteredAdminResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredAdmin'] = ResolversParentTypes['RegisteredAdmin']> = {
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredCoordinatorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredCoordinator'] = ResolversParentTypes['RegisteredCoordinator']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredOrganisationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredOrganisation'] = ResolversParentTypes['RegisteredOrganisation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employees?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sector?: Resolver<Maybe<ResolversTypes['Sector']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredStudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredStudent'] = ResolversParentTypes['RegisteredStudent']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredSupervisorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredSupervisor'] = ResolversParentTypes['RegisteredSupervisor']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredAdminResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredAdmin'] = ResolversParentTypes['ReturnRegisteredAdmin']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['RegisteredAdmin'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredBlogPostResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredBlogPost'] = ResolversParentTypes['ReturnRegisteredBlogPost']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredCoordinatorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredCoordinator'] = ResolversParentTypes['ReturnRegisteredCoordinator']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  coordinator?: Resolver<ResolversTypes['RegisteredCoordinator'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredEligibleResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredEligible'] = ResolversParentTypes['ReturnRegisteredEligible']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredOrganisationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredOrganisation'] = ResolversParentTypes['ReturnRegisteredOrganisation']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['RegisteredOrganisation'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredStudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredStudent'] = ResolversParentTypes['ReturnRegisteredStudent']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  student?: Resolver<ResolversTypes['RegisteredStudent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredSupervisorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredSupervisor'] = ResolversParentTypes['ReturnRegisteredSupervisor']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  supervisor?: Resolver<ResolversTypes['RegisteredSupervisor'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type StudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinator?: Resolver<Maybe<ResolversTypes['Coordinator']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  logbooks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Logbook']>>>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organisation?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supervisor?: Resolver<Maybe<ResolversTypes['Supervisor']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupervisorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Supervisor'] = ResolversParentTypes['Supervisor']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinator?: Resolver<Maybe<ResolversTypes['Coordinator']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  students?: Resolver<Maybe<Array<Maybe<ResolversTypes['Student']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokenResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  __resolveType: TypeResolveFn<'ReturnRegisteredAdmin' | 'ReturnRegisteredCoordinator' | 'ReturnRegisteredOrganisation' | 'ReturnRegisteredStudent' | 'ReturnRegisteredSupervisor', ParentType, ContextType>;
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UploadResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['UploadResponse'] = ResolversParentTypes['UploadResponse']> = {
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = IContext> = {
  AccountNumber?: GraphQLScalarType;
  Admin?: AdminResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Blog?: BlogResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  ChangePswResponse?: ChangePswResponseResolvers<ContextType>;
  Coordinator?: CoordinatorResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DeletedCoordinator?: DeletedCoordinatorResolvers<ContextType>;
  DeletedOrganisation?: DeletedOrganisationResolvers<ContextType>;
  DeletedStudent?: DeletedStudentResolvers<ContextType>;
  DeletedSupervisor?: DeletedSupervisorResolvers<ContextType>;
  Duration?: GraphQLScalarType;
  Eligibility?: EligibilityResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Logbook?: LogbookResolvers<ContextType>;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  Organisation?: OrganisationResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RegisteredAdmin?: RegisteredAdminResolvers<ContextType>;
  RegisteredCoordinator?: RegisteredCoordinatorResolvers<ContextType>;
  RegisteredOrganisation?: RegisteredOrganisationResolvers<ContextType>;
  RegisteredStudent?: RegisteredStudentResolvers<ContextType>;
  RegisteredSupervisor?: RegisteredSupervisorResolvers<ContextType>;
  ReturnRegisteredAdmin?: ReturnRegisteredAdminResolvers<ContextType>;
  ReturnRegisteredBlogPost?: ReturnRegisteredBlogPostResolvers<ContextType>;
  ReturnRegisteredCoordinator?: ReturnRegisteredCoordinatorResolvers<ContextType>;
  ReturnRegisteredEligible?: ReturnRegisteredEligibleResolvers<ContextType>;
  ReturnRegisteredOrganisation?: ReturnRegisteredOrganisationResolvers<ContextType>;
  ReturnRegisteredStudent?: ReturnRegisteredStudentResolvers<ContextType>;
  ReturnRegisteredSupervisor?: ReturnRegisteredSupervisorResolvers<ContextType>;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  Student?: StudentResolvers<ContextType>;
  Supervisor?: SupervisorResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  UploadResponse?: UploadResponseResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};

