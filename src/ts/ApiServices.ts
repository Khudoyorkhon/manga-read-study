type Header = Object | [string, string][];
type RequestHeaders = HeadersInit;
enum Methods {
  post = "POST",
	get = "GET",
	update = "UPDATE",
	put = "PUT",
}

const defaultHeaders = {
	'Accept': 'application/json, text/plain, */*',
	'Accept-Encoding': 'gzip, deflate, br',
	'Connection': 'Keep-Alive',
};

export class Api {
	private _baseUrl: string;
	private _headers: RequestHeaders = this.createHeader(defaultHeaders as Header);

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	private async request<TResponse>(url: string, method: string, requestBody?: object): Promise<TResponse | null> {
		const requestHeaders: RequestHeaders = this.getHeaders();
		const options = {
			method,
			headers: requestHeaders,
			body: JSON.stringify(requestBody),
		};
		try {
			const res = await fetch(url, options);
			const data = await res.json();
			return data as TResponse;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	getWithParams(params: object) {
		const urlWithParams = this.generateUrlWithParams(params);
		console.log(urlWithParams);
		return this.request(urlWithParams, Methods.get);
	}

	private getHeaders() {
		return this._headers as RequestHeaders;
	}

	public modifyHeaders(newHeaders: Object | [string, string][]) {
		const currentHeaders = !Array.isArray(newHeaders) === true ? Object.entries(newHeaders) : newHeaders;
		currentHeaders.forEach(([key, value]) => {
			(this._headers as Headers).append(key, value);
		});
	}

	private generateUrlWithParams(params: object) {
		const paramsAsArray: string[][] = Object.entries(params);
		const urlWithParams = new URL(this._baseUrl);
		paramsAsArray.forEach((param) => {
			const [key, value] = param;
			urlWithParams.searchParams.append(key, value);
		});
		return urlWithParams.toString();
	}

	private createHeader(headers: Header): HeadersInit {
		const headersAsArray: [string, string][] = !Array.isArray(headers) === true ? Object.entries(headers) : headers;
		return new Headers(headersAsArray);
	}
}