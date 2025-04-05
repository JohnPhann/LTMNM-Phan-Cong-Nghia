let bookings = [
    { id: 1, customerName: "Nguyen Van A", date: "2025-03-20", time: "10:00", status: "Pending" },
    { id: 2, customerName: "Tran Thi B", date: "2025-03-21", time: "14:00", status: "Confirmed" }
];
let bookingId = 1;

const bookingController = {
   list: (req, res) => {
    res.render("bookingList", { bookings });
    },
    createForm: (req, res) => {
        res.render("bookingCreate");
    },
    create: (req, res) => {
    const { customerName, date, time } = req.body;

    if (!customerName || !date || !time) {
        return res.redirect("/bookings/create");
    }

    const isDuplicate = bookings.some(b => b.date === date && b.time === time);
    if (isDuplicate) {
        return res.redirect("/bookings/create");
    }
    bookings.push({ id: bookings.length + 1, customerName, date, time, status: "Pending" });
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
            return res.status(404).send("Không tìm thấy đặt chỗ!");
        }
        if (booking) {
            booking.customerName = customerName;
            booking.date = date;
            booking.time = time;
        }
        res.redirect("/bookings");
    },
    cancel: (req, res) => {
        let booking = bookings.find(b => b.id == +req.params.id);
        if (booking) {
            booking.status = "Cancelled";
        }
        res.redirect("/bookings");
    }
};

module.exports = bookingController;
