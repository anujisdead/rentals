frappe.ui.form.on('Section', {
    device: function(frm) {
        if (!frm.doc.device) {
            frm.clear_table('logs');
            frm.refresh_field('logs');
            return;
        }

        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'Device',
                name: frm.doc.device
            },
            callback: function(r) {
                if (r.message && r.message.logs && r.message.logs.length > 0) {
                    frm.clear_table('logs');

                    r.message.logs.forEach(function(log) {
                        let row = frm.add_child('logs');
                        row.log_name = log.log_name;
                        row.timestamp = log.timestamp;
                        row.message = log.message;
                    });

                    frm.refresh_field('logs');
                } else {
                    frappe.msgprint("No logs found for this device.");
                    frm.clear_table('logs');
                    frm.refresh_field('logs');
                }
            }
        });
    }
});
