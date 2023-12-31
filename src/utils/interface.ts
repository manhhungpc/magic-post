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
		typePoint: 'TP' | 'GP';
	};
}

export interface OfficesInterface {
	id: string;
	pointId: string;
	name: string;
	phoneNo: string;
	address: string;
	admin: {
		id: string;
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
	id: string;
	orderId: number;
	mainCharge: number;
	urlQrCode: string;
	orderDelivery: {
		id: number;
		fromLocation: {
			id: string;
			pointId: string;
			customerId: number;
			name: string;
			phoneNo: string;
			address: string;
			admin: StaffsInteface;
			transactionPoint: OfficesInterface;
		};
		currentLocation: OfficesInterface;
		toLocation: {
			id: string;
			pointId: string;
			customerId: number;
			name: string;
			phoneNo: string;
			address: string;
			admin: StaffsInteface;
			transactionPoint: OfficesInterface;
		};
		status: OrderStatus;
	};
	createAt: string;
}
