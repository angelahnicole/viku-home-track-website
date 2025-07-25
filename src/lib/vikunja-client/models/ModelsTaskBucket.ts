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
import type { ModelsBucket } from './ModelsBucket';
import {
    ModelsBucketFromJSON,
    ModelsBucketFromJSONTyped,
    ModelsBucketToJSON,
    ModelsBucketToJSONTyped,
} from './ModelsBucket';
import type { ModelsTask } from './ModelsTask';
import {
    ModelsTaskFromJSON,
    ModelsTaskFromJSONTyped,
    ModelsTaskToJSON,
    ModelsTaskToJSONTyped,
} from './ModelsTask';

/**
 * 
 * @export
 * @interface ModelsTaskBucket
 */
export interface ModelsTaskBucket {
    /**
     * 
     * @type {ModelsBucket}
     * @memberof ModelsTaskBucket
     */
    bucket?: ModelsBucket;
    /**
     * 
     * @type {number}
     * @memberof ModelsTaskBucket
     */
    bucketId?: number;
    /**
     * The view this bucket belongs to. Combined with TaskID this forms a
     * unique index.
     * @type {number}
     * @memberof ModelsTaskBucket
     */
    projectViewId?: number;
    /**
     * 
     * @type {ModelsTask}
     * @memberof ModelsTaskBucket
     */
    task?: ModelsTask;
    /**
     * The task which belongs to the bucket. Together with ProjectViewID
     * this field is part of a unique index to prevent duplicates.
     * @type {number}
     * @memberof ModelsTaskBucket
     */
    taskId?: number;
}

/**
 * Check if a given object implements the ModelsTaskBucket interface.
 */
export function instanceOfModelsTaskBucket(value: object): value is ModelsTaskBucket {
    return true;
}

export function ModelsTaskBucketFromJSON(json: any): ModelsTaskBucket {
    return ModelsTaskBucketFromJSONTyped(json, false);
}

export function ModelsTaskBucketFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsTaskBucket {
    if (json == null) {
        return json;
    }
    return {
        
        'bucket': json['bucket'] == null ? undefined : ModelsBucketFromJSON(json['bucket']),
        'bucketId': json['bucket_id'] == null ? undefined : json['bucket_id'],
        'projectViewId': json['project_view_id'] == null ? undefined : json['project_view_id'],
        'task': json['task'] == null ? undefined : ModelsTaskFromJSON(json['task']),
        'taskId': json['task_id'] == null ? undefined : json['task_id'],
    };
}

export function ModelsTaskBucketToJSON(json: any): ModelsTaskBucket {
    return ModelsTaskBucketToJSONTyped(json, false);
}

export function ModelsTaskBucketToJSONTyped(value?: ModelsTaskBucket | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'bucket': ModelsBucketToJSON(value['bucket']),
        'bucket_id': value['bucketId'],
        'project_view_id': value['projectViewId'],
        'task': ModelsTaskToJSON(value['task']),
        'task_id': value['taskId'],
    };
}

