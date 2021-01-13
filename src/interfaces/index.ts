interface ApiData {
	src: string;
	className: string;
	imageUrl: string;
	mainText: string;
	style: any;
	spanStyle: any;
	linkHref: string;
	linkText: string;
}

interface IAction {
	type: string;
	data: any[];
	isError: boolean;
	errorMsg: string;
}

interface InitialState {
	data: Array<ApiData>;
	isError: boolean;
	errorMsg: string;
};

export type { ApiData, IAction, InitialState };
