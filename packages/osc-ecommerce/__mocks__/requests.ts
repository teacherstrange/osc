export const mockHomeRequest = (url: string): Request => ({
    url: url,
    cache: 'default',
    credentials: 'include',
    destination: '',
    // @ts-ignore -- we don't need these
    headers: undefined,
    integrity: '',
    keepalive: false,
    method: '',
    mode: 'same-origin',
    redirect: 'error',
    referrer: '',
    referrerPolicy: '',
    clone: function (): Request {
        throw new Error('Function not implemented.');
    },
    body: null,
    bodyUsed: false,
    arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error('Function not implemented.');
    },
    blob: function (): Promise<Blob> {
        throw new Error('Function not implemented.');
    },
    formData: function (): Promise<FormData> {
        throw new Error('Function not implemented.');
    },
    json: function (): Promise<any> {
        throw new Error('Function not implemented.');
    },
    text: function (): Promise<string> {
        throw new Error('Function not implemented.');
    }
});
