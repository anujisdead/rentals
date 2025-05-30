# Copyright (c) 2025, anuj@gmail.com and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class StageOps(Document):
	import frappe

def get_grandparent_manufacturing_order_from_stage_ops(stage_ops_doc):
    
    if stage_ops_doc.parent:
        
        process_stage_doc = frappe.get_doc("Process Stage", stage_ops_doc.parent)

        if process_stage_doc.parent:
            
            manufacturing_order_doc = frappe.get_doc("Manufacturing Order", process_stage_doc.parent)
            return manufacturing_order_doc
    return None

