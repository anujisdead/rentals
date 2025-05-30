
frappe.ui.form.on('Section Select', {
    refresh(frm) {
        if (frm.doc.name) {
            frm.trigger('load_devices');
        }
    },

    load_devices(frm) {
        frm.clear_table("device_table"); 

        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Device Entry",
                filters: {
                    section: frm.doc.name  
                },
                fields: ["name", "device_name"]
            },
            callback(res) {
                (res.message || []).forEach(device => {
                    let device_row = frm.add_child("device_table");  
                    device_row.device = device.name;

                    frappe.call({
                        method: "frappe.client.get_list",
                        args: {
                            doctype: "Log",
                            filters: {
                                device: device.name
                            },
                            fields: ["log_detail", "timestamp"]
                        },
                        callback(log_res) {
                            (log_res.message || []).forEach(log => {
                                let log_row = frappe.model.add_child(device_row, "Log", "Log Table");
                                log_row.log_detail = log.log_detail;
                                log_row.timestamp = log.timestamp;
                            });

                            frm.refresh_field("device_table");
                        }
                    });
                });

                frm.refresh_field("device_table");
            }
        });
    }
});
