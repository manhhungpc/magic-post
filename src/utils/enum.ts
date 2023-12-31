export enum Roles {
	ADMIN = 1,
	TRANSACTION_LEADER = 2,
	TRANSACTION_STAFF = 3,
	GATHERING_LEADER = 4,
	GATHERS_STAFF = 5,
	CUSTOMER = 6,
	SHIPPER = 7
}

export enum Catergority {
	DOCUMENT = 1,
	PACKAGE = 2
}

export enum OfficeType {
	GATHERING = 'GP',
	TRANSACTION = 'TP'
}

export enum LocationDepth {
	PROVINCE = 1,
	DISTRICT = 2,
	WARDS = 3
}

export enum OrderStatus {
	NEW = 1,
	PROCESSING = 2,
	CREATE_SEND = 3,
	CONFIRM_SEND = 4,
	CONFIRM_RECEIVE = 5,
	SUCCESS_DELIVERY = 6,
	FAILED_DELIVERY = 7,
	COMPLETED = 8
}

export enum OrderType {
	CUSTOMER = 1,
	GATHERING = 2,
	TRANSACTION = 3,
	DELIVERY = 4
}

export enum OrderMsgStatus {
	NEW = 'Mới',
	PROCESSING = 'Đang xử lý',
	CONFIRM_SEND = 'Xác nhận đã rời điểm',
	CONFIRM_RECEIVE = 'Xác nhận đã đến',
	SUCCESS_DELIVERY = 'Vận chuyển thành công',
	FAILED_DELIVERY = 'Vận chuyển không thành công'
}

export enum DeliveryStatus {
	INCOMING = 1,
	PROCESSING = 2,
	LEAVE = 3
}
