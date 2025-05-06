/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Assembly {
  definedTypes?: TypeInfo[];
  exportedTypes?: Type[];
  /** @deprecated */
  codeBase?: string | null;
  entryPoint?: MethodInfo;
  fullName?: string | null;
  imageRuntimeVersion?: string;
  isDynamic?: boolean;
  location?: string;
  reflectionOnly?: boolean;
  isCollectible?: boolean;
  isFullyTrusted?: boolean;
  customAttributes?: CustomAttributeData[];
  /** @deprecated */
  escapedCodeBase?: string;
  manifestModule?: Module;
  modules?: Module[];
  /** @deprecated */
  globalAssemblyCache?: boolean;
  /** @format int64 */
  hostContext?: number;
  securityRuleSet?: SecurityRuleSet;
}

/** @format string */
export enum CallingConventions {
  Standard = 'Standard',
  VarArgs = 'VarArgs',
  Any = 'Any',
  HasThis = 'HasThis',
  ExplicitThis = 'ExplicitThis',
}

export interface CheckoutCommand {
  returnUrl: string;
  productsIds: string[];
}

export interface CheckoutOutDto {
  clientSecret: string;
}

export interface CheckoutOutDtoRequestResult {
  message?: string;
  result: CheckoutOutDto;
}

export interface ConfirmEmailCommand {
  /** @format email */
  email: string;
  token: string;
}

export interface ConstructorInfo {
  name?: string;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
}

export interface ContactCommand {
  email: string;
  message: string;
}

export interface CustomAttributeData {
  attributeType?: Type;
  constructor?: ConstructorInfo;
  constructorArguments?: CustomAttributeTypedArgument[];
  namedArguments?: CustomAttributeNamedArgument[];
}

export interface CustomAttributeNamedArgument {
  memberInfo?: MemberInfo;
  typedValue?: CustomAttributeTypedArgument;
  memberName?: string;
  isField?: boolean;
}

export interface CustomAttributeTypedArgument {
  argumentType?: Type;
  value?: any;
}

/** @format string */
export enum Difficulty {
  VeryEasy = 'VeryEasy',
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  VeryHard = 'VeryHard',
}

/** @format string */
export enum EventAttributes {
  None = 'None',
  SpecialName = 'SpecialName',
  RTSpecialName = 'RTSpecialName',
  ReservedMask = 'ReservedMask',
}

export interface EventInfo {
  name?: string;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: EventAttributes;
  isSpecialName?: boolean;
  addMethod?: MethodInfo;
  removeMethod?: MethodInfo;
  raiseMethod?: MethodInfo;
  isMulticast?: boolean;
  eventHandlerType?: Type;
}

export interface Exception {
  targetSite?: MethodBase;
  message?: string;
  data?: Record<string, any>;
  innerException?: Exception;
  helpLink?: string | null;
  source?: string | null;
  /** @format int32 */
  hResult?: number;
  stackTrace?: string | null;
}

/** @format string */
export enum FieldAttributes {
  FieldAccessMask = 'FieldAccessMask',
  PrivateScope = 'PrivateScope',
  Private = 'Private',
  FamANDAssem = 'FamANDAssem',
  Assembly = 'Assembly',
  Family = 'Family',
  FamORAssem = 'FamORAssem',
  Public = 'Public',
  Static = 'Static',
  InitOnly = 'InitOnly',
  Literal = 'Literal',
  NotSerialized = 'NotSerialized',
  SpecialName = 'SpecialName',
  PinvokeImpl = 'PinvokeImpl',
  RTSpecialName = 'RTSpecialName',
  HasFieldMarshal = 'HasFieldMarshal',
  HasDefault = 'HasDefault',
  HasFieldRVA = 'HasFieldRVA',
  ReservedMask = 'ReservedMask',
}

export interface FieldInfo {
  name?: string;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: FieldAttributes;
  fieldType?: Type;
  isInitOnly?: boolean;
  isLiteral?: boolean;
  /** @deprecated */
  isNotSerialized?: boolean;
  isPinvokeImpl?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  fieldHandle?: RuntimeFieldHandle;
}

export interface ForgotPasswordCommand {
  /** @format email */
  email: string;
}

