export class Data {
  constructor(data) {
    this.data = data
  }
}

/**
 *
 * Expception class follows main structure of JSON API. // https://jsonapi.org/format/#errors
 *
 * @param {string} id - a unique identifier for this particular occurrence of the problem, this should be the `trace id` from request.
 * @param {number} status - the HTTP status code applicable to this problem, expressed as a integer value. This SHOULD be provided.
 * @param {string} message - a human-readable & localized explanation specific to this occurrence of the problem.
 * @param {string} [code] - an application-specific error code, expressed as a string value.
 * @param {object} [meta] - a meta object containing non-standard meta-information about the error.
 */
export class Exception {
  constructor(data = {}) {
    this.id = data?.id
    this.status = data.status
    this.message = data.message
    this.code = data?.code
    this.meta = data?.meta
  }
}
