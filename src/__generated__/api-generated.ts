/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CheckoutOutDto {
  clientSecret: string;
}

export interface CheckoutOutDtoRequestResult {
  message?: string;
  result: CheckoutOutDto;
}

export interface CheckoutProductsCommand {
  productsIds: string[];
}

export interface ConfirmEmailCommand {
  email: string;
  token: string;
}

export interface ContactCommand {
  email: string;
  message: string;
}

/** @format string */
export enum Difficulty {
  VeryEasy = 'VeryEasy',
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  VeryHard = 'VeryHard',
}

export interface GetInvoicesResult {
  /** @format double */
  amount: number;
  /** @format date-time */
  createdOn: string;
  receiptUrl: string;
}

export interface GetInvoicesResultArrayRequestResult {
  message?: string;
  result: GetInvoicesResult[];
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

/** @format string */
export enum ProductType {
  MurderParty = 'MurderParty',
}

export interface RequestResult {
  message?: string;
}

export interface SignInCommand {
  email: string;
  password: string;
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

export interface SignUpCommand {
  email: string;
  password: string;
  marketingEmail: boolean;
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
    signIn: (data: SignInCommand, params: RequestParams = {}) =>
      this.request<SignInDtoRequestResult, SignInDtoRequestResult>({
        path: `/Authenticate/SignIn`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
      this.request<GetInvoicesResultArrayRequestResult, any>({
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
    checkout: (data: CheckoutProductsCommand, params: RequestParams = {}) =>
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
     * @name WebhookPaymentIntentSucceededCreate
     * @request POST:/Stripe/Webhook/PaymentIntent/Succeeded
     */
    webhookPaymentIntentSucceededCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Stripe/Webhook/PaymentIntent/Succeeded`,
        method: 'POST',
        ...params,
      }),
  };
}