/** @format string */
export enum GenericParameterAttributes {
  None = 'None',
  VarianceMask = 'VarianceMask',
  Covariant = 'Covariant',
  Contravariant = 'Contravariant',
  SpecialConstraintMask = 'SpecialConstraintMask',
  ReferenceTypeConstraint = 'ReferenceTypeConstraint',
  NotNullableValueTypeConstraint = 'NotNullableValueTypeConstraint',
  DefaultConstructorConstraint = 'DefaultConstructorConstraint',
  AllowByRefLike = 'AllowByRefLike',
}

export interface GetFaqDto {
  question: string;
  answer: string;
}

export interface GetFaqDtoRequestResult {
  message?: string;
  result: GetFaqDto;
}

export interface GetInvoicesDto {
  /** @format uuid */
  id: string;
  /** @format double */
  amount: number;
  /** @format date-time */
  createdOn: string;
  receiptUrl: string;
}

export interface GetInvoicesDtoArrayRequestResult {
  message?: string;
  result: GetInvoicesDto[];
}

export interface GetProductDto {
  /** @format uuid */
  id: string;
  /** @minLength 1 */
  productCode: string;
  /** @minLength 1 */
  title: string;
  /** @minLength 1 */
  subtitle: string;
  /** @minLength 1 */
  description: string;
  /** @format int32 */
  nbPlayerMin: number;
  /** @format int32 */
  nbPlayerMax: number;
  /** @format double */
  price: number;
  /** @minLength 1 */
  duration: string;
  images: string[];
  difficulty: Difficulty;
  productType: ProductType;
}

export interface GetProductDtoArrayRequestResult {
  message?: string;
  result: GetProductDto[];
}

export interface GetProductDtoRequestResult {
  message?: string;
  result: GetProductDto;
}

export interface GetUserDto {
  email: string;
  firstname?: string | null;
  lastname?: string | null;
  address?: string | null;
  complementaryAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
  marketingEmail?: boolean;
}

export interface GetUserDtoRequestResult {
  message?: string;
  result: GetUserDto;
}

export interface GetUserGamesDto {
  products: GetProductDto[];
}

export interface GetUserGamesDtoRequestResult {
  message?: string;
  result: GetUserGamesDto;
}

export interface HealthReport {
  entries?: Record<string, HealthReportEntry>;
  status?: HealthStatus;
  /** @format date-span */
  totalDuration?: string;
}

export interface HealthReportEntry {
  data?: Record<string, any>;
  description?: string | null;
  /** @format date-span */
  duration?: string;
  exception?: Exception;
  status?: HealthStatus;
  tags?: string[];
}

/** @format string */
export enum HealthStatus {
  Unhealthy = 'Unhealthy',
  Degraded = 'Degraded',
  Healthy = 'Healthy',
}

export type ICustomAttributeProvider = object;

export type IntPtr = object;

/** @format string */
export enum LayoutKind {
  Sequential = 'Sequential',
  Explicit = 'Explicit',
  Auto = 'Auto',
}

export interface MemberInfo {
  memberType?: MemberTypes;
  name?: string;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
}

/** @format string */
export enum MemberTypes {
  Constructor = 'Constructor',
  Event = 'Event',
  Field = 'Field',
  Method = 'Method',
  Property = 'Property',
  TypeInfo = 'TypeInfo',
  Custom = 'Custom',
  NestedType = 'NestedType',
  All = 'All',
}

/** @format string */
export enum MethodAttributes {
  MemberAccessMask = 'MemberAccessMask',
  PrivateScope = 'PrivateScope',
  Private = 'Private',
  FamANDAssem = 'FamANDAssem',
  Assembly = 'Assembly',
  Family = 'Family',
  FamORAssem = 'FamORAssem',
  Public = 'Public',
  Static = 'Static',
  Final = 'Final',
  Virtual = 'Virtual',
  HideBySig = 'HideBySig',
  CheckAccessOnOverride = 'CheckAccessOnOverride',
  VtableLayoutMask = 'VtableLayoutMask',
  ReuseSlot = 'ReuseSlot',
  NewSlot = 'NewSlot',
  Abstract = 'Abstract',
  SpecialName = 'SpecialName',
  PinvokeImpl = 'PinvokeImpl',
  UnmanagedExport = 'UnmanagedExport',
  RTSpecialName = 'RTSpecialName',
  HasSecurity = 'HasSecurity',
  RequireSecObject = 'RequireSecObject',
  ReservedMask = 'ReservedMask',
}

