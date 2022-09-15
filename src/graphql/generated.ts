import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Cuid: any;
  Currency: any;
  DID: any;
  Date: any;
  DateTime: Date;
  Duration: any;
  EmailAddress: any;
  GUID: any;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: string;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  RoutingNumber: any;
  SafeInt: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: string;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
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
  avatar?: InputMaybe<Scalars['URL']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  user?: InputMaybe<User>;
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
  content?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['URL']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Coordinator = {
  __typename?: 'Coordinator';
  avatar?: Maybe<Scalars['URL']>;
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
  user?: Maybe<User>;
};

export type CoordinatorInput = {
  avatar?: InputMaybe<Scalars['URL']>;
  department?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  institute?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  staffID?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<User>;
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
  department?: InputMaybe<Scalars['String']>;
  institute?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Level>;
  matricNo?: InputMaybe<Scalars['String']>;
  supervisor?: InputMaybe<Scalars['String']>;
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
  coordinator?: Maybe<ReturnRegisteredCoordinator>;
  eligible?: Maybe<ReturnRegisteredEligible>;
  organisation?: Maybe<ReturnRegisteredOrganisation>;
  student?: Maybe<ReturnRegisteredStudent>;
  supervisor?: Maybe<ReturnRegisteredSupervisor>;
};


export type MutationAdminArgs = {
  registeredInput: AdminInput;
};


export type MutationBlogPostArgs = {
  registeredInput: BlogPostInput;
};


export type MutationCoordinatorArgs = {
  registeredInput: CoordinatorInput;
};


export type MutationEligibleArgs = {
  registeredInput: EligibleInput;
};


export type MutationOrganisationArgs = {
  registeredInput: OrganisationInput;
};


export type MutationStudentArgs = {
  registeredInput: StudentInput;
};


export type MutationSupervisorArgs = {
  registeredInput: SupervisorInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  employees?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  joinedDate?: Maybe<Scalars['DateTime']>;
  logo?: Maybe<Scalars['URL']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  sector?: Maybe<Sector>;
  user?: Maybe<User>;
};

export type OrganisationInput = {
  address?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  employees?: InputMaybe<Scalars['Int']>;
  logo?: InputMaybe<Scalars['URL']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  sector?: InputMaybe<Sector>;
  user?: InputMaybe<User>;
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
  avatar?: Maybe<Scalars['URL']>;
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
  logo?: Maybe<Scalars['URL']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  sector?: Maybe<Sector>;
  user?: Maybe<User>;
};

export type RegisteredStudent = {
  __typename?: 'RegisteredStudent';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['URL']>;
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
  avatar?: Maybe<Scalars['URL']>;
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
  refreshToken: Scalars['JWT'];
};

export type ReturnRegisteredEligible = {
  __typename?: 'ReturnRegisteredEligible';
  message?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
};

export type ReturnRegisteredOrganisation = Token & {
  __typename?: 'ReturnRegisteredOrganisation';
  accessToken: Scalars['JWT'];
  organisation: RegisteredOrganisation;
  refreshToken: Scalars['JWT'];
};

export type ReturnRegisteredStudent = Token & {
  __typename?: 'ReturnRegisteredStudent';
  accessToken: Scalars['JWT'];
  refreshToken: Scalars['JWT'];
  student: RegisteredStudent;
};

export type ReturnRegisteredSupervisor = Token & {
  __typename?: 'ReturnRegisteredSupervisor';
  accessToken: Scalars['JWT'];
  refreshToken: Scalars['JWT'];
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
  avatar?: Maybe<Scalars['URL']>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  institute?: Maybe<Scalars['String']>;
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
  logbooks?: Maybe<Array<Logbook>>;
  matricNo?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  user: User;
};

export type StudentInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['URL']>;
  department?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  institute?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Level>;
  matricNo?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  place?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<User>;
};

export type Supervisor = {
  __typename?: 'Supervisor';
  avatar?: Maybe<Scalars['URL']>;
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
  user?: Maybe<User>;
};

export type SupervisorInput = {
  avatar?: InputMaybe<Scalars['URL']>;
  department?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  institute?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  staffID?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<User>;
};

