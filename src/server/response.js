// @TODO JSON API data spec.
/**
 * Data class describes the structure follows a JSON:API document data spec.
 * @param {object} data: the document’s “primary data”.
 * @param {object} errors: an array of error objects.
 * @param {object} meta: a meta object that contains non-standard meta-information.
 * @param {object} links: a links object related to the primary data (`self`, `next`, `prev`).
 * The members data and errors MUST NOT coexist in the same document.
 */
export class Data {
  static from(payload) {
    return { data: payload }
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
