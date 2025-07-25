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


import * as runtime from '../runtime';
import type {
  ModelsDatabaseNotifications,
  ModelsMessage,
  ModelsSubscription,
  NotificationsDatabaseNotification,
  WebHTTPError,
} from '../models/index';
import {
    ModelsDatabaseNotificationsFromJSON,
    ModelsDatabaseNotificationsToJSON,
    ModelsMessageFromJSON,
    ModelsMessageToJSON,
    ModelsSubscriptionFromJSON,
    ModelsSubscriptionToJSON,
    NotificationsDatabaseNotificationFromJSON,
    NotificationsDatabaseNotificationToJSON,
    WebHTTPErrorFromJSON,
    WebHTTPErrorToJSON,
} from '../models/index';

export interface NotificationsGetRequest {
    page?: number;
    perPage?: number;
}

export interface NotificationsIdPostRequest {
    id: number;
}

export interface SubscriptionsEntityEntityIDDeleteRequest {
    entity: string;
    entityID: string;
}

export interface SubscriptionsEntityEntityIDPutRequest {
    entity: string;
    entityID: string;
}

/**
 * 
 */
export class SubscriptionsApi extends runtime.BaseAPI {

    /**
     * Returns an array with all notifications for the current user.
     * Get all notifications for the current user
     */
    async notificationsGetRaw(requestParameters: NotificationsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<NotificationsDatabaseNotification>>> {
        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['perPage'] != null) {
            queryParameters['per_page'] = requestParameters['perPage'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // JWTKeyAuth authentication
        }


        let urlPath = `/notifications`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NotificationsDatabaseNotificationFromJSON));
    }

    /**
     * Returns an array with all notifications for the current user.
     * Get all notifications for the current user
     */
    async notificationsGet(requestParameters: NotificationsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<NotificationsDatabaseNotification>> {
        const response = await this.notificationsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Marks a notification as either read or unread. A user can only mark their own notifications as read.
     * Mark a notification as (un-)read
     */
    async notificationsIdPostRaw(requestParameters: NotificationsIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsDatabaseNotifications>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling notificationsIdPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // JWTKeyAuth authentication
        }


        let urlPath = `/notifications/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsDatabaseNotificationsFromJSON(jsonValue));
    }

    /**
     * Marks a notification as either read or unread. A user can only mark their own notifications as read.
     * Mark a notification as (un-)read
     */
    async notificationsIdPost(requestParameters: NotificationsIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsDatabaseNotifications> {
        const response = await this.notificationsIdPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Unsubscribes the current user to an entity.
     * Unsubscribe the current user from an entity.
     */
    async subscriptionsEntityEntityIDDeleteRaw(requestParameters: SubscriptionsEntityEntityIDDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsSubscription>> {
        if (requestParameters['entity'] == null) {
            throw new runtime.RequiredError(
                'entity',
                'Required parameter "entity" was null or undefined when calling subscriptionsEntityEntityIDDelete().'
            );
        }

        if (requestParameters['entityID'] == null) {
            throw new runtime.RequiredError(
                'entityID',
                'Required parameter "entityID" was null or undefined when calling subscriptionsEntityEntityIDDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // JWTKeyAuth authentication
        }


        let urlPath = `/subscriptions/{entity}/{entityID}`;
        urlPath = urlPath.replace(`{${"entity"}}`, encodeURIComponent(String(requestParameters['entity'])));
        urlPath = urlPath.replace(`{${"entityID"}}`, encodeURIComponent(String(requestParameters['entityID'])));

        const response = await this.request({
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsSubscriptionFromJSON(jsonValue));
    }

    /**
     * Unsubscribes the current user to an entity.
     * Unsubscribe the current user from an entity.
     */
    async subscriptionsEntityEntityIDDelete(requestParameters: SubscriptionsEntityEntityIDDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsSubscription> {
        const response = await this.subscriptionsEntityEntityIDDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Subscribes the current user to an entity.
     * Subscribes the current user to an entity.
     */
    async subscriptionsEntityEntityIDPutRaw(requestParameters: SubscriptionsEntityEntityIDPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsSubscription>> {
        if (requestParameters['entity'] == null) {
            throw new runtime.RequiredError(
                'entity',
                'Required parameter "entity" was null or undefined when calling subscriptionsEntityEntityIDPut().'
            );
        }

        if (requestParameters['entityID'] == null) {
            throw new runtime.RequiredError(
                'entityID',
                'Required parameter "entityID" was null or undefined when calling subscriptionsEntityEntityIDPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // JWTKeyAuth authentication
        }


        let urlPath = `/subscriptions/{entity}/{entityID}`;
        urlPath = urlPath.replace(`{${"entity"}}`, encodeURIComponent(String(requestParameters['entity'])));
        urlPath = urlPath.replace(`{${"entityID"}}`, encodeURIComponent(String(requestParameters['entityID'])));

        const response = await this.request({
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsSubscriptionFromJSON(jsonValue));
    }

    /**
     * Subscribes the current user to an entity.
     * Subscribes the current user to an entity.
     */
    async subscriptionsEntityEntityIDPut(requestParameters: SubscriptionsEntityEntityIDPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsSubscription> {
        const response = await this.subscriptionsEntityEntityIDPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
