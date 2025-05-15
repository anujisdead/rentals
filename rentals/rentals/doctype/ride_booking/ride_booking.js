// Copyright (c) 2025, anuj@gmail.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Ride Booking", {
 	refresh(frm) {
        
 },
    rate(frm) {

    },
});
frappe.ui.form.on('Ride Booking Item', {
	refresh(frm) {
		// your code here
	},
    distance(frm, cdt, cdn) {
        console.log(cdt, cdn);
        console.log("child table distance changed");
    }

})
