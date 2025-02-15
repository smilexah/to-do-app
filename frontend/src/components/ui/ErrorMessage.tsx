import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

type Props = {
    error?: FetchBaseQueryError | SerializedError;
}

const ErrorMessage = ({error}: Props) => {
    if (!error) return null;

    return (
        <p className="text-red-500 text-small">
            {(() => {
                if ("data" in error) {
                    const serverError = error.data as { message?: string };
                    return serverError?.message || "An error occurred.";
                } else if ("error" in error) {
                    return error.error || "A network error occurred.";
                } else {
                    return "An unexpected error occurred.";
                }
            })()}
        </p>
    );
};

export default ErrorMessage;