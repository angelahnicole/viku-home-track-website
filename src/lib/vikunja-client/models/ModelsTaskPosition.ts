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
/**
 * 
 * @export
 * @interface ModelsTaskPosition
 */
export interface ModelsTaskPosition {
    /**
     * The position of the task - any task project can be sorted as usual by this parameter.
     * When accessing tasks via kanban buckets, this is primarily used to sort them based on a range
     * We're using a float64 here to make it possible to put any task within any two other tasks (by changing the number).
     * You would calculate the new position between two tasks with something like task3.position = (task2.position - task1.position) / 2.
     * A 64-Bit float leaves plenty of room to initially give tasks a position with 2^16 difference to the previous task
     * which also leaves a lot of room for rearranging and sorting later.
     * Positions are always saved per view. They will automatically be set if you request the tasks through a view
     * endpoint, otherwise they will always be 0. To update them, take a look at the Task Position endpoint.
     * @type {number}
     * @memberof ModelsTaskPosition
     */
    position?: number;
    /**
     * The project view this task is related to
     * @type {number}
     * @memberof ModelsTaskPosition
     */
    projectViewId?: number;
    /**
     * The ID of the task this position is for
     * @type {number}
     * @memberof ModelsTaskPosition
     */
    taskId?: number;
}

/**
 * Check if a given object implements the ModelsTaskPosition interface.
 */
export function instanceOfModelsTaskPosition(value: object): value is ModelsTaskPosition {
    return true;
}

export function ModelsTaskPositionFromJSON(json: any): ModelsTaskPosition {
    return ModelsTaskPositionFromJSONTyped(json, false);
}

export function ModelsTaskPositionFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsTaskPosition {
    if (json == null) {
        return json;
    }
    return {
        
        'position': json['position'] == null ? undefined : json['position'],
        'projectViewId': json['project_view_id'] == null ? undefined : json['project_view_id'],
        'taskId': json['task_id'] == null ? undefined : json['task_id'],
    };
}

export function ModelsTaskPositionToJSON(json: any): ModelsTaskPosition {
    return ModelsTaskPositionToJSONTyped(json, false);
}

export function ModelsTaskPositionToJSONTyped(value?: ModelsTaskPosition | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'position': value['position'],
        'project_view_id': value['projectViewId'],
        'task_id': value['taskId'],
    };
}