export interface MethodBase {
  memberType?: MemberTypes;
  name?: string;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
}

/** @format string */
export enum MethodImplAttributes {
  CodeTypeMask = 'CodeTypeMask',
  IL = 'IL',
  Native = 'Native',
  OPTIL = 'OPTIL',
  Runtime = 'Runtime',
  ManagedMask = 'ManagedMask',
  Unmanaged = 'Unmanaged',
  Managed = 'Managed',
  ForwardRef = 'ForwardRef',
  PreserveSig = 'PreserveSig',
  InternalCall = 'InternalCall',
  Synchronized = 'Synchronized',
  NoInlining = 'NoInlining',
  AggressiveInlining = 'AggressiveInlining',
  NoOptimization = 'NoOptimization',
  AggressiveOptimization = 'AggressiveOptimization',
  MaxMethodImplVal = 'MaxMethodImplVal',
}

export interface MethodInfo {
  name?: string;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
  returnParameter?: ParameterInfo;
  returnType?: Type;
  returnTypeCustomAttributes?: ICustomAttributeProvider;
}

export interface Module {
  assembly?: Assembly;
  fullyQualifiedName?: string;
  name?: string;
  /** @format int32 */
  mdStreamVersion?: number;
  /** @format uuid */
  moduleVersionId?: string;
  scopeName?: string;
  moduleHandle?: ModuleHandle;
  customAttributes?: CustomAttributeData[];
  /** @format int32 */
  metadataToken?: number;
}

export interface ModuleHandle {
  /** @format int32 */
  mdStreamVersion?: number;
}

/** @format string */
export enum ParameterAttributes {
  None = 'None',
  In = 'In',
  Out = 'Out',
  Lcid = 'Lcid',
  Retval = 'Retval',
  Optional = 'Optional',
  HasDefault = 'HasDefault',
  HasFieldMarshal = 'HasFieldMarshal',
  Reserved3 = 'Reserved3',
  Reserved4 = 'Reserved4',
  ReservedMask = 'ReservedMask',
}

export interface ParameterInfo {
  attributes?: ParameterAttributes;
  member?: MemberInfo;
  name?: string | null;
  parameterType?: Type;
  /** @format int32 */
  position?: number;
  isIn?: boolean;
  isLcid?: boolean;
  isOptional?: boolean;
  isOut?: boolean;
  isRetval?: boolean;
  defaultValue?: any;
  rawDefaultValue?: any;
  hasDefaultValue?: boolean;
  customAttributes?: CustomAttributeData[];
  /** @format int32 */
  metadataToken?: number;
}

/** @format string */
export enum ProductType {
  MurderParty = 'MurderParty',
}

/** @format string */
export enum PropertyAttributes {
  None = 'None',
  SpecialName = 'SpecialName',
  RTSpecialName = 'RTSpecialName',
  HasDefault = 'HasDefault',
  Reserved2 = 'Reserved2',
  Reserved3 = 'Reserved3',
  Reserved4 = 'Reserved4',
  ReservedMask = 'ReservedMask',
}

export interface PropertyInfo {
  name?: string;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  propertyType?: Type;
  attributes?: PropertyAttributes;
  isSpecialName?: boolean;
  canRead?: boolean;
  canWrite?: boolean;
  getMethod?: MethodInfo;
  setMethod?: MethodInfo;
}

export interface RequestResult {
  message?: string;
}

export interface ResetPasswordCommand {
  token: string;
  /** @format email */
  email: string;
  password: string;
}

export interface RuntimeFieldHandle {
  value?: IntPtr;
}

export interface RuntimeMethodHandle {
  value?: IntPtr;
}

export interface RuntimeTypeHandle {
  value?: IntPtr;
}

/** @format string */
export enum SecurityRuleSet {
  None = 'None',
  Level1 = 'Level1',
  Level2 = 'Level2',
}

export interface SignInDto {
  token: string;
  /** @format date-time */
  expirationDate?: string;
}

