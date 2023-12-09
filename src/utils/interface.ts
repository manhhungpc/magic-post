import type { Catergority, Roles } from './enum';

export interface Paginate {
	totalPages: number;
	totalItems: number;
	perPage: number;
	currentPage: number;
}

export enum LocationDepth {
	PROVINCE = 1,
	DISTRICT = 2,
	WARDS = 3
}

export interface LocationSchema {
	name: string;
	code: number;
}

export interface StaffsInteface {
	id: string;
	userId: string;
	address: string;
	email: string;
	fullName: string;
	phoneNo: string;
	dateOfBirth: string;
	role: {
		id: Roles;
		name: string;
	};
	workAt: {
		id: string;
		pointId: string;
		name: string;
	};
}

export interface OfficesInterface {
	id: string;
	pointId: string;
	name: string;
	phoneNo: string;
	address: string;
	admin: {
		fullName: string;
		userId: string;
	};
	gatheringPoint?: {
		id: string;
		pointId: string;
		name: string;
	};
	typePoint: 'GP' | 'TP';
	type: string;
}

export interface GatherOrderInteface {
	orderId: string;
	address: string;
}

export interface TransactionOrderInteface {
	orderId: string;
	address: string;
	transactionId: string;
}

export interface CustomerOrder {
	categority: Catergority;
	weight: number;
	senderCustomer: {
		name: string;
		phoneNo: string;
		address: string;
	};
	receiverCustomer: {
		name: string;
		phoneNo: string;
		address: string;
	};
	contextOrders?: Array<ContextOrders>;
}

export interface ContextOrders {
	context: string | undefined;
	quantity: number;
	value: number;
	documentNo: number;
}
