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
	CONFIRM = 9, // Xác nhận đơn hàng từ khách hàng hoặc điểm khác
	CREATED = 12, // Tạo yêu càu đơn hàng đến điểm tiếp theo
	LEFT = 15, // Đơn hàng đã rời điểm hiện tại
	DELIVERING = 18,
	SUCCESS_DELIVERY = 21,
	FAILED_DELIVERY = 24
}

export enum OrderMsgStatus {
	CONFIRM = 'Đã xác nhận', // Xác nhận đơn hàng từ khách hàng hoặc điểm khác
	CREATED = 'Tạo mới', // Tạo yêu càu đơn hàng đến điểm tiếp theo
	LEFT = 'Đã rời điểm', // Đơn hàng đã rời điểm hiện tại
	DELIVERING = 'Đang vận chuyển',
	SUCCESS_DELIVERY = 'Vận chuyển thành công',
	FAILED_DELIVERY = 'Vận chuyển không thành công'
}