export interface SignInDtoRequestResult {
  message?: string;
  result: SignInDto;
}

export interface SignInQuery {
  email: string;
  password: string;
}

export interface SignUpCommand {
  /** @format email */
  email: string;
  password: string;
  marketingEmail: boolean;
}

export interface StructLayoutAttribute {
  typeId?: any;
  value?: LayoutKind;
}

export interface Type {
  name?: string;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly;
  module?: Module;
  isInterface?: boolean;
  isNested?: boolean;
  declaringType?: Type;
  declaringMethod?: MethodBase;
  reflectedType?: Type;
  underlyingSystemType?: Type;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[];
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute;
  typeInitializer?: ConstructorInfo;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
}

/** @format string */
export enum TypeAttributes {
  VisibilityMask = 'VisibilityMask',
  NotPublic = 'NotPublic',
  Public = 'Public',
  NestedPublic = 'NestedPublic',
  NestedPrivate = 'NestedPrivate',
  NestedFamily = 'NestedFamily',
  NestedAssembly = 'NestedAssembly',
  NestedFamANDAssem = 'NestedFamANDAssem',
  NestedFamORAssem = 'NestedFamORAssem',
  LayoutMask = 'LayoutMask',
  AutoLayout = 'AutoLayout',
  SequentialLayout = 'SequentialLayout',
  ExplicitLayout = 'ExplicitLayout',
  ClassSemanticsMask = 'ClassSemanticsMask',
  Class = 'Class',
  Interface = 'Interface',
  Abstract = 'Abstract',
  Sealed = 'Sealed',
  SpecialName = 'SpecialName',
  Import = 'Import',
  Serializable = 'Serializable',
  WindowsRuntime = 'WindowsRuntime',
  StringFormatMask = 'StringFormatMask',
  AnsiClass = 'AnsiClass',
  UnicodeClass = 'UnicodeClass',
  AutoClass = 'AutoClass',
  CustomFormatClass = 'CustomFormatClass',
  CustomFormatMask = 'CustomFormatMask',
  BeforeFieldInit = 'BeforeFieldInit',
  RTSpecialName = 'RTSpecialName',
  HasSecurity = 'HasSecurity',
  ReservedMask = 'ReservedMask',
}

export interface TypeInfo {
  name?: string;
  customAttributes?: CustomAttributeData[];
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly;
  module?: Module;
  isInterface?: boolean;
  isNested?: boolean;
  declaringType?: Type;
  declaringMethod?: MethodBase;
  reflectedType?: Type;
  underlyingSystemType?: Type;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[];
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute;
  typeInitializer?: ConstructorInfo;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
  genericTypeParameters?: Type[];
  declaredConstructors?: ConstructorInfo[];
  declaredEvents?: EventInfo[];
  declaredFields?: FieldInfo[];
  declaredMembers?: MemberInfo[];
  declaredMethods?: MethodInfo[];
  declaredNestedTypes?: TypeInfo[];
  declaredProperties?: PropertyInfo[];
  implementedInterfaces?: Type[];
}

