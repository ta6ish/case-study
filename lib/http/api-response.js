'use strict';

const apiResponse = (data, code = 0, msg="success") => {
  return {
    code,
    msg,
    ...data,
  }
};

module.exports = {
  apiResponse,
}