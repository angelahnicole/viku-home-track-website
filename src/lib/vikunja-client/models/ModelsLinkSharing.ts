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
import type { ModelsSharingType } from './ModelsSharingType';
import {
    ModelsSharingTypeFromJSON,
    ModelsSharingTypeFromJSONTyped,
    ModelsSharingTypeToJSON,
    ModelsSharingTypeToJSONTyped,
} from './ModelsSharingType';
import type { UserUser } from './UserUser';
import {
    UserUserFromJSON,
    UserUserFromJSONTyped,
    UserUserToJSON,
    UserUserToJSONTyped,
} from './UserUser';

/**
 * 
 * @export
 * @interface ModelsLinkSharing
 */
export interface ModelsLinkSharing {
    /**
     * A timestamp when this project was shared. You cannot change this value.
     * @type {string}
     * @memberof ModelsLinkSharing
     */
    created?: string;
    /**
     * The public id to get this shared project
     * @type {string}
     * @memberof ModelsLinkSharing
     */
    hash?: string;
    /**
     * The ID of the shared thing
     * @type {number}
     * @memberof ModelsLinkSharing
     */
    id?: number;
    /**
     * The name of this link share. All actions someone takes while being authenticated with that link will appear with that name.
     * @type {string}
     * @memberof ModelsLinkSharing
     */
    name?: string;
    /**
     * The password of this link share. You can only set it, not retrieve it after the link share has been created.
     * @type {string}
     * @memberof ModelsLinkSharing
     */
    password?: string;
    /**
     * The right this project is shared with. 0 = Read only, 1 = Read & Write, 2 = Admin. See the docs for more details.
     * @type {ModelsRight}
     * @memberof ModelsLinkSharing
     */
    right?: ModelsRight;
    /**
     * The user who shared this project
     * @type {UserUser}
     * @memberof ModelsLinkSharing
     */
    sharedBy?: UserUser;
    /**
     * The kind of this link. 0 = undefined, 1 = without password, 2 = with password.
     * @type {ModelsSharingType}
     * @memberof ModelsLinkSharing
     */
    sharingType?: ModelsSharingType;
    /**
     * A timestamp when this share was last updated. You cannot change this value.
     * @type {string}
     * @memberof ModelsLinkSharing
     */
    updated?: string;
}



/**
 * Check if a given object implements the ModelsLinkSharing interface.
 */
export function instanceOfModelsLinkSharing(value: object): value is ModelsLinkSharing {
    return true;
}

export function ModelsLinkSharingFromJSON(json: any): ModelsLinkSharing {
    return ModelsLinkSharingFromJSONTyped(json, false);
}

export function ModelsLinkSharingFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsLinkSharing {
    if (json == null) {
        return json;
    }
    return {
        
        'created': json['created'] == null ? undefined : json['created'],
        'hash': json['hash'] == null ? undefined : json['hash'],
        'id': json['id'] == null ? undefined : json['id'],
        'name': json['name'] == null ? undefined : json['name'],
        'password': json['password'] == null ? undefined : json['password'],
        'right': json['right'] == null ? undefined : ModelsRightFromJSON(json['right']),
        'sharedBy': json['shared_by'] == null ? undefined : UserUserFromJSON(json['shared_by']),
        'sharingType': json['sharing_type'] == null ? undefined : ModelsSharingTypeFromJSON(json['sharing_type']),
        'updated': json['updated'] == null ? undefined : json['updated'],
    };
}

export function ModelsLinkSharingToJSON(json: any): ModelsLinkSharing {
    return ModelsLinkSharingToJSONTyped(json, false);
}

export function ModelsLinkSharingToJSONTyped(value?: ModelsLinkSharing | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created': value['created'],
        'hash': value['hash'],
        'id': value['id'],
        'name': value['name'],
        'password': value['password'],
        'right': ModelsRightToJSON(value['right']),
        'shared_by': UserUserToJSON(value['sharedBy']),
        'sharing_type': ModelsSharingTypeToJSON(value['sharingType']),
        'updated': value['updated'],
    };
}

