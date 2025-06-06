# Copyright (c) 2025, anuj@gmail.com and Contributors
# See license.txt

import frappe
from frappe.tests import IntegrationTestCase, UnitTestCase
from frappe.tests.utils import FrappeTestCase


# On IntegrationTestCase, the doctype test records and all
# link-field test record dependencies are recursively loaded
# Use these module variables to add/remove to/from that list
EXTRA_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]
IGNORE_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]


class UnitTestDriver(UnitTestCase):
	def test_full_name_correctly(self):
		test_driver = frappe.new_doc("Driver")
		test_driver.first_name = "John"
		test_driver.last_name = "Doe"
		test_driver.licesnse_number = "123456789"
		test_driver.save()

	self.assertEqual(test_driver.full_name, "John Doe")

	pass


class IntegrationTestDriver(IntegrationTestCase):
	"""
	Integration tests for Driver.
	Use this class for testing interactions between multiple components.
	"""

	pass
