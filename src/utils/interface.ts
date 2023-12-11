import type { Catergority, OrderStatus, Roles } from './enum';

export interface Paginate {
	totalPages: number;
	totalItems: number;
	perPage: number;
	currentPage: number;
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
		id: string;
		customerId: string;
		name: string;
		phoneNo: string;
		address: string;
		transactionPoint: OfficesInterface;
	};
	receiverCustomer: {
		name: string;
		phoneNo: string;
		address: string;
		transactionPoint: OfficesInterface;
	};
	contextOrders?: Array<ContextOrders>;
}

export interface ContextOrders {
	context: string | undefined;
	quantity: number;
	value: number;
	documentNo: number;
}

export interface Order extends CustomerOrder {
	orderId: number;
	mainCharge: number;
	orderDelivery: {
		id: number;
		fromLocation: {
			id: string;
			customerId: number;
			name: string;
			phoneNo: string;
			address: string;
			transactionPoint: OfficesInterface;
		};
		currentLocation: OfficesInterface;
		toLocation: {
			id: string;
			customerId: number;
			name: string;
			phoneNo: string;
			address: string;
			transactionPoint: OfficesInterface;
		};
		status: OrderStatus;
	};
	createAt: string;
}
