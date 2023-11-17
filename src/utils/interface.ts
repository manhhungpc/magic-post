export enum Roles {
	ADMIN = 1,
	OFFICES_LEADER = 2,
	GATHERING_LEADER = 3,
	OFFICER = 4,
	GATHERS = 5,
	CUSTOMER = 6,
	SHIPPER = 7
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

export interface StaffTableInteface {
	id: string;
	name: string;
	role: string;
	address: string;
}

export interface OfficeTableInterface {
	id: string;
	name: string;
	phone: string;
	address: string;
	manager: string;
	gatheringPoint?: string;
}