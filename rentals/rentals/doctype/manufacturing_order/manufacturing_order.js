// Copyright (c) 2025, anuj@gmail.com and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Manufacturing Order", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Manufacturing Order', {
    stages_on_form_rendered(frm) {
        calculate_total_duration(frm);
    },
    refresh(frm) {
        calculate_total_duration(frm);
    }
});

frappe.ui.form.on('Process Stage', {
    duration(frm, cdt, cdn) {
        calculate_total_duration(frm);
    },
    stage_name(frm, cdt, cdn) {
        calculate_total_duration(frm);
    },
    stages_remove(frm) {
        calculate_total_duration(frm);
    }
});

function calculate_total_duration(frm) {
    let total = 0;
    frm.doc.stages.forEach(row => {
        if (row.duration) {
            total += parseInt(row.duration);
        }
    });
    frm.set_value('total_duration', total);
}


// Client-side script for the Manufacturing Order DocType

frappe.ui.form.on('Manufacturing Order', {
    // You can have general scripts for the Manufacturing Order here
    onload: function(frm) {
        console.log("Manufacturing Order form loaded!");
    }
});

// --- Scripts for Process Stage (Child of Manufacturing Order) ---
frappe.ui.form.on('Process Stage', {
    // This 'refresh' event will fire when the Process Stage row is refreshed
    // or when a new row is added/selected in the child table.
    // `frm` here refers to the parent form (Manufacturing Order)
    // `cdt` is the child DocType name (e.g., 'Process Stage')
    // `cdn` is the child DocName (the unique ID of the row in the child table)

    form_render: function(frm, cdt, cdn) {
        // This event fires when the child row form is rendered (e.g., in a dialog or collapsed view)
        var row = frappe.get_doc(cdt, cdn);
        console.log("Process Stage row rendered:", row);
        // You can access parent fields here if needed:
        // console.log("Parent Manufacturing Order ID:", frm.doc.order_id);
    },

    // Example: When 'Stage Name' field changes in Process Stage
    stage_name: function(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        console.log("Process Stage - Stage Name changed to:", row.stage_name);
        // You can trigger actions based on this change, e.g., update parent fields,
        // or perform calculations.
        // Example of accessing parent data:
        // if (frm.doc.order_id) {
        //     frappe.show_alert(`Parent Order ID: ${frm.doc.order_id}`);
        // }
    },

    // To access the parent Manufacturing Order from Process Stage (as discussed before):
    refresh: function(frm, cdt, cdn) {
        var process_stage_doc = frappe.get_doc(cdt, cdn);
        if (frm.doc.order_id) { // frm.doc refers to the parent Manufacturing Order
            console.log(`From Process Stage, parent Manufacturing Order ID: ${frm.doc.order_id}`);
        }
    }
});

// --- Scripts for Stage Ops (Child of Process Stage, Grandchild of Manufacturing Order) ---
frappe.ui.form.on('Stage Ops', {
    // This 'refresh' event will fire when the Stage Ops row is refreshed
    // or when a new row is added/selected in the child table.
    // `frm` here still refers to the parent form (Manufacturing Order)
    // `cdt` is 'Stage Ops', `cdn` is the row ID.

    form_render: function(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        console.log("Stage Ops row rendered:", row);
    },

    // Example: When 'Operation Name' field changes in Stage Ops
    operation_name: function(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        console.log("Stage Ops - Operation Name changed to:", row.operation_name);

        // To access the Grandparent Manufacturing Order from Stage Ops:
        if (frm.doc.order_id) {
            console.log(`From Stage Ops, grandparent Manufacturing Order ID: ${frm.doc.order_id}`);
        }

        let current_process_stage_row = null;
        if (frm.doc.stages && row.parent) { // `row.parent` here is the name of the Process Stage row
            current_process_stage_row = frm.doc.stages.find(ps => ps.name === row.parent);
            if (current_process_stage_row) {
                console.log("Direct parent Process Stage Name:", current_process_stage_row.stage_name);
            }
        }
    }
});