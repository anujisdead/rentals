# Copyright (c) 2025, anuj@gmail.com and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ManufacturingOrder(Document):
    def autoname(self):
        if self.order_id:
            self.name = self.order_id
        else:
            self.name = self.naming_series or self.get_default_name()
    
