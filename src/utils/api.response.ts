import mongoose from "mongoose";

export const API_RESPONSES = {
  success: function (data: any) {
    const resp = {
      data: { ...data, message: undefined },
      message: data?.message || "Success",
      success: true,
      timestamp: new Date().toISOString(),
      error: null,
    };

    return resp;
  },

  error: function (error: any) {
    let resp = {
      data: null,
      message: error.message || "Internal Server Error",
      success: false,
      timestamp: new Date().toISOString(),
      error: {
        ...error,
        message: undefined,
        error_type: undefined,
        error_code: undefined,
      },
      error_type: error?.error_type || "error",
    };

    // if the error is for the duplicate record
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateKey];
      const errorMessage = `Duplicate value for key: ${duplicateKey} (${duplicateValue})`;

      resp = {
        ...resp,
        error: undefined,
        error_type: "duplicate_error",
        message: errorMessage,
      };
    }

    if (
      error instanceof mongoose.Error.CastError &&
      error.kind === "ObjectId"
    ) {
      resp = {
        ...resp,
        error_type: "invalid_id_error",
        message: "Invalid ID format provided",
      };
    }

    return resp;
  },

  notFound: function (message?: string) {
    const resp = {
      data: null,
      status: 404,
      message: message || "API not Found",
      success: false,
      timestamp: new Date().toISOString(),
      error: null,
    };
    return resp;
  },
};
