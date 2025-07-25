/* tslint:disable */
/* eslint-disable */
/**
 * Vikunja API
 * # Pagination Every endpoint capable of pagination will return two headers: * `x-pagination-total-pages`: The total number of available pages for this request * `x-pagination-result-count`: The number of items returned for this request. # Rights All endpoints which return a single item (project, task, etc.) - no array - will also return a `x-max-right` header with the max right the user has on this item as an int where `0` is `Read Only`, `1` is `Read & Write` and `2` is `Admin`. This can be used to show or hide ui elements based on the rights the user has. # Errors All errors have an error code and a human-readable error message in addition to the http status code. You should always check for the status code in the response, not only the http status code. Due to limitations in the swagger library we\'re using for this document, only one error per http status code is documented here. Make sure to check the [error docs](https://vikunja.io/docs/errors/) in Vikunja\'s documentation for a full list of available error codes. # Authorization **JWT-Auth:** Main authorization method, used for most of the requests. Needs `Authorization: Bearer <jwt-token>`-header to authenticate successfully.  **API Token:** You can create scoped API tokens for your user and use the token to make authenticated requests in the context of that user. The token must be provided via an `Authorization: Bearer <token>` header, similar to jwt auth. See the documentation for the `api` group to manage token creation and revocation.  **BasicAuth:** Only used when requesting tasks via CalDAV. <!-- ReDoc-Inject: <security-definitions> -->
 *
 * The version of the OpenAPI document: v0.24.1-1603-14e03d3a
 * Contact: hello@vikunja.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { CodeVikunjaIoApiPkgModulesAuthOpenidProvider } from './CodeVikunjaIoApiPkgModulesAuthOpenidProvider';
import {
    CodeVikunjaIoApiPkgModulesAuthOpenidProviderFromJSON,
    CodeVikunjaIoApiPkgModulesAuthOpenidProviderFromJSONTyped,
    CodeVikunjaIoApiPkgModulesAuthOpenidProviderToJSON,
    CodeVikunjaIoApiPkgModulesAuthOpenidProviderToJSONTyped,
} from './CodeVikunjaIoApiPkgModulesAuthOpenidProvider';

/**
 * 
 * @export
 * @interface V1OpenIDAuthInfo
 */
export interface V1OpenIDAuthInfo {
    /**
     * 
     * @type {boolean}
     * @memberof V1OpenIDAuthInfo
     */
    enabled?: boolean;
    /**
     * 
     * @type {Array<CodeVikunjaIoApiPkgModulesAuthOpenidProvider>}
     * @memberof V1OpenIDAuthInfo
     */
    providers?: Array<CodeVikunjaIoApiPkgModulesAuthOpenidProvider>;
}

/**
 * Check if a given object implements the V1OpenIDAuthInfo interface.
 */
export function instanceOfV1OpenIDAuthInfo(value: object): value is V1OpenIDAuthInfo {
    return true;
}

export function V1OpenIDAuthInfoFromJSON(json: any): V1OpenIDAuthInfo {
    return V1OpenIDAuthInfoFromJSONTyped(json, false);
}

export function V1OpenIDAuthInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1OpenIDAuthInfo {
    if (json == null) {
        return json;
    }
    return {
        
        'enabled': json['enabled'] == null ? undefined : json['enabled'],
        'providers': json['providers'] == null ? undefined : ((json['providers'] as Array<any>).map(CodeVikunjaIoApiPkgModulesAuthOpenidProviderFromJSON)),
    };
}

export function V1OpenIDAuthInfoToJSON(json: any): V1OpenIDAuthInfo {
    return V1OpenIDAuthInfoToJSONTyped(json, false);
}

export function V1OpenIDAuthInfoToJSONTyped(value?: V1OpenIDAuthInfo | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'enabled': value['enabled'],
        'providers': value['providers'] == null ? undefined : ((value['providers'] as Array<any>).map(CodeVikunjaIoApiPkgModulesAuthOpenidProviderToJSON)),
    };
}

