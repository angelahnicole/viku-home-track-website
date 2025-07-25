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
import type { ModelsRight } from './ModelsRight';
import {
    ModelsRightFromJSON,
    ModelsRightFromJSONTyped,
    ModelsRightToJSON,
    ModelsRightToJSONTyped,
} from './ModelsRight';

/**
 * 
 * @export
 * @interface ModelsUserWithRight
 */
export interface ModelsUserWithRight {
    /**
     * A timestamp when this task was created. You cannot change this value.
     * @type {string}
     * @memberof ModelsUserWithRight
     */
    created?: string;
    /**
     * The user's email address.
     * @type {string}
     * @memberof ModelsUserWithRight
     */
    email?: string;
    /**
     * The unique, numeric id of this user.
     * @type {number}
     * @memberof ModelsUserWithRight
     */
    id?: number;
    /**
     * The full name of the user.
     * @type {string}
     * @memberof ModelsUserWithRight
     */
    name?: string;
    /**
     * 
     * @type {ModelsRight}
     * @memberof ModelsUserWithRight
     */
    right?: ModelsRight;
    /**
     * A timestamp when this task was last updated. You cannot change this value.
     * @type {string}
     * @memberof ModelsUserWithRight
     */
    updated?: string;
    /**
     * The username of the user. Is always unique.
     * @type {string}
     * @memberof ModelsUserWithRight
     */
    username?: string;
}



/**
 * Check if a given object implements the ModelsUserWithRight interface.
 */
export function instanceOfModelsUserWithRight(value: object): value is ModelsUserWithRight {
    return true;
}

export function ModelsUserWithRightFromJSON(json: any): ModelsUserWithRight {
    return ModelsUserWithRightFromJSONTyped(json, false);
}

export function ModelsUserWithRightFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsUserWithRight {
    if (json == null) {
        return json;
    }
    return {
        
        'created': json['created'] == null ? undefined : json['created'],
        'email': json['email'] == null ? undefined : json['email'],
        'id': json['id'] == null ? undefined : json['id'],
        'name': json['name'] == null ? undefined : json['name'],
        'right': json['right'] == null ? undefined : ModelsRightFromJSON(json['right']),
        'updated': json['updated'] == null ? undefined : json['updated'],
        'username': json['username'] == null ? undefined : json['username'],
    };
}

export function ModelsUserWithRightToJSON(json: any): ModelsUserWithRight {
    return ModelsUserWithRightToJSONTyped(json, false);
}

export function ModelsUserWithRightToJSONTyped(value?: ModelsUserWithRight | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created': value['created'],
        'email': value['email'],
        'id': value['id'],
        'name': value['name'],
        'right': ModelsRightToJSON(value['right']),
        'updated': value['updated'],
        'username': value['username'],
    };
}