export interface UpdateUserCommand {
  /** @format email */
  newEmail: string;
  password?: string | null;
  /** @maxLength 35 */
  firstname?: string | null;
  /** @maxLength 35 */
  lastname?: string | null;
  /** @maxLength 255 */
  address?: string | null;
  /** @maxLength 255 */
  complementaryAddress?: string | null;
  /** @maxLength 12 */
  postalCode?: string | null;
  /** @maxLength 255 */
  city?: string | null;
  /** @maxLength 2 */
  country?: string | null;
  marketingEmail?: boolean;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title MurderParty.Api
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  authenticate = {
    /**
     * No description
     *
     * @tags Authenticate
     * @name SignUp
     * @request POST:/Authenticate/SignUp
     */
    signUp: (data: SignUpCommand, params: RequestParams = {}) =>
      this.request<SignInDtoRequestResult, SignInDtoRequestResult>({
        path: `/Authenticate/SignUp`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name ConfirmEmail
     * @request POST:/Authenticate/ConfirmEmail
     */
    confirmEmail: (data: ConfirmEmailCommand, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Authenticate/ConfirmEmail`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name SignIn
     * @request POST:/Authenticate/SignIn
     */
    signIn: (data: SignInQuery, params: RequestParams = {}) =>
      this.request<SignInDtoRequestResult, SignInDtoRequestResult>({
        path: `/Authenticate/SignIn`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name ForgotPassword
     * @request POST:/Authenticate/ForgotPassword
     */
    forgotPassword: (data: ForgotPasswordCommand, params: RequestParams = {}) =>
      this.request<SignInDtoRequestResult, any>({
        path: `/Authenticate/ForgotPassword`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name ResetPassword
     * @request POST:/Authenticate/ResetPassword
     */
    resetPassword: (data: ResetPasswordCommand, params: RequestParams = {}) =>
      this.request<RequestResult, any>({
        path: `/Authenticate/ResetPassword`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name Me
     * @request GET:/Authenticate/Me
     * @secure
     */
    me: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Authenticate/Me`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name SignOut
     * @request POST:/Authenticate/SignOut
     * @secure
     */
    signOut: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Authenticate/SignOut`,
        method: 'POST',
        secure: true,
        ...params,
      }),
  };
  contact = {
    /**
     * No description
     *
     * @tags Contact
     * @name Contact
     * @request POST:/Contact
     */
    contact: (data: ContactCommand, params: RequestParams = {}) =>
      this.request<RequestResult, RequestResult>({
        path: `/Contact`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  faq = {
    /**
     * No description
     *
     * @tags Faq
     * @name GetFaq
     * @request GET:/Faq/{lang}
     */
    getFaq: (lang: string, params: RequestParams = {}) =>
      this.request<GetFaqDtoRequestResult, any>({
        path: `/Faq/${lang}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  healthCheck = {
    /**
     * No description
     *
     * @tags HealthCheck
     * @name HealthCheck
     * @request GET:/HealthCheck
     */
    healthCheck: (params: RequestParams = {}) =>
      this.request<HealthReport, HealthReport>({
        path: `/HealthCheck`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  invoice = {
    /**
     * No description
     *
     * @tags Invoice
     * @name GetInvoicesByUserId
     * @request GET:/Invoice/ByUserId
     * @secure
     */
    getInvoicesByUserId: (params: RequestParams = {}) =>
      this.request<GetInvoicesDtoArrayRequestResult, any>({
        path: `/Invoice/ByUserId`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  product = {
    /**
     * No description
     *
     * @tags Product
     * @name GetProduct
     * @request GET:/Product/{productCode}
     */
    getProduct: (productCode: string, params: RequestParams = {}) =>
      this.request<GetProductDtoRequestResult, any>({
        path: `/Product/${productCode}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name GetProducts
     * @request GET:/Product/{productType}/All
     */
    getProducts: (productType: ProductType, params: RequestParams = {}) =>
      this.request<GetProductDtoArrayRequestResult, any>({
        path: `/Product/${productType}/All`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name GetProductsByIds
     * @request POST:/Product/ByIds
     */
    getProductsByIds: (data: string[], params: RequestParams = {}) =>
      this.request<GetProductDtoArrayRequestResult, any>({
        path: `/Product/ByIds`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  stripe = {
    /**
     * No description
     *
     * @tags Stripe
     * @name Checkout
     * @request POST:/Stripe/Checkout
     * @secure
     */
    checkout: (data: CheckoutCommand, params: RequestParams = {}) =>
      this.request<CheckoutOutDtoRequestResult, any>({
        path: `/Stripe/Checkout`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stripe
     * @name StripeCreate
     * @request POST:/Stripe
     */
    stripeCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Stripe`,
        method: 'POST',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name GetUser
     * @request GET:/User
     * @secure
     */
    getUser: (params: RequestParams = {}) =>
      this.request<GetUserDtoRequestResult, any>({
        path: `/User`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UpdateUser
     * @request PUT:/User
     * @secure
     */
    updateUser: (data: UpdateUserCommand, params: RequestParams = {}) =>
      this.request<RequestResult, any>({
        path: `/User`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetUserGames
     * @request GET:/User/games
     * @secure
     */
    getUserGames: (params: RequestParams = {}) =>
      this.request<GetUserGamesDtoRequestResult, any>({
        path: `/User/games`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
