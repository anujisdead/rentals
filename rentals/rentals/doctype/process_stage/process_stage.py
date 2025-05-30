# Copyright (c) 2025, anuj@gmail.com and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ProcessStage(Document):
    def get_parent_manufacturing_order_from_process_stage(process_stage_doc):
        if process_stage_doc.parent:
            parent_manufacturing_order = frappe.get_doc("Manufacturing Order", process_stage_doc.parent)
            return parent_manufacturing_order
        return None


