<script lang="ts">
	import { Catergority } from "src/utils/enum";

    export let orderData: any;
</script>

<div>
    <div class="md:flex justify-between">
        <div class="card rounded-lg p-4 md:w-[49%] mt-4">
            <p class="text-xl font-bold">Thông tin người gửi</p>
            <hr class="my-2" />
            <div>
                <span><strong>Họ và tên người gửi: </strong></span>
                <span>{orderData.senderCustomer.name}</span>
            </div>
            <div>
                <span><strong>Số điện thoại người gửi: </strong></span>
                <span>{orderData.senderCustomer.phoneNo}</span>
            </div>
            <div>
                <span><strong>Địa chỉ người gửi: </strong></span>
                <span>{orderData.senderCustomer.address}</span>
            </div>
        </div>

        <div class="card rounded-lg p-4 md:w-[49%] mt-4">
            <p class="text-xl font-bold">Thông tin người nhận</p>
            <hr class="my-2" />
            <div>
                <span><strong>Họ và tên người nhận: </strong></span>
                <span>{orderData.receiverCustomer.name}</span>
            </div>
            <div>
                <span><strong>Số điện thoại người nhận: </strong></span>
                <span>{orderData.receiverCustomer.phoneNo}</span>
            </div>
            <div>
                <span><strong>Địa chỉ người nhận: </strong></span>
                <span>{orderData.receiverCustomer.address}</span>
            </div>
        </div>
    </div>

    <div class="md:flex justify-between">
        <div class="card rounded-lg p-4 mt-4 grow">
            <p class="text-xl font-bold">Thông tin đơn hàng</p>
            <hr class="my-2" />
            <div class="lg:flex">
                <div class="lg:w-[50%]">
                    <div>
                        <span><strong>Ngày tạo: </strong></span>
                        <span>{new Date(orderData.createAt).getDate()} -</span>
                        <span>{new Date(orderData.createAt).getMonth() + 1} -</span>
                        <span>{new Date(orderData.createAt).getFullYear()}</span>
                    </div>
                    <div>
                        <span><strong>Loại hàng gửi: </strong></span>
                        {#if orderData.categority == Catergority.PACKAGE}
                            <span>Hàng hóa</span>
                        {:else}
                            <span>Tài liệu</span>
                        {/if}
                    </div>
                </div>
                <div>
                    <div>
                        <span><strong>Khối lượng thực tế: </strong></span>
                        <span>{orderData.weight} kg</span>
                    </div>
                    <div>
                        <span><strong>Tổng tiền: </strong></span>
                        <span>{orderData.mainCharge} vnđ</span>
                    </div>
                </div>
            </div>
            <div>
                {#if orderData.contextOrders.length != 0}
                    <p><strong>Nội dung trị giá bưu gửi:</strong></p>
                    <table class="text-center w-full">
                        <thead>
                            <tr>
                                <td><strong>Nội dung</strong></td>
                                <td><strong>Số lượng</strong></td>
                                <td><strong>Trị giá</strong></td>
                                <td><strong>Giấy tờ đính kèm</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {#each orderData.contextOrders as contextData}
                                <tr>
                                    <td>{contextData.context}</td>
                                    <td>{contextData.quantity}</td>
                                    <td>{contextData.value}</td>
                                    <td>{contextData.documentNo}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
            </div>
            <a class="tracking-link" href="/tracking/{orderData.id}">Theo dõi đơn hàng</a>
        </div>

        <div class="card rounded-lg p-4 mt-4 md:ml-4">
            <p class="text-xl font-bold">QR Code</p>
            <hr class="my-2" />
            <img src={orderData.urlQrCode} alt="urlQrCode" width="150" />
        </div>
    </div>

    <div class="card rounded-lg p-4 mt-4">
        <p class="text-xl font-bold">Thông tin chuyển phát</p>
        <hr class="my-2" />
        <div class="lg:flex justify-between">
            <p><strong>Điểm giao dịch gửi: </strong>Kho 1</p>
            <p><strong>Điểm chuyển phát hiện tại: </strong>Kho 2</p>
            <p><strong>Điểm giao dịch đích: </strong>Kho 3</p>
        </div>
    </div>
</div>

<style>
	td {
		border: 1px solid black;
	}
	thead {
		background-color: #eeeeee;
	}
	.tracking-link {
		color: rgb(59, 130, 246);
	}
</style>