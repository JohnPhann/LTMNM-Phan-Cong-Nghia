let bookings = [
    { id: 1, customerName: "Nguyen Van A", date: "2025-03-20", time: "10:00", status: "Pending" },
    { id: 2, customerName: "Tran Thi B", date: "2025-03-21", time: "14:00", status: "Confirmed" }
];
let bookingId = 1;

const bookingController = {
   list: (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");

    const messages = {};
    if (successMessage.length > 0) {
        messages.success = successMessage[0];
    }
    if (errorMessage.length > 0) {
        messages.error = errorMessage[0];
    }

    res.render("bookingList", { bookings, messages });
    },
    createForm: (req, res) => {
        res.render("bookingCreate");
    },
    create: (req, res) => {
    const { customerName, date, time } = req.body;

    if (!customerName || !date || !time) {
        req.flash("error", "Vui lòng nhập đầy đủ thông tin!");
        return res.redirect("/bookings/create");
    }

    const isDuplicate = bookings.some(b => b.date === date && b.time === time);
    if (isDuplicate) {
        req.flash("error", "Lịch đã được đặt trước, vui lòng chọn thời gian khác!");
        return res.redirect("/bookings/create");
    }
    bookings.push({ id: bookings.length + 1, customerName, date, time, status: "Pending" });

    req.flash("success", "Đặt chỗ thành công!");
    res.redirect("/bookings");
    },
    editForm: (req, res) => {
        const booking = bookings.find(b => b.id == +req.params.id);
        res.render("bookingEdit", { booking });
    },
    update: (req, res) => {
        const { customerName, date, time } = req.body;
        console.log("Request Params:", req.params);
        let booking = bookings.find(b => b.id == +req.params.id);
         if (!booking) {
            req.flash("error", "Không tìm thấy đặt chỗ!");
            return res.status(404).send("Không tìm thấy đặt chỗ!");  // Prevents the error
        }
        if (booking) {
            booking.customerName = customerName;
            booking.date = date;
            booking.time = time;
        }
        req.flash("success", "Cập nhật thành công!");
        res.redirect("/bookings");
    },
    cancel: (req, res) => {
        let booking = bookings.find(b => b.id == +req.params.id);
        if (booking) {
            booking.status = "Cancelled";
        }
        req.flash("success", "Hủy thành công!");
        res.redirect("/bookings");
    }
};

module.exports = bookingController;
