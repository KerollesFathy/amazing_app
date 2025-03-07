import frappe
import json

@frappe.whitelist()
def get_vip_customers(fields):
	return frappe.db.get_list("VIP Customer",
	fields=fields,
	as_list=False)


@frappe.whitelist()
def recive_data_from_outside(data=None):
	data = frappe.request.data
	data_to_dict = json.loads(data)

	print(data_to_dict)

	vip_customer = frappe.new_doc("VIP Customer")
	vip_customer.first_name = data_to_dict.get("first_name")
	vip_customer.insert()
	print(f"\n\n{data}\n\n")

@frappe.whitelist(allows_guest=True)
def greet():
	return "Hello World"

def get_data():
	return "Hello World"

# TODO Feature: Add a new endpoint to get the list of VIP customers