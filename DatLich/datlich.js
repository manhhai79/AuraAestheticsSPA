const params = new URLSearchParams(window.location.search);
const service = params.get("service");

if (service) {
    document.getElementById("serviceSelect").value = service;
}

document.getElementById("datLichForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("🎉 Đặt lịch thành công! Aura sẽ liên hệ sớm.");
    this.reset();
});