export type Token = {
  accessToken: Scalars['JWT'];
  refreshToken: Scalars['JWT'];
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
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Blog: ResolverTypeWrapper<Blog>;
  BlogPostInput: BlogPostInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  Coordinator: ResolverTypeWrapper<Coordinator>;
  CoordinatorInput: CoordinatorInput;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
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
  User: User;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountNumber: Scalars['AccountNumber'];
  Admin: Admin;
  AdminInput: AdminInput;
  BigInt: Scalars['BigInt'];
  Blog: Blog;
  BlogPostInput: BlogPostInput;
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  Coordinator: Coordinator;
  CoordinatorInput: CoordinatorInput;
  CountryCode: Scalars['CountryCode'];
  Cuid: Scalars['Cuid'];
  Currency: Scalars['Currency'];
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
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
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
};

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type AdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
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

export type BlogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = {
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

export type CoordinatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinator'] = ResolversParentTypes['Coordinator']> = {
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
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
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
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

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export type EligibilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Eligibility'] = ResolversParentTypes['Eligibility']> = {
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

export type LogbookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Logbook'] = ResolversParentTypes['Logbook']> = {
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

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  admin?: Resolver<Maybe<ResolversTypes['ReturnRegisteredAdmin']>, ParentType, ContextType, RequireFields<MutationAdminArgs, 'registeredInput'>>;
  blogPost?: Resolver<Maybe<ResolversTypes['ReturnRegisteredBlogPost']>, ParentType, ContextType, RequireFields<MutationBlogPostArgs, 'registeredInput'>>;
  coordinator?: Resolver<Maybe<ResolversTypes['ReturnRegisteredCoordinator']>, ParentType, ContextType, RequireFields<MutationCoordinatorArgs, 'registeredInput'>>;
  eligible?: Resolver<Maybe<ResolversTypes['ReturnRegisteredEligible']>, ParentType, ContextType, RequireFields<MutationEligibleArgs, 'registeredInput'>>;
  organisation?: Resolver<Maybe<ResolversTypes['ReturnRegisteredOrganisation']>, ParentType, ContextType, RequireFields<MutationOrganisationArgs, 'registeredInput'>>;
  student?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStudent']>, ParentType, ContextType, RequireFields<MutationStudentArgs, 'registeredInput'>>;
  supervisor?: Resolver<Maybe<ResolversTypes['ReturnRegisteredSupervisor']>, ParentType, ContextType, RequireFields<MutationSupervisorArgs, 'registeredInput'>>;
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

export type OrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employees?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sector?: Resolver<Maybe<ResolversTypes['Sector']>, ParentType, ContextType>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
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

export type RegisteredAdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteredAdmin'] = ResolversParentTypes['RegisteredAdmin']> = {
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredCoordinatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteredCoordinator'] = ResolversParentTypes['RegisteredCoordinator']> = {
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
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

export type RegisteredOrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteredOrganisation'] = ResolversParentTypes['RegisteredOrganisation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employees?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sector?: Resolver<Maybe<ResolversTypes['Sector']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredStudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteredStudent'] = ResolversParentTypes['RegisteredStudent']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
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

export type RegisteredSupervisorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisteredSupervisor'] = ResolversParentTypes['RegisteredSupervisor']> = {
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
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

export type ReturnRegisteredAdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnRegisteredAdmin'] = ResolversParentTypes['ReturnRegisteredAdmin']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['RegisteredAdmin'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredBlogPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnRegisteredBlogPost'] = ResolversParentTypes['ReturnRegisteredBlogPost']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredCoordinatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnRegisteredCoordinator'] = ResolversParentTypes['ReturnRegisteredCoordinator']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  coordinator?: Resolver<ResolversTypes['RegisteredCoordinator'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredEligibleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnRegisteredEligible'] = ResolversParentTypes['ReturnRegisteredEligible']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredOrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnRegisteredOrganisation'] = ResolversParentTypes['ReturnRegisteredOrganisation']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['RegisteredOrganisation'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredStudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnRegisteredStudent'] = ResolversParentTypes['ReturnRegisteredStudent']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  student?: Resolver<ResolversTypes['RegisteredStudent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredSupervisorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReturnRegisteredSupervisor'] = ResolversParentTypes['ReturnRegisteredSupervisor']> = {
  accessToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  supervisor?: Resolver<ResolversTypes['RegisteredSupervisor'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institute?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  logbooks?: Resolver<Maybe<Array<ResolversTypes['Logbook']>>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupervisorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Supervisor'] = ResolversParentTypes['Supervisor']> = {
  avatar?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
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

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
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

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = {
  AccountNumber?: GraphQLScalarType;
  Admin?: AdminResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Blog?: BlogResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  Coordinator?: CoordinatorResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
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
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};

