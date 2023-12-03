/**
 *  Normalize Api Responses for all api responses
 * @param data  
 * @param message 
 * @param code 
 * @returns  
 */
export const NormalizeApiResponses = <T extends object>(data: T, message: string, code: string) => {
    return {
        code: code,
        message: message ? message : 'success',
        payload: {
            data: data,
        }
    };
}; 